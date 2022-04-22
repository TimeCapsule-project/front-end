export default [
  {
    imgInfo: {
      activeImgSource: require('../assets/images/activeCapsuleCheck.png'),
      inActiveImgSource: require('../assets/images/inActiveCapsuleCheck.png'),
      width: 34,
      height: 34,
    },
    texts: ['내가 보낸 캡슐', '확인하기'],
  },
  {
    imgInfo: {
      activeImgSource: require('../assets/images/capsuleMini.png'),
      inActiveImgSource: require('../assets/images/inActiveCapsule.png'),
      width: 48,
      height: 46,
    },
    texts: ['도착한 캡슐', `${10}개`],
  },
  {
    imgInfo: {
      activeImgSource: require('../assets/images/activePancil.png'),
      inActiveImgSource: require('../assets/images/inActivePancil.png'),
      width: 37,
      height: 45,
    },
    texts: ['타임 캡슐', '묻기'],
  },
];
