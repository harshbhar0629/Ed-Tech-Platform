/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingAndReviewSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	review: {
		type: String,
		required: true,
		trim: true,
	},
});

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);
