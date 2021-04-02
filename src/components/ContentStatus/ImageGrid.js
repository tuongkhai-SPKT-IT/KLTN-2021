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
import Video from 'react-native-video';
import {Button} from 'react-native-elements';
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
  const paging = useRef(0);
  const {srcImage} = props;
  if (srcImage.length === 0) {
    return <></>;
  }
  // const modalRef = useRef(null);
  const scrollViewRef = useRef(null);
  const render2File = (src) => {
    return (
      <View style={styles.stylesImageGrid.container}>
        {src.map((val, i) => {
          return val.type === 'image' ? (
            <Pressable
              key={i}
              style={{flex: 1}}
              onPress={() => {
                setVisible(true);
                // if (modalRef.current) modalRef.current.open();
              }}>
              <Image
                source={{uri: val.uri}}
                resizeMode="stretch"
                style={styles.stylesImageGrid.fullsize}
              />
            </Pressable>
          ) : (
            <>
              <Pressable key={i} style={{flex: 1}}>
                <Video
                  controls
                  resizeMode="contain"
                  source={{uri: val.uri}}
                  style={styles.stylesImageGrid.fullsize}
                />
              </Pressable>
            </>
          );
        })}
      </View>
    );
  };
  const render3File = (src) => {
    const uriImg1 = src[0];
    const srcImage1 = [src[1], src[2]];

    return (
      <View style={styles.stylesImageGrid.container}>
        <Pressable
          style={{flex: 1}}
          onPress={async () => {
            setVisible(true);
            // await modalRef.current.open();
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
            source={{uri: uriImg1.uri}}
            resizeMode="stretch"
            resizeMethod="auto"
            style={styles.stylesImageGrid.fullsize}
          />
        </Pressable>
        <View style={{flex: 1}}>
          {srcImage1.map((val, i) => {
            return (
              <Pressable
                key={i}
                style={{flex: 1}}
                onPress={async () => {
                  // await modalRef.current.open();
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
                  source={{uri: val.uri}}
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
  const render4PlusFile = (src) => {
    const uri = src.slice(0, 4);
    return (
      <View style={styles.stylesImageGrid.container}>
        {srcImage.length > 4 ? (
          <Pressable
            style={styles.stylesImageGrid.boxExtend}
            onPress={async () => {
              // await modalRef.current.open();
              setVisible(true);
              console.log(scrollViewRef.current);
              // console.log(scrollViewRef.current);
              if (scrollViewRef.current) {
                paging.current = 3;
                scrollViewRef.current.scrollTo({
                  x: deviceWidth * 3,
                  animated: false,
                  y: 0,
                });
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
                // await modalRef.current.open();
                setVisible(true);
                setTimeout(() => {
                  console.log(scrollViewRef.current);
                  if (scrollViewRef.current) {
                    paging.current = i;
                    scrollViewRef.current.scrollTo({
                      x: deviceWidth * i,
                      animated: false,
                      y: 0,
                    });
                  }
                }, 1 * 10);
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
        source={{uri: item.uri}}
        resizeMode="contain"
        style={{width: deviceWidth}}
      />
    );
  };
  const [visible, setVisible] = useState(false);
  return (
    <>
      {srcImage.length <= 2 && render2File(srcImage)}
      {srcImage.length === 3 && render3File(srcImage)}
      {srcImage.length >= 4 && render4PlusFile(srcImage)}
      <SwipeDownModal
        modalVisible={visible}
        ContentModal={
          <>
            <Button
              buttonStyle={{
                width: deviceWidth / 2,
                backgroundColor: 'transparent',
                height: deviceHeight,
              }}
              containerStyle={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 999,
              }}
              icon={
                <AntDesignIcon name="caretleft" size={25} color="transparent" />
              }
              onPress={() => {
                paging.current <= 0 ? (paging.current = 0) : paging.current--;
                if (scrollViewRef.current) {
                  scrollViewRef.current.scrollTo({
                    x: deviceWidth * paging.current,
                    animated: false,
                    y: 0,
                  });
                }
              }}
            />
            <Button
              buttonStyle={{
                width: deviceWidth / 2,
                backgroundColor: 'transparent',
                height: deviceHeight,
              }}
              containerStyle={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 999,
              }}
              type="solid"
              icon={
                <AntDesignIcon
                  name="caretright"
                  size={25}
                  color="transparent"
                />
              }
              onPress={() => {
                paging.current >= srcImage.length - 1
                  ? (paging.current = srcImage.length - 1)
                  : paging.current++;
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
          </>
        }
        ContentModalStyle={styles.stylesViewLCS.Modal}
        onClose={() => {
          setVisible(false);
        }}
      />
      {/* <Video /> */}
      {/* <Modal
        position="center"
        coverScreen
        backButtonClose
        // swipeToClose={false}
        // swipeThreshold={1}
        swipeArea={deviceHeight}
        ref={modalRef}></Modal> */}
    </>
  );
};

export default ImageGrid;
