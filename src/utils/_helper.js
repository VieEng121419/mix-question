import { formattedAnswer } from "./_convertAnswer";
import { useQuestionsListParsed } from "./_customHook";

export const handleOnChangeInputFile = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
    };

    fileReader.readAsText(e.target.files[0]);
};

const csvFileToArray = (string) => {
    const csvQuestionArray = string.split("\r\n");
    let csvQuestionArrayParsed = [];
    csvQuestionArray.map((item, index) => {
        //Remove 3 last charaters:',,,' for label
        item = item.slice(0, -3);
        const questionObj = {
            id: index,
            label: item,
        };
        if ((index + 1) % 2) {
            csvQuestionArrayParsed = [...csvQuestionArrayParsed, questionObj];
        } else {
            csvQuestionArrayParsed.forEach((question) => {
                if (question.id === index - 1) {
                    question.answers = formattedAnswer(
                        question.id,
                        item.split(",")
                    );
                }
            });
        }
    });
    handleChangeListLocalStorage(csvQuestionArrayParsed);
};

export const handleChangeAnswer = (id, value, callback = () => null) => {
    let questionListEdited = useQuestionsListParsed();
    questionListEdited = questionListEdited.map((question) => {
        let answerEdited = question.answers.map((answer) => {
            if (answer.id === id) {
                return { ...answer, label: value };
            }
            return answer;
        });
        return { ...question, answers: answerEdited };
    });
    callback(questionListEdited);
};

export const handleChangeListLocalStorage = (data) => {
    localStorage.setItem("list-questions", JSON.stringify(data));
    window.dispatchEvent(new Event("storage"));
};

const handleShuffleAnswers = (answerList) => {
    const shuffledAnswersArr = [...answerList]
    for (let i = shuffledAnswersArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledAnswersArr[i], shuffledAnswersArr[j]] = [shuffledAnswersArr[j], shuffledAnswersArr[i]];
    }
    return shuffledAnswersArr
}

export const handleShuffle = (questionsList) => {
    const shuffledArr = [...questionsList];
    for (let i = shuffledArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    console.log("shuffledArr", shuffledArr);
    // return shuffledArr;
};
