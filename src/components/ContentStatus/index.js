import MainContent from './MainContent';
import ViewLCS from './ViewLCS';
import React, {Component} from 'react';
import {View} from 'react-native';
import * as styles from './Styles';

const ContentStatus = (props) => {
  const {srcData} = props;

  // const srcData = {
  //   caption: '2 hình 1 video',
  //   created_at: [],
  //   file_uploaded: [
  //     // {
  //     //   type: 'image',
  //     //   uri:
  //     //     'http://api.facebook-kltn.alphawolf.io/image/dVfpZd3GFCM3LhhqfYlN0yAzCkQWVh.jpg',
  //     // },
  //     {
  //       type: 'video',
  //       uri:
  //         'http://api.facebook-kltn.alphawolf.io/video/JUhnWLJcAjXUIX1cgOdlYPfi4DI7BC.mp4',
  //     },
  //     {
  //       type: 'video',
  //       uri:
  //         'http://api.facebook-kltn.alphawolf.io/video/JUhnWLJcAjXUIX1cgOdlYPfi4DI7BC.mp4',
  //     },
  //     {
  //       type: 'video',
  //       uri:
  //         'http://api.facebook-kltn.alphawolf.io/video/JUhnWLJcAjXUIX1cgOdlYPfi4DI7BC.mp4',
  //     },
  //     {
  //       type: 'video',
  //       uri:
  //         'http://api.facebook-kltn.alphawolf.io/video/JUhnWLJcAjXUIX1cgOdlYPfi4DI7BC.mp4',
  //     },
  //     // {
  //     //   type: 'image',
  //     //   uri:
  //     //     'http://api.facebook-kltn.alphawolf.io/image/eyWxBzLnPeIIa3KGxxOWxS9CeaSjjp.jpg',
  //     // },
  //     // {
  //     //   type: 'video',
  //     //   //type: "image",
  //     //   uri:
  //     //     'http://api.facebook-kltn.alphawolf.io/video/rAcfyZKyVRAFCjc05jtKleQK2GfljQ.mp4',
  //     //   //uri: "http://api.facebook-kltn.alphawolf.io/image/dVfpZd3GFCM3LhhqfYlN0yAzCkQWVh.jpg"
  //     // },
  //     // {
  //     //   type: 'video',
  //     //   uri:
  //     //     'http://api.facebook-kltn.alphawolf.io/video/JUhnWLJcAjXUIX1cgOdlYPfi4DI7BC.mp4',
  //     // },
  //   ],
  //   id: '6075b6bb1892205419636cba',
  //   like_number: 0,
  //   liked: false,
  //   no_sign_profile: 'taikhoan.reactnative.13.04',
  //   posted_time: '13/04/2021 10:20:27 PM',
  //   sex: '1',
  //   status_setting: 'pub',
  //   user_avatar: 'http://api.facebook-kltn.alphawolf.io/image/default.jpg',
  //   user_id: '607583f2eefcaf5c8e2d31f4',
  //   user_name: 'tai khoan react native',
  //   who_liked_status: [],
  // };
  const comment = [
    {
      user_name: 'Khánh Vy',
      user_avatar:
        'https://vnn-imgs-f.vgcloud.vn/2019/01/25/08/mc-noi-7-thu-tieng-cua-vtv-khoe-anh-quyen-ru.jpg',
      comment:
        'Xin chào, Tôi là Khánh Vy đến từ Thủ đô của nước Việt Nam, Hà Nội',
      linkProfile: 'facebook.com/tuongkhai191999',
    },
    {
      user_name: 'Khánh Vy',
      user_avatar:
        'https://vnn-imgs-f.vgcloud.vn/2019/01/25/08/mc-noi-7-thu-tieng-cua-vtv-khoe-anh-quyen-ru.jpg',
      comment:
        'Xin chào, Tôi là Khánh Vy đến từ Thủ đô của nước Việt Nam, Hà Nội',
      linkProfile: 'facebook.com/tuongkhai191999',
    },
    {
      user_name: 'Khánh Vy',
      user_avatar:
        'https://vnn-imgs-f.vgcloud.vn/2019/01/25/08/mc-noi-7-thu-tieng-cua-vtv-khoe-anh-quyen-ru.jpg',
      comment:
        'Xin chào, Tôi là Khánh Vy đến từ Thủ đô của nước Việt Nam, Hà Nội',
      linkProfile: 'facebook.com/tuongkhai191999',
    },
    {
      user_name: 'Khánh Vy',
      user_avatar:
        'https://vnn-imgs-f.vgcloud.vn/2019/01/25/08/mc-noi-7-thu-tieng-cua-vtv-khoe-anh-quyen-ru.jpg',
      comment:
        'Xin chào, Tôi là Khánh Vy đến từ Thủ đô của nước Việt Nam, Hà Nội',
      linkProfile: 'facebook.com/tuongkhai191999',
    },
    {
      user_name: 'Khánh Vy',
      user_avatar:
        'https://vnn-imgs-f.vgcloud.vn/2019/01/25/08/mc-noi-7-thu-tieng-cua-vtv-khoe-anh-quyen-ru.jpg',
      comment:
        'Xin chào, Tôi là Khánh Vy đến từ Thủ đô của nước Việt Nam, Hà Nội',
      linkProfile: 'facebook.com/tuongkhai191999',
    },
    {
      user_name: 'Khánh Vy',
      user_avatar:
        'https://vnn-imgs-f.vgcloud.vn/2019/01/25/08/mc-noi-7-thu-tieng-cua-vtv-khoe-anh-quyen-ru.jpg',
      comment:
        'Xin chào, Tôi là Khánh Vy đến từ Thủ đô của nước Việt Nam, Hà Nội',
      linkProfile: 'facebook.com/tuongkhai191999',
    },
    {
      user_name: 'Ngô Lan Hương',
      user_avatar:
        'https://p16.tiktokcdn.com/aweme/720x720/tiktok-obj/1666384630400001.jpeg',
      comment:
        'Xin chào, Tôi là Ngô Lan Hương đến từ Thủ đô của nước Việt Nam, Hà Nội',
      linkProfile: 'facebook.com/tuongkhai191999',
    },
    {
      user_name: 'Hoàng Yến Chibi',
      user_avatar:
        'https://static2.yan.vn/YanNews/2167221/201910/hoang-yen-chibi-la-ai-tieu-su-su-nghiep-doi-tu-cua-nu-dien-vien-03513321.jpg',
      comment:
        'Xin chào, Tôi là Hoàng Yến Chibi đến từ Thành phố Hồ Chí Minh, Việt Nam',
      linkProfile: 'facebook.com/tuongkhai191999',
    },
  ];
  // console.log(props.srcData);
  return (
    <>
      <View style={styles.stylesIndex.container1}>
        <MainContent
          header={srcData.header_content}
          caption={srcData.caption}
          id={srcData.id}
          linkProfile={srcData.no_sign_profile}
          srcImg={srcData.file_uploaded}
          postedTime={srcData.posted_time}
          statusSetting={srcData.status_setting}
          srcAvt={srcData.user_avatar}
          userName={srcData.user_name}
          userID={srcData.user_id}
        />
        <ViewLCS
          index={srcData.id}
          userName={srcData.user_name}
          liked={srcData.liked}
          likeList={srcData.who_liked_status}
          likeNumber={srcData.like_number}
          userAvatar={srcData.user_avatar}
          userID={srcData.user_id}
          listComment={comment}
        />
      </View>
    </>
  );
};

export default ContentStatus;
