import React, {Component, useEffect, useState} from 'react';
import {View, Image, Pressable, Alert, Dimensions} from 'react-native';

const ImageGrid = (props) => {
  const {srcImage} = props;

  if (srcImage.length === 0) {
    return <></>;
  }
  // const {height, width} = Dimensions.get('screen');
  // console.log(height, width);
  const render2Image = (src) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
          height: 450,
        }}>
        {src.map((val, i) => {
          return (
            <Pressable
              key={i}
              style={{flex: 1}}
              onPress={() => Alert.alert('hello')}>
              <Image
                source={{uri: val}}
                resizeMode="stretch"
                style={{width: '100%', height: '100%'}}
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
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
          height: 450,
        }}>
        <Pressable style={{flex: 1}} onPress={() => Alert.alert('hello')}>
          <Image
            source={{uri: uriImg1}}
            resizeMode="stretch"
            style={{width: '100%', height: '100%'}}
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
                  style={{width: '100%', height: '100%'}}
                />
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  };
  const render4PlusImage = (src) => {
    const uriImg1 = src[0];
    const uriImg2 = src[1];

    src.shift();
    src.shift();
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
          height: 450,
        }}>
        <View style={{flex: 1}}>
          <Pressable style={{flex: 1}} onPress={() => Alert.alert('hello')}>
            <Image
              source={{uri: uriImg1}}
              resizeMode="stretch"
              style={{width: '100%', height: '100%'}}
            />
          </Pressable>
          <Pressable style={{flex: 1}} onPress={() => Alert.alert('hello')}>
            <Image
              source={{uri: uriImg2}}
              resizeMode="stretch"
              style={{width: '100%', height: '100%'}}
            />
          </Pressable>
        </View>
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
                  style={{width: '100%', height: '100%'}}
                />
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  };
  return (
    <>
      {srcImage.length === 2 && render2Image(srcImage)}
      {srcImage.length === 3 && render3Image(srcImage)}
      {srcImage.length >= 4 && render4PlusImage(srcImage)}
    </>
  );
};

export default ImageGrid;
