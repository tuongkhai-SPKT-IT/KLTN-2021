import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Appbar,
  IconButton,
  Portal,
  Avatar,
  List,
  Modal,
  Button,
  Colors,
} from 'react-native-paper';
import {SafeAreaView} from 'react-navigation';
import {useSelector} from 'react-redux';
import {SOCKET} from '../../config';
import jwt_decode from 'jwt-decode';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Notifications({navigation}) {
  const [visible, setVisible] = useState(false);
  const OtherProfile = useSelector((state) => state.OtherProfile);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 10};
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  SOCKET.on('server-push-notification', (data) => {
    console.log('new noti: ', data);
    const token = jwt_decode(
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLmZhY2Vib29rLWtsdG4uYWxwaGF3b2xmLmlvL2FwaS91c2VyL2xvZy1pbiIsImlhdCI6MTYxNzI5NTYwMiwibmJmIjoxNjE3Mjk1NjAyLCJqdGkiOiJKU25zbFNqWE4yZFpBSmhVIiwic3ViIjoiNjA1MzM4M2ZmY2Y5ZTk2YzJlMjI5OGM1IiwicHJ2IjoiMzg1MmIyMTg1MDEzNTZkMzNjNjEyOTJiNzVmMmFkNzU3Mjk4NmExNyIsInVzZXJfbmFtZSI6Ilx1MDExMFx1MWVkNyBUXHUwMWIwXHUxZWRkbmcgS2hcdTFlYTNpIiwidXNlcl9pZCI6IjYwNTMzODNmZmNmOWU5NmMyZTIyOThjNCIsInVzZXJfZnVsbF9uYW1lIjoiXHUwMTEwXHUxZWQ3IFRcdTAxYjBcdTFlZGRuZyBLaFx1MWVhM2kiLCJwaG9uZSI6IjA1ODU1MTE5NTUiLCJlbWFpbCI6ImRvdHVvbmdraGFpMTkxOTk5QGdtYWlsLmNvbSIsInNleCI6IjEifQ.hYaNha5IrWSoHlM1TyT2Bdp_PcDaTvRXEz1iYdiQGNM',
    );
  });

  const renderItem = ({item}) => {
    return (
      <List.Item
        style={{backgroundColor: '#fff', marginTop: 10}}
        title="Co Khanh added a photo"
        description="10 minutes ago"
        left={() => (
          <Avatar.Image
            size={45}
            source={{
              uri: 'http://api.facebook-kltn.alphawolf.io/image/default.jpg',
            }}
          />
        )}
        right={(props) => (
          <IconButton {...props} icon="dots-vertical" onPress={showModal} />
        )}
        onPress={() => {
          SOCKET.emit('foo', 'hello');
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={{backgroundColor: '#fff'}}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{justifyContent: 'center', marginRight: 10}}>
          <Ionicons name="ios-menu-sharp" size={30} />
        </TouchableOpacity>
        <Appbar.Content title="Notifications" />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
      </Appbar.Header>
      <FlatList
        data={[
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
        ]}
        keyExtractor={(item) => item.toString()}
        renderItem={renderItem}
      />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Button
            icon={() => {
              return (
                <IconButton
                  icon="delete-circle"
                  color={Colors.blueGrey700}
                  size={28}
                />
              );
            }}
            contentStyle={{
              marginRight: 100,
            }}
            onPress={() => {
              alert('Removed!');
            }}>
            <Text style={{color: '#21232A'}}>Remove this notification</Text>
          </Button>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
