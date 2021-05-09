import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function DateDropDown(props) {
  let dateValue = [{value: props.day, label: props.day, icon: () => <></>}],
    monthValue = [],
    yearValue = [];

  const thisYear = new Date().getFullYear();
  useEffect(() => {
    for (var i = 1; i < 32; i++) {
      dateValue.push({
        value: `0${i}`.slice(-2),
        label: `0${i}`.slice(-2),
        icon: () => <></>,
      });
    }
    for (var i = 1; i < 13; i++) {
      monthValue.push({
        value: `0${i}`.slice(-2),
        label: `0${i}`.slice(-2),
        icon: () => <></>,
      });
    }
    for (var i = 1905; i < thisYear + 1; i++) {
      yearValue.push({
        value: i.toString(),
        label: i.toString(),
        icon: () => <></>,
      });
    }
  }, []);
  return (
    <View style={{flexDirection: 'row'}}>
      <DropDownPicker //day
        items={dateValue}
        defaultValue={props.day}
        containerStyle={{height: 30, width: 115}}
        style={styles.statusButton}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        onChangeItem={(item) => props.setValueDate(1, item.value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
