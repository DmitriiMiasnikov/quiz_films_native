import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { quizReducer } from './reducers/quizReducer'

const reducers = combineReducers({
    quiz: quizReducer
})
export default createStore(reducers, applyMiddleware(thunk));