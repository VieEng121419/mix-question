import { LOCAL_STORAGE_NAME } from "./_constant";

export const useQuestionsListParsed = () => {
    if (localStorage.getItem(LOCAL_STORAGE_NAME) === null) return [];
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
};

export const useAddAnswersDefault = (idQ) => {
    let answerArr = [];
    for (let i = 0; i < 4; i++) {
        const answerObj = {
            id: (idQ + 0.1 * i).toFixed(1),
            label: `New answer ${i + 1}`,
        };
        answerArr = [...answerArr, answerObj];
    }
    return answerArr;
};
