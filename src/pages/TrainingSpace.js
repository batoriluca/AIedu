import { useState } from 'react';
import SubjectSelector from '../components/SubjectSelector';
import Exercise from '../components/Exercise';
import ExerciseResult from '../components/ExerciseResult';
import { generateExercises, submitAnswer } from '../services/aiService';

const TrainingSpace = () => {
  const [exercises, setExercises] = useState([]);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSubject, setCurrentSubject] = useState('');
  const [currentGrade, setCurrentGrade] = useState('');

  const handleSelect = async (data) => {
    setIsLoading(true);
    // Save the current subject and grade
    setCurrentSubject(data.subject);
    setCurrentGrade(data.grade);
    
    try {
      const generatedExercises = await generateExercises(data);
      setExercises(generatedExercises);
      setResults([]);
    } catch (error) {
      console.error('Error generating exercises:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      const result = await submitAnswer(data);
      setResults([...results, result]);
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">Training Space</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Select Your Subject and Grade</h3>
        <SubjectSelector onSelect={handleSelect} />
      </div>

      {isLoading && (
        <div className="animate-pulse text-center p-4">
          <p>Generating exercises...</p>
        </div>
      )}
      
   
{exercises.length > 0 && (
  <div className="mb-8">
    <h3 className="text-xl font-bold mb-4">Exercises</h3>
    {exercises.map(exercise => {
      const isAnswered = results.some(result => result.exerciseId === exercise.id);
      return isAnswered ? null : (
        <Exercise 
          key={exercise.id} 
          exercise={exercise} 
          onSubmit={handleSubmit} 
        />
      );
    })}
    {exercises.length === results.length && (
      <div className="text-center p-4 bg-green-50 rounded">
        <p className="font-bold">All exercises completed!</p>
        <button 
          onClick={() => handleSelect({ subject: currentSubject, grade: currentGrade })}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate New Exercises
        </button>
      </div>
    )}
  </div>
)}
      
      {results.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Results</h3>
          {results.map(result => (
            <ExerciseResult key={result.exerciseId} result={result} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainingSpace;