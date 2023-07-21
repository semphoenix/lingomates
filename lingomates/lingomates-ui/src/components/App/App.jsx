import Login from "../Login/Login";
import Landing from "../Landing/Landing";
import Register from "../Register/Register";
import Home from "../Home/Home"
import jwtDecode from "jwt-decode"
import axios from "axios";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import LangPrompt from "../LangPrompt/LangPromp";
import ProfPrompt from "../ProfPrompt/ProfPrompt";
import io from 'socket.io-client'


function App() { 
  const [userId, setUserId] = useState();
  const [loginError, setLoginError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [languages, setLanguages] = useState([])
  const [profLevels, setProfLevels] = useState({});

  
  const sendMessage=()=>{
    socket.emit("send_message",  
    //this only emits data to the backend and the backend will emit that event to the front end using another event we listening to in the front end
    {message: document.getElementById('input_message').value,
  userId: 3 } )
  }


  //use useEffect to see if user has logged in before or not 
  useEffect(()=>{
      const checkLoggedIn = () =>{
        const token = localStorage.getItem("token") //uses key "token" to get token value

        if(token){
          const decodedToken = jwtDecode(token)
          setUserId(decodedToken.userId)

          //check if token has expired and if it hasn't keep user logged in else log them out
          if(decodedToken.exp * 1000 > Date.now()){
              setLoggedIn(true)
          }else{
            console.log("should make a loggout function")
          }
        }
      };
      checkLoggedIn()
  },[])
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  
  return (
    <div>

      {userId}

      <form onSubmit={sendMessage}>
      <input type="text" id="input_message" />
      <input type="submit" />
      </form>
      
     
     
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} /> 
          <Route path="/langprompt" element={<LangPrompt languages={languages} setLanguages={setLanguages}/>}/>
          <Route path="/profprompt/:languages" element={<ProfPrompt languages={languages} profLevels={profLevels} setProfLevels={setProfLevels} userId={userId}/>}/>
          <Route path="/login" element={<Login setUserId={setUserId} setLoggedIn={setLoggedIn} setLoginError={setLoginError}/>} />
          <Route path="/register" element={<Register setUserId={setUserId} setLoggedIn={setLoggedIn} setLoginError={setLoginError} />} />
          <Route path="/home" element={<Home loggedIn={loggedIn}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
