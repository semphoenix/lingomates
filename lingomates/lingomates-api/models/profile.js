const db = require("../db");
const { validateFields } = require("../utils/validate");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class Profile {
  static async user_Language_prof(userIdRequested) {
    const result = await db.query(
      `
        SELECT u.first_name, u.id, u.last_name,u.profilePicture, u.email, u.nativeLanguage, l.linguaName, l.countryFlag, 
        l.imageUrl, ul.proficiencyLevel
        FROM users u
        INNER JOIN userLingua ul ON u.id = ul.userId
        INNER JOIN lingua l ON ul.linguaId = l.id
        WHERE u.id = $1;`,
      [userIdRequested]
    );

    const userLinguaProf = result.rows;
    console.log("the profile of user is ", userLinguaProf);
    return userLinguaProf;
  }
}

module.exports = Profile;
