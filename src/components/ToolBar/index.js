import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, Button, Pressable, TouchableOpacity,Dimensions, SafeAreaView, ScrollView } from 'react-native'
import Avatar from '../Avatar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Modal from 'react-native-modalbox';
import AsyncStorage from '@react-native-async-storage/async-storage'
import DropDownPicker from 'react-native-dropdown-picker';
import * as StatusServices from '../../services/status';

export default function ToolBar() {
    const [enablePost, setEnablePost] = useState(false);
    const [status,setStatus] = useState('');
    const [option,setOption] = useState('pub');
    const initRef = useRef(null);
    const popUpStatusModal = () => {
        initRef.current.open();
    }
    useEffect(()=>{
        StatusServices.PostStatus('ssfroms Toolbar async')
    },[])
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={{ marginRight: 10 }}>
                    <Avatar
                        isHomePage = {true}
                        source="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/149073172_1859273204249215_4116523381875818269_o.jpg?_nc_cat=107&ccb=3&_nc_sid=09cbfe&_nc_ohc=IDteYGmxQfwAX9agsYE&_nc_ht=scontent.fsgn2-1.fna&oh=844b3a40ff72c2764e1f4f39a8c62e1d&oe=606449C9"
                    />
                </View>
                <Pressable style={styles.input} onPress={()=>popUpStatusModal()}>
                    <Text>Bạn đang nghĩ gì?</Text>
                </Pressable>
                {/* <TextInput placeholder="Bạn đang nghĩ gì?" style={styles.input} onFocus={() => popUpStatusModal()} /> */}
            </View>
            <View style={styles.divider}>
                <View style={styles.row}>
                    <View style={styles.menu}>
                        <Ionicons.Button style={styles.memuButton} name="ios-videocam" size={22} color="#f44337">Live</Ionicons.Button>
                        <View style={styles.separator}></View>
                    </View>

                    <View style={styles.menu}>
                        <MaterialIcons.Button style={styles.memuButton} name="photo-size-select-actual" size={20} color="#4caf50">Photo</MaterialIcons.Button>
                        <View style={styles.separator}></View>
                    </View>

                    <View style={styles.menu}>
                        <Entypo.Button style={styles.memuButton} name="location-pin" size={22} color="#e141fc">Check in</Entypo.Button>
                        <View style={styles.separator}></View>
                    </View>
                </View>
                <Modal
                    position="center"
                    swipeToClose={true}
                    ref={initRef}
                    coverScreen
                >
                    <ScrollView>
                        <View style={styles.popupStatus}>
                            <View style={[styles.popupStatusHeader,{
                                position: "relative"
                            }]}>
                                <View style={styles.popupStatusHeaderBack}>
                                    <Ionicons name="arrow-back" color="black" size={22} onPress={()=>{
                                        initRef.current.close();
                                        setStatus('')
                                    }}/>
                                </View>
                                <View style={[styles.popupStatusHeaderContent, { justifyContent: "center" }]}>
                                    <Text style={{
                                        fontSize: 20,
                                    }}>Tạo bài viết</Text>
                                </View>
                                <View style={[styles.popupStatusHeaderButtonSubmit, { justifyContent: "center" }]}>
                                    <TouchableOpacity 
                                        style={[styles.submitButton, {
                                            backgroundColor: status === '' ? '#EEEEEE' : '#1058B0'
                                        }]}
                                    >
                                        <Text
                                            style={{
                                                color: status !== '' ? "#f9f3f3" : "#bbbbbb"
                                            }}
                                        >
                                            Đăng
                                    </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.divider}></View>
                            <View style={styles.popupStatusContent}>
                                <View style={styles.popupStatusUser}>
                                    <View style={styles.avatarBlock}>
                                        <Avatar
                                            isHomePage={false}
                                            source="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/149073172_1859273204249215_4116523381875818269_o.jpg?_nc_cat=107&ccb=3&_nc_sid=09cbfe&_nc_ohc=IDteYGmxQfwAX9agsYE&_nc_ht=scontent.fsgn2-1.fna&oh=844b3a40ff72c2764e1f4f39a8c62e1d&oe=606449C9"
                                        />
                                    </View>
                                    <View style={styles.statusUserRestBlock}>
                                        <View style={styles.statusUserName}>
                                            <Text style={{ fontSize: 19 }}>Cơ Khánh</Text>
                                        </View>
                                        <View style={styles.statusOption}>
                                            <DropDownPicker
                                                items={[
                                                    { label: 'Public', value: 'pub', icon: () => <Ionicons name="earth-outline" size={18} color="#bbbbbb" /> },
                                                    { label: 'Private', value: 'priv', icon: () => <Feather name="lock" size={18} color="#bbbbbb" /> },
                                                    { label: 'Friends', value: 'friend', icon: () => <Ionicons name="people-outline" size={18} color="#bbbbbb" /> },
                                                ]}
                                                defaultValue={option}
                                                containerStyle={{ height: 30, width: 115 }}
                                                style={styles.statusButton}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                                onChangeItem={item => setOption(item.value)}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.popupStatusMainContent]}>
                                    <TextInput
                                        placeholder="Bạn đang nghĩ gì?"
                                        multiline={true}
                                        style={{
                                            height: 530,
                                            textAlign:"justify",
                                            textAlignVertical:"top",
                                            fontSize: 17
                                        }}
                                        value={status}
                                        onChangeText={setStatus}
                                    />
                                </View>
                            </View>
                            {/* <Button style={{ backgroundColor: 'red' }} onPress={() => { initRef.current.close(); setStatus('') }} title="Close" /> */}
                        </View>
                    </ScrollView>
                    
                </Modal>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 92,
    },
    row: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        width: "100%",
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 11,
        paddingLeft: 11,
        alignItems: "center"
    },
    input: {
        height: 50,
        flex: 1,
        paddingTop: -20,
        paddingBottom: -20,
        paddingLeft: 20,
        paddingRight: 8,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,.5)",
        borderRadius: 30,
        height: 35,
        justifyContent: "space-around"
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#f0f0f0",
        marginTop: 10
    },
    menu: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 42
    },
    memuButton: {
        paddingLeft: 11,
        fontWeight: '500',
        fontSize: 12,
        backgroundColor: "#ffffff"
    },
    separator: {
        width: 1,
        height: 26,
        backgroundColor: "#f0f0f0"
    },
    popupStatus: {
        flex: 1,
        position: "relative"
    },
    popupStatusHeader:{
        flex: 1,
        flexDirection:"row",
        justifyContent: "space-around",
        marginBottom: "auto",
        // marginTop: "auto",
        position: "relative"
    },
    popupStatusContent:{
        flex: 6,
        marginTop: "auto"
    },
    popupStatusFooter:{
        flex: 1,
        backgroundColor: "red"
    },
    popupStatusHeaderBack:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    popupStatusHeaderContent:{
        flex: 6,
    },
    popupStatusHeaderButtonSubmit:{
        flex: 2.5,
    },
    popupStatusUser:{
        flex: 1,
        flexDirection: "row",
        marginBottom: 4,
        marginTop: 1
    },
    popupStatusMainContent:{
        flex: 4,
        marginTop: 5,
    },
    submitButton: {
        width: 85,
        height:35,
        top:2,
        borderRadius: 10,
        // backgroundColor: status === '' ? '#EEEEEE': '#1058B0',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 16,
    },
    statusButton: {
        // width: 70,
        // height:30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#dddddd",
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 0
    },
    avatarBlock:{
        flex:1,
        alignItems: "center",
        justifyContent: "space-around"
    },
    statusUserRestBlock:{
        flex:5,
    },
    statusUserName:{
        flex:1,
        
    },
    statusOption:{
        flex:1,
    }
})
