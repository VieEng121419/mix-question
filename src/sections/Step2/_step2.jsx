import React, { useState, useRef } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Section from "../../components/Section/Section";
import SectionAnswer from "../../components/Section/SectionAnswer";
import SectionQuestions from "../../components/Section/SectionQuestions";
import {
    handleAddQuestion,
    handleChangeListLocalStorage,
    handleDeleteQuestion,
} from "../../utils/_helper";
import { useQuestionsListParsed } from "../../utils/_customHook";

const Step2Section = (props) => {
    const { questionsList, setQuestionsList } = props;
    const [questionEdit, setQuestionEdit] = useState(null);
    const [answerEdit, setAnswerEdit] = useState(null);
    const [idError, setIdError] = useState(null);

    const validate = (id, value) => {
        if (value) {
            setIdError(null);
            return;
        }
        setIdError(id);
    };

    const checkIsErrorWhenEdit = () => {
        return !!idError;
    };

    const handleChangeQuestion = (id, value) => {
        //Validate question input
        validate(id, value);

        let questionListEdited = useQuestionsListParsed();
        questionListEdited = questionListEdited.map((questionObj) => {
            if (questionObj.question.id === id) {
                return {
                    question: {
                        ...questionObj.question,
                        label: value,
                    },
                };
            }
            return questionObj;
        });
        setQuestionsList(questionListEdited);
    };

    const handleChangeAnswer = (id, value) => {
        //Validate answer input
        validate(id, value);

        let questionListEdited = useQuestionsListParsed();
        questionListEdited = questionListEdited.map((questionObj) => {
            let answerEdited = questionObj.question.answers.map((answer) => {
                if (answer.id === id) {
                    return { ...answer, label: value };
                }
                return answer;
            });
            return {
                question: { ...questionObj.question, answers: answerEdited },
            };
        });
        setQuestionsList(questionListEdited);
    };

    const handleQuestionEdited = (value) => {
        const questionListEdited = questionsList;
        if (!!checkIsErrorWhenEdit()) return;
        setQuestionEdit(value);
        //After out focus input, then change list in Local Storage
        handleChangeListLocalStorage(questionListEdited);
    };

    const handleAnswerEdited = (value) => {
        const questionListEdited = questionsList;
        if (!!checkIsErrorWhenEdit()) return;
        setAnswerEdit(value);
        //After out focus input, then change list in Local Storage
        handleChangeListLocalStorage(questionListEdited);
    };

    return (
        <Card title={"Step 2: Review and Edit"}>
            {questionsList
                ? questionsList.map((questionObj, indexQ) => (
                      <div className="mb-5">
                          <Section
                              isShowCloseIcon
                              type="solid"
                              borderColor="#F1F3F4"
                              borderWidth="3px"
                              onClose={() => {
                                  handleDeleteQuestion(questionObj.question.id);
                              }}
                          >
                              <SectionQuestions
                                  key={questionObj.question.id}
                                  id={questionObj.question.id}
                                  index={indexQ}
                                  isEdit={
                                      questionEdit === questionObj.question.id
                                  }
                                  onEdit={(value) => {
                                      handleQuestionEdited(value);
                                  }}
                                  onChange={(value) => {
                                      handleChangeQuestion(
                                          questionObj.question.id,
                                          value
                                      );
                                  }}
                                  isError={idError === questionObj.question.id}
                              >
                                  {questionObj.question.label}
                              </SectionQuestions>
                              <div className="grid lg:grid-cols-2 lg:grid-rows-2 lg:grid-cols-2 lg:grid-rows-2 sm:grid-cols-1 sm:grid-rows-4 gap-5">
                                  {questionObj.question.answers.map(
                                      (answer, indexA) => (
                                          <SectionAnswer
                                              key={answer.id}
                                              id={answer.id}
                                              index={indexA}
                                              isEdit={answerEdit === answer.id}
                                              onEdit={(value) => {
                                                  handleAnswerEdited(value);
                                              }}
                                              onChange={(value) => {
                                                  handleChangeAnswer(
                                                      answer.id,
                                                      value
                                                  );
                                              }}
                                              isError={idError === answer.id}
                                          >
                                              {answer.label}
                                          </SectionAnswer>
                                      )
                                  )}
                              </div>
                          </Section>
                      </div>
                  ))
                : null}
            <div className="mt-5">
                <Button
                    type="outline"
                    primary
                    onClick={() =>
                        handleAddQuestion((questionListAdded) =>
                            setQuestionsList(questionListAdded)
                        )
                    }
                >
                    Add a new question +
                </Button>
            </div>
        </Card>
    );
};

export default Step2Section;
