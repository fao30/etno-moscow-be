const { Tokens } = require("../models");

class TokenService {
	static async createToken({ token }) {
		return await Tokens.create({ jwtToken: token });
	}

	static async findTokenByToken(token) {
		return await Tokens.findOne({
			where: { jwtToken: token },
		});
	}
}

module.exports = TokenService;
