import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default function Avatar({source, isHomePage}) {
    return (
        <View style={styles.container}>
            <Image
                style={{
                    width: isHomePage ? 40 : 45,
                    height: isHomePage ? 40 : 45,
                    borderRadius: isHomePage ? 20 : 25,
                }}
                source={{
                    uri:source
                }}
                resizeMode="cover"
            >
            </Image>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: 40,
        height: 40,
        position: "relative"
    },
    user: {
        width: 45,
        height: 45,
        borderRadius: 25,
    }
})
