import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { mainPageReducer } from './reducers/MainPageReducer';
import { quizReducer } from './reducers/quizReducer'

const reducers = combineReducers({
    quiz: quizReducer,
    mainPage: mainPageReducer
})
export default createStore(reducers, applyMiddleware(thunk));