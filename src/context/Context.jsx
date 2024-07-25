import { createContext, useState } from 'react';
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");   // To save the input data
    const [recentPrompt, setRecentPrompt] = useState("");  // After giving prompt it will become recent prompt 
    const [prevPrompts, setPrevPrompts] = useState([]);  // To store input history and show in recent activity
    const [showResult, setShowResult] = useState(false);  // Once prompt is given this state will become true and hide "Hello dev." and cards from display
    const [loading, setLoading] = useState(false);  // Once true it will display loading animation
    const [resultData, setResultData] = useState(""); // To display result on webpage

    const delayPara= (index,nextWord)=>{
        setTimeout(function(){
            setResultData(prev=>prev+nextWord);
        },75*index)
    }


    const newChat = ()=>{
        setLoading(false)
    setShowResult(false)  
  }


    const onSent = async () => {
        setResultData("");c
        setLoading(true);
        setShowResult(true);
        // let response;
        // if(prompt!==undefined){
        //     response=   await runChat(prompt);
        //     setRecentPrompt(prompt)
        // }
        // else{
        //     setRecentPrompt(prev=>[...prev,input])
        //     setRecentPrompt(input)
        //     response=await runChat(input)
        // }
        // setPrevPrompts(prev=>[...prev,input])
        // setRecentPrompt(input);
        // const result = await runChat(input);
        let responseArray = result.split("**");
        let newResponse = "";
        // loop is for when we get ** in our result that stars is replaced that word but in bold format like **React** gets replaced with bold React
        // ** = bold text
        // * = new line
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>");
         // Assuming `runChat` returns the result data
         let newResponseArray = newResponse.split(" ");
         for(let i=0;i<newResponseArray.length;i++)
         {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ") 
         }
        setLoading(false);
        setInput("");
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
