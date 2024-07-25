import { createContext, useState } from 'react';
import runChat from "../config/gemini";  // Ensure this import is correct and the module exists

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");   // To save the input data
    const [recentPrompt, setRecentPrompt] = useState("");  // After giving prompt it will become recent prompt 
    const [prevPrompts, setPrevPrompts] = useState([]);  // To store input history and show in recent activity
    const [showResult, setShowResult] = useState(false);  // Once prompt is given this state will become true and hide "Hello dev." and cards from display
    const [loading, setLoading] = useState(false);  // Once true it will display loading animation
    const [resultData, setResultData] = useState(""); // To display result on webpage

    const delayPara = (index, nextWord) => {
        setTimeout(function(){ 
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async () => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        // Assuming `runChat` is a function that takes input and returns a result
        const result = await runChat(input);

        let responseArray = result.split("**");
        let newResponse = "";

        // Loop to replace ** with bold text and * with new lines
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }

        setLoading(false);
        setInput("");
        setPrevPrompts(prev => [input, ...prev]); // Update prevPrompts
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
