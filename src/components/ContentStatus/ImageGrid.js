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
import VideoPlayer from './Video.Native.js';
import {Button} from 'react-native-elements';
import SwipeDownModal from 'react-native-swipe-down';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

// import Slideshow from 'react-native-slideshow';
import * as styles from './Styles';
import VideoNative from './Video.Native.js';
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
        {src.map((media, i) => {
          return media.type === 'image' ? (
            <Pressable
              key={i}
              style={{flex: 1}}
              onPress={() => {
                setVisible(true);
                setTimeout(() => {
                  // console.log(scrollViewRef.current);
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
                source={{uri: media.uri}}
                resizeMode="stretch"
                style={styles.stylesImageGrid.fullsize}
              />
            </Pressable>
          ) : (
            <View style={{flex: 1}} key={i}>
              <Pressable
                style={{
                  backgroundColor: 'red',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setVisible(true);
                  setTimeout(() => {
                    // console.log(scrollViewRef.current);
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
                <View
                  style={{
                    backgroundColor: 'rgba(0,0,0,.7)',
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <FontAwesomeIcon name="play" size={30} color="white" />
                </View>
              </Pressable>
            </View>
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
        {uriImg1.type === 'image' ? (
          <Pressable
            key={-1}
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
        ) : (
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
            <VideoPlayer source={uriImg1.uri} />

            {/* <Video
              paused={true}
              controls
              resizeMode="contain"
              source={{uri: uriImg1.uri}}
              style={styles.stylesImageGrid.fullsize}
            /> */}
          </Pressable>
        )}
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
              // console.log(scrollViewRef.current);
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
                  // console.log(scrollViewRef.current);
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
                  uri: val.uri,
                }}
              />
            </Pressable>
          );
        })}
      </View>
    );
  };
  const ImageScroll = (item, i) => {
    return item.type === 'image' ? (
      <Image
        key={i}
        source={{uri: item.uri}}
        resizeMode="contain"
        style={{width: '100%'}}
      />
    ) : (
      <VideoNative key={i} source={item.uri} style={{width: '100%'}} />
    );
  };
  const [visible, setVisible] = useState(false);
  return (
    <>
      {srcImage.length <= 2 && render2File(srcImage)}
      {srcImage.length === 3 && render3File(srcImage)}
      {srcImage.length >= 4 && render4PlusFile(srcImage)}

      <Modal
        isVisible={visible}
        animationIn="slideInUp"
        onBackButtonPress={() => setVisible(false)}
        animationOut="slideOutDown"
        swipeDirection={['up', 'down']}
        swipeThreshold={150}
        // backdropColor="white"
        // backdropOpacity={1}
        onSwipeComplete={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
        onSwipeCancel={() => setVisible(true)}
        style={{
          backgroundColor: 'white',
          margin: 0,
          height: 150,
        }}
        scrollHorizontal>
        <ScrollView
          onScroll={(e) => console.log(e.nativeEvent)}
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          snapToInterval={Dimensions.get('screen').width}
          horizontal
          decelerationRate="fast">
          {srcImage.map(ImageScroll)}
        </ScrollView>
      </Modal>

      {/* <VideoPlayer source="http://api.facebook-kltn.alphawolf.io/video/vqXpEe8Vm5UBMKAB2fmxZASICyzgqS.mp4" /> */}
    </>
  );
};

export default ImageGrid;
