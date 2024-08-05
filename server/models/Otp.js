const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
    }
});

// fn -> to send email
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = mailSender("Verification Email from StudyNotion", email, `Your verification code: ${otp}`);
        console.log("Email sent successfully");
    }
    catch (err) {
        console.log("Error in verification in email");
        console.log(err.message);
    }
}

otpSchema.pre("save", async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP", otpSchema);