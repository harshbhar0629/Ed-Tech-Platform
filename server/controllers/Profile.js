/** @format */

const Profile = require("../models/Profile.js");
const User = require("../models/User.js");
const Course = require("../models/Course.js");
const CourseProgress = require("../models/CourseProgress.js");

// update profile
exports.updateProfile = async (req, res) => {
	try {
		// fetch all data
		const {
			dateOfBirth = "",
			gender = "",
			about = "",
			contactNumber = "",
		} = req.body;

		const id = req.user.id;
		// validate data - its your choice because above property are optionals

		// find user bcoz we have user id and user id contains profile id
		const userDetails = await User.findById(id);

		// fetch profile id
		const profileId = userDetails.additionalDetails;
		const profile = await Profile.findById(profileId);

		// update Profile
		if (dateOfBirth !== "") {
			profile.dateOfBirth = dateOfBirth;
		}
		if (gender !== "") {
			profile.gender = gender;
		}
		if (contactNumber !== "") {
			profile.contactNumber = contactNumber;
		}
		if (about !== "") {
			profile.about = about;
		}

		// save in db
		await profile.save();

		// return response
		return res.status(200).json({
			success: false,
			message: "Your Profile updated successfully!",
		});

		//
	} catch (err) {
		console.log("Error in updation in profile");
		console.log(err.message);
		return res.status(500).json({
			success: false,
			message: "Failure of update profile",
		});
	}
};

// CRON job - is a linux command that schedules task to run any specific or regular intervals in future.
exports.deleteProfile = async (req, res) => {
	try {
		// fetch user id
		const id = req.user.id;
		const userDetails = await User.findById(id);

		// validate id
		if (!userDetails) {
			return res.status(404).json({
				success: false,
				message: "User not found!",
			});
		}

		// profile delete
		await Profile.findByIdAndDelete({
			_id: new mongoose.Types.ObjectId(user.additionalDetails),
		});

		// remove this user from enrolled course
		for (const courseId of userDetails.courses) {
			await Course.findByIdAndUpdate(
				courseId,
				{ $pull: { studentsEnroled: id } },
				{ new: true }
			);
		}

		// delete user
		await User.findByIdAndDelete({ _id: id });

		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
		await CourseProgress.deleteMany({ userId: id });
		//
	} catch (err) {
		console.log("Error in deletion of profile");
		console.log(err.message);
		return res.status(500).json({
			success: false,
			message: "User cannot be deleted!",
		});
	}
};

exports.getAllUserDetails = async (req, res) => {
	try {
		// fetch user id
		const id = req.user.id;

		// validation and get user details
		const userDetails = await User.findById(id).populate("additionalDetails");

		if (!userDetails) {
			return res.status(404).json({
				success: false,
				message: "User not found!",
			});
		}

		return res.status(200).json({
			success: true,
			message: "User data fetch successfully!",
			userDetails,
		});
		//
	} catch (err) {
		console.log("Error in fetching user details");
		console.log(err.message);
		return res.status(500).json({
			success: false,
			message: "Error in fetching user details!",
		});
	}
};
