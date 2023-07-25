import React from "react";

function QuestionItem({ question, onDeleteQuestion, handleOnChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const url = `http://localhost:4000/questions/${question.id}`;

  //DELETE method
  function handleDeleteClick() {
    fetch(url, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then(() => onDeleteQuestion(question));
  }

  //PATCH method
  function handleChangeAnswer(e) {
    const correctIndex = parseInt(e.target.value);
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        correctIndex,
      }),
    })
      .then((resp) => resp.json())
      .then((updatedAnswer) => handleOnChange(updatedAnswer));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleChangeAnswer} defaultValue={correctIndex}>
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
