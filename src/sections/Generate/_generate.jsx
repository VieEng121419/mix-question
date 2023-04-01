import React from "react";
import Button from "../../components/Button/Button";
import { handleShuffle } from "../../utils/_helper";

const GenerateSection = (props) => {
    const { questionsList, setQuestionsList } = props;
    return (
        <div className="flex justify-center mb-5">
            <Button primary onClick={() => handleShuffle(questionsList, (shuffledArr) => setQuestionsList(shuffledArr))}>
                Done and Generate
            </Button>
        </div>
    );
};

export default GenerateSection;
