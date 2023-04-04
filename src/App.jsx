import React, { useEffect, useState } from "react";
import Button from "./components/Button/Button";
import BannerSection from "./sections/Banner/_banner";
import Step1Section from "./sections/Step1/_step1";
import Step2Section from "./sections/Step2/_step2";
import GenerateSection from "./sections/Generate/_generate";
import { LOCAL_STORAGE_NAME } from "./utils/_constant";

function App() {
    const [questionsList, setQuestionsList] = useState(
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)) || []
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
    }, []);

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
            {questionsList.length ? (
                <Step2Section
                    questionsList={questionsList}
                    setQuestionsList={(questionListEdited) =>
                        setQuestionsList(questionListEdited)
                    }
                />
            ) : null}
            {questionsList.length ? (
                <GenerateSection
                    questionsList={questionsList}
                    setQuestionsList={(shuffledArr) =>
                        setQuestionsList(shuffledArr)
                    }
                />
            ) : null}
        </div>
    );
}

export default App;
