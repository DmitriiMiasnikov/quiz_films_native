import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export const MainScreen = () => {
    return (
        <View style={styles.wrapper}>
            <Text>
                главная
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        textAlign: 'center'
    }
})