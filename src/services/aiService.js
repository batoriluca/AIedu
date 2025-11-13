import OpenAI from 'openai';


const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

if (!apiKey) {
  console.error('OpenAI API key is missing! Set the REACT_APP_OPENAI_API_KEY environment variable.');
}


const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true 
});

export const askQuestion = async ({ subject, question }) => {
  if (!apiKey) {
    throw new Error('OpenAI API key is missing. Please set the REACT_APP_OPENAI_API_KEY environment variable.');
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an educational AI assistant specializing in ${subject}. Provide accurate, clear, and helpful answers appropriate for a student.`
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to get answer from AI');
  }
};

export const generateExercises = async ({ subject, grade }) => {
  if (!apiKey) {
    throw new Error('OpenAI API key is missing. Please set the REACT_APP_OPENAI_API_KEY environment variable.');
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an educational AI assistant that creates exercises for ${subject} at grade ${grade} level. Create 3 exercises with clear questions.`
        },
        {
          role: "user",
          content: `Generate 3 ${subject} exercises appropriate for grade ${grade} students.`
        }
      ],
      temperature: 0.7,
    });

    
    const content = response.choices[0].message.content;
    const exercises = parseExercisesFromText(content);
    
    return exercises;
  } catch (error) {
    console.error('Error generating exercises:', error);
    throw new Error('Failed to generate exercises');
  }
};

export const submitAnswer = async ({ exerciseId, answer, question }) => {
  if (!apiKey) {
    throw new Error('OpenAI API key is missing. Please set the REACT_APP_OPENAI_API_KEY environment variable.');
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an educational AI assistant that evaluates student answers. Provide constructive feedback and explanation."
        },
        {
          role: "user",
          content: `Exercise: ${question}\nStudent's answer: ${answer}\nProvide the explanation on how to solve the exercise, do not tell whether the answer is correct or not.`
        }
      ],
      temperature: 0.3,
    });

    const evaluation = response.choices[0].message.content;
    
    
    const isCorrect = evaluation.toLowerCase().includes("correct");
    
    return {
      exerciseId,
      submittedAnswer: answer,
      isCorrect,
      feedback: evaluation,
      correctAnswer: isCorrect ? answer : extractCorrectAnswer(evaluation)
    };
  } catch (error) {
    console.error('Error evaluating answer:', error);
    throw new Error('Failed to evaluate answer');
  }
};


function parseExercisesFromText(text) {
  
  const exerciseTexts = text.split(/Exercise \d+:|^\d+\.|\n\n/).filter(Boolean);
  
  return exerciseTexts.map((exerciseText, index) => ({
    id: index + 1,
    question: exerciseText.trim()
  }));
}


function extractCorrectAnswer(evaluation) {

  const correctAnswerMatch = evaluation.match(/correct answer[:\s]+(.*)/i);
  return correctAnswerMatch ? correctAnswerMatch[1].trim() : "Please refer to the feedback for the correct approach.";
}