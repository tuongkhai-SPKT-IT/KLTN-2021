import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ToolBar from '../ToolBar';

export default function AppBar() {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <View style={styles.row}>
                        <View style={styles.appName}>
                            <Text style={styles.appName}>facebook</Text>
                        </View>
                        <TouchableOpacity style={styles.button}>
                            <Feather name="search" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.containerBody}>
                    <ScrollView style={styles.scrollView}>
                        <ToolBar />
                        <View style={styles.divider}></View>
                        <ScrollView>
                            <View style={[styles.statusField, { backgroundColor: "red" }]}></View>
                            <View style={styles.divider}></View>

                            <View style={{ flex: 1, backgroundColor: "green", width: "100%", height: 300 }}></View>
                            <View style={styles.divider}></View>

                            <View style={{ flex: 1, backgroundColor: "yellow", width: "100%", height: 300 }}></View>
                            <View style={styles.divider}></View>

                            <View style={{ flex: 1, backgroundColor: "gray", width: "100%", height: 300 }}></View>
                            <View style={styles.divider}></View>

                            <View style={{ flex: 1, backgroundColor: "brown", width: "100%", height: 300 }}></View>
                        </ScrollView>

                    </ScrollView>
                </View>
            </View>
            {/* <ToolBar/> */}
        </>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    scrollView:{
        marginHorizontal:-10
    },
    divider: {
        width: "100%",
        height: 15,
        backgroundColor: "#CCCCD2",
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
        backgroundColor: "#fff"
    },
    containerHeader:{
        flex: 1, width:"100%", backgroundColor: "#fff"
    },
    containerBody:{
        flex: 14, width: "100%" ,backgroundColor: "#fff"
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
    },
    statusField:{
        flex:1, width: "100%",height: 300
    }
})
