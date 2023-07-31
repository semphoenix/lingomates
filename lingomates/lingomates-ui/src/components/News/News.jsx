import React from "react"
import axios from "axios"
import {useEffect, useState} from "react"
import Navbar from "../Navbar/Navbar"
import "./News.css";
import {Paper, CardContent, Typography, Avatar, Grid, Button, CardActions}from '@mui/material';
const apiKey = import.meta.env.VITE_NEWS_API; // should be in environment file

export default function News({selectedDailyLanguage, userId, handleLogout, dailyLanguages,setSelectedDailyLanguage}){
// console.log("news.jsx", import.meta.env.VITE_TEST)
    const [newsArticles, setNewsArticles] = useState([])
    const [loadNum, setLoadNum]  = useState(1) // manages page data
    const [displayedArticles, setDisplayArticles] = useState([])
    const [usersLanguages, setUsersLanguages] = useState([])

    // console.log("apiKey value: ", apiKey)

    let countryLanguage = ""; 

    if(selectedDailyLanguage === "1"){
        countryLanguage = "us"
      

    }else if(selectedDailyLanguage === "2"){
        countryLanguage = "fr"
       

    }else if(selectedDailyLanguage === "3"){
        countryLanguage = "de"
      

    }else if(selectedDailyLanguage === "4"){
        countryLanguage = "it"
       

    }else if(selectedDailyLanguage === "5"){
        countryLanguage = "mx"
       

    }else{
        countryLanguage = "se"
      
    }

    const handleLoadMore = () => {
        let newNum = loadNum + 1;
        setLoadNum(newNum);
        setDisplayArticles(newsArticles.slice(0, (newNum*10)))
    }

    const handleLanguageChange =(event) =>{

        let selectedLang = event.target.value
        console.log("selectedLang value: ", selectedLang)
        setSelectedDailyLanguage(selectedLang)
        console.log("selectedDailyLang value: ", selectedDailyLanguage)

    }
    //will run whenever selectedDailyLanguage is updated
    useEffect(()=>{
            try{
                axios.get(`https://newsapi.org/v2/top-headlines?country=${countryLanguage}&apiKey=${apiKey}`).then((response)=>{
                    setNewsArticles(response.data.articles)
                    setDisplayArticles(response.data.articles.slice(0, loadNum*10))
                    // setDisplayArticles(newsArticles.slice(0, (loadNum*10)))

                     console.log("news data articles: ", response.data.articles)
                    // setNewsArticles(response.data.articles)
                    // console.log("news article data: ", newsArticles)         
                })
    
            }catch(error){
                console.error(error)
            }
          
    },[selectedDailyLanguage])

    console.log("users languages: ", dailyLanguages)

    return(
        <>
             <div>
                <Navbar userId={userId} handleLogout={handleLogout} />
                <div className="daily-news-container">News</div>
                <div className="border">-</div>

            <div className="articles-grid">
                {displayedArticles?.map((articles)=>{

                    return(
                        <>
                       
                            <Grid>
                                <Grid item>
                                    <Paper elevation={3} square style={{textAlign: 'center', padding: 20, marginTop: 5}}>
                                        <Typography>{articles.title}</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        
                            
                        {/* <ul>
                            <li>{articles.title}</li>
                        </ul> */}
                        </>
                       
                    )
                    
                })}
            </div>

                <button onClick={handleLoadMore}>Load More</button>

                {/* drop down menu for user to change language to get news articles in different languages */}
                <label>Change Language </label>
                <select onChange={handleLanguageChange}>
                    <option value={null}>Select a language</option>

                    {dailyLanguages?.map((languages)=>(
                        
                        <option key={languages.linguaid} value={languages.linguaid}>{languages.linguaname}</option>
                        
                    ))}

                </select>
            </div>
        </>
    )
}