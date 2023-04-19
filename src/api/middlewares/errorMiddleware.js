const { INTERNAL_SERVER_ERROR } = require("../constants/statusCode");
const AppError = require("../helpers/AppError");

const errorMiddleware = (error, req, res, next) => {
	console.log(error);

	if (error instanceof AppError) {
		return res.status(error.statusCode).json({
			errorCode: error.errorCode,
			error: { statusCode: error.statusCode, message: error.message },
		});
	}

	return res.status(INTERNAL_SERVER_ERROR).json("Something went wrong");
};

module.exports = errorMiddleware;
