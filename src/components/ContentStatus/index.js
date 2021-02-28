import MainContent from './MainContent';
import ViewLCS from './ViewLCS';
import React, {Component} from 'react';
import {View} from 'react-native';

const ContentStatus = (props) => {
  const {srcData} = props;
  return (
    <>
      <View
        style={{
          marginTop: 10,
          backgroundColor: 'white',
          borderWidth: 1,
          paddingTop: 10,
        }}>
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
        <ViewLCS
          liked={srcData.liked}
          likeList={srcData.who_liked_status}
          likeNumber={srcData.like_number}
        />
      </View>
    </>
  );
};

export default ContentStatus;
