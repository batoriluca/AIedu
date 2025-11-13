const AiResponse = ({ response, isLoading }) => {
    if (isLoading) {
      return (
        <div className="bg-gray-100 p-4 rounded animate-pulse">
          <p>AI is thinking...</p>
        </div>
      );
    }
  
    if (!response) {
      return null;
    }
  
    return (
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-bold mb-2">AI Answer:</h3>
        <div className="prose">
          {response}
        </div>
      </div>
    );
  };
  
  export default AiResponse;