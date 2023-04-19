const AppError = require("../helpers/AppError");
const ExtractToken = require("../helpers/extractToken");
const TokenService = require("../service/tokenService");
const RegisterService = require("../service/userService");
const sendMessage = require("../utils/sendMessage");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { OK } = require("../constants/statusCode");
require("dotenv").config();

class PasswordController {
	static async generateToken(req, res) {
		const { email } = req.body;
		const user = await RegisterService.findUserByEmail(email);
		if (!user) {
			throw new AppError(404, "Email not registered", 404);
		}
		const payload = {
			id: user.id,
			email,
		};
		const token = jwt.sign(payload, process.env.FORGET_PASSWORD_TOKEN, {
			expiresIn: "20m",
		});

		const tokenSave = await TokenService.createToken({ token });
		if (!tokenSave) {
			throw new AppError(400, "Cannot create token", 400);
		}

		const link = `${process.env.FORGOT_PASSWORD_URL}/api/password/${token}`;

		const html = `
            <h1>Забыть пароль</h1>
            <br/>
            <p>Нажмите <a href=${link}>здесь,</a> чтобы сбросить пароль</p>
        `;

		sendMessage(email, "Забыть пароль", html, "message send successfully");

		return res.status(OK).json({ message: "Email send", token });
	}

	static async verifyToken(req, res) {
		const { token } = req.params;
		const tokenData = await TokenService.findTokenByToken(token);
		if (!tokenData || tokenData.isUsed) {
			throw new AppError(400, "Token invalid", 400);
		}

		const body = jwt.verify(token, process.env.FORGET_PASSWORD_TOKEN);

		console.log(body);

		const user = await RegisterService.findUserByEmail(body.email);

		if (!user) {
			throw new AppError(404, "User not found", 404);
		}

		const { password } = req.body;
		const hashPassword = await bcrypt.hash(password, 10);

		// change password
		user.password = hashPassword;
		await user.save();
		// change isUsed
		tokenData.isUsed = true;
		await tokenData.save();

		return res.json({ message: "Password reset" });
	}
}

module.exports = PasswordController;
