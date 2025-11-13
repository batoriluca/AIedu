import { useState } from 'react';

const QuestionForm = ({ onSubmit }) => {
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (subject && question) {
      onSubmit({ subject, question });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Subject</label>
        <select 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Subject</option>
          <option value="math">Mathematics</option>
          <option value="science">Science</option>
          <option value="history">History</option>
          <option value="literature">Literature</option>
          <option value="geography">Geography</option>
        </select>
      </div>
      <div>
        <label className="block mb-1">Your Question</label>
        <textarea 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border rounded h-32"
          placeholder="Type your question here..."
          required
        ></textarea>
      </div>
      <button 
        type="submit" 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Question
      </button>
    </form>
  );
};

export default QuestionForm;