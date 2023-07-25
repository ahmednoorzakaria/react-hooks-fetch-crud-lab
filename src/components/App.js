import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  //GET method

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((resp) => resp.json())
      .then((questions) => setQuestions(questions));
  }, []);

  function handleAddNewQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(deletedQuestion) {
    const updatedQuestionList = questions.filter(
      (question) => question.id !== deletedQuestion.id
    );
    setQuestions(updatedQuestionList);
  }

  function handleOnChange(updatedAnswer) {
    const updatedAnswers = questions.map((question) => {
      if (question.id === updatedAnswer.id) {
        return updatedAnswer;
      } else {
        return question;
      }
    });
    setQuestions(updatedAnswers);
    console.log(updatedAnswers);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm handleAddNewQuestion={handleAddNewQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          handleOnChange={handleOnChange}
        />
      )}
    </main>
  );
}

export default App;
