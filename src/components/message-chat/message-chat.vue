<template>
  <transition  name="slide">

    <div class="chat-wrapper" @click='hide'>
      <div class="message-wrapper">
        <scroll :data="curChatList"
                :pullUpLoad="pullUpLoad"
                :listenScroll="listenScroll"
                :probeType="probeType"
                @scroll="scroll"
                ref="scroll">
          <div v-show="hasMore" class="loading-wrapper">
            <loading title=""></loading>
          </div>
          <div v-for="(info,index) in curChatList" ref="mesRef" class="message-content">
            <div class="time-split"><div v-show="showTime(info, index)" class="time-content">{{getDate(info.time)}}</div></div>
            <div class="receive" v-if="!info.isSend && info.fromAccount != 'admin'">
              {{index}}
              <span class="avatar avatarDefault" v-if="isUnDefined(receiver.photo)">{{getDefaultPhoto(receiver)}}</span>
              <span class="avatar" v-else :style="formatAvatarSyl(receiver.photo)"></span>
              <div class="p-content">
                <span class="triangle-left"></span>
                <i>
                  <template v-for="item in getContent(info)">
                    <template v-if="item.type==='TIMTextElem'">{{item.content}}</template>
                    <img v-else @click="showImage(item.type, item.content)" @load="handleLoad" :src="item.content"/>
                  </template>
                </i>
              </div>
            </div>
            <div class="time-split" v-else-if="info.fromAccount === 'admin'">
              <div class="time-content">
                <template v-for="item in getContent(info)">
                  <template v-if="item.type==='TIMTextElem'">{{item.content}}</template>
                </template>
              </div>
            </div>
            <div v-else class="post clearfix">
              {{index}}
              <span class="avatar avatarDefault" v-if="isUnDefined(user.photo)">{{getDefaultPhoto(user)}}</span>
              <span class="avatar" v-else :style="formatAvatarSyl(user.photo)"></span>
              <div class="p-content">
                <span class="triangle-right"></span>
                <i>
                  <template v-for="item in getContent(info)">
                    <template v-if="item.type==='TIMTextElem'">{{item.content}}</template>
                    <img v-else @click="showImage(item.type, item.content)" @load="handleLoad" :src="item.content"/>
                  </template>
                </i>
                <div @click="reSendMsg(info, index)" v-show="showErr(info)" class="error-icon"></div>
                <div class="loading-wrapper" v-show="showLoading(info)"><loading title=""></loading></div>
              </div>
            </div>
           </div>
        </scroll>
      </div>
      <div class="message-footer">
        <div class="message-input">
          <input type="text" placeholder="输入聊天内容" ref="inputText" v-model="emoji" @keyup.enter="dealMessage" class="msgedit"/>
          <span @click.stop="show"></span>
          <div class="sendMessage" v-show="sendMessage" @click.stop="dealMessage">发送</div>
          <emoji ref="emoji" @select="selectItem"></emoji>
          <i @click="show"></i>
          <div class="file" v-if="token">
            <qiniu :multiple="multiple" @beforeUpload="handleUpload" @error="handleError" :token="token" ref="qiniu"></qiniu>
          </div>
        </div>
      </div>
      <toast :text="text" ref="toast"></toast>
      <full-loading v-show="loadingFlag"></full-loading>
    </div>

  </transition>
