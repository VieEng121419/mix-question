import { formattedAnswer } from "./_convertAnswer";
import { useAddAnswersDefault, useQuestionsListParsed } from "./_customHook";
import { LOCAL_STORAGE_NAME } from "./_constant";
import * as XLSX from "xlsx";

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
    let idQ = 1;
    let indexQ = 0;
    csvQuestionArray.map((item, index) => {
        //Remove 3 last charaters:',,,' for label
        item = item.slice(0, -3);
        const questionObj = {
            question: {
                id: idQ,
                label: item,
            },
        };
        // if even number then add question into array else add answers into question
        if ((index + 1) % 2) {
            csvQuestionArrayParsed = [...csvQuestionArrayParsed, questionObj];
            indexQ = index;
            idQ++;
        } else {
            csvQuestionArrayParsed.forEach((questionObj) => {
                if (indexQ === index - 1) {
                    questionObj.question.answers = formattedAnswer(
                        questionObj.question.id,
                        item.split(",")
                    );
                }
            });
        }
    });
    handleChangeListLocalStorage(csvQuestionArrayParsed);
};

export const handleAddQuestion = (callback = () => {}) => {
    let questionListAdded = useQuestionsListParsed();
    const newQuestionObj = {
        question: {
            id: questionListAdded.length,
            label: `Câu hỏi ${questionListAdded.length + 1}`,
            answers: useAddAnswersDefault(questionListAdded.length),
        },
    };
    questionListAdded = [...questionListAdded, newQuestionObj];
    callback(questionListAdded);
    handleChangeListLocalStorage(questionListAdded);
};

export const handleChangeListLocalStorage = (data) => {
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(data));
    window.dispatchEvent(new Event("storage"));
};

export const handleDeleteQuestion = (id) => {
    let questionListDeleted = useQuestionsListParsed();
    questionListDeleted = questionListDeleted.filter(
        (questionObj) => questionObj.question.id !== id
    );
    handleChangeListLocalStorage(questionListDeleted);
};

const shuffleAnswersList = (answerList) => {
    const shuffledAnswersArr = [...answerList];
    for (let i = shuffledAnswersArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledAnswersArr[i], shuffledAnswersArr[j]] = [
            shuffledAnswersArr[j],
            shuffledAnswersArr[i],
        ];
    }
    return shuffledAnswersArr;
};

export const handleShuffle = (questionsList, callback = () => null) => {
    const shuffledArr = [...questionsList];
    for (let i = shuffledArr.length - 1; i > 0; i--) {
        //Shuffle question
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
        //Shuffle answers from shuffled question list
        const shuffledAnswersArr = shuffleAnswersList(
            shuffledArr[i].question.answers
        );
        shuffledArr[i].question.answers = shuffledAnswersArr;
    }
    callback(shuffledArr);
    exportToExcel(shuffledArr);
};

export const exportToExcel = (data, fileName) => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Create a new sheet and add data into sheet created
    const worksheet = XLSX.utils.json_to_sheet(data);
    data.forEach((item, index) => {
        const rowQ = index * 2 + 1;
        let rowA = rowQ + 1;
        XLSX.utils.sheet_add_aoa(
            worksheet,
            [[`${index + 1}. ${item.question.label}`]],
            {
                origin: `A${rowQ}`,
            }
        );

        item.question.answers.map((ans, index) => {
            XLSX.utils.sheet_add_aoa(
                worksheet,
                [[`${String.fromCharCode(index + 65)}. ${ans.label}`]],
                {
                    origin: `${String.fromCharCode(index + 65)}${rowA}`, //Each answer is each column by char code (ex: 65 -> A,...)
                }
            );
        });
    });
    XLSX.utils.book_append_sheet(workbook, worksheet, "De thi moi");
    // Export file Excel
    XLSX.writeFile(workbook, "de_thi_moi.xlsx");
};
