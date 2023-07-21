import './Header.css'
import Login from '../Login/Login'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { red } from '@mui/material/colors'


// import SortIcon from '@mui/material/SortIcon';




const useStyles = makeStyles({
    appbar:{
        backgroundColor : "red",
    },
    appbarWrapper:{
        // width: '80%',
        // margin: '0 auto'
    },
    colorText: {
        color: "brown"
    }

})

export default function Landing() { 
    const classes = useStyles();
    //remember to put logo to the let 
    return (
        <div className='header'>
            <AppBar position='sticky' style={{backgroundColor: "tan", fontFamily: 'Nunito'}}>
            {/* // className={classes.appbar} elevation={0} */}
                <Toolbar className={classes.appbarWrapper}>
                <h1>Lingo<span className={classes.colorText}>mates👋🏽</span></h1> 
                <IconButton>
                    {/* <SortIcon/> */}
                </IconButton>
                </Toolbar>
            </AppBar>

        </div>
    )
}