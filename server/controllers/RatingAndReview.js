/** @format */

const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// create rating
exports.createRating = async (req, res) => {
	try {
		// fetch user id
		const userId = req.user.id;

		// fetch data from req ki body
		const { rating, review, courseId } = req.body;

		// check is user enrolled in course or not
		const courseDetails = await Course.find({
			_id: courseId,
			studentsEnrolled: {
				$elemMatch: {
					$eq: userId,
				},
			},
		});

		if (!courseDetails) {
			return res.status(404).json({
				success: false,
				message: "Student not enrolled in this course",
			});
		}

		// check phle review dedia y nhi
		const alreadyReviewed = await RatingAndReview.findOne({
			user: userId,
			course: courseId,
		});

		if (alreadyReviewed) {
			return res.status(403).json({
				success: false,
				message: "Course is already reviewed by user!",
			});
		}

		// create rating and review
		const ratingReview = await RatingAndReview.create({
			user: userId,
			rating: rating,
			review: review,
			course: courseId,
		});

		// update this review in course
		const updatedCourseDetails = await Course.findByIdAndUpdate(
			{ _id: courseId },
			{
				ratingAndReviews: {
					$push: {
						ratingAndReviews: ratingReview._id,
					},
				},
			},
			{ new: true }
		);

		// all seens done now return
		return res.status(200).json({
			success: true,
			message: "Your rating and review added successfully!",
			ratingReview,
		});
		//
	} catch (err) {
		console.log("Error in rating and review!");
		console.log(err.message);
		return res.status(500).json({
			success: false,
			message: "Error occurred, Rating and review not added, Please try again!",
		});
	}
};

// get Avg rating

exports.getAverageRating = async (req, res) => {
	try {
		// get course id
		const courseId = req.body.courseId;

		// calculate avg rating
		const result = await RatingAndReview.aggregate([
			{
				$match: {
					course: new mongoose.Types.ObjectId(courseId),
				},
			},
			{
				$group: {
					_id: null,
					averageRating: {
						$avg: "$rating",
					},
				},
			},
		]);

		// if rating review exist then
		if (result.length > 0) {
			return res.status(200).json({
				success: true,
				message: "Your average rating!",
				averageRating: result[0].averageRating,
			});
		}

		// if no rating review exist
		return res.status(200).json({
			success: true,
			message: "Average rating, No Rating Available for this course!",
			averageRating: 0,
		});

		//
	} catch (err) {
		console.log("Error in avg rating");
		console.log(err.message);
		return res.status(500).json({
			success: false,
			message: "Error occurred in finding rating!",
		});
	}
};

// get all rating
exports.getAllRating = async (req, res) => {
	try {
		const allReviews = await RatingAndReview.find({})
			.sort({ rating: "desc" })
			.populate({
				path: "user",
				select: "firstName lastName email image",
			})
			.populate({
				path: "course",
				select: "courseName",
			})
			.exec();

		// return
		return res.status(200).json({
			success: true,
			message: "All reviews fetch successfully!",
			allReviews,
		});

		//
	} catch (err) {
		console.log("Error in get all rating");
		console.log(err.message);
		return res.status(500).json({
			success: false,
			message: "Error occurred in fetching all rating!",
		});
	}
};
