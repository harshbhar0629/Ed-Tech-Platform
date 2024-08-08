/** @format */

const Course = require("../models/Course.js");
const Tag = require("../models/Tags.js");
const User = require("../models/User.js");
const { uploadImageToCloudinary } = require("../utils/imageUploader.js");

// create course
exports.createCourse = async (req, res) => {
	try {
		// fetch data
		const { courseName, courseDescription, whatYouWillLearn, price, tag } =
			req.body;

		// fetch file
		const thumbnail = req.files.thumbnail;

		// validation
		if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag ||
			!thumbnail
		) {
			return res.status(400).json({
				success: false,
				message: "All fields are required!",
			});
		}

		const userId = req.user.id;
		const instructorDetails = await User.findById(userId);
		console.log("Course controllers, Instructor details: ");
		console.log(instructorDetails);

		if (!instructorDetails) {
			return res.status(404).json({
				success: false,
				message: "Instructor not found!",
			});
		}

		// check given tag is valid or not
		const tagDetails = await Tag.findById(tag);

		// validation for tag
		if (!tagDetails) {
			return res.status(404).json({
				success: false,
				message: "Tags not found!",
			});
		}

		// upload image to cloudinary
		const thumbnailImage = await uploadImageToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);

		// create an entry for new course
		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn,
			price,
			tag: tagDetails._id,
			thumbnail: thumbnailImage.secure_url,
		});

		// add new course to instructor
		await User.findByIdAndUpdate(
			{ _id: instructorDetails._id },
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);

		// update tag schema
		tagDetails.course.push(newCourse._id);
		await tagDetails.save();

		return res.status(200).json({
			success: true,
			message: "Course created successfully!",
			data: newCourse,
		});
		//
	} catch (err) {
		console.log("Error in creation in course");
		console.log(err.message);
		return res.status(500).json({
			success: false,
			message: "Course not created, Please try again!",
		});
	}
};

exports.getAllCourses = async (req, res) => {
	try {
		// const allCourses = await Course.find(
		// 	{},
		// 	{
		// 		courseName: true,
		// 		price: true,
		// 		thumbnail: true,
		// 		instructor: true,
		// 		ratingAndReview: true,
		// 		studentEnrolled: true,
		// 	}
		// )
		// 	.populate("instructor")
		// 	.exec();

		const allCourses = await Course.find({});

		return res.status(200).json({
			success: true,
			message: "Data for all courses fetch successfully",
			data: allCourses,
		});
		//
	} catch (err) {
		console.log("Not able to access all courses!");
		console.log(err.message);
		return res.status(500).json({
			success: false,
			message: "Failure of accessing all Courses",
			error: err.message,
		});
	}
};
