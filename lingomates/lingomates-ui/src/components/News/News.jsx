import React from "react"
import axios from "axios"
import {useEffect, useState} from "react"

export default function News({selectedDailyLanguage}){

    const [newsArticles, setNewsArticles] = useState([])
    let apiKey = "a4a95cd2bef74346ad4624f072866046";
    // let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    //https://newsapi.org/v2/top-headlines?country=us&apiKey=a4a95cd2bef74346ad4624f072866046
    
    let countryLanguage = ""; 

    if(selectedDailyLanguage === "1"){
        countryLanguage = "en"

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

    console.log("what is countryLanguage: ", countryLanguage)

    useEffect(()=>{

        if(selectedDailyLanguage){
            try{
                axios.get(`https://newsapi.org/v2/top-headlines?country=${countryLanguage}&apiKey=${apiKey}`).then((response)=>{
                    console.log("data inside response: ", response.data.articles)
                    setNewsArticles(response.data.articles)
                })
    
            }catch(error){
                console.log(error)
            }
        }
        
    },[])

    console.log("newsArticles data: ", newsArticles)
    return(
        <>
            <div>
                {newsArticles?.map((articles)=>{
                    return(
                        <ul>
                            <li>{articles.title}</li>
                        </ul>
                    )
                    
                })}
            </div>
       
            <div>Welcome: {selectedDailyLanguage}</div>
        </>
        
    )
}