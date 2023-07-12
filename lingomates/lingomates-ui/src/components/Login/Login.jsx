import './Login.css'
import Landing from '../Landing/Landing';
import { useEffect, useState } from 'react'

export default function Login() {
    //states
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");


    //handleLogin

    return (
        <div className='login'>
            <img className='logo' src='src/assets/snail.png'/>
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
        </div>
    )

    }