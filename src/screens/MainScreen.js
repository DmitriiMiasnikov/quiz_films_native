import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomQuiz } from '../store/reducers/quizReducer';
import { THEME } from '../theme';
import { getAllQuizThunk } from './../store/reducers/MainPageReducer'

export const MainScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const quizAll = useSelector(state => state.mainPage.quizAll);
    const loading = useSelector(state => state.mainPage.loading);

    useEffect(() => {
        dispatch(getAllQuizThunk())
    }, [dispatch])

    const getRandomQuizHandler = () => {
        const randomTest = Math.floor(Math.random() * quizAll.length)
        dispatch(getRandomQuiz(quizAll[randomTest].name))
        const currentQuiz = dispatch(getRandomQuiz(quizAll[randomTest].name)).currentQuiz
        navigation.navigate('Quiz', {
            name: currentQuiz,
            quiz: quizAll.find(el => el.name === currentQuiz)
        })
    }
    
    const counterTests = () => {
        return quizAll.length
    }
    if (loading) {
        return <View style={styles.loading}>
            <ActivityIndicator color={THEME.MAIN_COLOR} />
        </View>
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.title}>
                <Text style={styles.titleText}>
                    Welcome to app!
                </Text>
            </View>
            <View style={styles.subtitle}>
                <Text style={styles.subTitleText}>
                    Test your knowledge of your favorite films.
                </Text>
            </View>
            <View style={styles.counter}>
                <Text style={styles.counterText}>
                    total tests: {counterTests()}
                </Text>
            </View>
            <TouchableOpacity style={styles.buttonRandomTest} activeOpacity={0.8} onPress={() => getRandomQuizHandler()}>
                <Text style={styles.buttonRandomTestText}>
                    start random test
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        textAlign: 'center',
        alignItems: 'center'
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100
    },
    titleText: {
        fontSize: 24
    },
    subtitle: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitleText: {
        fontSize: 20
    },
    counter: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30
    },
    counterText: {
        fontSize: 24
    },
    buttonRandomTest: {
        width: 250,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        backgroundColor: THEME.MAIN_COLOR
    },
    buttonRandomTestText: {
        fontSize: 24,
        color: 'white'
    }
})