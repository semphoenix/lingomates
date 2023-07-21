import React from "react";
import "./Hero.css";
import background1 from "../images/img1.jpeg"
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { makeStyles } from '@mui/styles'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Grid, Avatar } from '@mui/material';
import Button from '@mui/material/Button' 

import AppBar from '@mui/material/AppBar';


const languageData = [
    { name: 'English', flagSrc: 'src/assets/english.png' },
    { name: 'Spanish', flagSrc: 'src/assets/spanish.png' },
    { name: 'French', flagSrc: 'src/assets/french.png' },
    { name: 'Italian', flagSrc: 'src/assets/italian.png' },
    { name: 'Swedish', flagSrc: 'src/assets/swedish.png' },
    { name: 'German', flagSrc: 'src/assets/german.png' },
  ];


export default function Hero(){

    const useStyles = makeStyles({
        root: {
            minHeight: '100vh',
            backgroundImage: `url(${"src/components/images/countryImg2.jpg"})`
        },
        
    })    

    return(
        <div className="hero">
        <div className="background-img">
            <div className="white-back">
            {/* <Link to = "/">
            <img className='logo' src='src/assets/snail.png'/>
            </Link> */}
            <h1 className="title" style={{ elevation: 3 }}>LINGOMATES</h1>
            <p className="para">Connect. Chat. Learn</p>
            <Link to = "/register">
            <Button variant="contained">Get Started</Button>
            </Link>
            <Link to = "/login">
            <Button variant="contained">Already have an account?</Button>
            </Link>
            </div>
        </div>
        <div className="about-us" style={{ marginTop: "-2rem"}}>
      <h2>Who Are We?</h2>
      <p>
        At Lingomates, we are a team of language enthusiasts who believe in the
        power of human connection and social learning. Our mission is to make
        language learning fun, interactive, and sociable for everyone. We
        understand that learning a new language can be challenging, and that's
        why we've created this platform to help language learners connect with
        each other to practice and improve their language skills.
      </p>
      <h2>What Is the Point?</h2>
      <p>
        The point of Lingomates is to provide a free and sociable platform for
        language learners from all backgrounds to come together and learn from
        each other. We want to break down barriers and make language learning a
        positive and enjoyable experience. Whether you're a language enthusiast,
        a beginner, or just looking for a casual way to practice, Lingomates is
        here to help you achieve your language goals.
      </p>
      <h2>Why Choose Lingomates?</h2>
      <p>
        Unlike other language learning apps, Lingomates focuses on the power of
        human interaction. Our platform allows you to connect with other users
        through chat rooms, so you can practice your language
        skills in a real-life setting. You can also find language partners who
        are at a similar proficiency level, allowing you to learn and grow
        together. We also offer a text translator feature, so you can
        communicate with users who speak a different language. Lingomates is
        flexible and adaptable to your language journey, providing a supportive
        and engaging community for all language learners.
      </p>
    </div>
    <div className="cardContainer" style={{ marginTop: "-1rem"}}>
        <div className="facts">
          <Card sx={{ maxWidth: 345, backgroundColor: "tan" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="src/assets/foreignlang.jpeg"
                alt="Language Learning"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" fontFamily={'Nunito'}>
                  Practicing Speaking Increases Fluency
                </Typography>
                <Typography variant="body2" color="text.secondary" fontFamily={'Nunito'}>
                  Research has shown that active speaking and regular practice in a language play a crucial role in achieving fluency. Engaging in conversations, whether with native speakers or other language learners, helps reinforce vocabulary, improve pronunciation, and develop natural language usage. Regular speaking practice can significantly boost language proficiency and make learners more confident in using the language in various contexts.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div className="fact2">
          <Card sx={{ maxWidth: 345,  backgroundColor: "tan" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="src/assets/happylang.jpeg"
                alt="Language Learners Interaction"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" fontFamily={'Nunito'}>
                  Multilingualism and Brain Health
                </Typography>
                <Typography variant="body2" color="text.secondary" fontFamily={'Nunito'}>
                  Besides the obvious benefits of communication and cultural understanding, being multilingual can have positive effects on brain health. Studies have suggested that speaking multiple languages may delay the onset of dementia and Alzheimer's disease in older adults. The constant exercise of the brain while switching between languages seems to contribute to improved cognitive function, memory, and problem-solving abilities, offering long-term benefits beyond language skills.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <Grid container spacing={2} justifyContent="center" alignItems="center" backgroundColor = "tan">
      {languageData.map((language, index) => (
        <Grid item key={index}>
          <Avatar alt={language.name} src={language.flagSrc} sx={{ width: 50, height: 50 }} />
          <p>{language.name}</p>
        </Grid>
      ))}
    </Grid>
      </div>
        </div>
    )
}