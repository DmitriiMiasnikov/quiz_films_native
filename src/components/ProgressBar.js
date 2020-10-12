import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export const ProgressBar = ({ currentQuiz, answers }) => {
  return (
    <View style={styles.progress}>
      {
        currentQuiz.questions.map((el, i) => {
          return <View className={styles.point} key={i}><View className={styles.image}>
            {
              answers[i] ? <Entypo name={answers[i][0] ? 'circle-with-plus' : 'circle-with-cross'}
                size={35} color={answers[i][0] ? 'green' : 'red'} /> : <Entypo name="circle" size={32} color="black" />
            }

          </View></View>
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6
  }
})