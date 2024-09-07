/** @format */

import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";

const About = () => {
	return (
		<div className="m-[100px] text-white">
			{/* Section - 1 */}
			<section className="bg-richblack-700">
				<div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
					<header className="mx-auto py-20 md:text-4xl text-2xl font-semibold lg:w-[70%]">
						Driving Innovation in Online Education for a
						<HighlightText text={"Brighter Future"} />
						<p className="mx-auto mt-3 text-center  text-sm md:text-lg font-semibold text-richblack-300 lg:w-[95%]">
							CodeDev.com is passionate about creating a brighter future by
							offering cutting-edge courses, leveraging emerging technologies,
							and nurturing a vibrant learning community.
						</p>
					</header>
					<div className="sm:h-[70px] lg:h-[150px]"></div>
					<div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
						<img
							src={BannerImage1}
							alt=""
						/>
						<img
							src={BannerImage2}
							alt=""
						/>
						<img
							src={BannerImage3}
							alt=""
						/>
					</div>
				</div>
			</section>
		</div>
	);
};

export default About;
