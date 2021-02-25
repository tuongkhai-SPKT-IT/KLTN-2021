import React, {Component, useEffect, useState} from 'react';
import {View, Image} from 'react-native';

const ImageGrid = (props) => {
  const {srcImage} = props;

  const renderImage = (src) => {
    if (src.length === 0) {
      return;
    }
    return src.map((val, i) => {
      return (
        <Image
          key={i}
          source={{uri: val}}
          style={{
            width: 100,
            height: 100,
          }}
        />
      );
    });
  };
  return (
    <>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {renderImage(srcImage)}
      </View>
    </>
  );
};

export default ImageGrid;
