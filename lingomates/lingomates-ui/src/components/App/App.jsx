import Login from "../Login/Login";
import Landing from "../Landing/Landing";
import Register from "../Register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

function App() {
  const [userId, setUserId] = useState();
  const [loginError, setLoginError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
