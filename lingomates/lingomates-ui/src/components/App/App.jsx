import Login from "../Login/Login";
import Landing from "../Landing/Landing";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Chat from "../Chat/Chat";
import jwtDecode from "jwt-decode"
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import LangPrompt from "../LangPrompt/LangPromp";
import ProfPrompt from "../ProfPrompt/ProfPrompt";
import Conversations from "../Conversations/Conversations";
import io from 'socket.io-client'
import Community from "../Community/Community";
import News from "../News/News"
import Translate from "../Translate/Translate";
import Viewprofile from "../Viewprofile/Viewprofile"
import axios from "axios"

function App() { 
  const [userId, setUserId] = useState();
  const [loginError, setLoginError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [languages, setLanguages] = useState([])
  const [profLevels, setProfLevels] = useState({});
  const [dailyLanguages, setDailyLanguages] = useState([])
  const [selectedDailyLanguage, setSelectedDailyLanguage] = useState("")
  const [userData, setUserData] = useState({})
  
 

  const checkLoggedIn = () =>{
    const token = localStorage.getItem("token") //uses key "token" to get token value
    console.log("app.jsx", import.meta.env.VITE_TEST)
    if(token){
      const decodedToken = jwtDecode(token)
      setUserId(decodedToken.userId)

      //check if token has not expired and if it hasn't keep user logged in else log them out
      if(decodedToken.exp * 1000 > Date.now()){
          setLoggedIn(true)
          
      }else{
        handleLogout();
      }
    }
  };

  
 
  //use useEffect to see if user has logged in before or not 
  useEffect(()=>{
      
      checkLoggedIn() 
        if(userId){
          try{
            //gets current user that is logged in based on userId-comes from user id from token
            axios.get(`http://localhost:3001/community/${userId}`).then((response)=>{
                // console.log("what is this: ", response.data.userData[0])
                setUserData(response.data.userData[0])})
          
          }catch{(error)=>{
            console.log(error);
          }}
        }
      
  },[userId])
  
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    window.location.href = "/"
  }
  // console.log("what is selectedDailyLanguage value: ", selectedDailyLanguage)
  // console.log("retrieved user id: ", userId)
  // console.log("Date now data: ", Date.now())
 
  return (
    <div>    


      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Profile userId={userId}/>}/>
          <Route path="/langprompt" element={<LangPrompt languages={languages} setLanguages={setLanguages}/>}/>
          <Route path="/profprompt/:languages" element={<ProfPrompt languages={languages} profLevels={profLevels} setProfLevels={setProfLevels} userId={userId}/>}/>
          <Route path="/login" element={<Login setUserId={setUserId} setLoggedIn={setLoggedIn} setLoginError={setLoginError}/>} />
          <Route path="/register" element={<Register setUserId={setUserId} setLoggedIn={setLoggedIn} setLoginError={setLoginError} />} />
          <Route path="/community" element={<Community loggedIn={loggedIn} userId={userId} dailyLanguages={dailyLanguages} setDailyLanguages={setDailyLanguages} setSelectedDailyLanguage={setSelectedDailyLanguage} userData={userData} handleLogout={handleLogout}/>} />
          <Route path="/feed" element={<News selectedDailyLanguage={selectedDailyLanguage} userId={userId} handleLogout={handleLogout} dailyLanguages={dailyLanguages} setSelectedDailyLanguage={setSelectedDailyLanguage}/>} />
          <Route path="/conversations" element= {<Conversations userId={userId} handleLogout={handleLogout}/>}/>
          <Route path="/translate" element= {<Translate/>}/>

          <Route path="/userProfile/:id" element={<Viewprofile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
