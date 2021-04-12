import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  Pressable,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import {Button} from 'react-native-elements';
import SwipeDownModal from 'react-native-swipe-down';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

// import Slideshow from 'react-native-slideshow';
import * as styles from './Styles';
import VideoNative from './Video.Native.js';
const ImageGrid = (props) => {
  // console.log(props);
  // // useEffect(() => {
  // //   modalRef.current.open();
  // // }, []);
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  // const [paging, setPaging] = useState(0);
  const paging = useRef(0);
  const {srcImage} = props;
  const [videoArr, setVideoArr] = useState([]);
  const [imageArr, setImageArr] = useState([]);
  useEffect(() => {
    const video = [];
    const image = [];
    props.srcImage.map((x) => {
      if (x.type === 'image') image.push(x);
      if (x.type === 'video') video.push(x);
      return 0;
    });
    setImageArr(image);
    setVideoArr(video);
  }, [props.srcImage]);
  if (srcImage.length === 0) {
    return <></>;
  }
  // const modalRef = useRef(null);
  const scrollViewRef = useRef(null);
  const render2File = (src) => {
    return (
      <View style={[styles.stylesImageGrid.container]}>
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
                  backgroundColor: 'black',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  borderWidth: 1,
                  borderColor: 'white',
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
                    backgroundColor: 'rgba(255,255,255,0.6)',
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
    if (videoArr) {
      if (videoArr.length === 1) {
        return (
          <View style={[styles.stylesImageGrid.container]}>
            <View style={{width: '100%', height: '50%'}}>
              <Pressable
                style={{
                  backgroundColor: 'black',
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
                    backgroundColor: 'rgba(255,255,255,0.6)',
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
            <View style={{width: '100%', height: '50%', flexDirection: 'row'}}>
              {imageArr.map((file, i) => {
                return (
                  <Pressable
                    key={i}
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
                      source={{uri: file.uri}}
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
      }
      if (videoArr.length === 2) {
        return (
          <View style={[styles.stylesImageGrid.container]}>
            <View style={{width: '50%', height: '100%'}}>
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
                  source={{uri: imageArr[0].uri}}
                  resizeMode="stretch"
                  resizeMethod="auto"
                  style={styles.stylesImageGrid.fullsize}
                />
              </Pressable>
            </View>
            <View style={{width: '50%', height: '100%'}}>
              {videoArr.map((file, i) => {
                return (
                  <Pressable
                    key={i}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderColor: 'white',
                      backgroundColor: 'black',
                      borderWidth: 1,
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
                        backgroundColor: 'rgba(255,255,255,0.6)',
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
                );
              })}
            </View>
          </View>
        );
      }
      if (videoArr.length === 3) {
        temp = [...videoArr];
        temp.shift();
        return (
          <View style={[styles.stylesImageGrid.container]}>
            <View
              style={{
                width: '100%',
                height: '50%',
                borderWidth: 1,
                borderColor: 'white',
              }}>
              <Pressable
                style={{
                  backgroundColor: 'black',
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
                    backgroundColor: 'rgba(255,255,255,0.6)',
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
            <View style={{width: '100%', height: '50%', flexDirection: 'row'}}>
              {temp.map((file, i) => {
                return (
                  <Pressable
                    key={i}
                    style={{
                      backgroundColor: 'black',
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderColor: 'white',
                      borderWidth: 1,
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
                        backgroundColor: 'rgba(255,255,255,0.6)',
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
                );
              })}
            </View>
          </View>
        );
      }
    }
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
    if (item.type === 'image')
      return (
        <View key={i} style={stylesheet.scrollableModalContent1}>
          <Image
            key={i}
            source={{uri: item.uri}}
            resizeMode="contain"
            style={{width: '100%'}}
          />
        </View>
      );
    else
      return (
        <View key={i} style={stylesheet.scrollableModalContent1}>
          <VideoNative
            key={i}
            source={item.uri}
            style={{width: '100%', height: '100%'}}
          />
        </View>
      );
  };
  const [visible, setVisible] = useState(false);
  const render1File = (file, i) => {
    if (file.type === 'image') {
      return (
        <View style={styles.stylesImageGrid.container}>
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
              source={{uri: file.uri}}
              resizeMode="stretch"
              style={styles.stylesImageGrid.fullsize}
            />
          </Pressable>
        </View>
      );
    } else {
      return (
        <View style={styles.stylesImageGrid.container} key={i}>
          <View style={{flex: 1}}>
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
                  backgroundColor: 'rgba(255,255,255,0.6)',
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
        </View>
      );
    }
  };
  return (
    <>
      {srcImage.length === 1 && render1File(srcImage[0], 0)}
      {srcImage.length === 2 && render2File(srcImage)}
      {srcImage.length === 3 && render3File(srcImage)}
      {srcImage.length >= 4 && render4PlusFile(srcImage)}
      {/* <VideoPlayer source="http://api.facebook-kltn.alphawolf.io/video/vqXpEe8Vm5UBMKAB2fmxZASICyzgqS.mp4" /> */}
    </>
  );
};

export default ImageGrid;
