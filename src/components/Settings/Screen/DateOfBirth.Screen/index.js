import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import DateDropDown from './DateDropDown';

export default function index({navigation}) {
  const Setting = useSelector((state) => state.Setting);
  
  const [day, setDay] = useState('01');
  const [month, setMonth] = useState('01');
  const [year, setYear] = useState('0001');
  const setValueDate = (a, value) => {
    if (a === 1) {
      setDay(value);
    }
    if (a === 2) {
      setMonth(value);
    }
    if (a === 3) {
      setYear(value);
    }
  };
  return (
    <View>
      <DateDropDown
        day={day}
        month={month}
        year={year}
        setValueDate={setValueDate}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
