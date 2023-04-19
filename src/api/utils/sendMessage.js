require("dotenv").config();
const nodemailer = require("nodemailer");

const sendMessage = (to, subject, html, successMessage) => {
	let mailTransporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_NODEMAILER,
			pass: process.env.PASSWORD_NODEMAILER,
		},
	});

	let mailDetails = {
		from: process.env.EMAIL_NODEMAILER,
		to: to,
		subject: subject,
		html: html,
	};

	mailTransporter.sendMail(mailDetails, function (err, data) {
		if (err) {
			return err;
		} else {
			return successMessage;
		}
	});
};

module.exports = sendMessage;
