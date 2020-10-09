import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getFilmsQuizThunk } from '../store/reducers/MainPageReducer';

import { Quiz } from './../components/Quiz'

export const FilmsQuizListScreen = ({ navigation }) => {
    const data = useSelector(state => state.mainPage.quizFilms);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFilmsQuizThunk())
    }, [])
    const onOpen = (quiz) => {
        navigation.navigate('Quiz', { name: quiz.name, quiz })
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
        paddingHorizontal: 10
    }
})