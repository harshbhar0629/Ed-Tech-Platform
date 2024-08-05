/** @format */

const User = require("../models/User.js");
const OTP = require("../models/Otp.js");
const otpGenerator = require("otp-generator");
const Otp = require("../models/Otp.js");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile.js");

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

		console.log("Otp generated");

		const otpPayload = { email, otp };
		// create an entry in db
		const otpBody = await Otp.create(otpPayload);

		// return response
		return res.status(200).josn({
			success: true,
			message: "Otp sent successfully",
		});
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
		const hashPassword = await bcrypt.hash(10, password);

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
