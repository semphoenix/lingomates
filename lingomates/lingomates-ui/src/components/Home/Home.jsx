import react from "react"
import "./Home.css"

export default function Home(){
     const spainImage = new URL("../images/img1.jpeg", import.meta.url)
    return(
        <>
            <div>
              <img src={spainImage}/>
            </div>
          
            <div>Hello</div>
        </>
        
    )
}