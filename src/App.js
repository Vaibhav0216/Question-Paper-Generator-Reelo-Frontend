import React, { useState } from 'react';
import App from './App.css';
const QuestionPaperGenerator = () => {
  const [totalMarks, setTotalMarks] = useState('');
  const [easyMarks, setEasyMarks] = useState('');
  const [mediumMarks, setMediumMarks] = useState('');
  const [hardMarks, setHardMarks] = useState('');
  const [generatedPaper, setGeneratedPaper] = useState('');

  const generateQuestionPaper = async () => {
    // Prepare request body
    const requestBody = {
      totalMarks: parseInt(totalMarks),
      distribution: {
        Easy: parseInt(easyMarks),
        Medium: parseInt(mediumMarks),
        Hard: parseInt(hardMarks),
      },
    };

    // Make a POST request to the backend
    try {
      const response = await fetch("https://question-paper-vaibhav.onrender.com/generate-paper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log(data);

      // Display the generated question paper
      if(data.questionPaper) setGeneratedPaper(JSON.stringify(data.questionPaper, null, 2));
      else setGeneratedPaper(data.error);
    } catch (error) {
      console.error("Error generating question paper:", error);
    }
  };

  return (
    <div className='container'>
      <h1>Question Paper Generator</h1>

      <div>
        <label htmlFor="totalMarks">Total Marks*:</label>
        <input
          type="number"
          id="totalMarks"
          placeholder="Enter total marks"
          required
          value={totalMarks}
          onChange={(e) => setTotalMarks(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="easyMarks">Easy percentage*:</label>
        <input
          type="number"
          id="easyMarks"
          placeholder="Enter easy marks"
          required
          value={easyMarks}
          onChange={(e) => setEasyMarks(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="mediumMarks">Medium percentage*:</label>
        <input
          type="number"
          id="mediumMarks"
          placeholder="Enter medium marks"
          required
          value={mediumMarks}
          onChange={(e) => setMediumMarks(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="hardMarks">Hard percentage*:</label>
        <input
          type="number"
          id="hardMarks"
          placeholder="Enter hard marks"
          required
          value={hardMarks}
          onChange={(e) => setHardMarks(e.target.value)}
        />
      </div>

      <button onClick={generateQuestionPaper}>Generate Question Paper</button>

      <div>
        <h2>Generated Question Paper:</h2>
        <pre id="questionPaper">{generatedPaper}</pre>
      </div>
    </div>
  );
};

export default QuestionPaperGenerator;
