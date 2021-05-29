import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ContentStatus from '../ContentStatus';
import {Get_StatusProfile} from '../Redux/Actions/ProfileUser.Action';

export default function StatusScreen({navigation, route}) {
  const dispatch = useDispatch();
  const ProfileInfo = useSelector((state) => state.ProfileInfo);
  const [srcData, setSrcData] = useState({});
  useEffect(() => {
    if (ProfileInfo.statusUser.length === 0) {
      dispatch(Get_StatusProfile());
    }
    if (ProfileInfo.statusUser.length !== 0) {
      const temp = ProfileInfo.statusUser.find(
        (x) => x.id === route.params.statusId,
      );
      setSrcData(temp);
    }
  }, [ProfileInfo.statusUser]);
  if (Object.keys(srcData).length !== 0)
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{backgroundColor: 'white', marginTop: 10}}>
        <ContentStatus profilePage={false} srcData={srcData} />
      </ScrollView>
    );
  return <></>;
}

const styles = StyleSheet.create({});
