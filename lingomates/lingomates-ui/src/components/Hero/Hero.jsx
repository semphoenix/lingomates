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
          <h1 className="title">Lingo<span className="mates">mates</span></h1>
          <p className="para">A fun and sociable way to learn a new language.</p>
          <Link to="/register">
            <button className="get-started-btn">Get Started</button>
          </Link>
          <Link to="/login">
            <button className="have-account-btn">Already have an account?</button>
          </Link>
        </div>
      </div>
      </div>

      <div className="about-us1">
        <div className="about-us-left">
          <h1 className="who-description">Who Are We?</h1>
          <p className="who-para-desc">
             Our mission is to make language learning fun, interactive, and sociable for
            everyone. Learning a new language can be
            challenging so that is why we've created this platform to help
            learners connect with each other. 
          </p>
        </div>
        <div className="about-us-right">
          <Card sx={{ minWidth: 500, maxWidth: 500, minHeight: 360,maxHeight: 360, marginLeft:25, marginTop: 5}}>
            <CardActionArea>
              <CardMedia
                component="img"
                // height="200"
                image= "https://languagelifeschool.com/wp-content/uploads/2021/11/ll1_compressed.jpg"
                alt="About Us"
              />
            </CardActionArea>
          </Card>
        </div>
      </div>

      <div className="about-us">
        <div className="about-us-left">
          <Card sx={{ minWidth: 500, maxWidth: 500, minHeight: 330,maxHeight: 330,marginTop:10, marginRight:10}}>
            <CardActionArea>
              <CardMedia
                component="img"
                // height="200"
                image="https://media.istockphoto.com/id/1368965646/photo/multi-ethnic-guys-and-girls-taking-selfie-outdoors-with-backlight-happy-life-style-friendship.jpg?s=612x612&w=0&k=20&c=qYST1TAGoQGV_QnB_vMd4E8jdaQUUo95Sa2JaKSl_-4="                alt="What's the Point"
              />
            </CardActionArea>
          </Card>
        </div>
        <div className="whats-the-pt-contianer">
          <h1 className="point-of-webapp">What Is the Point?</h1>
          <p className="point-of-webapp-description">
            At Lingomates, we
            focus on the power of human interaction. Our platform allows you
            to connect with other users through chat rooms. You can also
            find language partners who are at a similar proficiency level. We believe that social
            interaction is a key component of language learning success.
          </p>
        </div>
      </div>

      <div className="about-us1">
        <div className="about-us-left">
          <h1 className="choose-us">Why Choose Lingomates?</h1>
          <p className="choose-us-description">
            Unlike other language learning apps, Lingomates focuses on the
            power of human interaction. Our platform allows you
            to connect with other users through chat rooms with a built in translator
            so you can communicate with anyone.
            Lingomates is flexible and adaptable to your language journey, and
            provides a supportive and engaging community for all language
            learners.
          </p>
        </div>
        <div className="about-us-right">
          <Card sx={{ minWidth: 500, maxWidth: 500, minHeight: 330,maxHeight: 330,marginTop:20, marginLeft:25}}>
            <CardActionArea>
              <CardMedia
                component="img"
                // height="200"
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
          <Card sx={{ maxWidth: 400, backgroundColor: "brown" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="src/assets/foreignlang.jpeg"
                alt="Language Learning"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" fontFamily={'Poppins'}  color={"white"} style={{textAlign:"center"}}>
                  Practicing Speaking Increases Fluency
                </Typography>
                <Typography variant="body2" color="white" fontFamily={'Poppins'} style={{textAlign:"center", fontSize:18}}>
                  Research has shown that active speaking and regular practice in a language play a crucial role in achieving fluency. 
                  Engaging in conversations helps reinforce vocabulary, improve pronunciation, and develop natural language usage.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div className="fact2">
          <Card sx={{ maxWidth: 400, minHeight: 450,  backgroundColor: "brown"}}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="src/assets/happylang.jpeg"
                alt="Language Learners Interaction"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" fontFamily={'Poppins'} color={"white"} style={{textAlign:'center'}}>
                  Multilingualism and Brain Health
                </Typography>
                <Typography variant="body2" color="white" fontFamily={'Poppins'} style={{textAlign:'center', fontSize:18}}>
                 Being multilingual can have positive effects on brain health. Studies have suggested that speaking multiple languages may delay the onset of dementia and Alzheimer's disease in older adults.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>

      </div>
      <div className="footer">
      <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          backgroundColor="brown"
        >
          {languageData.map((language, index) => (
            <Grid item key={index}>
              <Avatar
                alt={language.name}
                src={language.flagSrc}
                sx={{ width: 70, height: 70 }}
              />
              <p className="flag-font">{language.name}</p>
            </Grid>           
          ))}
        </Grid>
        </div>
    </div>
  );
}
