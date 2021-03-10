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
    borderWidth: 1,
    paddingTop: 10,
  },
});
export const stylesImageGrid = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: 540,
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
  extendLike: {
    borderBottomWidth: 1,
    marginLeft: 0,
    paddingLeft: 10,
    marginTop: 0,
    paddingVertical: 5
  },
  iconLike: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  SingleCommentContainer: {
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
    width: 25,
    height: 25,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeNumber: {
    color: 'rgba(0,0,0,.6)',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  viewBtn: {
    flexDirection: 'row',
    flex: 1,
    marginVertical: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.6)',
  },
  textCmt: {
    flex: 1,
    width: '98%',
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,5)',
    marginBottom: 10,
    borderRadius: 16,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 40,
    marginLeft: 5,
  },
});