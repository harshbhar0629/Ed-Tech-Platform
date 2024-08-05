/** @format */

const User = require("../models/User.js");
const OTP = require("../models/Otp.js");
const otpGenerator = require("otp-generator");
const Otp = require("../models/Otp.js");

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
    // data fetch
    // validate kro
    // 2password match kro
    // check user already exist or not
}