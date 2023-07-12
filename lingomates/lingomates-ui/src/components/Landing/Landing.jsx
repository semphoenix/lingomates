import './Landing.css'
import Login from '../Login/Login'
import {useState} from 'react'
import {Link} from 'react'

export default function Landing () {
    return (
        <div className='landing'>
            <img className='logo' src='src/assets/snail.png'/>
            <h1>Lingomates</h1>
            <Link to = "/login">
            <button className="get-started-btn">Get started</button>
            </Link>
            <Link to = "/register">
            <button className = "login-btn">Already have an account?</button>
            </Link>
        </div>
    )
}