</template>
<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import {SET_CHAT_USERID, SET_CHAT_LIST, SET_USER_STATE, SET_UNREAD_MSG_NUM} from 'store/mutation-types';
  import Scroll from 'base/scroll/scroll';
  import FullLoading from 'base/full-loading/full-loading';
  import Loading from 'base/loading/loading';
  import Emoji from 'base/emoji/emoji';
  import Toast from 'base/toast/toast';
  import Qiniu from 'base/qiniu/qiniu';
  import {addMsg} from 'common/js/message';
  import {getUserId, isUnDefined, formatChatDate, formatImg, setTitle, formatAvatarSyl} from 'common/js/util';
  import User from 'common/bean/user';
  import {getUser} from 'api/user';
  import {getOrderDetail} from 'api/person';
  import {getQiniuToken} from 'api/general';

  const selType = webim.SESSION_TYPE.GROUP;
  const subType = webim.GROUP_MSG_SUB_TYPE.COMMON;
  const REQMSGCOUNT = 20;
  const ERR = -1;
  const SENDING = 0;
  const SUCCESS = 1;
  const IMG_SUFFIX1 = '?imageMogr2/auto-orient/thumbnail/!30p';
  const IMG_SUFFIX2 = '?imageMogr2/auto-orient/thumbnail/!70p';
  const IMG_SUFFIX3 = '?imageMogr2/auto-orient/thumbnail/!100p';

  export default {
    data () {
      return {
        emoji: '',
        start: -1,
        hasMore: true,
        text: '',
        receiver: null,
        showEmoji: false,
        token: '',
        sendMessage: false,
        getPrePageGroupHistroyMsgInfoMap: {}
      };
    },
    created() {
      this.groupId = this.$route.query.code;
      this.firstUpdate = true;
      this.firstFetching = true;
      this.userId = getUserId();
      this.pullUpLoad = null;
      this.listenScroll = true;
      this.probeType = 3;
      this.multiple = false;
      this.selSess = null;
      this.msgMap = {}; // 保存发送的msg，用于重发
      this.picMap = {}; // 保存正常往7牛上传的msg的对象，用于正式往腾讯云发消息是创建的msg的模版
      this.getStart();
      this.setCurChatList([]);
      this.setCurChatUserId(this.groupId);
      this.getInitData();
      // initShowImage();
    },
    mounted() {
      let title = '聊天';
      if (this.userMap[this.groupId]) {
        title = this.userMap[this.groupId].nickname;
      }
      setTitle(title);
    },
    computed: {
      loadingFlag() {
        if (this.user && this.receiver && this.tencentLogined && this.token) {
          return !((!this.curChatList.length && !this.hasMore) || this.curChatList.length);
        }
        return true;
      },
      ...mapGetters([
        'user',
        'chatData',
        'curChatList',
        'curChatUserId',
        'tencentLogined',
        'userMap'
      ])
    },
    methods: {
      getInitData() {
        this.getUser();
        this.getDetail();
        getQiniuToken().then((data) => {
          this.token = data.uploadToken;
        }).catch(() => {});
        let self = this;
        this.getLastGroupHistoryMsgs(function(msgList) {
          self.getHistoryMsgCallback(msgList);
          self.setCurChatList(msgList);
        }, function(err) {
          alert(err.ErrorInfo);
        });
      },
      getUser() {
        if (!this.user) {
          getUser().then((data) => {
            this.setUser(data);
          }).catch(() => {});
        }
      },
      // 获取订单详情
      getDetail() {
        getOrderDetail(this.groupId).then((data) => {
          let receiver = {};
          // 判断卖家卖家
          if (data.buyUser === this.userId) {
            receiver = data.sellUserInfo;
          } else {
            receiver = data.buyUserInfo;
          }
          this.receiver = new User(receiver);
          setTitle(this.receiver.nickname);
        }).catch(() => {});
      },
      getStart() {
        let obj = this.chatData[this.userId];
        if (obj && obj[this.groupId]) {
          this.start = obj[this.groupId].list.length;
        } else {
          this.start = -1;
        }
      },
      // 没有头像的显示nickname 第一个字
      getDefaultPhoto(info) {
        return info.nickname.substring(0, 1).toUpperCase();
      },
      formatAvatarSyl(photo) {
        return formatAvatarSyl(photo);
      },
      isUnDefined(value) {
        return isUnDefined(value);
      },
      scroll(pos) {
        if (pos.y > -20 && !this.fetching && !this.firstFetching && this.hasMore) {
          this.fetching = true;
          setTimeout(() => {
            this.getHistoryMessage();
          }, 200);
        }
      },
      show() {
        if (this.showEmoji) {
          this.$refs.emoji.hide();
          this.sendMessage = false;
        } else {
          this.$refs.emoji.show();
          this.sendMessage = true;
        }
        this.showEmoji = !this.showEmoji;
      },
      hide() {
        this.showEmoji = false;
        this.sendMessage = false;
        this.$refs.emoji.hide();
      },
      selectItem (emoji) {
        this.emoji += emoji;
      },
      dealMessage() {
        this.$refs.inputText.blur();
        this.sendMessage = false;
        this.$refs.emoji.hide();
        if (!isUnDefined(this.emoji) && this.emoji.trim() !== '') {
          this.onSendMsg(this.emoji, (info) => {
            this.saveChatHistory(info);
            // setTimeout(() => {
              // this.$refs.scroll.scrollToElement(this.$refs.mesRef[this..length - 1], 100);
              // this.scroll.scrollIntoViewIfNeeded();
            // }, 40);
          });
          this.emoji = '';
        } else {
          this.showToast('消息内容不能为空');
        }
      },
      getContent(item) {
        let arr = [];
        item.elems.forEach((msg) => {
          let _item = {
            type: msg.type
          };
          if(msg.type === 'TIMTextElem') {
            _item.content = msg.content.text;
          } else if (msg.type === 'TIMFaceElem') {
            if (webim.Emotions[msg.content.index] === undefined) {
              _item.content = webim.Emotions[0][1];
            } else {
              _item.content = webim.Emotions[msg.content.index][1];
            }
          } else if (msg.type === 'TIMImageElem') {
            _item.content = msg.content.ImageInfoArray[0].url;
          }
          arr.push(_item);
        });
        return arr;
      },
      getHistoryMessage() {
        // 获取更早的群历史消息
        let obj = this.getPrePageGroupHistoryMsgs(function (newList)  {
          return newList;
        });
        if (this.start >= 0 && obj) {
          let newList = this.getNewList(obj);
          // let oriList = this..slice();
          this.setCurChatList(newList);
          this.start -= REQMSGCOUNT;
          if (this.firstFetching) {
            this.updateChatData();
            this.scrollToElement();
          } else {
            this.scrollToTop();
          }
        } else {
          this.hasMore = false;
        }
      },
      //读取群组基本资料-高级接口
      getGroupInfo(group_id, cbOK, cbErr) {
        let self = this;
        var options = {
          'GroupIdList': [
            group_id
          ],
          'GroupBaseInfoFilter': [
            'Type',
            'Name',
            'Introduction',
            'Notification',
            'FaceUrl',
            'CreateTime',
            'Owner_Account',
            'LastInfoTime',
            'LastMsgTime',
            'NextMsgSeq',
            'MemberNum',
            'MaxMemberNum',
            'ApplyJoinOption',
            'ShutUpAllMember'
          ],
          'MemberInfoFilter': [
            'Account',
            'Role',
            'JoinTime',
            'LastSendMsgTime',
            'ShutUpUntil'
          ]
        };
        webim.getGroupInfo(
          options,
          function(resp) {
            if (resp.GroupInfo[0].ShutUpAllMember == 'On') {
              console.log('该群组已开启全局禁言');
            }
            if (cbOK) {
              cbOK(resp);
            }
          },
          function(err) {
            console.log(err.ErrorInfo);
            cbErr && cbErr();
          }
        );
      },
      showMsg(msg) {
        this.text = msg;
        this.$refs.toast.show();
      },
      //获取最新的群历史消息,用于切换群组聊天时，重新拉取群组的聊天消息
      getLastGroupHistoryMsgs(cbOk) {
        let self = this;
        this.getGroupInfo(this.groupId, function(resp) {
          let groupId = self.groupId;
          //拉取最新的群历史消息
          var options = {
            'GroupId': groupId,
            'ReqMsgSeq': resp.GroupInfo[0].NextMsgSeq - 1,
            'ReqMsgNumber': REQMSGCOUNT
          };
          if (options.ReqMsgSeq == null || options.ReqMsgSeq == undefined || options.ReqMsgSeq <= 0) {
            webim.Log.warn("该群还没有历史消息:options=" + JSON.stringify(options));
            return;
          }
          self.selSess = null;
          //清空会话
          webim.MsgStore.delSessByTypeId(selType, groupId);
          // 获取消息
          webim.syncGroupMsgs(
            options,
            function(msgList) {
              if (msgList.length == 0) {
                // webim.Log.warn("该群没有历史消息了:options=" + JSON.stringify(options));
                return;
              }
              var msgSeq = msgList[0].seq - 1;
              self.getPrePageGroupHistroyMsgInfoMap[groupId] = {
                "ReqMsgSeq": msgSeq
              };

              cbOk && cbOk(msgList);
            },
            function(err) {
              alert(err.ErrorInfo);
            }
          );
        });
      },
      //获取历史消息(c2c或者group)成功回调函数
      //msgList 为消息数组，结构为[Msg]
      getHistoryMsgCallback(msgList, prepage) {
        var msg;
        prepage = prepage || false;

        //如果是加载前几页的消息，消息体需要prepend，所以先倒排一下
        if (prepage) {
          msgList.reverse();
        }
        let newList = [];
        let selSess = null;
        //		console.log('History', msgList);
        for (var j in msgList) { //遍历新消息
          msg = msgList[j];
          if (msg.getSession().id() === this.groupId) { //为当前聊天对象的消息
            selSess = msg.getSession();
            //在聊天窗体中新增一条消息
            newList.push(msg);
          }
        }
        //消息已读上报，并将当前会话的消息设置成自动已读
        webim.setAutoRead(selSess, true, true);
        return newList;
      },
      //向上翻页，获取更早的群历史消息
      getPrePageGroupHistoryMsgs(cbOk) {
        let self = this;
        var tempInfo = this.getPrePageGroupHistroyMsgInfoMap[this.groupId]; //获取下一次拉取的群消息seq
        var reqMsgSeq;
        if (tempInfo) {
          reqMsgSeq = tempInfo.ReqMsgSeq;
          if (reqMsgSeq <= 0) {
            webim.Log.warn('该群没有历史消息可拉取了');
            return;
          }
        } else {
          webim.Log.error('获取下一次拉取的群消息seq为空');
          return;
        }
        var options = {
          'GroupId': this.groupId,
          'ReqMsgSeq': reqMsgSeq,
          'ReqMsgNumber': REQMSGCOUNT
        };

        webim.syncGroupMsgs(
          options,
          function(msgList) {
            if (msgList.length == 0) {
              webim.Log.warn("该群没有历史消息了:options=" + JSON.stringify(options));
              return;
            }
            var msgSeq = msgList[0].seq - 1;
            self.getPrePageGroupHistroyMsgInfoMap[self.groupId] = {
              "ReqMsgSeq": msgSeq
            };

            if (cbOk) {
              cbOk(self.getHistoryMsgCallback(msgList, true));
            }
          },
          function(err) {
            alert(err.ErrorInfo);
          }
        );
      },
      scrollToElement() {
        setTimeout(() => {
          this.$refs.scroll.scrollToElement(this.$refs.mesRef[this.curChatList.length - 1], 100);
          setTimeout(() => {
            this.firstFetching = false;
            this.fetching = false;
          }, 200);
        }, 40);
      },
      scrollToTop() {
        setTimeout(() => {
          let _y = this.hasMore && -40 || 0;
          this.$refs.scroll.scrollTo(0, _y);
          setTimeout(() => {
            this.fetching = false;
          }, 200);
        }, 40);
      },
      getNewList(list) {
        return list.map((item) => {
          if (item.fromAccount === this.userId) {
            return {
              ...item,
              icon: isUnDefined(this.user.photo) ? '' : this.user.photo,
              photo: isUnDefined(this.user.photo) ? '' : this.user.photo,
              fromAccountNick: this.user.nickname
            };
          } else {
            return {
              ...item,
              icon: isUnDefined(this.receiver.photo) ? '' : this.receiver.photo,
              photo: isUnDefined(this.receiver.photo) ? '' : this.receiver.photo,
              fromAccountNick: this.receiver.nickname
            };
          }
        });
      },
      updateChatData() {
        if (this.firstUpdate) {
          this.firstUpdate = false;
          this.updateMessages({
            sender: this.user,
            receiver: this.receiver
          });
        }
      },
      onSendMsg(msgContent, suc) {
        let msgLen = webim.Tool.getStrBytes(msgContent);
        let maxLen = webim.MSG_MAX_LENGTH.GROUP;
        if (msgLen > maxLen) {
          this.showToast('消息长度超出限制(最多' + Math.round(maxLen / 3) + '汉字)');
          return;
        }
        this.handleMsgSend(msgContent, suc);
      },
      handleMsgSend(msgContent, suc) {
        if (!this.selSess) {
          this.selSess = new webim.Session(selType, this.groupId, this.groupId, this.user.photo, Math.round(new Date().getTime() / 1000));
        }
        let random = Math.round(Math.random() * 4294967296); // 消息随机数，用于去重
        let msgTime = Math.round(new Date().getTime() / 1000); // 消息时间戳
        let msg = new webim.Msg(this.selSess, true, -1, random, msgTime, this.userId, subType, this.user.nickname);
        let textObj, faceObj, tmsg, emotionIndex, emotion, restMsgIndex;
        // 解析文本和表情
        let expr = /\[[^[\]]{1,3}\]/mg;
        let emotions = msgContent.match(expr);
        if (!emotions || emotions.length < 1) {
          textObj = new webim.Msg.Elem.Text(msgContent);
          msg.addText(textObj);
        } else {
          for (let i = 0; i < emotions.length; i++) {
            tmsg = msgContent.substring(0, msgContent.indexOf(emotions[i]));
            if (tmsg) {
              textObj = new webim.Msg.Elem.Text(tmsg);
              msg.addText(textObj);
            }
            emotionIndex = webim.EmotionDataIndexs[emotions[i]];
            emotion = webim.Emotions[emotionIndex];
            if (emotion) {
              faceObj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
              msg.addFace(faceObj);
            } else {
              textObj = new webim.Msg.Elem.Text(emotions[i]);
              msg.addText(textObj);
            }
            restMsgIndex = msgContent.indexOf(emotions[i]) + emotions[i].length;
            msgContent = msgContent.substring(restMsgIndex);
          }
          if (msgContent) {
            textObj = new webim.Msg.Elem.Text(msgContent);
            msg.addText(textObj);
          }
        }
        let result = addMsg(msg, this.groupId, this.receiver.photo);
        result.msg.status = SENDING;
        this.addMsg2CurList(result.msg);
        if (!this.msgMap[msg.uniqueId]) {
          this.msgMap[msg.uniqueId] = msg;
        }
        this.sendCommonMsg(msg, result);
      },
      updateCurStatus(msg, idx) {
        let list = this.curChatList.slice();
        let index = this.findIndex(msg);
        list.splice(index, 1, msg);
        this.setCurChatList(list);
        setTimeout(() => {
          let _idx = isUnDefined(idx) ? this.curChatList.length - 1 : idx;
          this.$refs.scroll.scrollToElement(this.$refs.mesRef[_idx], 100);
        }, 40);
      },
      findIndex(msg) {
        return this.curChatList.findIndex((item) => {
          return item.uniqueId === msg.uniqueId;
        });
      },
      addMsg2CurList(msg) {
        let list = this.curChatList.slice();
        list.push(msg);
        this.setCurChatList(list);
        setTimeout(() => {
          this.$refs.scroll.scrollToElement(this.$refs.mesRef[this.curChatList.length - 1], 100);
        }, 40);
      },
      sendCommonMsg(msg, result, index) {
        webim.sendMsg(msg, () => {
          if (selType === webim.SESSION_TYPE.GROUP) {
            webim.Tool.setCookie("tmpmsg_" + this.groupId, '', 0);
            let newMsg = {
              toUser: result.toUser,
              fromUser: result.fromUser,
              msg: {
                ...result.msg,
                status: SUCCESS
              }
            };
            this.saveChatHistory(newMsg);
            setTimeout(() => {
              index = isUnDefined(index) ? this.curChatList.length - 1 : index;
              this.$refs.scroll.scrollToElement(this.$refs.mesRef[index], 100);
            }, 40);
          }
        }, () => {
          let newMsg = {
            toUser: result.toUser,
            fromUser: result.fromUser,
            msg: {
              ...result.msg,
              status: ERR
            }
          };
          this.updateCurStatus(newMsg.msg);
          this.showToast('消息发送失败，请重新发送');
        });
      },
      onProgressCallBack() {},
      showToast(msg) {
        this.text = msg;
        this.$refs.toast.show();
      },
      handleLoad() {
        setTimeout(() => {
          this.$refs.scroll.refresh();
        }, 20);
      },
      showTime(item, index) {
        if (!index) {
          return true;
        }
        let prevItem = this.curChatList[index - 1];
        return (item.time - prevItem.time) >= 60;
      },
      getDate(timestamp) {
        return formatChatDate(timestamp * 1000, true);
      },
      showLoading(item) {
        return item.status === SENDING;
      },
      showErr(item) {
        return item.status === ERR;
      },
      reSendMsg(item, index) {
        let msg = this.msgMap[item.uniqueId];
        let result = addMsg(msg, this.groupId, this.receiver.photo);
        result.msg.status = SENDING;
        this.updateCurStatus(result.msg, index);
        this.sendCommonMsg(msg, result, index);
      },
      handleUpload(file) {
        this.hide();
        if (!this.selSess) {
          this.selSess = new webim.Session(selType, this.groupId, this.groupId, this.user.photo, Math.round(new Date().getTime() / 1000));
        }
        let msg = new webim.Msg(this.selSess, true, -1, -1, -1, this.userId, 0, this.user.nickname);
        let UUID = file.preview.split('/').pop();
        var imagesObj = new webim.Msg.Elem.Images(UUID);
        let newImg = new webim.Msg.Elem.Images.Image(1, file.size, 100, 100, file.preview);
        imagesObj.addImage(newImg);
        imagesObj.addImage(newImg);
        imagesObj.addImage(newImg);
        msg.addImage(imagesObj);
        let result = addMsg(msg, this.groupId, this.receiver.photo);
        result.msg.status = SENDING;
        this.addMsg2CurList(result.msg);
        if (!this.picMap[msg.uniqueId]) {
          this.picMap[msg.uniqueId] = msg;
        }
        file.uniqueId = msg.uniqueId;
        file.onprogress = (e) => {
          if (e.srcElement.status === 200) {
            this.sendPicByMsg(msg, file);
          }
        };
      },
      handleError(error, file) {
        let list = this.curChatList.slice();
        let index = this.findIndex(file);
        list.splice(index, 1);
        this.setCurChatList(list);
        setTimeout(() => {
          this.$refs.scroll.scrollToElement(this.$refs.mesRef[this.curChatList.length - 1], 100);
        }, 40);
        this.showToast(error.body && error.body.error || '图片上传出错');
      },
      sendPicByMsg(_msg, file) {
        let msg = new webim.Msg(this.selSess, true, _msg.seq, _msg.random, _msg.time, this.userId, 0, this.user.nickname);
        let UUID = file.preview.split('/').pop();
        var imagesObj = new webim.Msg.Elem.Images(UUID);
        let newImg1 = new webim.Msg.Elem.Images.Image(1, file.size, 100, 100, formatImg(file.key, IMG_SUFFIX1));
        let newImg2 = new webim.Msg.Elem.Images.Image(2, file.size, 100, 100, formatImg(file.key, IMG_SUFFIX2));
        let newImg3 = new webim.Msg.Elem.Images.Image(3, file.size, 100, 100, formatImg(file.key, IMG_SUFFIX3));
        imagesObj.addImage(newImg1);
        imagesObj.addImage(newImg2);
        imagesObj.addImage(newImg3);
        msg.addImage(imagesObj);
        let result = addMsg(msg, this.groupId, this.receiver.photo);
        result.msg.status = SENDING;
        this.updateCurStatus(result.msg);
        if (!this.msgMap[msg.uniqueId]) {
          this.msgMap[msg.uniqueId] = msg;
        }
        this.sendCommonMsg(msg, result);
      },
      showImage(type, pic) {
        let nowPic = pic;
        if (type === 'TIMImageElem') {
          let pics = [];
          this.curChatList.forEach((item) => {
            if (item.elems[0].type === 'TIMImageElem') {
              if (item.elems[0].content.ImageInfoArray[0].url === pic || item.elems[0].content.ImageInfoArray[1].url === pic) {
                nowPic = item.elems[0].content.ImageInfoArray[2].url;
              }
              pics.push(item.elems[0].content.ImageInfoArray[2].url);
            }
          });
          wx.previewImage({
            current: nowPic,
            urls: pics
          });
        }
      },
      ...mapMutations({
        setCurChatUserId: SET_CHAT_USERID,
        setCurChatList: SET_CHAT_LIST,
        setUser: SET_USER_STATE
      }),
      ...mapActions([
        'saveChatHistory',
        'updateMessages'
      ])
    },
    beforeDestroy() {
      this.setCurChatUserId('');
      this.setCurChatList([]);
    },
    watch: {
      tencentLogined(newVal) {
        if (this.receiver && newVal && this.user) {
          this.getHistoryMessage();
        }
      },
      user(newVal) {
        if (this.receiver && newVal && this.tencentLogined) {
          this.getHistoryMessage();
        }
      },
      receiver(newVal) {
        if (this.user && newVal && this.tencentLogined) {
          this.getHistoryMessage();
        }
      }
    },
    components: {
      Scroll,
      Emoji,
      Toast,
      Qiniu,
      Loading,
      FullLoading
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .chat-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: #f7f7f7;

    &.slide-enter-active, &.slide-leave-active {
      transition: all 0.3s;
    }

    &.slide-enter, &.slide-leave-to {
      left: 100%;
    }

    .message-content {
      font-size: 0;
      padding: 0 0.3rem;

      .error-icon {
        width: 1rem;
        height: 1rem;
        background-size: 0.48rem;
        background-repeat: no-repeat;
        background-position: center;
        @include bg-image('gth');
      }

      &:last-child {
        padding-bottom: 0.3rem;
      }

      .time-split {
        padding: 0.3rem 0;
        text-align: center;
        font-size: 0;

        .time-content {
          display: inline-block;
          padding: 0.1rem;
          border-radius: 0.1rem;
          font-size: $font-size-small;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.1);
        }
      }

      .p-content, span {
        display: inline-block;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }

      .p-content {
        position: relative;
        vertical-align: top;
        word-wrap: break-word;
        background: #fff;
        border-radius: 0.1rem;

        i {
          display: block;
          padding: 0.2rem;
          line-height: 0.38rem;
          font-style: normal;
          min-height: 0.8rem;
        }
      }
      .receive {
        width: 6.9rem;

        .avatar {
          width: 0.76rem;
          height: 0.76rem;
          border-radius: 50%;
          overflow: hidden;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          font-size: 0.4rem;
          line-height: 0.76rem;
          text-align: center;
          color: #fff;

          &.avatarDefault{
            background-color: $primary-color;
          }
        }

        .p-content {
          max-width: 4.8rem;
          box-sizing: content-box;
          margin-left: 0.4rem;
          font-size: $font-size-medium-xx;

          .triangle-left {
            position: absolute;
            left: -0.2rem;
            top: 0.1rem;
            display: inline-block;
            width: 0;
            height: 0;
            border-top: 0.25rem solid transparent;
            border-bottom: 0.25rem solid transparent;
            border-right: 0.25rem solid #fff;
          }

          img {
            max-width: 100%;
            vertical-align: bottom;
          }
        }
      }

      .post {
        width: 6.9rem;

        .loading-wrapper {
          position: absolute;
          top: 50%;
          left: -0.1rem;
          transform: translate(-100%, -50%);
        }

        .error-icon {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(-100%, -50%);
        }

        .p-content, span {
          float: right;
          font-size:$font-size-medium-xx;
        }

        .avatar {
          width: 0.76rem;
          height: 0.76rem;
          border-radius: 50%;
          overflow: hidden;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          font-size: 0.4rem;
          line-height: 0.76rem;
          text-align: center;
          color: #fff;

          &.avatarDefault{
            background-color: $primary-color;
          }
        }

        .p-content {
          max-width: 4.8rem;
          box-sizing: content-box;
          margin-right: 0.4rem;

          .triangle-right {
            position: absolute;
            right: -0.2rem;
            top: 0.1rem;
            display: inline-block;
            width: 0;
            height: 0;
            border-top: 0.25rem solid transparent;
            border-bottom: 0.25rem solid transparent;
            border-left: 0.25rem solid #fff;
          }

          img {
            max-width: 100%;
            vertical-align: bottom;
          }
        }
      }
    }

    .message-wrapper {
      position: absolute;
      top: 0;
      bottom: 1rem;
      width: 100%;
    }

    .message-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1rem;
      background-color: #fff;

      .message-input {
        position: fixed;
        // display: flex;
        padding: 0.15rem 0.36rem;
        width: 100%;
        height: 1rem;
        font-size: 0;
        border: 1px solid #eee;

        .sendMessage{
          display: flex;
          position: absolute;
          top: 0.2rem;
          right: 0.3rem;
          width: 0.7rem;
          height: 0.6rem;
          justify-content: center;
          align-items: center;
          line-height: 0.5rem;
          background: $primary-color;
          color: $color-highlight-background;
          border-radius: 0.2rem;
          font-size: $font-size-small;
          z-index: 999;
        }

        input {
          display: inline-block;
          width: 5.3rem;
          height: 0.7rem;
          border: 1px solid #eee;
          border-radius: 0.1rem;
          text-indent: 0.25rem;
          font-size: $font-size-medium-x;
        }

        span {
          position: absolute;
          right: 1.1rem;
          bottom: 0.2rem;
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
          margin-left: 0.2rem;
          margin-top: 0.1rem;
          @include bg-image('emoji');
          background-size: 100%;
          background-position: center;
        }

        i {
          position: absolute;
          right: 0.4rem;
          bottom: 0.2rem;
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
          margin-left: 0.2rem;
          margin-top: 0.1rem;
          @include bg-image('add');
          background-size: 100%;
          background-position: center;
        }

        .emoji {
          position: absolute;
          right: 0.2rem;
          bottom: 0.8rem;

        }

        .file {
          position: absolute;
          top: 0.15rem;
          right: 0;
          width: 1rem;
          height: 0.7rem;
          opacity: 0;
          z-index: 100;
        }
      }
    }
  }
</style>
