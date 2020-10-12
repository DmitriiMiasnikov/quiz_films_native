import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { checkAnswer, toggleInactiveButtons, stepUp, getResultText } from './../store/reducers/quizReducer';

import { Result } from './../components/Result'

export const QuizScreen = ({ }) => {
    const currentQuiz = useSelector(state => state.quiz.currentQuiz)
    const answersState = useSelector(state => state.quiz.answers)
    const step = useSelector(state => state.quiz.step);
    const inactiveButtons = useSelector(state => state.quiz.inactiveButtons);
    const resultText = useSelector(state => state.quiz.resultText);
    const dispatch = useDispatch();
    const [answers, setAnswer] = useState(null);
    const [hidePrevImage, setHidePrevImage] = useState(false);
    const shuffleAnswers = (currentQuiz) => {
        const shuffleFunc = (arr) => arr.map(a => [Math.random(), a])
            .sort((a, b) => a[0] - b[0]).map(a => a[1]);
        const shuffledArr = currentQuiz;
        shuffledArr.questions = shuffleFunc(shuffledArr.questions);
        shuffledArr.questions = shuffledArr.questions.map(el => {
            const shuffleFunc = (arr) => arr.map(a => [Math.random(), a])
                .sort((a, b) => a[0] - b[0]).map(a => a[1]);
            el.options = shuffleFunc(el.options)
            return el
        })
        return shuffledArr
    }
    useEffect(() => {
        if (currentQuiz) {
            setAnswer(currentQuiz.questions.map(el => null))
            shuffleAnswers(currentQuiz)
        }
    }, [])

    const checkAnswerFunc = async (answer, step, item) => {
        if (answers) {
            dispatch(checkAnswer(answer, step, answers, item))
            dispatch(toggleInactiveButtons(true))
            await new Promise(res => setTimeout(res, 300))
            setHidePrevImage(true)
            await new Promise(res => setTimeout(res, 350))
            dispatch(stepUp())
            await new Promise(res => setTimeout(res, 300))
            setHidePrevImage(false)
            dispatch(toggleInactiveButtons(false))
        }
    }
    useEffect(() => {
        if (hidePrevImage) {
            const right = answersState.filter(el => !el ? false : el[0] === true).length;
            const all = answersState.length
            dispatch(getResultText(right, all))
        }
    }, [hidePrevImage])

    const content = !currentQuiz ? <View></View> :
        <View style={styles.wrapper}>
            <View style={styles.content}>
                {
                    currentQuiz && step < currentQuiz.questions.length ? (
                        <View style={styles.quiz, inactiveButtons ? styles.inactive : null}>
                            <Image source={{ uri: currentQuiz.questions[step].src }} style={styles.image}></Image>
                            <View style={styles.questions}>
                                {
                                    currentQuiz.questions[step].options.map((el, i) => {
                                        return <TouchableOpacity style={styles.question} key={i}
                                            onPress={() => checkAnswerFunc(el, step, i)}>
                                            <Text>{el}</Text>
                                        </TouchableOpacity>
                                    })
                                }
                            </View>
                        </View>) : <Result answers={answers} currentQuiz={currentQuiz} resultText={resultText} />
                }
            </View>
        </View>
    return (
        <View>
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {

    }
})