import AsyncStorage from '@react-native-async-storage/async-storage';
import * as keys from '../../Constants';
var initState = {
  information: [],
};
importData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    const info = [];
    for (var i = 0; i < result.length; i++) {
      info.push({
        name: result[i][0],
        value: result[i][1],
      });
    }
    initState.information = info;
  } catch (error) {
    console.error(error);
  }
};
// importData();
// console.log(importData());
// console.log(info);
var UserInfo = (state = initState, action) => {
  importData();
  switch (action.type) {
    default:
      return state;
  }
};
export default UserInfo;
