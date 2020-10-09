import {http} from './../http'

const GET_ALL_QUIZ = 'GET_ALL_QUIZ';
const GET_FILMS_QUIZ = 'GET_FILMS_QUIZ';
const GET_SERIALS_QUIZ = 'GET_SERIALS_QUIZ';
const SET_QUIZ_LIST = 'SET_QUIZ_LIST';
const LOADED = 'LOADED'

const defaultState = {
    quizAll: [],
    quizFilms: [],
    quizSerials: [],
    quizList: null,
    loading: true
}

export const mainPageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case (GET_ALL_QUIZ): {
            return { ...state, quizAll: action.setQuiz }
        }
        case (GET_FILMS_QUIZ): {
            return { ...state, quizFilms: action.setQuiz }
        }
        case (GET_SERIALS_QUIZ): {
            return { ...state, quizSerials: action.setQuiz }
        }
        case (SET_QUIZ_LIST): {
            return { ...state, quizList: action.quiz }
        }
        case (LOADED): {
            return { ...state, loading: false }
        }
        default: break;
    }
    return state;
}
export const loaded = () => {
    return { type: LOADED }
}
export const getAllQuiz = (setQuiz) => {
    return { type: GET_ALL_QUIZ, setQuiz }
}
export const getFilmsQuiz = (setQuiz) => {
    return { type: GET_FILMS_QUIZ, setQuiz }
}
export const getSerialsQuiz = (setQuiz) => {
    return { type: GET_SERIALS_QUIZ, setQuiz }
}
export const setQuizList = (quiz) => {
    return { type: SET_QUIZ_LIST, quiz }
}
export const getAllQuizThunk = () => {
    return async (dispatch) => {
        const response = await http.get('https://quiz-films-native.firebaseio.com//quiz.json')
        dispatch(loaded());
        dispatch(getAllQuiz(response))
    }
}
export const getFilmsQuizThunk = () => {
    return async (dispatch) => {
        const response = await http.get('https://quiz-films-native.firebaseio.com//quiz.json')
        dispatch(loaded());
        dispatch(getFilmsQuiz(response.filter(el => el.type === 'films')))
    }
}
export const getSerialsQuizThunk = () => {
    return async (dispatch) => {
        const response = await http.get('https://quiz-films-native.firebaseio.com//quiz.json')
        dispatch(loaded());
        dispatch(getSerialsQuiz(response.filter(el => el.type === 'serials')))
    }
}