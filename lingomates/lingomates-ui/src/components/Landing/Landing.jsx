import './Landing.css'
import Login from '../Login/Login'
import {useState} from 'react'
import {Link} from 'react-router-dom'

export default function Landing() {
    return (
        <div className='landing'>
            <Link to = "/">
            <img className='logo' src='src/assets/snail.png'/>
            </Link>
            <h1>Lingomates</h1>
            <Link to = "/register">
            <button className="get-started-btn">Get started</button>
            </Link>
            <Link to = "/login">
            <button className = "login-btn">Already have an account?</button>
            </Link>
        </div>
    )
}