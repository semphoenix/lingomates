const db = require("../db");
const { validateFields } = require("../utils/validate");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class Profile {
  static async user_Language_prof(userIdRequested) {
    console.log("In Profile model");
    console.log(userIdRequested);
    const allUsers = await db.query(`
    SELECT * from users;`);
    const allUserLingua = await db.query(`SELECT * FROM userLingua;`);
    const allLingua = await db.query(`SELECT * FROM lingua;`);
    const result = await db.query(
      `
        SELECT u.first_name, u.id, u.last_name,u.profilePicture, u.email, u.nativeLanguage, l.linguaName, l.countryFlag,
        l.imageUrl, ul.proficiencyLevel, u.username
        FROM users AS u
        INNER JOIN userLingua ul ON u.id = ul.userId
        INNER JOIN lingua l ON ul.linguaId = l.id
        WHERE u.id = $1;`,
      [userIdRequested]
    );
    console.log(allUsers);
    console.log("All User Lingua", allUserLingua);
    console.log("All Lingua", allLingua);
    const userLinguaProf = result.rows;
    return userLinguaProf;
  }
}

module.exports = Profile;
