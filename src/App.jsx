import React, { useEffect, useState } from "react";
import Button from "./components/Button/Button";
import BannerSection from "./sections/Banner/_banner";
import Step1Section from "./sections/Step1/_step1";
import Step2Section from "./sections/Step2/_step2";
import GenerateSection from "./sections/Generate/_generate";
import { LOCAL_STORAGE_NAME } from "./utils/_constant";
import LIST_QUESTION_DEFAULT from "./assets/dummy/questions.json";

function App() {
    const [questionsList, setQuestionsList] = useState(
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)) ||
            LIST_QUESTION_DEFAULT
    );

    //Add event change for local storage
    useEffect(() => {
        const handleStorageChange = () => {
            setQuestionsList(
                JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))
            );
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [questionsList]);

    return (
        <div className="container mx-auto px-4">
            <BannerSection />
            <Step1Section
                questionsList={questionsList}
                setQuestionsList={(questionListRemoved) => {
                    localStorage.removeItem(LOCAL_STORAGE_NAME);
                    setQuestionsList(questionListRemoved);
                }}
            />
            {
                <Step2Section
                    questionsList={questionsList}
                    setQuestionsList={(questionListEdited) =>
                        setQuestionsList(questionListEdited)
                    }
                />
            }
            {
                <GenerateSection
                    questionsList={questionsList}
                    setQuestionsList={(shuffledArr) =>
                        setQuestionsList(shuffledArr)
                    }
                />
            }
        </div>
    );
}

export default App;
