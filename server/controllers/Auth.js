/** @format */

const User = require("../models/User.js");
const OTP = require("../models/Otp.js");
const otpGenerator = require("otp-generator");
const Otp = require("../models/Otp.js");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile.js");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender.js");
require("dotenv").config();

// send otp
exports.sendOtp = async (req, res) => {
	try {
		// fetch email first
		const { email } = req.body;

		// check user already exist or not
		let user = await User.findOne({ email: email });

		// if exist then return response user already exist
		if (user) {
			return res.status(401).json({
				success: false,
				message: "User already exist for this email!",
			});
		}

		// generate otp
		var otp = otpGenerator.generate(6, {
			specialChars: false,
		});

		// otp must be unique
		let result = await OTP.findOne({ otp: otp });

		// untill we don't get unique otp
		while (result) {
			otp = otpGenerator.generate(6, {
				specialChars: false,
			});
			result = await OTP.findOne({ otp: otp });
		}

		console.log("Otp generated", otp);

		const otpPayload = { email, otp };
		// create an entry in db
		const otpBody = await Otp.create(otpPayload);

		// return response
		return res.status(200).josn({
			success: true,
			message: "Otp sent successfully",
		});
		//
	} catch (err) {
		console.log("Error in sending OTP!!");
		console.log(err.message);
		res.status(500).json({
			success: false,
			message: "Error in sending OTP",
		});
	}
};

// signup-user
exports.signUp = async (req, res) => {
	try {
		// data fetch
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			contactNumber,
			otp,
		} = req.body;

		// validate kro
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword ||
			!otp
		) {
			return res
				.status(403)
				.json({ success: false, message: "All Fields are required" });
		}

		// 2password match kro
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "Password and Confirm password not match please try again!",
			});
		}

		// check user already exist or not
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already registered for this email",
			});
		}

		// find recent otp
		const recentOtp = await Otp.find({ email })
			.sort({ created_at: -1 })
			.limit(1);
		console.log("Otp: ", recentOtp);

		// validate otp
		if (recentOtp.length === 0) {
			return res.status(400).json({
				success: false,
				message: "Otp not found",
			});
		} else if (otp !== recentOtp.otp) {
			// invalid otp
			return res.status(400).json({
				success: false,
				message: "Invalid OTP",
			});
		}

		// hash password
		const hashPassword = bcrypt.hash(10, password);

		// first create user profile
		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			contactNumber: null,
			about: null,
		});

		// entry create in db
		const user = await User.create({
			firstName,
			lastName,
			email,
			passsword: hashPassword,
			accountType,
			additionalDetails: profileDetails._id,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
		});

		// return res
		return res.status(200).json({
			success: 200,
			messgae: "User is registered successfully!",
			user,
		});
		//
	} catch (err) {
		console.log("Error in singup");
		console.log(err.message);
		res.status(500).json({
			success: false,
			message: "User can't be registered. Please try again!",
		});
	}
};

// login
exports.login = async (req, res) => {
	try {
		// get data from req ki body
		const { email, password } = req.body;

		// validation data
		if (!email || !password) {
			return res.status(403).json({
				success: false,
				message: "All fields are required. Please try again",
			});
		}

		// check user exist or not
		const user = await User.findOne({ email }).populate("additionalDetails");
		if (!user) {
			return res.status(401).json({
				success: false,
				message: "User is not registered. Please signup first!",
			});
		}

		// match password
		if (!(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({
				success: false,
				message: "Please enter correct password!",
			});
		}

		const payload = {
			email: user.email,
			id: user._id,
			accountType: user.accountType,
		};

		// generate JWT
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "2h",
		});

		user._doc.token = token;
		user._doc.password = undefined;

		// create cookie and response send
		const options = {
			expiresIn: new Date.now() + 3 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		};

		res.cookie("token", token, options).status(200).json({
			success: true,
			token,
			user,
			message: "Logged in successfully!",
		});
		//
	} catch (err) {
		console.log("Error in login");
		console.log(err.message);
		return res.status(500).json({
			success: false,
			message: "Login failure, Please try again!",
		});
	}
};

// Controller for Changing Password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user._id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res.status(401).json({
				success: false,
				message: "Your password is incorrect!",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				"Your StudyNotion account password has been updated",
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
		//
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.log("Error occurred while updating password: \n", error.message);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};
