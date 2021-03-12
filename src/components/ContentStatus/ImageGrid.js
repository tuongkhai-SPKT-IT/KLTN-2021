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

// import Slideshow from 'react-native-slideshow';
import * as styles from './Styles';
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
      <View style={styles.stylesImageGrid.container}>
        {src.map((val, i) => {
          return (
            <Pressable
              key={i}
              style={{flex: 1}}
              onPress={() => Alert.alert('hello')}>
              <Image
                source={{uri: val}}
                resizeMode="stretch"
                style={styles.stylesImageGrid.fullsize}
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
      <View style={styles.stylesImageGrid.container}>
        <Pressable style={{flex: 1}} onPress={() => Alert.alert('hello')}>
          <Image
            source={{uri: uriImg1}}
            resizeMode="stretch"
            resizeMethod="auto"
            style={styles.stylesImageGrid.fullsize}
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
                  style={styles.stylesImageGrid.fullsize}
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
      <View style={styles.stylesImageGrid.container}>
        {srcImage.length > 4 ? (
          <Pressable
            style={styles.stylesImageGrid.boxExtend}
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
            <Text style={styles.stylesImageGrid.textExtend}>+{srcImage.length - 4}</Text>
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
                style={styles.stylesImageGrid.fullsize}
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
        // swipeThreshold={1}
        swipeArea={500}
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
