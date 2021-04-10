import {StyleSheet} from 'react-native';
export const stylesIndex = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: 450,
  },
  container1: {
    backgroundColor: 'white',
    paddingTop: 10,
    marginBottom: 10,
  },
});
export const stylesImageGrid = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: 540,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  fullsize: {width: '100%', height: '100%'},
  boxExtend: {
    width: '50%',
    backgroundColor: 'rgba(0,0,0,.8)',
    position: 'absolute',
    elevation: 3,
    zIndex: 999,
    opacity: 0.85,
    height: 540 / 2,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
  },
  textExtend: {
    fontSize: 50,
    color: 'white',
    textAlign: 'center',
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

export const stylesViewLCS = StyleSheet.create({
  containerContent: {
    flex: 1,
  },
  Modal: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: 0,
    backgroundColor: '#fff',
  },
  extendLike: {
    flex: 1,
    borderBottomWidth: 1,
    marginLeft: 0,
    paddingLeft: 10,
    marginTop: 0,
    paddingVertical: 10,
  },
  iconLike: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  SingleCommentContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  avatarComment: {width: 50, height: 50, borderRadius: 1000},
  commentBox: {
    marginHorizontal: 8,
    backgroundColor: 'rgba(0,0,0,.25555)',
    borderRadius: 10,
    flex: 1,
    paddingLeft: 5,
    paddingTop: 5,
  },
  commentUserName: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
  captionText: {
    color: 'black',
    fontSize: 17,
    fontWeight: '800',
    paddingBottom: 10,
    paddingHorizontal: 5,
  },

  viewIcon: {
    borderRadius: 100,
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeNumber: {
    color: 'rgba(0,0,0,.6)',
    fontSize: 16,
    marginLeft: 5,
  },
  viewBtn: {
    flexDirection: 'row',
    flex: 1,
    marginVertical: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,.6)',
  },
  textCmt: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 10,
  },
  inputcmtContainer: {
    marginHorizontal: 5,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,5)',
    marginBottom: 10,
    borderRadius: 16,
    alignItems: 'center',
  },
  btnComment: {
    height: 50,
    justifyContent: 'center',
    width: 38,
    alignItems: 'center',
  },
});
export const VideoNative = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 250,
  },
  controls: {
    backgroundColor: 'rgba(0,0,0,.5)',
    height: 48,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // paddingHorizontal: 10,
    paddingLeft: 5,
  },
  mainButton: {
    marginRight: 15,
  },
  duration: {
    color: 'white',
    marginLeft: 15,
  },
});
