export const transformQuizData = (inputData) => {
    console.log(inputData);
    try {
        // Handle both string and array input
        const fullString = Array.isArray(inputData) ? inputData.join('\n') : inputData;
        
        // Extract the JSON content between the markers
        const jsonStart = fullString.indexOf('[');
        const jsonEnd = fullString.lastIndexOf(']') + 1;
        const jsonContent = fullString.slice(jsonStart, jsonEnd);
        
        // Parse the JSON data
        const quizArray = JSON.parse(jsonContent);
        
        // Process each question
        return quizArray.map(question => {
            return {
                id: question.id,
                question: question.question,
                answers: question.answers,
                correctAnswer: question.correct_answer
            };
        });
        
    } catch (error) {
        console.error('Error processing quiz questions:', error.message);
        return [];
    }
};