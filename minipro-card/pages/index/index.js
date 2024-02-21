// index.js
const myaudio = wx.createInnerAudioContext();

Page({
  data: {
    isPlay: false,
    toName: "张三",
    context: "祝你十连三金，欧气满满！",
    fromName: "Babu",
    hasSent: false,
  },
  onShareAppMessage() {
    console.log("分享了");
  },
  onShow: function () {
    myaudio.src = "../../statics/music.mp3";
    console.log("展示");
  },
  //播放
  play: function () {
    myaudio.play();
    console.log(myaudio.duration);
    this.setData({ isPlay: true });
  },
  // 停止
  stop: function () {
    myaudio.pause();
    this.setData({ isPlay: false });
  },
});
