require("dotenv").config();
const validator = require("validator");
const bcrypt = require("bcrypt");
const UserService = require("../service/userService");

class PassportController {
  static async signupUser(req, email, password, done) {
    try {
      const {
        firstName,
        middleName,
        lastName,
        email,
        position,
        phone,
        dateOfBirth,
        studyYear,
        departmentId,
        majorId,
        instituteId,
        universityId,
        educationId,
        locationId,
        photoId,
        studyId,
      } = req.body;

      const errors = [];

      const duplicateEmail = await UserService.findUserByEmail(email);

      if (duplicateEmail !== null) {
        errors.push("Email already registered");
      }

      if (!validator.isEmail(email)) {
        errors.push("Email not valid");
      }

      if (errors.length > 0) {
        return done(errors, null);
      }

      const hashPassword = await bcrypt.hash(password, 10);

      let roleId;
      if (!studyId) {
        roleId = 2;
      } else {
        roleId = 3;
      }

      const user = await UserService.register(
        firstName,
        middleName,
        lastName,
        email,
        hashPassword,
        position,
        phone,
        dateOfBirth,
        studyYear,
        roleId,
        departmentId,
        majorId,
        instituteId,
        universityId,
        educationId,
        locationId,
        photoId,
        studyId
      );

      return done(null, user);
    } catch (err) {
      console.log(err);
      done(err);
    }
  }

  static async loginUser(email, password, done) {
    try {
      const user = await UserService.findUserByEmail(email);

      if (user === null) {
        return done(null, false, { message: "User not found" });
      }

      const validate = await bcrypt.compare(password, user.password);

      if (!validate) {
        return done(null, false, { message: "Wrong password" });
      }

      return done(null, user, { message: "Login successful" });
    } catch (err) {
      console.log(err);
      done(err);
    }
  }

  static async tokenUser(token, done) {
    try {
      return done(null, token.user);
    } catch (err) {
      console.log(err);
      return done(err);
    }
  }
}

module.exports = PassportController;
