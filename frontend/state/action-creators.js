// ❗ You don't need to add extra action creators to achieve MVP

import axios from "axios"
import { INPUT_CHANGE, RESET_FORM, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE } from "./action-types"

/** API URL & ROUTES */
const QUIZ_API_URL = 'http://localhost:9000/api/quiz/'
const FETCH_NEXT_QUESTION   = 'next'
const CREATE_NEW_QUESTION   = 'new'
const CHECK_QUESTION_ANSWER  = 'answer'


/** Changes the state of the wheel link */
export function moveClockwise() {
  return {type:MOVE_CLOCKWISE}
}

/** Changes the state of the wheel link */
export function moveCounterClockwise() {
  return {type:MOVE_COUNTERCLOCKWISE}
}

/** changes the state of `selectedAnswer` */
export function selectAnswer(id) { 
  return {
    type:SET_SELECTED_ANSWER,
    payload:id
  }
}

/** Changes the state of `message` (error / success) */
export function setMessage() { }

export function setQuiz() { }

export function inputChange(evt) {
  return {type:INPUT_CHANGE,payload:evt}
}

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios.get(QUIZ_API_URL+FETCH_NEXT_QUESTION)
      .then(({data}=res)=>{
        const parsedResponse = { 
          // question, answers:{[ans_id,text]}
          question:data.question,
          quiz_id:data.quiz_id,
          true_answer:{
            answer_id:data.answers[0].answer_id,
            text:data.answers[0].text
          },
          false_answer:{
            answer_id:data.answers[1].answer_id,
            text:data.answers[1].text
          }
        }
        dispatch({type:SET_QUIZ_INTO_STATE,payload:parsedResponse})
      })
      .catch(e=>{
        dispatch({type:SET_INFO_MESSAGE,payload:e.response.data.message})
      })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer({quiz_id,answer_id}) {
  return function (dispatch) {
    axios.post(QUIZ_API_URL+CHECK_QUESTION_ANSWER,{quiz_id,answer_id})
      .then(res=>{
        dispatch({type:SET_INFO_MESSAGE,payload:res.data.message})
        dispatch({type:SET_QUIZ_INTO_STATE,payload:null})
        fetchQuiz()(dispatch)
      })
      .catch(e=>{
        dispatch({type:SET_INFO_MESSAGE,payload:e.response.data.message})
      })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(form) {
  /** Create an object with the proper keys */
  const parsedForm = {
    false_answer_text:form.newFalseAnswer,
    true_answer_text:form.newTrueAnswer,
    question_text:form.newQuestion
  }
  return function (dispatch) {
    axios.post(QUIZ_API_URL+CREATE_NEW_QUESTION,parsedForm)
      .then(res=>{
        dispatch({type:SET_INFO_MESSAGE,payload:`Congrats: "${form.newQuestion}" is a great question!`})
        dispatch({type:RESET_FORM})
      })
      .catch(e=>{
        dispatch({type:SET_INFO_MESSAGE,payload:e.response.data.message})
      })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
