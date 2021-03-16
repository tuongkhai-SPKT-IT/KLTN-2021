import React, { Component, useEffect, useRef, useState } from 'react';
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
import { Button } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import SwipeDownModal from 'react-native-swipe-down';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
// import Slideshow from 'react-native-slideshow';
import * as styles from './Styles';
const ImageGrid = (props) => {
  // useEffect(() => {
  //   modalRef.current.open();
  // }, []);
  const deviceWidth = Dimensions.get('screen').width;
  const deviceHeight = Dimensions.get('screen').height;
  // const [paging, setPaging] = useState(0);
  // console.log(paging);
  const paging = useRef(0);
  const { srcImage } = props;
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
              style={{ flex: 1 }}
              onPress={() => {
                if (modalRef.current) modalRef.current.open();
              }}>
              <Image
                source={{ uri: val }}
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
    const srcImage1 = [src[1], src[2]];

    return (
      <View style={styles.stylesImageGrid.container}>
        <Pressable
          style={{ flex: 1 }}
          onPress={async () => {
            await modalRef.current.open();
            if (scrollViewRef.current) {
              setTimeout(() => {
                scrollViewRef.current.scrollTo({
                  x: 0,
                  animated: false,
                  y: 0,
                });
              }, 1 * 100);
            }
          }}>
          <Image
            source={{ uri: uriImg1 }}
            resizeMode="stretch"
            resizeMethod="auto"
            style={styles.stylesImageGrid.fullsize}
          />
        </Pressable>
        <View style={{ flex: 1 }}>
          {srcImage1.map((val, i) => {
            return (
              <Pressable
                key={i}
                style={{ flex: 1 }}
                onPress={async () => {
                  await modalRef.current.open();
                  if (scrollViewRef.current) {
                    setTimeout(() => {
                      scrollViewRef.current.scrollTo({
                        x: deviceWidth * (i + 1),
                        animated: false,
                        y: 0,
                      });
                    }, 1 * 100);
                  }
                }}>
                <Image
                  source={{ uri: val }}
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
                paging.current = 3;
                setTimeout(() => {
                  scrollViewRef.current.scrollTo({
                    x: deviceWidth * 3,
                    animated: false,
                    y: 0,
                  });
                }, 1 * 100);
              }
            }}>
            <Text style={styles.stylesImageGrid.textExtend}>
              +{srcImage.length - 4}
            </Text>
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
                  paging.current = i;
                  console.log(paging.current);
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
        source={{ uri: item }}
        resizeMode="contain"
        style={{ width: deviceWidth }}
      />
    );
  };
  return (
    <>
      {/* {console.log(srcImage.length)} */}
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
        {console.log(paging.current)}
        {paging.current > 0 && <Button
          buttonStyle={{ width: 50, backgroundColor: 'rgba(0,0,0,1)', height: 50, }}
          containerStyle={{ margin: 5, position: 'absolute', top: deviceHeight / 2 - 50, left: 0, zIndex: 999 }}
          icon={<AntDesignIcon name="caretleft" size={25} color="rgba(255,255,255,.5)" />}
          onPress={() => {
            console.log(paging.current);
            paging.current <= 0 ? paging.current = 0 : paging.current--;
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollTo({
                x: deviceWidth * paging.current,
                animated: false,
                y: 0,
              });
            }
          }}
        />}
        <Button
          buttonStyle={{ width: 50, backgroundColor: 'rgba(0,0,0,1)', height: 50, }}
          containerStyle={{ margin: 5, position: 'absolute', top: deviceHeight / 2 - 50, right: 0, zIndex: 999 }}
          icon={<AntDesignIcon name="caretright" size={25} color="rgba(255,255,255,.5)" />}
          onPress={() => {
            console.log(paging.current);
            paging.current >= srcImage.length - 1 ? paging.current = srcImage.length - 1 : paging.current++;
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollTo({
                x: deviceWidth * paging.current,
                animated: false,
                y: 0,
              });
            }
          }}
        />
        <ScrollView
          ref={scrollViewRef}
          scrollEnabled={false}
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
