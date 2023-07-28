import React from "react";
import { useEffect } from "react";
import "./Hero.css";
import background1 from "../images/img1.jpeg";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Grid, Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";

const languageData = [
  { name: "English", flagSrc: "src/assets/english.png" },
  { name: "Spanish", flagSrc: "src/assets/spanish.png" },
  { name: "French", flagSrc: "src/assets/french.png" },
  { name: "Italian", flagSrc: "src/assets/italian.png" },
  { name: "Swedish", flagSrc: "src/assets/swedish.png" },
  { name: "German", flagSrc: "src/assets/german.png" },
];

export default function Hero() {
  return (
  <div className="hero">
    <div className="opacity">
      <div className="background-img">
        <div className="white-back">
          <h1 className="title">Lingo<span className="mates">mates👋🏽</span></h1>
          <p className="para">A fun and sociable way to learn a new language.</p>
          <Link to="/register">
            <button className="myButton">Get Started</button>
          </Link>
          <Link to="/login">
            <button className="myButton">Already have an account?</button>
          </Link>
        </div>
      </div>
      </div>

      <div className="about-us">
        <div className="about-us-left">
          <h2>Who Are We?💭</h2>
          <p>
            At Lingomates, we are a team of language enthusiasts who believe
            in the power of human connection and social learning. Our mission
            is to make language learning fun, interactive, and sociable for
            everyone. We understand that learning a new language can be
            challenging, and that's why we've created this platform to help
            language learners connect with each other to practice and improve
            their language skills.
          </p>
        </div>
        <div className="about-us-right">
          <Card sx={{ maxWidth: 400 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image= "https://languagelifeschool.com/wp-content/uploads/2021/11/ll1_compressed.jpg"
                alt="About Us"
              />
            </CardActionArea>
          </Card>
        </div>
      </div>

      <div className="about-us">
        <div className="about-us-left">
          <Card sx={{ maxWidth: 400 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image="https://www.altalang.com/wp-content/uploads/2022/10/portrait-of-enthusiastic-business-people-in-circle-picture-id513439341.jpg"                alt="What's the Point"
              />
            </CardActionArea>
          </Card>
        </div>
        <div className="about-us-right">
          <h2>What Is the Point?☝🏽</h2>
          <p>
            Many language learning apps like Duolingo are excellent for
            individual learning, but they lack social interaction. This can be
            demotivating for users, and they may feel like they are not
            accomplishing their language learning goals. At Lingomates, we
            focus on the power of human interaction. Our platform allows you
            to connect with other users through chat rooms, so you can
            practice your language skills in a real-life setting. You can also
            find language partners who are at a similar proficiency level,
            allowing you to learn and grow together. We believe that social
            interaction is a key component of language learning success, and
            our platform is designed to provide a supportive and engaging
            community for all language learners.
          </p>
        </div>
      </div>

      <div className="about-us">
        <div className="about-us-left">
          <h2>Why Choose Lingomates?🙈</h2>
          <p>
            Unlike other language learning apps, Lingomates focuses on the
            power of human interaction. Our platform allows you to connect
            with other users through chat rooms, so you can practice your
            language skills in a real-life setting. You can also find language
            partners who are at a similar proficiency level, allowing you to
            learn and grow together. We also offer a text translator feature,
            so you can communicate with users who speak a different language.
            Lingomates is flexible and adaptable to your language journey,
            providing a supportive and engaging community for all language
            learners.
          </p>
        </div>
        <div className="about-us-right">
          <Card sx={{ maxWidth: 400 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image="https://st2.depositphotos.com/1809585/48354/i/450/depositphotos_483547150-stock-photo-happy-woman-smiling-checking-smart.jpg"
                alt="Why Choose Us"
              />
            </CardActionArea>
          </Card>
        </div>
      </div>

      <div className="cardContainer">
        {/* <h2>Did you know...</h2> */}
        <div className="facts">
          <Card sx={{ maxWidth: 345, backgroundColor: "white" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="src/assets/foreignlang.jpeg"
                alt="Language Learning"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" fontFamily={'Poppins'}>
                  Practicing Speaking Increases Fluency
                </Typography>
                <Typography variant="body2" color="text.secondary" fontFamily={'Poppins'}>
                  Research has shown that active speaking and regular practice in a language play a crucial role in achieving fluency. Engaging in conversations, whether with native speakers or other language learners, helps reinforce vocabulary, improve pronunciation, and develop natural language usage. Regular speaking practice can significantly boost language proficiency and make learners more confident in using the language in various contexts.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div className="fact2">
          <Card sx={{ maxWidth: 345,  backgroundColor: "white" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="src/assets/happylang.jpeg"
                alt="Language Learners Interaction"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" fontFamily={'Poppins'}>
                  Multilingualism and Brain Health
                </Typography>
                <Typography variant="body2" color="text.secondary" fontFamily={'Poppins'}>
                  Besides the obvious benefits of communication and cultural understanding, being multilingual can have positive effects on brain health. Studies have suggested that speaking multiple languages may delay the onset of dementia and Alzheimer's disease in older adults. The constant exercise of the brain while switching between languages seems to contribute to improved cognitive function, memory, and problem-solving abilities, offering long-term benefits beyond language skills.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          backgroundColor="white"
        >
          {languageData.map((language, index) => (
            <Grid item key={index}>
              <Avatar
                alt={language.name}
                src={language.flagSrc}
                sx={{ width: 50, height: 50 }}
              />
              <p className="flag-font">{language.name}</p>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
