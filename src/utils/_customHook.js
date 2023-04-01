export const useQuestionsListParsed = () => {
    if (localStorage.getItem("list-questions") === null) return [];
    return JSON.parse(localStorage.getItem("list-questions"));
};