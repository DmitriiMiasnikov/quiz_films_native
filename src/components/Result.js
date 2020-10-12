import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export const Result = ({ answers, currentQuiz, resultText }) => {
    return (
        <View style={styles.result}>
            {
                currentQuiz.questions.map((el, i) => {
                    return <View style={styles.item} key={i}>
                        <Image source={{ uri: currentQuiz.questions[i].src }} style={styles.image}></Image>
                        <View style={styles.questions}>
                            {
                                currentQuiz.questions[i].options.map((el, item) => {
                                    return <View style={styles.question} key={item}>
                                        <View style={styles.tickCross,
                                            answers[i][1] === item && answers[i][0] === false ? styles.wrong : null,
                                            currentQuiz.questions[i].currect === el ? styles.right : null
                                        }></View>
                                        <View style={styles.text}><Text>{el}</Text></View>
                                    </View>
                                })
                            }
                        </View>
                    </View>
                })
            }
            <View style={styles.resultText}>
                <Text>{resultText}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    result: {

    }
})