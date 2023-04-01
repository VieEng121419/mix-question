import React from "react";
import Section from "./Section";

const SectionQuestions = (props) => {
    const { isEdit, index, children } = props;
    return (
        <div>
            <div className="Section-Question">
                <p className="Section-Question__Number">{index+1}</p>
                <div className="Section-Question__Content">
                    <p className="Title">Question:</p>
                    <p className="Content">{children}</p>
                </div>
            </div>
        </div>
    );
};

export default SectionQuestions;
