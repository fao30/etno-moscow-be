const { OK } = require("../constants/statusCode");
const AppError = require("../helpers/AppError");
const sendMessage = require("../utils/sendMessage");
const validator = require("validator");

class PartnershipController {
	static async partnership(req, res) {
		const { fullName, institution, position, subject, email, phone, message } =
			req.body;

		if (!email || !validator.isEmail(email)) {
			throw new AppError(400, "Email is not valid", 400);
		}

		const html = `<p>Hi my name is ${fullName} from ${institution} as ${position} </p>
        </br>
        <p>Message:
        </br>
        ${message}
        </p>
        </br>
        <p>Phone: ${phone}<p/>
        `;

		sendMessage(email, subject, html, "Email sent");

		return res.status(OK).json({ message: "Email sent successfully" });
	}
}

module.exports = PartnershipController;
