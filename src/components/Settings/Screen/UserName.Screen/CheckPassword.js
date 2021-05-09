import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {Button, CheckBox, Text} from 'react-native-elements';
import * as styles from './Styles';
import {TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  Change_User_Name,
  Fetch_Setting,
} from '../../../Redux/Actions/Setting.Action';
export default function CheckPassword(props) {
  const Setting = useSelector((state) => state.Setting);
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const accecptChange = (e) => {
    if (checked === 0)
      //0: last name + first name, 1: first name + last name
      dispatch(Change_User_Name(props.firstName, props.lastName, password));
    if (checked === 1)
      dispatch(Change_User_Name(props.lastName, props.firstName, password));
    dispatch(Fetch_Setting());
    navigation.goBack();
  };
  const cancelChange = (e) => {
    navigation.goBack();
  };
  const [checked, setChecked] = useState(0);

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.styles.container}>
          <View style={styles.styles.block1}>
            <Text h4 h4Style={styles.styles.titleBlock}>
              Preview your new name
            </Text>
            <View style={styles.styles.hr} />
            <Text style={styles.styles.subtitleBlock}>
              Choose how your name will appear on your profile
            </Text>
            <CheckBox
              checked={checked === 0 ? true : false}
              checkedColor="#0F0"
              textStyle={{flex: 1, fontSize: 18, color: 'black'}}
              containerStyle={{backgroundColor: 'white', borderWidth: 0}}
              onIconPress={() => setChecked(0)}
              onPress={() => setChecked(0)}
              size={30}
              title={props.lastName + ' ' + props.firstName}
              uncheckedColor="#F00"
              iconRight
            />
            <CheckBox
              checked={checked === 1 ? true : false}
              containerStyle={{backgroundColor: 'white', borderWidth: 0}}
              checkedColor="#0F0"
              textStyle={{flex: 1, fontSize: 18, color: 'black'}}
              onIconPress={() => setChecked(1)}
              onPress={() => setChecked(1)}
              size={30}
              title={props.firstName + ' ' + props.lastName}
              uncheckedColor="#F00"
              iconRight
            />
            <Text style={[styles.styles.titleInput]}>
              To save this setting, please enter your password
            </Text>
            <View style={[styles.styles.inputBox, {marginVertical: 10}]}>
              <TextInput
                style={[styles.styles.inputText]}
                onChangeText={(e) => setPassword(e)}
                value={password}
                autoCapitalize="none"
                secureTextEntry={true}
                placeholder={'Type password here...'}
              />
            </View>
            <View>
              <Button
                buttonStyle={{borderWidth: 1, borderColor: 'black'}}
                containerStyle={{margin: 10}}
                onPress={() => accecptChange()}
                title="Save change"
                titleStyle={{marginHorizontal: 5}}
              />
              <Button
                type="outline"
                buttonStyle={{
                  backgroundColor: 'white',
                  borderColor: 'black',
                }}
                containerStyle={{margin: 10}}
                onPress={cancelChange}
                title="Cancel"
                titleStyle={{marginHorizontal: 5, color: 'black'}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
