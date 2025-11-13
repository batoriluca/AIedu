import { useState } from 'react';

const Exercise = ({ exercise, onSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      exerciseId: exercise.id, 
      answer,
      question: exercise.question // Include the question for evaluation
    });
  };




  return (
    <div className="border p-4 mb-4 rounded">
      <h3 className="font-bold mb-2">Exercise {exercise.id}</h3>
      <p className="mb-4">{exercise.question}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          
        </div>
        <button 
          type="submit" 
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Help
        </button>
      </form>
    </div>
  );
};

export default Exercise;