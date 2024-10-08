/** @format */

import React from "react";
import "../App.css";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import MovingCode from "../components/core/HomePage/MovingCode";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";

const Home = () => {
	return (
		<div>
			{/* Section-1 */}
			<div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
				{/* Become a Instructor Button */}
				<Link to={"/signup"}>
					<div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
						<div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
							<p>Become an Instructor</p>
							<HiArrowNarrowRight />
						</div>
					</div>
				</Link>

				{/* Heading */}
				<div className="text-center text-4xl font-semibold">
					Empower Your Future with
					<HighlightText text={"Coding Skills"} />
				</div>

				{/* Sub Heading */}
				<div className="-mt-3 w-[85%] text-center text-lg font-bold text-richblack-300">
					With our online coding courses, you can learn at your own pace, from
					anywhere in the world, and get access to a wealth of resources,
					including hands-on projects, quizzes, and personalized feedback from
					instructors.
				</div>

				{/* CTA Buttons */}
				<div className="mt-8 flex flex-row gap-7">
					<CTAButton
						active={true}
						linkto={"/signup"}>
						Learn More
					</CTAButton>
					<CTAButton
						active={false}
						linkto={"/login"}>
						Book a Demo
					</CTAButton>
				</div>

				{/* Video */}
				<div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200 w-[88%]">
					<video
						className="shadow-[20px_20px_rgba(255,255,255)]"
						muted
						loop
						autoPlay>
						<source
							src={Banner}
							type="video/mp4"
						/>
					</video>
				</div>

				{/* moving code-section-1 */}
				<div className="w-[88%] sm:mr-[-120px]">
					<MovingCode
						position={"lg:flex-row"}
						heading={
							<div className="text-4xl font-semibold">
								Unlock your
								<HighlightText text={"Coding potential"} /> with our online
								courses.
							</div>
						}
						subHeading={
							"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
						}
						ctaBtn1={{
							btnText: "Try it Yourself",
							link: "/signup",
							active: true,
						}}
						ctaBtn2={{
							btnText: "Learn More",
							link: "/signup",
							active: false,
						}}
						codeColor={"text-yellow-25"}
						code={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
						bgGradient={<div className="grad"></div>}></MovingCode>
				</div>

				{/* moving code-section-2 */}
				<div className="relative md:top-10 top-0 sm:ml-[20px]">
					<MovingCode
						position={"lg:flex-row-reverse"}
						heading={
							<div className="text-2xl lg:text-4xl sm:w-full font-semibold ">
								Start
								<HighlightText text={"Coding in seconds"} />
							</div>
						}
						subHeading={
							"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
						}
						ctaBtn1={{
							btnText: "Continue Lesson",
							link: "/signup",
							active: true,
						}}
						ctaBtn2={{
							btnText: "Learn More",
							link: "/signup",
							active: false,
						}}
						codeColor={"text-caribbeangreen-25"}
						code={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
						bgGradient={<div className="grad2 absolute"></div>}
					/>
				</div>
				{/* Explore More Section */}
				<ExploreMore />
			</div>

			{/* Section-2 */}
			<div className="bg-pure-greys-5 text-richblack-700 ">
				<div className="homepage_bg h-[340px]">
					{/* explore course category */}

					<div className="mx-auto flex w-11/12  max-w-maxContent flex-col items-center justify-between gap-8 ">
						<div className="lg:h-[150px] sm:h-[100px]"></div>
						<div className="flex flex-row gap-7  text-white lg:mt-32 ">
							<CTAButton
								active={true}
								linkto={"/signup"}>
								<div className="flex items-center gap-2">
									Explore Full Catalog
									<HiArrowNarrowRight />
								</div>
							</CTAButton>

							<CTAButton
								active={false}
								linkto={"/login"}>
								Learn More
							</CTAButton>
						</div>
					</div>
				</div>

				<div className="mx-auto flex w-11/12 max-w-maxContent mb-10 flex-col items-center justify-between gap-8 ">
					{/* Job that is in Demand - Section 1 */}
					<div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0 w-[90%]">
						<div className="text-4xl font-semibold lg:w-[45%] ">
							Get the skills you need for a{" "}
							<HighlightText text={"Job that is in demand."} />
						</div>
						<div className="flex flex-col items-start gap-10 lg:w-[40%]">
							<div className="text-[16px] font-bold">
								The modern TechTreasure-Hub.com is the dictates its own terms.
								Today, to be a competitive specialist requires more than
								professional skills.
							</div>
							<CTAButton
								active={true}
								linkto={"/signup"}>
								<div className="">Learn More</div>
							</CTAButton>
						</div>
					</div>
				</div>

				<TimelineSection />
				<LearningLanguageSection />
			</div>

			{/* Section-3 */}
			<div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
				{/* Instructor Section */}
				<InstructorSection />

				{/* Review heading */}
				<h2 className="text-center text-4xl font-semibold mt-8">
					Review from other Learners
					<div className="mt-[20px] text-2xl bg-richblack-800 mx-auto px-5 rounded-md py-4 w-[200px]">
						Pending...
					</div>
				</h2>
			</div>

			{/* Footer section */}
			<Footer />
		</div>
	);
};

export default Home;
