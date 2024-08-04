/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseProgressSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
    },
    completedVideos: [{
        type: Schema.Types.ObjectId,
        ref: "SubSection",
    }]
});

module.exports = mongoose.model("CourseProgress", courseProgressSchema);
