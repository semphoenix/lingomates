import './Landing.css'
import Login from '../Login/Login'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@mui/styles'

import Header from '../Header/Header'
import Hero from '../Hero/Hero'



const useStyles = makeStyles({
    // root: {
    //     minHeight: '100vh',
    //     backgroundImage: `url(${"src/components/images/countryImg2.jpg"})`
    // },
    
})

export default function Landing() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {/* <CssBaseline/> */}
            <Header/>
            <Hero/>
        </div>
    )
}