import Login from "../Login/Login";
import Landing from "../Landing/Landing";
import Register from "../Register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import LangPrompt from "../LangPrompt/LangPromp";
import { useState } from "react";
import ProfPrompt from "../ProfPrompt/ProfPrompt";

function App() {
  const [userId, setUserId] = useState();
  const [loginError, setLoginError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [languages, setLanguages] = useState([])
  const [profLevels, setProfLevels] = useState({});


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/langprompt" element={<LangPrompt languages={languages} setLanguages={setLanguages}/>}/>
          <Route path="/profprompt/:languages" element={<ProfPrompt languages={languages} profLevels={profLevels} setProfLevels={setProfLevels}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
