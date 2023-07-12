import './Login.css'
import Landing from '../Landing/Landing';
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'


export default function Login() {
    //states
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");


    //handleLogin

    return (
        <div className='login'>
            <Link to = "/">
            <img className='logo' src='src/assets/snail.png'/>
            </Link>
            <h2 className="greeting">Welcome</h2>
            <form>
            <input
            name="email"
            type="email"
            placeholder="Email"
            className="email-field"
            value= {email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input
            name="password"
            type="password"
            placeholder="Password"
            className="password-field"
            value= {password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <button type="submit" className="submit-button">Login</button>
            </form>
            <div className="css-0">New to us? <a className="chakra-link css-c6nly4" href="/register">Sign Up</a></div>
        </div>
    )

    }