/** @format */

// Importing necessary modules and packages
const express = require("express");
const app = express();
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payment");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

// Loading environment variables from .env file
require("dotenv").config();

// Setting up port number
const PORT = process.env.PORT || 4000;

// Connecting to database
database.dbConnect();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

let url;
if (process.env.NODE_ENV === "production") {
	url = process.env.productionUrl;
}
else {
	url = process.env.localUrl;
}

console.log("url", url);
app.use(
	cors({
		origin: url,
		credentials: true,
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: __dirname + "/tmp/",
	})
);

// Connecting to cloudinary
cloudinaryConnect();

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

if (
	process.env.TYPE !== "HTTPS" &&
	process.env.TYPE !== "TEST" &&
	process.env.NODE_ENV !== "production"
) {
	// Listening to the server
	app.listen(PORT, () => {
		console.log(`App is listening at ${PORT}`);
	});
}

module.exports = app;
// End of code.
