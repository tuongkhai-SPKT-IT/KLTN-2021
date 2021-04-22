import React, {useState, useEffect, useRef} from 'react';
import {Dimensions} from 'react-native';
import {Pressable, View, Text} from 'react-native';
import Video from 'react-native-video';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {VideoNative as styles} from './Styles';
import ProgressBar from 'react-native-progress/Bar';
const VideoNative = (props) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const player = useRef(null);
  const [paused, setPaused] = useState(true);

  const {width} = Dimensions.get('window');
  const height = width * 0.5625;
  const [playableDuration, setPlayableDuration] = useState({
    playable: 0,
    lengthVideo: 0,
  });
  const [visibleControls, setVisibleControls] = useState(false);
  const handleLoad = (e) => {
    setDuration(e.duration);
  };
  useEffect(() => {
    if (props.isScroll) {
      setPaused(true);
    }
  }, [props.isScroll]);
  const handleTimeVideo = (value) => {
    if (value === 'left') {
      player.current.seek(
        Math.floor(progress * duration) - 10 > 0
          ? Math.floor(progress * duration) - 10
          : 0,
      );
    }
    if (value === 'right') {
      player.current.seek(
        Math.floor(progress * duration) + 10 > playableDuration.lengthVideo
          ? playableDuration.lengthVideo
          : Math.floor(progress * duration) + 10,
      );
    }
  };
  const handleProgress = (e) => {
    setProgress(e.currentTime / duration);
    setPlayableDuration({
      playable: e.playableDuration,
      lengthVideo: e.seekableDuration,
    });
  };
  const handleEnd = () => {
    setPaused(true);
    setProgress(0);
  };

  const handleButtonMainTouch = () => {
    if (progress >= 1) {
      player.current.seek(0);
    }
    setPaused(!paused);
  };
  useEffect(() => {
    return () => {
      setPaused(true);
    };
  }, []);
  const secondsToTime = (time) => {
    return ~~(time / 60) + ':' + (time % 60 < 10 ? '0' : '') + (time % 60); 
  };
  var timeVisible;
  return (
    <Pressable
      style={[
        props.style,
        {
          position: 'relative',
          justifyContent: 'center',
          backgroundColor: 'black',
        },
      ]}
      onPress={() => {
        clearTimeout(timeVisible);
        setVisibleControls(true);
        timeVisible = setTimeout(() => {
          setVisibleControls(false);
        }, 5000);
      }}>
      <Video
        bufferConfig={{
          minBufferMs: progress * duration * 1000 + 15000,
          maxBufferMs: 5000000,
        }}
        fullscreenAutorotate
        fullscreenOrientation="all"
        paused={paused}
        style={{width: '100%', height}}
        source={{uri: props.source}}
        resizeMode="stretch"
        onLoad={handleLoad}
        onProgress={handleProgress}
        onEnd={handleEnd}
        ref={player}
      />
      {visibleControls && (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingBottom: 20,
            position: 'absolute',
            top: Dimensions.get('window').height * 0.5,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: 999,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              opacity: 0.68,
              height: Dimensions.get('window').height * 0.1,
            }}>
            <Pressable
              name="left"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => handleTimeVideo('left')}>
              <MaterialCommunityIcons
                name="rewind-10"
                size={30}
                color="white"
              />
            </Pressable>
            <Pressable
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={handleButtonMainTouch}>
              <FontAwesomeIcon
                name={!paused ? 'pause' : 'play'}
                size={30}
                color="white"
              />
            </Pressable>
            <Pressable
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => handleTimeVideo('right')}>
              <MaterialCommunityIcons
                name="fast-forward-10"
                size={30}
                color="white"
              />
            </Pressable>
          </View>
        </View>
      )}
      <View style={styles.controls}>
        <View>
          <ProgressBar
            progress={progress}
            color="#FFF"
            unfilledColor="rgba(255,255,255,.5)"
            borderColor="#FFF"
            width={width - 100}
            height={20}
          />
        </View>
        <Text style={[styles.duration, {fontSize: 20}]}>
          {secondsToTime(Math.floor(progress * duration))}
        </Text>
      </View>
    </Pressable>
  );
};
export default VideoNative;
