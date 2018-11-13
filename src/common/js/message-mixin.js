import {getSign, getAccountType, getTxAppCode, getUserId, clearUser, goLogin, isUnDefined} from 'common/js/util';
import {addMsg, setProfilePortrait, getProfilePortrait} from 'common/js/message';
import {getTencentParamsAPi, getUser} from 'api/user';
import {mapGetters, mapActions, mapMutations} from 'vuex';
import {SET_TENCENT_LOGINED, SET_USER_STATE, SET_UNREAD_MSG_NUM, SET_NEW_MSG, SET_GROUP_LIST} from 'store/mutation-types';
import Message from 'base/message/message';

const message = new Message();

export const messageMixin = {
  computed: {
    ...mapGetters([
      'curChatUserId',
      'userMap',
      'user',
      'unreadMsgNum',
      'newMsg',
      'tencentLogined',
      'groupList'
    ])
  },
  methods: {
    // 监听连接状态回调变化事件
    onConnNotify(resp) {
      var info;
      switch (resp.ErrorCode) {
        case webim.CONNECTION_STATUS.ON:
          webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
          break;
        case webim.CONNECTION_STATUS.OFF:
          info = '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' + resp.ErrorInfo;
          webim.Log.warn(info);
          break;
        case webim.CONNECTION_STATUS.RECONNECT:
          info = '连接状态恢复正常: ' + resp.ErrorInfo;
          webim.Log.warn(info);
          break;
        case '91101':
          // 被踢下线
          this.onKickedEventCall();
          break;
        default:
          webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
          break;
      }
    },
    // 监听新消息
    onMsgNotify(newMsgList) {
      // 判断是否在订单聊天界面
		  if (this.isMessageWindow()) {
        let selSess = null;
        for (let j in newMsgList) {
          let newMsg = newMsgList[j];
          // 判断是自己 不用添加消息
          if (newMsg.fromAccount === getUserId()) {
            continue;
          }
          if (newMsg.getSession().id() === this.curChatUserId) {
            selSess = newMsg.getSession();
          }
          let photo = '';
          let user = this.userMap[newMsg.fromAccount];
          if (user) {
            // 系统消息
            if(newMsg.fromAccount === 'admin') {
              newMsg.fromAccountNick = 'admin';
            } else {
              let user = this.userMap[newMsg.fromAccount];
              newMsg.fromAccountNick = user.nickname;
            }
            photo = user.photo;
            this.saveChatHistory(addMsg(newMsg, newMsg.getSession().id(), photo));
          } else {
            let self = this;
            // 系统消息
            if(newMsg.fromAccount === 'admin') {
              self.updateUserMap({
                userId: newMsg.fromAccount,
                nickname: 'admin',
                photo: ''
              });
              self.saveChatHistory(addMsg(newMsg, newMsg.getSession().id(), photo));
            } else {
              getProfilePortrait(newMsg.fromAccount, function (res) {
                newMsg.fromAccountNick = res.nickname;
                photo = res.photo;
                self.updateUserMap({
                  userId: newMsg.fromAccount,
                  nickname: res.nickname,
                  photo: res.photo
                });
                self.saveChatHistory(addMsg(newMsg, newMsg.getSession().id(), photo));
              }, function () {
                self.saveChatHistory(addMsg(newMsg, newMsg.getSession().id(), photo));
              });
            }
          }
        }
        this.setNewMsg(true);
        webim.setAutoRead(selSess, true, true);

		  // 不是订单聊天界面 unreadMsgNum +1
      } else {
		    this.setUnreadMsgNum(this.unreadMsgNum + 1);
      }
    },
    // 被其他登录实例踢下线
    onKickedEventCall(resq) {
      message.show('登陆失效，请重新登录');
      clearUser();
      setTimeout(() => {
        goLogin();
      }, 800);
    },
    // 获取我的群组
    getMyGroup(loginInfo) {
      //		    initGetMyGroupTable([]);
      let options = {
        'Member_Account': loginInfo.identifier,
        //'GroupType':'',
        'GroupBaseInfoFilter': [],
        'SelfInfoFilter': [
          'UnreadMsgNum'
        ]
      };
      let self = this;
      webim.getJoinedGroupListHigh(
        options,
        function (resp) {
          if (!resp.GroupIdList || resp.GroupIdList.length == 0) {
            return;
          }
          let unreadMsgNum = 0;
          let groupList = {};
          for (let i = 0; i < resp.GroupIdList.length; i++) {
            unreadMsgNum += resp.GroupIdList[i].SelfInfo.UnreadMsgNum;
            groupList[resp.GroupIdList[i].GroupId] = resp.GroupIdList[i].SelfInfo.UnreadMsgNum;
          }
          // 保存未读消息数
          self.setUnreadMsgNum(unreadMsgNum);
          // 保存订单的未读消息数
          self.setGourpList(groupList);
        },
        function (err) {
          console.log(err.ErrorInfo);
        }
      );
    },
    // 判断是否在聊天界面
    isMessageWindow() {
      let flag = false;
      if (this.$route.path.indexOf('/messageCart') > -1) {
        flag = true;
      }
      return flag;
    },
    // 登陆
    tencentLogin() {
      let loginInfo = {};
      loginInfo.identifier = getUserId();
      loginInfo.accountType = getAccountType();
      loginInfo.userSig = getSign();
      loginInfo.sdkAppID = getTxAppCode();
      loginInfo.appIDAt3rd = getTxAppCode();
      if (!loginInfo.sdkAppID || !loginInfo.accountType || !loginInfo.userSig) {
        getTencentParamsAPi().then((data) => {
          loginInfo.accountType = data.accountType;
          loginInfo.userSig = data.sign;
          loginInfo.sdkAppID = data.txAppCode;
          loginInfo.appIDAt3rd = data.txAppCode;
          this.login(loginInfo);
        });
      } else {
        this.login(loginInfo);
      }
    },
    login(loginInfo) {
      let listeners = {
        'onConnNotify': this.onConnNotify,
        'onMsgNotify': this.onMsgNotify,
        'onKickedEventCall': this.onKickedEventCall
      };
      let options = {
        'isAccessFormalEnv': true,
        'isLogOn': false
      };
      let self = this;
      let flag = this.tencentLogined;
      if (!flag) {
        webim.login(loginInfo, listeners, options, function () {
          getUser().then((data) => {
            self.setUser(data);
            let gender = self.user.gender;
            let nickname = self.user.nickname;
            let photo = isUnDefined(data.photo) ? '' : data.photo;
            setProfilePortrait({gender, nickname, photo});
          });
          self.getMyGroup(loginInfo);
          self.setTencentLogined(true);
        }, function () {
          self.setTencentLogined(false);
          this.login(loginInfo);
        });
      } else if(flag) {
        self.getMyGroup(loginInfo);
      }
    },
    ...mapMutations({
      setTencentLogined: SET_TENCENT_LOGINED,
      setUser: SET_USER_STATE,
      setUnreadMsgNum: SET_UNREAD_MSG_NUM,
      setNewMsg: SET_NEW_MSG,
      setGourpList: SET_GROUP_LIST
    }),
    ...mapActions([
      'saveChatHistory',
      'updateUserMap'
    ])
  }
};
