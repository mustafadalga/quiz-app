import type { IQuestion } from "@/types";

function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [ array[currentIndex], array[randomIndex] ] = [
            array[randomIndex], array[currentIndex] ];
    }

    return array;
};


function shuffleQuestionsData(array: IQuestion[]): IQuestion[] {
    const questions: IQuestion[] = shuffle(array);

    return questions.map(question => {
        return {
            ...question,
            options: shuffle([
                question.correct_answer,
                ...question.incorrect_answers
            ])
        }
    })
}

export {
    shuffleQuestionsData
}