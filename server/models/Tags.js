const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    }
});

module.exports = mongoose.model("Tag", tagSchema);