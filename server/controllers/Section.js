/** @format */

const Section = require("../models/Section.js");
const Course = require("../models/Course.js");

exports.createSection = async (req, res) => {
	try {
		// data fetch
		const { sectionaName, courseId } = req.body;
		if (!sectionaName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "All fields are required!",
			});
		}

		// create section
		const newSection = await Section.create({ sectionName });

		// update course with this new section
		const updateCourseDetails = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		);

		return res.status(200).json({
			success: true,
			message: "Section created successfully!",
		});

		//
	} catch (err) {
		console.log("Error in creation of Sub-section: ");
		console.log(err.message);
		return res.status(500).json({
			success: false,
			message: "Unable to create section, Please try again!",
		});
	}
};

exports.updateSection = async (req, res) => {
	try {
		// input data
		const { sectionName, sectionId } = req.body;

		// validation
		if (!sectionId || !sectionName) {
			return res.status(400).json({
				success: false,
				message: "All fields are required!",
			});
		}

		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);

		return res.status(200).json({
			success: false,
			message: "Section updated successfully!",
		});
		//
	} catch (err) {
		console.log("Error in updation of section: ");
		console.log(err.message);
		return res.status(500).json({
			success: false,
			message: "Unable to update section, Please try again!",
		});
	}
};

exports.deleteSection = async (req, res) => {
    try {
        // get id
        const { sectionId } = req.body;
        
        // search section using id and delete
        await Section.findByIdAndDelete(sectionId);

        return res.status(200).json({
            success: true,
            message: "Section deleted successfully!"
        });
		//
	} catch (err) {
		console.log("Error in updation of section: ");
		console.log(err.message);
		return res.status(500).json({
			success: false,
			message: "Unable to update section, Please try again!",
		});
	}
};
