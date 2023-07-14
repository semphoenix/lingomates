import "./LangPrompt.css"

export default function LangPrompt({languages, setLanguages}) {

    
    const isSelected = (language) => languages.includes(language);
    //handles
    const handleLangClick = (language) => {
        // e.preventDefault();
        // Check if the flag is already selected
        // If selected, remove it from the list; otherwise, add it
        if (isSelected(language)) {
        setLanguages(languages.filter((selectedLang) => selectedLang !== language));
        } else {
        setLanguages([...languages, language]);
        }
        //do the window thing to make it go to the proficiency page! 
    }

    const handleContinue = (e) => {
        e.preventDefault();
        console.log("selected languages are", languages)
        const selectedLanguagesParam = languages.map((language) => encodeURIComponent(language)).join(",");
         window.location.href  = `/profprompt/${selectedLanguagesParam}`;
    }
  
    return (
      <div className="langprompt">
        <h1>Which language(s) do you want to learn?</h1>
        <div className="grid">
        <div>
            <button className ={`langbutton ${isSelected("English") ? "selected" : ""}`} onClick = {() => handleLangClick("English")} type ="submit">
            <img className="flag" src="src/assets/english.png"/>
            <p>English</p>
            </button>
        </div>
        <div>
            <button className ={`langbutton ${isSelected("French") ? "selected" : ""}`} onClick = {() => handleLangClick("French")} type ="submit">
            <img className="flag" src="src/assets/french.png"/>
            <p>French</p>
            </button>
        </div>
        <div>
            <button className ={`langbutton ${isSelected("German") ? "selected" : ""}`} onClick = {() => handleLangClick("German")} type ="submit">
            <img className="flag" src="src/assets/german.png"/>
            <p>German</p>
            </button>
        </div>
        <div>
            <button className ={`langbutton ${isSelected("Italian") ? "selected" : ""}`} onClick = {() => handleLangClick("Italian")} type ="submit">
            <img className="flag" src="src/assets/italian.png"/>
            <p>Italian</p>
            </button>  
        </div>
        <div>
            <button className ={`langbutton ${isSelected("Spanish") ? "selected" : ""}`}  onClick = {() => handleLangClick("Spanish")} type ="submit">
            <img className="flag" src="src/assets/spanish.png"/>
            <p>Spanish</p>
            </button>   
        </div>
        <div>
            <button className ={`langbutton ${isSelected("Swedish") ? "selected" : ""}`} onClick = {() => handleLangClick("Swedish")} type ="submit">
            <img className="flag" src="src/assets/swedish.png"/>
            <p>Swedish</p>
            </button>   
        </div>
        </div>
        <button onClick={handleContinue}>Continue</button>
      </div>
    );
  }