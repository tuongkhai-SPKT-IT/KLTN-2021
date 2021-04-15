import React, { Component, useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  Pressable,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import SwipeDownModal from 'react-native-swipe-down';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

// import Slideshow from 'react-native-slideshow';
import * as styles from './Styles';
import VideoNative from './Video.Native.js';
const ImageGrid = (props) => {
  const device = Dimensions.get('window');
  const deviceWidth = Dimensions.get('window').width;
  const scrollImage = useRef(props.srcImage);
  useEffect(() => {
    scrollImage.current = [...props.srcImage]
  }, [props.srcImage])
  const { srcImage } = props;
  const [layoutModal, setLayoutModal] = useState(device);
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
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "white"
              }}
              onPress={() => {
                setVisible(true);
                setTimeout(() => {
                  // console.log(scrollViewRef.current);
                  if (scrollViewRef.current) {
                    // = i;
                    scrollViewRef.current.scrollTo({
                      x: deviceWidth * i,
                      animated: false,
                      y: 0,
                    });
                  }
                }, 1 * 10);
              }}>
              <Image
                source={{ uri: media.uri }}
                resizeMode="stretch"
                style={styles.stylesImageGrid.fullsize}
              />
            </Pressable>
          ) : (
            <View style={{ flex: 1 }} key={i}>
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
                      // = i;
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
    const video = [];
    const image = [];
    src.map((x, i) => {
      if (x.type === 'image') image.push(x);
      if (x.type === 'video') video.push(x);
      return 0;
    });
    if (video) {
      if (image) {
        if (video.length === 0) {
          const imageTemp = [...image];
          imageTemp.shift();
          return (
            <View style={[styles.stylesImageGrid.container]}>
              <View style={{ width: '50%', height: '100%' }}>
                <Pressable
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: "white"
                  }}
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
                      }, 1 * 10);
                    }
                  }}>
                  {image[0] ?
                    <Image
                      source={{ uri: image[0].uri }}
                      resizeMode="stretch"
                      resizeMethod="auto"
                      style={styles.stylesImageGrid.fullsize}
                    /> : <></>
                  }
                </Pressable>
              </View>
              <View style={{ width: '50%', height: '100%' }}>
                {imageTemp.map((file, i) => {
                  return (
                    <Pressable
                      key={i + 1}
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "white"
                      }}
                      onPress={async () => {
                        setVisible(true);
                        if (scrollViewRef.current) {
                          setTimeout(() => {
                            scrollViewRef.current.scrollTo({
                              x: layoutModal.width * (i + 1),
                              animated: false,
                              y: 0,
                            });
                          }, 1 * 10);
                        }
                      }}>
                      <Image
                        source={{ uri: file.uri }}
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
        if (video.length === 1) {
          scrollImage.current = [...video, ...image]
          return (
            <View style={[styles.stylesImageGrid.container]}>
              <View style={{ width: '100%', height: '50%' }}>
                <Pressable
                  key={0}
                  style={{
                    backgroundColor: 'black',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setVisible(true);
                    setTimeout(() => {
                      if (scrollViewRef.current) {
                        scrollViewRef.current.scrollTo({
                          x: 0,
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
              <View
                style={{ width: '100%', height: '50%', flexDirection: 'row' }}>
                {image.map((file, i) => {
                  return (
                    <Pressable
                      key={i + 1}
                      style={{ flex: 1 }}
                      onPress={async () => {
                        setVisible(true);
                        setTimeout(() => {
                          if (scrollViewRef.current) {
                            scrollViewRef.current.scrollTo({
                              x: layoutModal.width * (i + 1),
                              animated: false,
                              y: 0,
                            });
                          }
                        }, 1 * 10);
                      }}>
                      <Image
                        source={{ uri: file.uri }}
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
        if (video.length === 2) {
          scrollImage.current = [...image, ...video];
          return (
            <View style={[styles.stylesImageGrid.container]}>
              <View style={{ width: '50%', height: '100%' }}>
                <Pressable
                  key={0}
                  style={{ flex: 1 }}
                  onPress={() => {
                    setVisible(true);
                    setTimeout(() => {
                      // console.log(scrollViewRef.current);
                      if (scrollViewRef.current) {
                        // = file.index;
                        scrollViewRef.current.scrollTo({
                          x: layoutModal.width * (0),
                          animated: false,
                          y: 0,
                        });
                      }
                    }, 1 * 10);
                  }}
                >
                  <Image
                    source={{ uri: image[0].uri }}
                    resizeMode="stretch"
                    resizeMethod="auto"
                    style={styles.stylesImageGrid.fullsize}
                  />
                </Pressable>
              </View>
              <View style={{ width: '50%', height: '100%' }}>
                {video.map((file, i) => {
                  return (
                    <Pressable
                      key={i + 1}
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
                          if (scrollViewRef.current) {
                            scrollViewRef.current.scrollTo({
                              x: layoutModal.width * (i + 1),
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
        if (video.length === 3) {
          const temp = [...video];
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
                        // = i;
                        scrollViewRef.current.scrollTo({
                          x: 0,
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
              <View
                style={{ width: '100%', height: '50%', flexDirection: 'row' }}>
                {temp.map((file, i) => {
                  return (
                    <Pressable
                      key={i + 1}
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
                            // = i;
                            scrollViewRef.current.scrollTo({
                              x: layoutModal.width * (i + 1),
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
                // = 3;
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
            val.type === "image" ?
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
                      // = i;
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
              : <Pressable key={i}
                style={{
                  backgroundColor: 'black',
                  width: '50%',
                  height: 540 / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: "white"
                }}
                onPress={() => {
                  setVisible(true);
                  setTimeout(() => {
                    // console.log(scrollViewRef.current);
                    if (scrollViewRef.current) {
                      // = i;
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
    );
  };
  const ImageScroll = (item, i) => {
    if (item.type === 'image')
      return (
        <Image
          key={i}
          style={{ width: layoutModal.width, height: layoutModal.height }}
          resizeMode="contain"
          source={{ uri: item.uri }}
        />
      );
    else
      return (
        <VideoNative
          key={i}
          style={{ width: layoutModal.width, height: layoutModal.height, alignItems: "center" }}
          source={item.uri} />
      );
  };

  const [visible, setVisible] = useState(false);
  const render1File = (file, i) => {
    if (file.type === 'image') {
      return (
        <View style={styles.stylesImageGrid.container}>
          <Pressable
            key={i}
            style={{ flex: 1 }}
            onPress={() => {
              setVisible(true);
              setTimeout(() => {
                // console.log(scrollViewRef.current);
                if (scrollViewRef.current) {
                  // = i;
                  scrollViewRef.current.scrollTo({
                    x: deviceWidth * i,
                    animated: false,
                    y: 0,
                  });
                }
              }, 1 * 10);
            }}>
            <Image
              source={{ uri: file.uri }}
              resizeMode="stretch"
              style={styles.stylesImageGrid.fullsize}
            />
          </Pressable>
        </View>
      );
    } else {
      return (
        <View style={styles.stylesImageGrid.container} key={i}>
          <View style={{ flex: 1 }}>
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
                    // = i;
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
  const [scrollOffset, setScrollOffset] = useState(0)
  const handleOnScroll = event => {
    if (event.nativeEvent.contentOffset.x)
      setScrollOffset(event.nativeEvent.contentOffset.x)
  };
  const handleScrollTo = p => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };

  return (
    <>
      {srcImage.length === 1 && render1File(srcImage[0], 0)}
      {srcImage.length === 2 && render2File(srcImage)}
      {srcImage.length === 3 && render3File(srcImage)}
      {srcImage.length >= 4 && render4PlusFile(srcImage)}
      <Modal
        isVisible={visible}
        hasBackdrop={false}
        swipeDirection={['up', 'down']}
        animationIn="zoomInUp"
        scrollTo={handleScrollTo}
        onBackdropPress={() => setVisible(false)}
        scrollOffset={scrollOffset}
        scrollOffsetMax={layoutModal.width}
        onSwipeCancel={() => setVisible(true)}
        onSwipeComplete={() => setVisible(false)}
        onBackButtonPress={() => setVisible(false)}
        animationOut="zoomOutDown"
        propagateSwipe={true}
        animationInTiming={600}
        animationOutTiming={600}
        hideModalContentWhileAnimating
        scrollHorizontal
        style={{ margin: 0 }}>
        <View onLayout={(e) => setLayoutModal(e.nativeEvent.layout)}
          style={{ width: '100%', height: "100%", backgroundColor: "white" }}>
          <ScrollView
            // onScrollEndDrag={handleScrollEnd}
            overScrollMode="always"
            scrollToOverflowEnabled
            snapToInterval={layoutModal.width}
            showsHorizontalScrollIndicator={false}
            onScroll={handleOnScroll} horizontal ref={scrollViewRef}>
            {scrollImage.current.map(ImageScroll)}
          </ScrollView>
        </View>
      </Modal>

      {/* <VideoPlayer source="" /> */}
    </>
  );
};

export default ImageGrid;
