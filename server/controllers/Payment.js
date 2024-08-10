/** @format */

const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
	courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");

// capture payment and initiate razorpay order
exports.capturePayment = async (req, res) => {
	// get course id and user id
	const { courseId } = req.body;
	const userId = req.user.id;

	// validation
	if (!courseId || userId) {
		return res.json({
			success: false,
			message: "Please provide correct course id!",
		});
	}

	let course;
	try {
		// find or fetch course  from given id
		course = await Course.findById(courseId);
		if (!course) {
			return res.json({
				success: false,
				message: "Could not find course!",
			});
		}

		// same user can't buy same course again so check pls
		const uid = new mongoose.Types.ObjectId(userId);
		if (course.studentsEnrolled.includes(uid)) {
			return res.status(200).json({
				success: true,
				message: "Student is already enrolled!",
			});
		}
		//
	} catch (err) {
		console.log("Error in finding course");
		return res.status(500).json({
			success: false,
			message: err.message,
		});
	}

	// order create
	const amount = course.price;
	const currency = "INR";
	const options = {
		amount: amount * 100,
		currency: currency,
		receipt: Math.random(Date.now()).toString(),
		notes: {
			courseId: courseId,
			userId,
		},
	};

	// create call for order
	try {
		// initiate payment using razorpay
		const paymentResponse = await instance.orders.create(options);
		console.log("Payment response");
		console.log(paymentResponse);

		return res.status(200).json({
			success: true,
			courseName: course.courseName,
			courseDescription: course.courseDescription,
			thumbnail: course.thumbnail,
			orderId: paymentResponse.id,
			currency: paymentResponse.currency,
			amount: paymentResponse.amount,
		});
		//
	} catch (err) {
		console.log("Error in order call!");
		return res.json({
			success: false,
			message: "Couldn't initiate order",
		});
	}
};

// Verify - Authorization
exports.verifySignature = async (req, res) => {
	// we have to match server secret or razorpay secret to verify successfull payment
	const webhookSecret = "12345678";
	const signature = req.headers["x-razorpay-signature"];

	// it return unique value
	const shasum = await crypto.createHmac("sha256", webhookSecret);
	shasum.update(JSON.stringify(req.body));
	const digest = shasum.digest("hex"); // hexadecimal conversion

	/**
	 * Explaination of above 3 lines
	 *
	 * 1. crypto.createHmac("sha256", webhookSecret):
	 * This creates an HMAC instance using the SHA-256 hashing algorithm.
	 * webhookSecret is a secret key shared between the sender and the receiver of the webhook.
	 * It ensures that only someone with knowledge of this key can generate the correct HMAC.
	 *
	 *
	 * 2. shasum.update(JSON.stringify(req.body)):
	 * This updates the HMAC instance with the stringified version of the request body (req.body).
	 * JSON.stringify(req.body) converts the request body into a JSON string, which is the format required for the HMAC calculation.
	 *
	 * 3. const digest = shasum.digest("hex"):
	 * The digest("hex") method finalizes the HMAC computation and returns the result as a hexadecimal string.
	 * The digest variable will hold the computed HMAC value, which can be used for comparison with the signature provided by the webhook sender.
	 *
	 **/

	if (digest === signature) {
		console.log("Payment is authorized");

		const { courseId, userId } = req.body.payload.payment.entity.notes;

		try {
			// full fill action
			// find the course and enrolled the student in it

			const enrolledCourse = await Course.findByIdAndUpdate(
				{ _id: courseId },
				{
					$push: {
						studentsEnrolled: userId,
					},
				},
				{ new: true }
			);

			if (!enrolledCourse) {
				return res.status(500).json({
					success: false,
					message: "Course not found!",
				});
			}

			console.log("Enrolled course response: \n", enrolledCourse);

			// find the student and added to couse to their list of enrolled course

			const enrolledStudent = await User.findByIdAndUpdate(
				{ _id: userId },
				{
					$push: {
						courses: courseId,
					},
				},
				{ new: true }
			);
			console.log("Enrolled student response: \n", enrolledCourse);

			// send mail to user for confirmation
			const emailResponse = mailSender(
				enrolledStudent.email,
				"Congratulations from Study Notion",
				"Congratulations, You are onboarded into new Study Notion courses"
			);

			console.log("Email sent: \n", emailResponse);

			return res.status(200).json({
				success: true,
				message: "All steps done Student enrolled successfully ",
			});
			//
		} catch (err) {
			console.log(
				"Error in student enrolled or course enrolled process: \n",
				err.message
			);
			return res.status(500).json({
				success: false,
				message: "Error in student enrolled or course enrolled process",
			});
		}
	} else {
		return res.status(400).json({
			success: false,
			message: "Invalid Request!",
		});
	}
};
