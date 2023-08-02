import React from "react"
import axios from "axios"
import {useEffect, useState} from "react"


export default function Translate() {
    // const [text, setText] = useState('');
    // const [translatedText, setTranslatedText] = useState('');
    // const handleTranslate = async () => {
    //     try {
    //       const apiKey = 'AIzaSyAKtF_T0kYOb7G6sMd_R9BPxPJm5PesNqI';
    //       const targetLanguage = 'en';  //Target code for english
    
    //       const response = await axios.post(
    //         `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
    //         {
    //           q: text,
    //           target: targetLanguage,

    //         }
    //       );
    
    //       if (!response.data || !response.data.data.translations || !response.data.data.translations[0]) {
    //         throw new Error('Translation API failed');
    //       }
    
    //       const translatedText = response.data.data.translations[0].translatedText;
    //       setTranslatedText(translatedText);
    //     } catch (error) {
    //       console.error('Error translating:', error);
    //     }
    //   };
    
  
    // return (
    //   <div>
    //     <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
    //     <div onHover={handleTranslate}>Translate</div>
    //     <div>
    //       <p>Original Text: {text}</p>
    //       <p>Translated Text: {translatedText}</p>
    //     </div>
    //   </div>
    //);
  };
  

