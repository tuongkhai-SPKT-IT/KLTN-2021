import MainContent from './MainContent';
import ViewLCS from './ViewLCS';
import React, {Component} from 'react';
import {View} from 'react-native';
import * as styles from './Styles';

const ContentStatus = (props) => {
  const {srcData} = props;
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
      user_name: 'Ngô Lan Hương',
      user_avatar:
        'https://p16.tiktokcdn.com/aweme/720x720/tiktok-obj/1666384630400001.jpeg',
      comment:
        'Xin chào, Tôi là Khánh Vy đến từ Thủ đô của nước Việt Nam, Hà Nội',
      linkProfile: 'facebook.com/tuongkhai191999',
    },
    {
      user_name: 'Linh Ngọc Đàm',
      user_avatar:
        'https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-9/151215280_149161110379139_1406147984164621568_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=b9115d&_nc_ohc=_PsSveg9ZgsAX8NBngH&_nc_oc=AQkiifCwYnTYscPCCATTJYRhoB4oO0k8h2WRcPHspX-cSoDHm_xQj63L7qar5O_0zBc&_nc_ht=scontent.fsgn5-1.fna&oh=2ca4f827a6ca4f71cc6f7605982793f0&oe=6068153A',
      comment:
        'Xin chào, Tôi là Linh Ngọc Đàm đến từ Thành phố Hồ Chí Minh, Việt Nam',
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
  return (
    <>
      <View style={styles.stylesIndex.container1}>
        <MainContent
          header={srcData.header_content}
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
