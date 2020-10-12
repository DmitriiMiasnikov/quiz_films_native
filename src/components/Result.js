import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const screen = Dimensions.get('screen');

export const Result = ({ answers, currentQuiz, resultText }) => {
  return (
    <View>
      <View style={styles.resultTextBlock}>
        <Text style={styles.resultText}>{resultText}</Text>
      </View>
      {
        currentQuiz.questions.map((el, i) => {
          return <View style={styles.item} key={i}>
            <Image source={{ uri: currentQuiz.questions[i].src }} style={styles.image}></Image>
            <View style={styles.questions}>
              {
                currentQuiz.questions[i].options.map((el, item) => {
                  return <View style={styles.question} key={item}>
                    <View style={styles.icon}>{
                      answers[i][1] === item ? <Entypo name={currentQuiz.questions[i].currect === el ? 'circle-with-plus' : 'circle-with-cross'}
                        size={32} color={answers[i][0] ? 'green' : 'red'} /> :
                        currentQuiz.questions[i].currect === el ? <Entypo name={'circle-with-plus'}
                          size={32} color={'green'} /> : null
                    }
                    </View>
                    <View style={styles.textBlock}><Text style={styles.text}>{el}</Text></View>
                  </View>
                })
              }
            </View>
          </View>
        })
      }
    </View>
  )
}
const styles = StyleSheet.create({
  item: {
    marginBottom: 5
  },
  image: {
    width: screen.width - 20,
    height: 250,
    borderRadius: 10
  },
  question: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingVertical: 3,
    minHeight: 35
  },
  icon: {
    width: 35
  },
  textBlock: {
    marginLeft: 10
  },
  text: {
    fontSize: 20
  },
  resultTextBlock: {
    alignItems: 'center',
    marginBottom: 10
  },
  resultText: {
    fontSize: 22
  }
})