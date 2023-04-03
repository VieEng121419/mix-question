import React, { useState, useRef } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Section from "../../components/Section/Section";
import SectionAnswer from "../../components/Section/SectionAnswer";
import SectionQuestions from "../../components/Section/SectionQuestions";
// import QuestionsList from "../../assets/dummy/questions.json";
import { useMemo } from "react";
import { handleChangeAnswer, handleChangeQuestion } from "../../utils/_helper";

const Step2Section = (props) => {
    const { questionsList, setQuestionsList } = props;
    const [questionEdit, setQuestionEdit] = useState(null);
    const [answerEdit, setAnswerEdit] = useState(null);

    return (
        <Card title="Step 2: Review and Edit">
            {questionsList.map((questionObj, indexQ) => (
                <div className="mb-5">
                    <Section
                        type="solid"
                        borderColor="#F1F3F4"
                        borderWidth="3px"
                    >
                        <SectionQuestions
                            key={questionObj.question.id}
                            id={questionObj.question.id}
                            index={indexQ}
                            isEdit={questionEdit === questionObj.question.id}
                            onEdit={(value) => setQuestionEdit(value)}
                            onChange={(value) =>
                                handleChangeQuestion(
                                    questionObj.question.id,
                                    value,
                                    (questionListEdited) =>
                                        setQuestionsList(questionListEdited)
                                )
                            }
                        >
                            {questionObj.question.label}
                        </SectionQuestions>
                        <div className="grid grid-cols-2 grid-rows-2 gap-5">
                            {questionObj.question.answers.length &&
                                questionObj.question.answers.map(
                                    (answer, indexA) => (
                                        <SectionAnswer
                                            key={answer.id}
                                            id={answer.id}
                                            isEdit={answerEdit === answer.id}
                                            index={indexA}
                                            onEdit={(value) =>
                                                setAnswerEdit(value)
                                            }
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
                                    )
                                )}
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
