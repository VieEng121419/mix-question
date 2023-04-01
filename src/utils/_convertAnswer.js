export const formattedAnswer = (id, listAnswers) => {
    const formattedAnswer = listAnswers.map((answer, index) => {
        return {
            id: (id + 0.1 * index).toFixed(1),
            label: answer,
        };
    });
    return formattedAnswer;
};
