import React from 'react';
import "./Header.css"
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import { Slide } from "react-awesome-reveal";
import { useState, useEffect } from 'react';


export default function Header() {
  const [open, setOpen] = useState(false)
  // const [scrollY, setScrollY] = useState(0)
  const [navBarColor, setNavBarColor] = useState(false)

  const handleToggle = () => {
      setOpen(!open)
  }

  const listenScrollEvent = () => {
      window.scrollY > 10 ? setNavBarColor(true) : setNavBarColor(false);
  };

  useEffect(() => {
      window.addEventListener("scroll", listenScrollEvent);
      return () => {
          window.removeEventListener("scroll", listenScrollEvent);
      };
  }, []);

  return (
    <header className="w-full h-auto bg-transparent overflow-x-hidden fixed z-50 top-0 left-0">
      <Slide direction="down">
    
          <nav className={`w-full md:h-24 h-20 ${navBarColor ? "bg-white" : "bg-transparent"} lg:px-24 md:px-12 px-8 flex justify-between items-center`}>
            <h1 className='poppin'>Lingo<span className='mates'>mates🐒</span></h1>
            <div class="lg:flex hidden items-center gap-20">
            <ul class="flex items-center justify-center gap-6">
                  <li className="w-full"><button type="button" className="before:bottom-0 border-b-2 border-transparent hover:border-gray-950 py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-color2 before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base">Login</button></li>
                  <li className="w-full"><button type="button" className="border-2 border-gray-950 before:top-0 py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-color2 before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base">Signup</button></li>
                  <li className="text-gray-950">
            {/* <select class="border-none font-light text-base outline-none bg-transparent">
              <option value="EN">EN</option>
              <option value="ITA">ITA</option>
              <option value="FRA">FRA</option>
      </select> */}
   </li>
</ul>
</div>
</nav>
</Slide>
</header>
    );
  }