/** @format */

import React from "react";

import Footer from "../components/common/Footer";
import ContactDetails from "../components/core/ContactUsPage/ContactDetails";
import ContactForm from "../components/core/ContactUsPage/ContactForm";

const Contact = () => {
	return (
		<div>
			<div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col lg:items-start items-center lg:justify-between  gap-10 text-white lg:flex-row">
				{/* Contact Details */}
				<div className="lg:w-[30%] w-{80%}">
					<ContactDetails />
				</div>

				{/* Contact Form */}
				<div className="lg:w-[60%] md:-[80%] w-[95%]">
					<ContactForm />
				</div>
			</div>
			
			<Footer />
		</div>
	);
};

export default Contact;
