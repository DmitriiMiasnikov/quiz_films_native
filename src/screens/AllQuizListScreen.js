import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuizThunk } from '../store/reducers/MainPageReducer';

import { Quiz } from './../components/Quiz'

export const AllQuizListScreen = ({ navigation }) => {
    const data = useSelector(state => state.mainPage.quizAll)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllQuizThunk())
    }, [])
    const onOpen = (quiz) => {
        navigation.navigate('Quiz', { name: quiz.name })
    }
    return (
        <View style={styles.wrapper}>
            <FlatList data={data} keyExtractor={el => el.name.toString()}
                renderItem={({ item }) => <Quiz item={item} onOpen={onOpen} />} />
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        padding: 15
    }
})