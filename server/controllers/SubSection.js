/** @format */

const SubSection = require("../models/SubSection.js");
const Section = require("../models/Section.js");
const { uploadImageToCloudinary } = require("../utils/imageUploader.js");
require("dotenv").config();

// create subsection
exports.createSubsection = async (req, res) => {
	try {
		// fetch all-data
		const { sectionId, title, description, timeDuration } = req.body;

		// fetch video
		const video = req.files.video;

		// validation
		if (!sectionId || !title || !description || !timeDuration || !video) {
			return res.status(400).json({
				success: false,
				message: "All fields are required!",
			});
		}

		// upload video to url to get secure_url
		const uploadDetails = await uploadImageToCloudinary(
			video,
			process.env.FOLDER_NAME
		);

		// create subsection
		const subSection = await SubSection.create({
			title: title,
			timeDuration: timeDuration,
			description: description,
			videoUrl: uploadDetails.secure_url,
		});

		// update section with this subsection
		const updatedSection = await Section.findByIdAndUpdate(
			sectionId,
			{
				$push: {
					subSection: subSection._id,
				},
			},
			{ new: true }
		).populate("subSection");

		return res.status(200).json({
			success: false,
			message: "Sub section created successfully!",
			updatedSection,
		});
		//
	} catch (err) {
		console.log("Error in creation of subsection!");
		console.log(err.message);
		return res.status(500).json({
			success: false,
			message: "Internal error while creating a subsection!",
		});
	}
};

exports.updateSubSection = async (req, res) => {
	try {
		// fetch all data
		const { sectionId, subSectionId, title, description } = req.body;
		const subSection = await SubSection.findById(subSectionId);

		// check subsection exist or not
		if (!subSection) {
			return res.status(404).json({
				success: false,
				message: "SubSection not found",
			});
		}

		// update title, description, video..
		if (title !== undefined) {
			subSection.title = title;
		}

		if (description !== undefined) {
			subSection.description = description;
		}
		if (req.files && req.files.video !== undefined) {
			const video = req.files.video;
			const uploadDetails = await uploadImageToCloudinary(
				video,
				process.env.FOLDER_NAME
			);
			subSection.videoUrl = uploadDetails.secure_url;
			subSection.timeDuration = `${uploadDetails.duration}`;
		}
		// save into db
		await subSection.save();

		// find updated section and return it
		const updatedSection = await Section.findById(sectionId).populate(
			"subSection"
		);

		console.log("updated sub-section", updatedSection);

		// return response
		return res.json({
			success: true,
			message: "Sub-Section updated successfully",
			data: updatedSection,
		});
		//
	} catch (error) {
		console.log("Error while updating the subsection: ");
		console.log(error.message);
		return res.status(500).json({
			success: false,
			message: "An error occurred while updating the sub-section",
		});
	}
};

exports.deleteSubSection = async (req, res) => {
	try {
		const { subSectionId, sectionId } = req.body;
		// remove subsection from section
		await Section.findByIdAndUpdate(
			{ _id: sectionId },
			{
				$pull: {
					subSection: subSectionId,
				},
			}
		);
		const subSection = await SubSection.findByIdAndDelete({
			_id: subSectionId,
		});

		// validation of subsection it exist or not
		if (!subSection) {
			return res.status(404).json({
				success: false,
				message: "SubSection not found",
			});
		}

		// find updated section and return it
		const updatedSection = await Section.findById(sectionId).populate(
			"subSection"
		);

		return res.json({
			success: true,
			message: "SubSection deleted successfully",
			data: updatedSection,
		});
		//
	} catch (error) {
		console.log("Error while deleting the subsection: ");
		console.log(error.message);
		return res.status(500).json({
			success: false,
			message: "An error occurred while deleting the SubSection",
		});
	}
};
