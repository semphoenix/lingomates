// import React from "react"
// import axios from "axios"
// import {useEffect, useState} from "react"

// export default function News({selectedDailyLanguage}){

//     const [newsArticles, setNewsArticles] = useState([])
//     const [loadNum, setLoadNum]  = useState(1) // manages page data
//     const [displayedArticles, setDisplayArticles] = useState([])
//     const [articlesLoaded, setArticlesLoaded] = useState(false)

//     let apiKey = "a4a95cd2bef74346ad4624f072866046"; // should be in environment file

//     let countryLanguage = ""; 

//     if(selectedDailyLanguage === "1"){
//         countryLanguage = "us"

//     }else if(selectedDailyLanguage === "2"){
//         countryLanguage = "fr"

//     }else if(selectedDailyLanguage === "3"){
//         countryLanguage = "de"

//     }else if(selectedDailyLanguage === "4"){
//         countryLanguage = "it"

//     }else if(selectedDailyLanguage === "5"){
//         countryLanguage = "mx"

//     }else{
//         countryLanguage = "se"
//     }

//     const handleLoadMore = () => {
//         let newNum = loadNum + 1;
//         setLoadNum(newNum);
//         setDisplayArticles(newsArticles.slice(0, (loadNum*10)))
//     }

//     useEffect(()=>{
//         console.log('called useEffect')

//             try{
//                 console.log("In useEffect function try")
//                 axios.get(`https://newsapi.org/v2/top-headlines?country=${countryLanguage}&apiKey=${apiKey}`).then((response)=>{
//                     console.log("news data articles: ", response.data.articles)
//                     setNewsArticles(response.data.articles)
//                     console.log("news article data: ", newsArticles)
//                     setDisplayArticles(newsArticles.slice(0, (loadNum*10)))
                    
//                 })
    
//             }catch(error){
//                 console.log(error)
//             }
        
//     },[])

  
//    console.log("displayed articles: ", displayedArticles)
//     return(
//         <>
//              <div>
//                 {displayedArticles?.map((articles)=>{
//                     return(
//                         <ul>
//                             <li>{articles.title}</li>
//                         </ul>
//                     )
                    
//                 })}
//                 {loadNum}
//                 <button onClick={handleLoadMore}>Load More</button>
//             </div>
       
//         </>
        
//     )
// }



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
                <button onClick={handleLoadMore}>Load More</button>
            </div>
        </>
    )
}