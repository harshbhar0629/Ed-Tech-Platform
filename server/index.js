/** @format */

// main execution
const express = require("express");
const app = express();
require("dotenv").config();

const userRoutes = require("./routes/User.js");
const profileRoutes = require("./routes/Profile.js");
const paymentRoutes = require("./routes/Payment.js");
const courseRoutes = require("./routes/Course.js");

// database
const database = require("./config/database.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary.js");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 3000;

// connect database
database.dbConnect();

// adding middleware for parsing data
app.use(express.json());
app.use(cookieParser);
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "http://localhost: 3000",
		credentials: true,
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: __dirname + "/temp",
	})
);

// cloudinary connection
cloudinaryConnect();

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);

// def routes
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your Server is working",
	});
});

app.listen(PORT, () => {
	console.log("App is running at port: 3000");
});
