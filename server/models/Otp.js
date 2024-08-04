const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
    }
});

module.exports = mongoose.model("OTP", otpSchema);