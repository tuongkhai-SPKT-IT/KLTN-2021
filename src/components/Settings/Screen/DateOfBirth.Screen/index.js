import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Fetch_Setting} from '../../../Redux/Actions/Setting.Action';
import DateDropDown from './DateDropDown';

export default function index({navigation}) {
  const Setting = useSelector((state) => state.Setting);
  const dateOfBirth = Setting.dob;
  const dispatch = useDispatch();
  const [day, setDay] = useState(dateOfBirth.slice(0, 2));
  const [month, setMonth] = useState(dateOfBirth.slice(3, 5));
  const [year, setYear] = useState(dateOfBirth.slice(-4));
  useEffect(() => {
    if (Setting.dob === '01/01/0001') {
      dispatch(Fetch_Setting());
    }
  }, [Setting.dob]);
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
    console.log(1);
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
