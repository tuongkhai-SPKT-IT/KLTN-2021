import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AppBar() {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.appName}>
                        <Text style={styles.appName}>facebook</Text>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Feather name="search" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <MaterialCommunityIcons name="facebook-messenger" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    container: {
        width: '100%',
        height: 56,
        paddingTop: 5,
        paddingBottom: 0,
        paddingLeft: 11,
        paddingRight: 11,
        alignItems: 'center',
        flex:1,
        justifyContent: 'space-between',
    },
    appName:{
        color: '#3a86e9',
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: -0.3,
        flex: 8
    },
    button: {
        width: 42,
        height:42,
        borderRadius: 21,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 16
    }
})
