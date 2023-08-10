import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile({ userId }) {
  const [profileData, setProfileData] = useState([]);
  

  console.log("what is userId: ", userId)
  useEffect(() => {
    if (userId !== undefined) {
      axios
        .get(`https://lingomatesbackend.onrender.com/profile/${userId}`)
        .then((response) => {
          //   console.log("what's in response: ", response.data);
          setProfileData(response.data.userData);
        });
    }
  }, [userId]);
 
  return (
    <div>
      {profileData && profileData.length > 0 ? ( // Check if 'userData' exists and has elements
        <div>
          <div>
          <img src = {profileData[0].profilepicture} width="50px" height="50"></img>
          <h1>
            
            {profileData[0].first_name}{" "}
            {profileData[0].last_name}
          </h1>
          <h2></h2>
          <h2> email: &nbsp;&nbsp; {profileData[0].email}</h2>
          <h2>native language : &nbsp;&nbsp; {profileData[0].nativelanguage} </h2>
          </div>
          <div>
            <h2>other languages</h2>
            {profileData?.map((language, index)=>
            <div>
              <h3> &nbsp; {language.linguaname}</h3>

            </div>
            )}

          </div>
      </div>

      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Profile;
