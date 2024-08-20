/** @format */

import React from "react";
import CTAButton from "./Button";
import HighlightText from "./HighlightText";
import { HiArrowNarrowRight } from "react-icons/hi"; import {TypeAnimation} from "react-type-animation";

const MovingCode = ({
	position,
	heading,
	subHeading,
	ctaBtn1,
	ctaBtn2,
	code,
	bgGradient,
	codeColor,
}) => {
	return (
		<div
			className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}>
			{/* Section-1 */}
			<div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
				{heading}

				{/* Sub heading */}
				<div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
					{subHeading}
				</div>

				{/* Reuse Button component */}
				<div className="flex gap-7 mt-7">
					<CTAButton
						active={ctaBtn1.active}
						linkto={ctaBtn1.link}>
						<div className="flex items-center gap-2">
							{ctaBtn1.btnText}
							<HiArrowNarrowRight />
						</div>
					</CTAButton>
					<CTAButton
						active={ctaBtn2.active}
						linkto={ctaBtn2.link}>
						{ctaBtn2.btnText}
					</CTAButton>
				</div>
			</div>

			{/* section 2 */}
			<div className="h-fit code-border flex flex-row py-3 glass text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
				{bgGradient}
				{/* Indexing */}
				<div className="text-center flex flex-col   w-[10%] select-none text-richblack-400 font-inter font-bold ">
					<p>1</p>
					<p>2</p>
					<p>3</p>
					<p>4</p>
					<p>5</p>
					<p>6</p>
					<p>7</p>
					<p>8</p>
					<p>9</p>
					<p>10</p>
					<p>11</p>
				</div>
				{/* Codes */}
				<div
					className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
					<TypeAnimation
						sequence={[code, 10000, ""]}
						cursor={true}
						repeat={Infinity}
						style={{
							whiteSpace: "pre-line",
							display: "block",
						}}
						omitDeletionAnimation={true}
					/>
				</div>
			</div>
		</div>
	);
};

export default MovingCode;
