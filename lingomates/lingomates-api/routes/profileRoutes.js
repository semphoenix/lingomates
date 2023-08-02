const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const db = require("../db");

router.get("/:id",async function (request, response, next) {
    const userIdRequested = request.params.id;
    console.log("requested ID for profile is: ", userIdRequested);
    try {
      const userData = await Profile.user_Language_prof(userIdRequested);
      return response.status(200).json({ userData: userData });
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
