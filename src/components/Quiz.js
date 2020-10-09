import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const screen = Dimensions.get('screen');

export const Quiz = ({ item, onOpen }) => {
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.imageBlock} activeOpacity={0.8} onPress={() => onOpen(item)}>
                <Image style = {styles.image} source={{ uri: item.src }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.textBlock}>
                <Text style={styles.text}>
                    {item.en}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center'
    },
    imageBlock: {
        width: screen.width,
        height: 200,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20
    },
    textBlock: {

    },
    text: {
        fontSize: 24
    }
})