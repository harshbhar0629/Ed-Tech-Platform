/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
	courseName: {
		type: String,
		trim: true,
		required: true,
	},
	courseDescription: {
		type: String,
		trim: true,
		required: true,
	},
	instructor: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	whatYouWillLearn: {
		type: String,
	},
	courseContent: [
		{
			type: Schema.Types.ObjectId,
			ref: "Section",
		},
	],
	ratingAndReview: {
		type: Schema.Types.ObjectId,
		ref: "RatingAndReview",
	},
	price: {
		type: Number,
	},
	thumbnail: {
		type: String,
	},
	tag: {
		type: Schema.Types.ObjectId,
		ref: "Tag",
	},
	studentEnrolled: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

module.exports = mongoose.model("Course", courseSchema);
