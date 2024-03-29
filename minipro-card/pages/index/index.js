// index.js
const myAudio = wx.createInnerAudioContext();
myAudio.src = "http://music.163.com/song/media/outer/url?id=541326593.mp3";
myAudio.play();
Page({
  data: {
    hasSent: false,
    toName: "Dear 张三",
    context: "祝你十连三金，欧气满满！",
    fromName: "From Babu",
    state: "running",

    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },

  // 监听页面加载
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      });
    }
    // 转发页面时数据更新
    if (Object.keys(options).length !== 0) {
      this.setData({
        hasSent: options.hasSent,
        toName: options.toName,
        context: options.context,
        fromName: options.fromName,
      });
    }
  },

  // 获取用户个人信息
  getUserProfile(e) {
    wx.getUserProfile({
      desc: "用于完善会员资料",
      success: (res) => {
        // console.log("getUserProfileSuccess");
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
        // console.log(this.data.userInfo);
      },
    });
  },

  // 实时更新用户输入
  bindToNameInput: function (e) {
    this.setData({
      toName: e.detail.value,
    });
  },
  bindContextInput: function (e) {
    this.setData({
      context: e.detail.value,
    });
  },
  bindFromNameInput: function (e) {
    this.setData({
      fromName: e.detail.value,
    });
  },

  // 发送给好友
  onShareAppMessage() {
    this.setData({ hasSent: true });
    return {
      title: "发送贺卡",
      path:
        "/pages/index/index?hasSent=" +
        this.data.hasSent +
        "&toName=" +
        this.data.toName +
        "&context=" +
        this.data.context +
        "&fromName=" +
        this.data.fromName,
    };
  },

  // 音乐播放
  play: function () {
    myAudio.play();
    this.setData({ state: "running" });
    console.log(myAudio.duration);
  },

  // 音乐暂停
  pause: function () {
    myAudio.pause();
    this.setData({ state: "paused" });
    console.log(myAudio.duration);
  },
});
