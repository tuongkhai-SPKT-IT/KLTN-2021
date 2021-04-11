import React, { useState } from 'react'
import { ScrollView, Text } from 'react-native';
import { StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { Appbar, IconButton, Portal, Avatar, List, Modal, Button, Colors } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';

export default function Notifications() {
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 10 };
    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');

    const renderItem = ({ item }) => {
        return (
            <List.Item
                style={{ backgroundColor: '#fff', marginTop: 10 }}
                title="Co Khanh added a photo"
                description="10 minutes ago"
                left={() => <Avatar.Image size={45} source={{ uri: 'http://api.facebook-kltn.alphawolf.io/image/default.jpg' }} />}
                right={(props) => <IconButton {...props} icon="dots-vertical" onPress={showModal} />}
                onPress={() => { alert('hi from notification') }}
            />
        )

    };

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header style={{ backgroundColor: "#fff" }}>
                <Appbar.Content title="Notifications" />
                <Appbar.Action icon="magnify" onPress={_handleSearch} />
            </Appbar.Header>
            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
                keyExtractor={(item) => item.toString()}
                renderItem={renderItem}
            />
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>

                    <Button
                        icon={() => {
                            return (
                                <IconButton
                                    icon="delete-circle"
                                    color={Colors.blueGrey700}
                                    size={28}
                                />
                            )
                        }}
                        contentStyle={{
                            marginRight: 100
                        }}
                        onPress={()=>{alert('Removed!')}}
                    >
                        <Text style={{color: "#21232A"}}>
                            Remove this notification
                        </Text>
                    </Button>

                </Modal>
            </Portal>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
