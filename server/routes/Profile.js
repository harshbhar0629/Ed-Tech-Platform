/** @format */

const express = require("express");
const router = express.Router();
const { auth, isInstructor } = require("../middlewares/auth");
const {
	deleteAccount,
	updateProfile,
	getAllUserDetails,
	updateDisplayPicture,
	getEnrolledCourses,
	instructorDashboard,
} = require("../controllers/profile");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount);

// update profile
router.put("/updateProfile", auth, updateProfile);

// get all user details
router.get("/getUserDetails", auth, getAllUserDetails);

// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

// update profile picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

// get details of instructor dashboard!
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

module.exports = router;
