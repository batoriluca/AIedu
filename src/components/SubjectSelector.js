const SubjectSelector = ({ onSelect }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const subject = e.target.subject.value;
      const grade = e.target.grade.value;
      
      if (subject && grade) {
        onSelect({ subject, grade });
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Subject</label>
          <select 
            name="subject"
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
          <label className="block mb-1">Grade</label>
          <select 
            name="grade"
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Grade</option>
            <option value="1">Grade 1</option>
            <option value="2">Grade 2</option>
            <option value="3">Grade 3</option>
            <option value="4">Grade 4</option>
            <option value="5">Grade 5</option>
            <option value="6">Grade 6</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate Exercises
        </button>
      </form>
    );
  };
  
  export default SubjectSelector;