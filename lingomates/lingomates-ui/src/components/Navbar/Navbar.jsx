import React from "react"
import {Link} from "react-router-dom"
import "./Navbar.css"
export default function Navbar(){
    return(
        <div className="navbar-container">
            
                <Link to="/home">
                <button className="navbar-btn">Logo</button>
                </Link>

                <Link to="/community">
                <button>Community</button>
                </Link>
                <Link to="/chats">
                <button>Chats</button>
                </Link>

                <Link to="/feed">
                <button>Feed</button>
                </Link>
                 
        </div>
    )
}