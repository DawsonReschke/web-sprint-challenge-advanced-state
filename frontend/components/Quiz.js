import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from "../state/action-creators"
function Quiz(props) {
  const {
    fetchQuiz,
    selectAnswer,
    selectedAnswer,
    postAnswer,
    quiz
  } = props
  useEffect(()=>{
    fetchQuiz()
  },[])

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz?.question}</h2>
            <div id="quizAnswers">
              <div className={selectedAnswer === quiz?.true_answer?.answer_id ? "answer selected" : 'answer'}>
                {quiz?.true_answer?.text}
                <button onClick={()=>{selectAnswer(quiz?.true_answer?.answer_id)}}>
                  {selectedAnswer === quiz?.true_answer?.answer_id ? "SELECTED" : 'select'}
                </button>
              </div>

              <div className={selectedAnswer === quiz?.false_answer?.answer_id ? "answer selected" : 'answer'}>
                {quiz?.false_answer?.text}
                <button onClick={()=>{selectAnswer(quiz?.false_answer?.answer_id)}}>
                {selectedAnswer === quiz?.false_answer?.answer_id ? "SELECTED" : 'select'}
                </button>
              </div>
            </div>

            <button disabled={!selectedAnswer} onClick={()=>postAnswer({quiz_id:quiz.quiz_id,answer_id:selectedAnswer})} id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(st=>st,actionCreators)(Quiz)