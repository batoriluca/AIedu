const ExerciseResult = ({ result }) => {
    return (
      <div className={`mb-5 p-4 rounded bg-blue-50`}>
        <h3 className="font-bold mb-2">Exercise {result.exerciseId}</h3>
        
        <div className="mb-3">
          <p className="font-semibold">Tips:</p>
          <p>{result.feedback}</p>
        </div>
        
      </div>
    );
  };
  
  export default ExerciseResult;