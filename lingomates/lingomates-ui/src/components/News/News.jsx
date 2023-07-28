import React from "react"
import axios from "axios"
import {useEffect, useState} from "react"

export default function News({selectedDailyLanguage}){

    const [newsArticles, setNewsArticles] = useState([])
    const [loadNum, setLoadNum]  = useState(1) // manages page data
    const [displayedArticles, setDisplayArticles] = useState([])

    let apiKey = "a4a95cd2bef74346ad4624f072866046"; // should be in environment file

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

    const handleLoadMore = () => {
        let newNum = loadNum + 1;
        setLoadNum(newNum);
        setDisplayArticles(newsArticles.slice(0, (loadNum*10)))
        // addNewsArticles(newsArticles);
    }

    const addNewsArticles = (response) => {
        // let articleArray = []
        // for (let i = 0; i < (10*loadNum); i++) {
        //     console.log("in for loop")
        //     articleArray.push(response[i])
        // }
        setDisplayArticles(response.slice(0, (loadNum*10)))
    }

    console.log("displayedArticles: ")
    console.log(displayedArticles)

    useEffect(()=>{
        console.log('called useEffect')

        // if(selectedDailyLanguage){
            try{
                axios.get(`https://newsapi.org/v2/top-headlines?country=${countryLanguage}&apiKey=${apiKey}`).then((response)=>{
                    setNewsArticles(response.data.articles)
                    setDisplayArticles(response.data.articles.slice(0, (loadNum*10)))
                })
    
            }catch(error){
                console.log(error)
            }
        // }
        
    },[])

    return(
        <>
            <div>
                {displayedArticles?.map((articles)=>{
                    return(
                        <ul>
                            <li>{articles.title}</li>
                        </ul>
                    )
                    
                })}
                {loadNum}
                <button onClick={handleLoadMore}>Load More</button>
            </div>
       
        </>
        
    )
}