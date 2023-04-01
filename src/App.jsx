import React, { useEffect, useState } from "react";
import Button from "./components/Button/Button";
import BannerSection from "./sections/Banner/_banner";
import Step1Section from "./sections/Step1/_step1";
import Step2Section from "./sections/Step2/_step2";
import QuestionsList from "./assets/dummy/questions.json";
import GenerateSection from "./sections/Generate/_generate";

function App() {
    const [questionsList, setQuestionsList] = useState(
        JSON.parse(localStorage.getItem("list-questions"))
    );

    //Add event change for local storage
    useEffect(() => {
        const handleStorageChange = () => {
            setQuestionsList(
                JSON.parse(localStorage.getItem("list-questions"))
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
            <Step1Section />
            {questionsList && (
                <Step2Section
                    questionsList={questionsList}
                    setQuestionsList={(questionListEdited) =>
                        setQuestionsList(questionListEdited)
                    }
                />
            )}
            {questionsList && (
                <GenerateSection
                    questionsList={questionsList}
                    setQuestionsList={(shuffledArr) =>
                        setQuestionsList(shuffledArr)
                    }
                />
            )}
        </div>
    );
}

export default App;
