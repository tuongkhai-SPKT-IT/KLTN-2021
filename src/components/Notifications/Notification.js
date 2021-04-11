import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Notification() {
    return (
        <View style={styles.container}>
            <View style={styles.notiAvatar}></View>
            <View style={styles.notiContent}></View>
            <View style={styles.notiExpandOption}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#fff"
    },
    notiAvatar: {
        flex: 1,
        backgroundColor: "yellow",
    },
    notiContent: {
        flex: 4,
        backgroundColor: "gray",
    },
    notiExpandOption: {
        flex: 1,
        backgroundColor: "pink"
    }
})
