import "./ProfPrompt.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";


export default function ProfPrompt({ profLevels, setProfLevels, userId }) {

  const { languages } = useParams();
  const selectedLanguages = languages ? languages.split("_") : [];


  const handleProfChange = (language, proficiency) => {
    setProfLevels((prevLevels) => ({
      ...prevLevels,
      [language]: proficiency,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the proficiency levels, e.g., send them to the server or update local state
   
    handleLanguageProfs(userId, profLevels);
    // You can navigate to another page or perform any other actions here
  
    window.location.href = "/community"
  };


const handleLanguageProfs = async (userId, profLevels) => {
  try {
    
    let response = await axios.post('https://lingomatesbackend.onrender.com/userLingua', {userId, profLevels})
    
  } catch (error) {
    console.log(error)
  }
}

return (
  <div className="profprompt">
    <Header/>
    <div className="content">
    <h1 className="question">Select Proficiency Levels</h1>
    <div className="grid">
      {selectedLanguages.map((language) => (
        <div key={language} className="lang-box">
          <div className="lang-info">
          <img className="flag" src={`/public/assets/${language.toLowerCase()}.png`} alt={language} />
          <p className="language-name">{language}</p>
          </div>
          <div className="selectWrapper">
          <select className="selectBox"
            value={profLevels[language] || ''}
            onChange={(e) => handleProfChange(language, e.target.value)}
          >
            <option value="">Select proficiency level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          </div>
        </div>
      ))}
    </div>
    </div>
    <button className="myButton2" onClick={handleSubmit}>Continue</button>
  </div>
);

        }
