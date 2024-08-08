/** @format */

const User = require("../models/User.js");
const mailSender = require("../utils/mailSender.js");
const bcrypt = require("bcrypt");

// reset password token
exports.resetPasswordToken = async (req, res) => {
	try {
		// get email from body
		const email = req.body.email;

		// check user exist or not
		const user = await User.findOne({ email });
		if (!user) {
			return res.json({
				success: false,
				message: "This Email is not registered before",
			});
		}

		// genrate token
		const token = crypto.randomUUID();

		// update user with token
		const updatedDetails = await User.findOneAndUpdate(
			{ email: email },
			{
				token: token,
				resetPasswordExpires: Date.now() + 5 * 60 * 1000,
			},
			{ new: true }
		);

		// create url
		const url = `http://localhost:3000/update-password/${token}`;

		// send mail
		await mailSender(
			email,
			"Password reset link only valid for 5 minutes",
			`Your link ${url}`
		);

		return res.json({
			success: true,
			message: "Email sent successfully, Please check your Email!",
		});
		//
	} catch (err) {
		console.log("Error in reset password");
		console.log(err.message);
		r;
		return res.status(401).json({
			success: false,
			message: "Error in reset password, Please try again",
		});
	}
};

// exact reset password
exports.resetPAssword = async (req, res) => {
	try {
		// fetch data, token frontend n insert kia h
		const { password, confirmPassword, token } = req.body;

		// validation
		if (password !== confirmPassword) {
			return res.json({
				success: false,
				message: "Password is not matching, Please enter correct password",
			});
		}

		// get userdetails from db using token
		const userDetails = await User.findOne({ token });

		// if not valid user
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token invalid!",
			});
		}

		// token time check
		if (userDetails.resetPasswordExpires < Date.now()) {
			return res.json({
				success: false,
				message: "Link expired, Please regenrate Link again!",
			});
		}

		// password hash
		const hashPassword = await bcrypt.hash(password, 10);
		userDetails.password = hashPassword;
		if (userDetails.password !== hashPassword) {
			await User.findOneAndUpdate(
				{ token },
				{
					password: hashPassword,
				},
				{ new: true }
			);
        }
        
        // return res 
        return res.status(200).json({
            success: true,
            message: "Password updated successfully!",
        });
		//
    } catch (err) {
        console.log("Error in reseting password!");
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: "Your password is not updated, Please try again!"
        });
    }
};
