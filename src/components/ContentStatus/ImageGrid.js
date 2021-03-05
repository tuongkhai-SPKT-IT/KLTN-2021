import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  Pressable,
  Alert,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modalbox';
import FastImage from 'react-native-fast-image';

// import Slideshow from 'react-native-slideshow';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: 540,
  },
  fullsize: {width: '100%', height: '100%'},
  boxExtend: {
    width: '50%',
    backgroundColor: 'rgba(0,0,0,.8)',
    position: 'absolute',
    elevation: 3,
    zIndex: 999,
    opacity: 0.85,
    height: 540 / 2,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
  },
  textExtend: {
    fontSize: 50,
    color: 'white',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const ImageGrid = (props) => {
  const deviceWidth = Dimensions.get('screen').width;
  const {srcImage} = props;
  if (srcImage.length === 0) {
    return <></>;
  }
  const modalRef = useRef(null);
  const scrollViewRef = useRef(null);
  const render2Image = (src) => {
    return (
      <View style={styles.container}>
        {src.map((val, i) => {
          return (
            <Pressable
              key={i}
              style={{flex: 1}}
              onPress={() => Alert.alert('hello')}>
              <Image
                source={{uri: val}}
                resizeMode="stretch"
                style={styles.fullsize}
              />
            </Pressable>
          );
        })}
      </View>
    );
  };
  const render3Image = (src) => {
    const uriImg1 = src[0];
    src.shift();
    return (
      <View style={styles.container}>
        <Pressable style={{flex: 1}} onPress={() => Alert.alert('hello')}>
          <Image
            source={{uri: uriImg1}}
            resizeMode="stretch"
            resizeMethod="auto"
            style={styles.fullsize}
          />
        </Pressable>
        <View style={{flex: 1}}>
          {src.map((val, i) => {
            return (
              <Pressable
                key={i}
                style={{flex: 1}}
                onPress={() => Alert.alert('hello')}>
                <Image
                  source={{uri: val}}
                  resizeMode="stretch"
                  resizeMethod="auto"
                  style={styles.fullsize}
                />
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  };
  const render4PlusImage = (src) => {
    const uri = src.slice(0, 4);
    return (
      <View style={styles.container}>
        {srcImage.length > 4 ? (
          <Pressable
            style={styles.boxExtend}
            onPress={async () => {
              await modalRef.current.open();
              if (scrollViewRef.current) {
                setTimeout(() => {
                  scrollViewRef.current.scrollTo({
                    x: deviceWidth * 3,
                    animated: false,
                    y: 0,
                  });
                }, 1 * 100);
              }
            }}>
            <Text style={styles.textExtend}>+{srcImage.length - 4}</Text>
          </Pressable>
        ) : (
          <></>
        )}
        {uri.map((val, i) => {
          return (
            <Pressable
              key={i}
              style={{
                width: '50%',
                height: 540 / 2,
              }}
              onPress={async () => {
                await modalRef.current.open();
                if (scrollViewRef.current) {
                  setTimeout(() => {
                    scrollViewRef.current.scrollTo({
                      x: deviceWidth * i,
                      animated: false,
                      y: 0,
                    });
                  }, 1 * 100);
                }
              }}>
              <Image
                resizeMode="stretch"
                style={styles.fullsize}
                source={{
                  uri: val,
                }}
              />
            </Pressable>
          );
        })}
      </View>
    );
  };

  const ImageScroll = (item, i) => {
    return (
      <Image
        key={i}
        source={{uri: item}}
        resizeMode="contain"
        style={{width: deviceWidth}}
      />
    );
  };
  return (
    <>
      {srcImage.length <= 2 && render2Image(srcImage)}
      {srcImage.length === 3 && render3Image(srcImage)}
      {srcImage.length >= 4 && render4PlusImage(srcImage)}
      <Modal
        position="center"
        coverScreen
        backButtonClose
        // swipeToClose={false}
        swipeThreshold={100}
        swipeArea={100}
        ref={modalRef}>
        <ScrollView
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          snapToInterval={deviceWidth}
          horizontal
          decelerationRate="fast">
          {srcImage.map(ImageScroll)}
        </ScrollView>
      </Modal>
    </>
  );
};

export default ImageGrid;
