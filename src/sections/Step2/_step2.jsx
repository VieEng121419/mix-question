import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Section from "../../components/Section/Section";
import SectionAnswer from "../../components/Section/SectionAnswer";
import SectionQuestions from "../../components/Section/SectionQuestions";
// import QuestionsList from "../../assets/dummy/questions.json";
import { useMemo } from "react";
import { handleChangeAnswer } from "../../utils/_helper";

const Step2Section = (props) => {
    const { questionsList, setQuestionsList } = props;
    const [answerEdit, setAnswerEdit] = useState(0);

    return (
        <Card title="Step 2: Review and Edit">
            {questionsList.map((question, indexQ) => (
                <div className="mb-5">
                    <Section
                        type="solid"
                        borderColor="#F1F3F4"
                        borderWidth="3px"
                    >
                        <SectionQuestions index={indexQ}>
                            {question.label}
                        </SectionQuestions>
                        <div className="flex justify-between gap-5">
                            {question.answers.length &&
                                question.answers.map((answer, indexA) => (
                                    <SectionAnswer
                                        key={answer.id}
                                        id={answer.id}
                                        isEdit={answerEdit === answer.id}
                                        index={indexA}
                                        onEdit={(value) => setAnswerEdit(value)}
                                        onChange={(value) =>
                                            handleChangeAnswer(
                                                answer.id,
                                                value,
                                                (questionListEdited) =>
                                                    setQuestionsList(
                                                        questionListEdited
                                                    )
                                            )
                                        }
                                    >
                                        {answer.label}
                                    </SectionAnswer>
                                ))}
                        </div>
                    </Section>
                </div>
            ))}
            <div className="mt-5">
                <Button ton type="outline" primary>
                    Add a new question +
                </Button>
            </div>
        </Card>
    );
};

export default Step2Section;
