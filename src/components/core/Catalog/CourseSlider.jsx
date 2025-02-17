/** @format */

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

import CourseCard from "./CourseCard";

const CourseSlider = ({ Courses }) => {
	return (
		<>
			{Courses?.length ? (
				<Swiper
					slidesPerView={1}
					spaceBetween={25}
					loop={true}
					modules={[FreeMode, Pagination]}
					breakpoints={{
						1024: {
							slidesPerView: 3,
						},
					}}
					className="max-h-[30rem]">
					{Courses?.map((course, i) => (
						<SwiperSlide key={i}>
							<CourseCard
								course={course}
								Height={"h-[200px]"}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				<p className="text-xl text-richblack-5">No Course Found</p>
			)}
		</>
	);
};

export default CourseSlider;
