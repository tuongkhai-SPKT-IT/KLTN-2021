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
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: 450,
  },
  fullsize: {width: '100%', height: '100%'},
  boxExtend: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.8)',
    position: 'absolute',
    elevation: 3,
    zIndex: 999,
    opacity: 0.7,
  },
  textExtend: {
    fontSize: 50,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 75,
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
  const {srcImage} = props;
  if (srcImage.length === 0) {
    return <></>;
  }
  const modalRef = useRef(null);
  // const [sizeBox, setSizeBox] = useState({});
  // const widthWindow = Dimensions.get('window').width;
  // const {height, width} = Dimensions.get('screen');
  // console.log(height, width);
  const render2Image = (src) => {
    return (
      <View style={styles.container}>
        {src.map((val, i) => {
          console.log(val);
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
  useEffect(() => {
    srcImage.map((val) => {
      Image.getSize(val, (width, height) => console.log(width, height));
    });
  }, []);
  const render4PlusImage = (src) => {
    console.log(src);
    const uri = src.slice(0, 4);
    const uriImg1 = src.slice(0, 2);
    uri.shift();
    uri.shift();
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          {uriImg1.map((val, i) => {
            return (
              <Pressable
                key={i}
                style={{flex: 1}}
                onPress={() => Alert.alert('hello')}>
                <Image
                  source={{uri: val}}
                  resizeMode="stretch"
                  style={styles.fullsize}
                  resizeMethod="resize"
                />
              </Pressable>
            );
          })}
        </View>
        <View style={{flex: 1, position: 'relative'}}>
          <Pressable
            style={{flex: 1}}
            onPress={() => console.log(scrollViewref)}>
            <Image
              source={{uri: uri[0]}}
              resizeMode="stretch"
              style={styles.fullsize}
              resizeMethod="resize"
            />
          </Pressable>
          <Pressable style={{flex: 1}} onPress={() => Alert.alert('hello')}>
            <Image
              source={{uri: uri[1]}}
              resizeMode="stretch"
              style={styles.fullsize}
            />
            {srcImage.length > 4 && (
              <Pressable
                onPress={() => {
                  modalRef.current.open();
                }}
                style={styles.boxExtend}>
                <Text style={styles.textExtend}>+ {srcImage.length - 4}</Text>
              </Pressable>
            )}
          </Pressable>
        </View>
      </View>
    );
  };
  const [sizeImage, setSizeImage] = useState([]);
  const deviceWidth = Dimensions.get('screen').width;
  const deviceHeight = Dimensions.get('screen').height;
  const getSize = () => {
    srcImage.map((val) => {
      Image.getSize(val, (width, height) => {
        setSizeImage([...sizeImage, {width, height}]);
      });
    });
    console.log(sizeImage[0]);
  };
  var slideImage = [];
  useEffect(() => {
    srcImage.map((val) => {
      slideImage.push({
        url: val,
      });
    });
  }, [slideImage]);
  const scrollViewRef = useRef(null);
  return (
    <>
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
          snapToInterval={450}
          horizontal
          decelerationRate="fast">
          {srcImage.map((val, i) => {
            return (
              <Image
                key={i}
                source={{uri: val}}
                resizeMode="repeat"
                style={{width: 450, height: 450, marginTop: 100}}
              />
            );
          })}
        </ScrollView>
      </Modal>
      {srcImage.length <= 2 && render2Image(srcImage)}
      {srcImage.length === 3 && render3Image(srcImage)}
      {srcImage.length >= 4 && render4PlusImage(srcImage)}
    </>
  );
};

export default ImageGrid;
