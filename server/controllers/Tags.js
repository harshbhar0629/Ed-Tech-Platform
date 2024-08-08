/** @format */

const Tag = require("../models/Tags.js");

// create tag ka handler fn
exports.createTag = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name || !description) {
			return res.status(400).json({
				success: false,
				message: "All fields are required!",
			});
		}

		// create entry in db
		const tagDetails = await Tag.create({
			name,
			description,
		});

		console.log("Tag details");
		return res.status(200).json({
			success: true,
			message: "Tegs created successfully",
		});

		//
	} catch (err) {
		console.log("Error in creation in Tags");
		console.log(err.message);
		return res.status(500).json({
			success: false,
			message: "Tags not added, Please try again!",
		});
	}
};

exports.showAllTags = async (req, res) => {
	try {
		const allTags = await Tag.find(
			{},
			{
				name: true,
				description: true,
			}
		);

        return res.status(200).json({
            success: true,
            message: "All tags returned successfully!",
            allTags,
        });
		//
	} catch (err) {
		console.log("Error in showing tags");
		console.log(err.message);
		return res.status(500).json({
			success: false,
			message: "No tags available, Please try again!",
		});
	}
};
