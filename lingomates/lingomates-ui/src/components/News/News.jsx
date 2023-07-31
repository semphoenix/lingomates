import React from "react"
import axios from "axios"
import {useEffect, useState} from "react"
import Navbar from "../Navbar/Navbar"
import "./News.css";
export default function News({selectedDailyLanguage, userId}){

    const [newsArticles, setNewsArticles] = useState([])
    const [loadNum, setLoadNum]  = useState(1) // manages page data
    const [displayedArticles, setDisplayArticles] = useState([])
    const [dailyNews, setDailyNews] = useState("")

    let apiKey = "a4a95cd2bef74346ad4624f072866046"; // should be in environment file

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

    useEffect(()=>{
            try{
                axios.get(`https://newsapi.org/v2/top-headlines?country=${countryLanguage}&apiKey=${apiKey}`).then((response)=>{
                    setNewsArticles(response.data.articles)
                    setDisplayArticles(response.data.articles.slice(0, loadNum*10))
                    // setDisplayArticles(newsArticles.slice(0, (loadNum*10)))

                    // console.log("news data articles: ", response.data.articles)
                    // setNewsArticles(response.data.articles)
                    // console.log("news article data: ", newsArticles)         
                })
    
            }catch(error){
                console.error(error)
            }
          
    },[])

    console.log("dailyNews value: ", dailyNews)

    return(
        <>
             <div>
                <Navbar userId={userId}/>
                <div className="daily-news-container">News</div>
                {displayedArticles?.map((articles)=>{
                    return(
                        <ul>
                            <li>{articles.title}</li>
                        </ul>
                    )
                    
                })}
                <button onClick={handleLoadMore}>Load More</button>
            </div>
        </>
    )
}