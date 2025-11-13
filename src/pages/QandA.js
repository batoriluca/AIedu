import { useState } from 'react';
import QuestionForm from '../components/QuestionForm';
import AiResponse from '../components/AiResponse';
import { askQuestion } from '../services/aiService';

const QandA = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      const aiResponse = await askQuestion(data);
      setResponse(aiResponse);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setResponse('Sorry, I encountered an error processing your question. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">Ask AI a Question</h2>
      <div className="grid grid-cols-1 gap-8">
        <div>
          <QuestionForm onSubmit={handleSubmit} />
        </div>
        <div>
          <AiResponse response={response} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default QandA;