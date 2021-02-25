import MainContent from './MainContent';
import ViewLCS from './ViewLCS';
import Comment from './Comment';
import React, {Component} from 'react';
import {View} from 'react-native';

const ContentStatus = (props) => {
  const {srcData} = props;
  return (
    <>
      <View style={{marginTop: 10}}>
        <MainContent
          caption={srcData.caption}
          id={srcData.id}
          linkProfile={srcData.no_sign_profile}
          srcImg={srcData.posted_image}
          postedTime={srcData.posted_time}
          statusSetting={srcData.status_setting}
          srcAvt={srcData.user_avatar}
          userName={srcData.user_name}
          userID={srcData.user_id}
        />
        <ViewLCS />
        <Comment />
      </View>
    </>
  );
};

export default ContentStatus;
