<template>
  <div class="order-detail-wrapper" @click.stop>
    <!-- <header>
        <p>
        <i class='icon'></i>
        订单详情
        </p>
    </header> -->
    <div class='order'>
        <p>
            <span class='num'><i class='icon'></i>{{$t('myOrderDetail.subject.ddbh')}}：{{orderDetailData.code.substring(orderDetailData.code.length-8)}}</span>
            <span class='state'>{{statusValueList[orderDetailData.status]}}</span>
        </p>
    </div>
    <div class='trading'>
        <p class='money'><span>{{$t('myOrderDetail.subject.jyje')}}</span><span>{{orderDetailData.tradeAmount ? orderDetailData.tradeAmount : '0'}} {{orderDetailData.tradeCurrency}}</span></p>
        <p class='number'><span>{{$t('myOrderDetail.subject.jysl')}}</span><span>{{countString ? countString : '0'}} {{orderDetailData.tradeCoin}}</span></p>
        <p class='price'><span>{{$t('myOrderDetail.subject.jyjg')}}</span><span>{{orderDetailData.tradePrice ? orderDetailData.tradePrice : '0'}} {{orderDetailData.tradeCurrency}}</span></p>
    </div>
    <div class='message'>
        <div class='mess'>
            <p class='text1'>
              <span>{{$t('myOrderDetail.subject.mj')}} {{orderDetailData.sellUserInfo.nickname}}</span>
              <span class='pay'>{{payTypeList[orderDetailData.payType]}}</span>
              <span class='seller'>{{$t('myOrderDetail.subject.maij')}}： {{orderDetailData.buyUserInfo.nickname}}</span>
            </p>
            <p class='text2'>{{orderDetailData.leaveMessage}}</p>
        </div>
        <div class='appraise' v-show='this.index == 2'>
          <p class='txt1'>{{$t('myOrderDetail.subject.pj')}}</p>
          <p class='txt2'>{{$t('myOrderDetail.subject.pjyj')}}</p>
        </div>
    </div>
    <div class='window'>
        <p v-html="yjTitle"></p>
        <p v-html="btns" @click="operationBtn">
        </p>
    </div>

    <div class='chat'>
        <div class='chat-inner'>
          <div class='content'>
            <div class="chat-wrapper" @click='hide'>
              <div class="message-wrapper">
                <scroll :data="curChatList"
                        :pullUpLoad="pullUpLoad"
                        :listenScroll="listenScroll"
                        :probeType="probeType"
                        @scroll="scroll"
                        ref="scroll">
                  <div v-show="" class="loading-wrapper">
                    <loading title=""></loading>
                  </div>
                  <div v-for="(info,index) in curChatList" ref="mesRef" class="message-content">
                    <div class="time-split"><div v-show="showTime(info, index)" class="time-content">{{getDate(info.time)}}</div></div>
                    <div class="receive" v-if="!info.isSend">
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
                    <div v-else class="post clearfix">
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
            </div>
          </div>
        </div>
    </div>

    <div class="message-footer">
      <div class="message-input">
        <input type="text" placeholder="输入聊天内容" ref="inputText" v-model="emoji" @keyup.enter="dealMessage" class="msgedit"/>
        <span @click.stop="showE"></span>
        <div class="sendMessage" v-show="sendMessage" @click.stop="dealMessage">发送</div>
        <emoji ref="emoji" @select="selectItem"></emoji>
        <i @click="showE"></i>
        <div class="file" v-if="token">
          <qiniu :multiple="multiple" @beforeUpload="handleUpload" @error="handleError" :token="token" ref="qiniu"></qiniu>
        </div>
      </div>
    </div>
    <div class="zc-box" v-show="zcShow">
      <div class='up-window'>
        <h3>{{$t('myOrderDetail.subject.zcly')}}</h3>
        <div class='text'>
          <textarea type="text" :placeholder="$t('myOrderDetail.subject.sqly')" v-model="reason"></textarea>
        </div>
        <div class='btn'>
          <button class='no' @click='qxReason'>{{$t('common.qx')}}</button>
          <button class='yes' @click="qrReason">{{$t('common.qr')}}</button>
        </div>
      </div>
    </div>
    <div class="zc-box" v-show="showFlag">
      <div class='up-window'>
        <h3>{{$t('myOrderDetail.subject.jypj')}}</h3>
        <p>{{$t('myOrderDetail.subject.yhyx')}}</p>
        <div class='pj-text'>
          <div class="item on">
              <div class="icon icon-good" @click="pjClick('2')">
                <img src="./hph.png" alt="" :class="{'hidden': userHp}">
                <img src="./hp.png" alt="" :class="{'hidden': !userHp}">
              </div>
              <p>{{$t('common.hp')}}</p>
          </div>
          <div class="item ml20">
              <div class="icon icon-bad" @click="pjClick('0')">
                <img src="./cph.png" alt="" :class="{'hidden': userCp}">
                <img src="./cp.png" alt="" :class="{'hidden': !userCp}">
              </div>
              <p>{{$t('common.cp')}}</p>
          </div>
        </div>
        <div class="pj-content">
              <textarea name="" id="" :placeholder="$t('myOrderDetail.subject.klpj')" v-model="content"></textarea>
          </div>
        <div class='btn'>
          <button class='no' @click='qxUserPj'>{{$t('common.qx')}}</button>
          <button class='yes' @click="qrUserPj">{{$t('common.qr')}}</button>
        </div>
      </div>
    </div>
    <Toast :text="textMsg" ref="toast" />
    <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
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
import {getUserId, getUrlParam, isUnDefined, formatAmount, formatDate, formatChatDate, formatImg, setTitle, formatAvatarSyl} from 'common/js/util';
import User from 'common/bean/user';
import {getUser} from 'api/user';
import {getOrderDetail, releaseOrder, payOrder, cancelOrder, arbitrationlOrder, commentOrder} from 'api/person';
import {getQiniuToken, getDictList } from 'api/general';

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
  data() {
    return {
      textMsg: '',
      yjTitle: '',
      orderDetailData: {
        buyUserInfo: {
          nickname: ''
        },
        sellUserInfo: {
          nickname: ''
        },
        code: ''
      },
      statusValueList: {},
      payTypeList: {},
      btns: '',
      index: 0,
      show: true,
      code: '',
      countString: '',
      reason: '',
      zcShow: false,
      showFlag: false,
      userHp: false,
      userCp: false,
      isLoading: true,
      comment: '',
      content: '',
      emoji: '',
      start: -1,
      hasMore: true,
      receiver: null,
      showEmoji: false,
      token: '',
      sendMessage: false,
      getPrePageGroupHistroyMsgInfoMap: {},
      isMWindow: true
    };
  },
  created() {
    this.isMessageWindow();
    this.code = this.$route.query.code;
    if (this.isMWindow) {
      this.groupId = this.$route.params.id;
    } else {
      this.groupId = this.code;
    }
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

    getDictList('pay_type').then(data => {
      data.forEach((item) => {
          this.payTypeList[item.dkey] = item.dvalue;
      });
    });
    getDictList('trade_order_status').then(data => {
        data.forEach((item) => {
            this.statusValueList[item.dkey] = item.dvalue
        });
      this.getInitData();
      this.orderMessage();
    })
  },
  mounted() {
    if (!this.isMWindow) {
      setTitle(this.$t('myOrderDetail.subject.ddxq'));
    }
  },
  computed: {
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
    // 评价
    pjClick(value){
      if(value == '0'){ // 差评
        this.userHp = false;
        this.userCp = !this.userCp;
      }
      if(value == '2'){ // 好评
        this.userCp = false;
        this.userHp = !this.userHp;
      }
      this.comment = value;
    },
    qxUserPj(){
      this.showFlag = false;
    },
    qrUserPj(){
      if(this.comment == ''){
        this.textMsg = this.$t('myOrderDetail.subject.qdp');
        this.$refs.toast.show();
        return;
      }
      this.isLoading = true;
      this.showFlag = false;
      commentOrder(this.code, this.comment, this.content).then(data => {
        if(data.filterFlag == '2'){
          this.textMsg = this.$t('myOrderDetail.subject.pjsh');
        }else{
          this.textMsg = this.$t('myOrderDetail.subject.pjcg');
        }
        this.$refs.toast.show();
        this.orderMessage();
      }, () => {
        this.isLoading = false;
        this.orderMessage();
      })
    },
    orderMessage(){
      getOrderDetail(this.code).then(data => {
        let receiver = {};
        // 判断卖家卖家
        if (data.buyUser === this.userId) {
          receiver = data.sellUserInfo;
        } else {
          receiver = data.sellUserInfo;
        }
        this.receiver = new User(receiver);
        if(this.isMWindow) {
          setTitle(this.receiver.nickname);
        }

        this.zcShow = false;
        if(data.tradeAmount && data.tradePrice){
          data.tradeAmount = (Math.floor(data.tradeAmount * 100) / 100).toFixed(2);
          data.tradePrice = (Math.floor(data.tradePrice * 100) / 100).toFixed(2);
        }
        this.orderDetailData = data;
        this.countString = formatAmount(data.countString, '', data.tradeCoin);
        this.yjTitle = `${this.$t('myOrderDetail.subject.ddbcd')}<i>${data.invalidDatetime ? formatDate(data.invalidDatetime, "hh:mm:ss") : '--'}</i>，${this.$t('myOrderDetail.subject.zdqx')}`;
        // 当前用户为买家
        if (data.buyUser == getUserId()) {
          if(data.status == 0){
            this.btns = `<button class="o-btn payBtn">
                          ${this.$t('myOrderDetail.subject.bjfk')}
                        </button>
                        <button class="o-btn qx-btn cancelBtn">
                          ${this.$t('myOrderDetail.subject.qxjy')}
                        </button>`;
          }else if(data.status == "2"){
            if (data.bsComment != "0" && data.bsComment != "1") {
              this.btns = `<button class="o-btn pjBtn">${this.$t('myOrderDetail.subject.jypj')}</button>`
            }
          }
          if (data.status == "1") {
            this.btns = `<button class="o-btn qx-btn sqBtn">${this.$t('myOrderDetail.subject.sqzc')}</button>`
          }
        }else{  // 当前用户为卖家
          //待支付
          if (data.status == "1") {
              this.btns = `<button class="o-btn releaseBtn">${this.$t('myOrderDetail.subject.sfhb')}</button>
                          <button class="o-btn qx-btn sqBtn">${this.$t('myOrderDetail.subject.sqzc')}</button>`;
          } else if (data.status == "2") {
              if (data.sbComment != "0" && data.sbComment != "1") {
                this.btns = `<button class="o-btn pjBtn">${this.$t('myOrderDetail.subject.jypj')}</button>`
              }
          }
        }

        if(data.status == '-1'){
          this.btns = `<button class="o-btn qx-btn cancelBtn">
                          ${this.$t('myOrderDetail.subject.qxjy')}
                        </button>`;
        }

        // 系统自动取消
        if( data.status == '4' || data.status == '5' || data.status == '3'){
          this.yjTitle = data.remark;
          this.btns = '';
        }

        this.isLoading = false;
      });
    },
    operationBtn(){
      let target = event.target;
      let toast = this.$refs.toast;
      if(target.localName === 'button'){
        this.isLoading = true;
        // 标记付款 payOrder
        if(target.classList.contains('payBtn')){
          payOrder(this.code).then(data => {
            this.orderMessage();
          }, () => {
            this.isLoading = false;
          });
        }
        // 取消订单 cancelOrder 
        if(target.classList.contains('cancelBtn')){
          cancelOrder(this.code).then(data => {
            this.orderMessage();
          }, () => {
            this.isLoading = false;
          });
        }
        // 申请仲裁 arbitrationlOrder
        if(target.classList.contains('sqBtn')){
          this.isLoading = false;
          this.zcShow = true;
        }
        // 释放货币 releaseOrder 
        if(target.classList.contains('releaseBtn')){
          releaseOrder(this.code).then(data => {
            this.orderMessage();
          }, () => {
            this.isLoading = false;
          });
        }

        // 评价 
        if(target.classList.contains('pjBtn')){
          this.showFlag = true;
        }
      }
    },
    qxReason(){
      this.zcShow = false;
    },
    qrReason(){
      if(this.reason == ''){
        this.textMsg = this.$t('myOrderDetail.subject.sqlybk');
        this.$refs.toast.show();
      }
      let config = {
        code: this.code,
        reason: this.reason
      };
      arbitrationlOrder(config).then(data => {
        this.textMsg = this.$t('myOrderDetail.subject.fqcg');
        this.$refs.toast.show();
        this.orderMessage();
      });
    },
    loadingFlag() {
      if (this.user && this.receiver && this.tencentLogined && this.token) {
        return !((!this.curChatList.length && !this.hasMore) || this.curChatList.length);
      }
      return true;
    },
    getInitData() {
      this.getUser();
      getQiniuToken().then((data) => {
        this.token = data.uploadToken;
      }).catch(() => {});
    },
    getUser() {
      if (!this.user) {
        getUser().then((data) => {
          this.setUser(data);
        }).catch(() => {});
      }
    },
    // 判断是否在聊天界面
    isMessageWindow() {
      if (isUnDefined(this.$route.path.split('/message/')[1])) {
        this.isMWindow = false;
      } else {
        this.isMWindow = true;
      }
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
    showE() {
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
          // this.$refs.scroll.scrollToElement(this.$refs.mesRef[this.curChatList.length - 1], 100);
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
        let oriList = this.curChatList.slice();
        this.setCurChatList(newList.concat(oriList));
        this.hasMore = min !== 0;
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
            this.showMsg('该群组已开启全局禁言');
          }
          if (cbOK) {
            cbOK(resp);
          }
        },
        function(err) {
          this.showMsg(err.ErrorInfo);
          cbErr && cbErr();
        }
      );
    },
    showMsg(msg) {
      this.textMsg = msg;
      this.$refs.toast.show();
    },
    //获取最新的群历史消息,用于切换群组聊天时，重新拉取群组的聊天消息
    getLastGroupHistoryMsgs(cbOk) {
      getGroupInfo(this.groupId, function(resp) {
        let groupId = this.groupId;
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
        this.selSess = null;
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
            this.getPrePageGroupHistroyMsgInfoMap[groupId] = {
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
      //		console.log('History', msgList);
      for (var j in msgList) { //遍历新消息
        msg = msgList[j];
        if (msg.getSession().id() === this.groupId) { //为当前聊天对象的消息
          this.selSess = msg.getSession();
          //在聊天窗体中新增一条消息
          newList.push(msg);
        }
      }
      //消息已读上报，并将当前会话的消息设置成自动已读
      webim.setAutoRead(this.selSess, true, true);
      return newList;
    },
    //向上翻页，获取更早的群历史消息
    getPrePageGroupHistoryMsgs(cbOk) {
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
          getPrePageGroupHistroyMsgInfoMap[this.groupId] = {
            "ReqMsgSeq": msgSeq
          };

          if (cbOk) {
            cbOk(this.getHistoryMsgCallback(msgList, true));
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
        // this.getLastGroupHistoryMsgs(function(msgList) {
        //   this.setCurChatList(msgList);
        // }, function(err) {
        //   alert(err.ErrorInfo);
        // });
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
      this.textMsg = msg;
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

.order-detail-wrapper {
  font-size: 0.28rem;
  color: #333;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }

  header {
    line-height: 0.88rem;
    text-align: center;
    font-size: 0.36rem;
    font-weight: bold;
    background: #fff;
    width: 100%;
    padding: 0 0.3rem;
    border-bottom: 0.01rem solid #e5e5e5;

    .icon {
      width: 0.21rem;
      height: 0.36rem;
      background-image: url('./fh.png');
      float: left;
      margin-top: 0.31rem;
    }
  }

  .order {
    width: 100%;
    padding: 0.15rem 0.3rem;
    background: #fff;    
    line-height: 1rem;
    p {
      border-bottom: 0.01rem solid #e5e5e5;
      .icon {
        width: 0.23rem;
        height: 0.26rem;
        background-image: url('./ddbh.png');
        margin-right: 0.12rem;
      }
      .state {
        float: right;
        font-size: 0.32rem;
        color: #d53d3d;
      }
      .num{
        display: inline-block;
        max-width: 4rem;
        line-height: 0.4rem;
      }
    }
  }

  .trading {
    background: #fff;
    width: 100%;
    padding: 0.3rem 0.3rem;
    margin-bottom: 0.2rem;

    p {
      display: flex;
      justify-content: space-between;
    }
    .number,
    .price {
      font-size: 0.28rem;
      color: #999;
    }
    .number {
      margin: 0.34rem 0;
    }
  }

  .message {
    width: 100%;
    padding: 0.32rem 0.3rem 0;
    background: #fff;
    .mess {
      padding-bottom: 0.3rem;
      border-bottom: 0.01rem solid #e6e6e6;
      .text1 {
        margin-bottom: 0.3rem;
        .pay {
          display: inline-block;
          width: 0.74rem;
          background: #0ec55b;
          font-size: 0.2rem;
          line-height: 0.28rem;
          color: #fff;
          text-align: center;
          margin-left: 0.12rem;
          border-radius: 0.03rem;
        }
        .seller {
          position: absolute;
          right: 0.3rem;
        }
      }
      .text2 {
        font-size: 0.26rem;
        color: #999;
        line-height: 0.34rem;
      }
    }
    .appraise {
      padding: .3rem 0 .28rem;
      border-bottom: .01rem solid #e6e6e6;
      .txt1 {
        margin-bottom: .28rem;
      }
      .txt2 {
        color: #999;
      }
    }
  }

  .window {
    width: 100%;
    background: #fff;
    text-align: center;
    p {
      font-size: 0.24rem;
      color: #999;
      padding: 0.3rem 0 0.34rem;
    }
  }

  .chat {
    width: 100%;
    padding: 0 .3rem;
    height: 4rem;
    margin-bottom: 0.98rem;
    overflow: hidden;
    .chat-inner {
      width: 102%;
      height: 4rem;
      overflow-y: auto;
      .content {
        height: 100%;
      }
    }
  }

  .chat-input {
    width: 100%;
    height: 0.98rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    p {
      width: 100%;
      margin: 0.14rem 0.3rem;
      input {
        width: 5.4rem;
        line-height: 0.7rem;
        border: 0.01rem solid #e5e5e5;
        border-radius: 0.05rem;
        text-indent: 0.22rem;
      }
      input[attr="placeholder"] {
        font-size: 0.32rem;
        color: #999;
      }

      .ico1,
      .ico2 {
        width: 0.5rem;
        height: 0.5rem;
        position: absolute;
        top: 0.28rem;
      }

      .ico1 {
        background-image: url('./bq1.png');
        right: 1rem;
      }
      .ico2 {
        background-image: url('./tj2.png');
        right: 0.3rem;
      }
    }
  }

  .prompt {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    position: fixed;
    top: 0;

    .appraise {
      width: 6.14rem;
      height: 6.4rem;
      background: #fff;
      border-radius: .2rem;
      position: absolute;
      left: 50%;
      top: 3rem;
      transform: translateX(-50%);
      text-align: center;
      padding: .54rem .57rem 0;

      .text1 {
        font-size: .32rem;
        font-weight: bold;
        margin-bottom: .4rem;
      }

      .text2 {
        margin-bottom: .62rem;
      }

      textarea {
        width: 5rem;
        height: 1.3rem;
        font-size: 0.32rem;
        border-radius: .1rem;
        border: .01rem solid #dedede;
        text-align: left;
        color: #999;
        padding: .26rem 0 0 .2rem;
        margin-bottom: .52rem;
      }

      .btn {
        font-size: .32rem;
        color: #d53d3d;
      }

    }
    
  }

  .zc-box{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 110%;
    background-color: rgba(0,0,0,.5);
  }
  .up-window{
    position: absolute;
    top: 4.1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 6.14rem;
    // height: 6.5rem;
    background: #fff;
    border-radius: .2rem;
    padding: .4rem .6rem .34rem;
    p{
      margin-top: 0.3rem;
      text-align: center;
    }
    .ico,h3 {
      text-align: center;
      font-size: .32rem;
      color: #333;
    }
    .btn {
      button {
        width: 2.2rem;
        height: .7rem;
        border-radius: .1rem;
        color: #fff;
        line-height: .7rem;
        font-size: .28rem;
      }
      .no {
        background: #dedede;
        margin-right: .25rem;
      }
      .yes {
        background: #d53d3d;
      }
    }
    .text{
      margin-top: .4rem;
      margin-bottom: .3rem;
    }
    textarea{
      width: 100%;
      height: 1.3rem;
      border: 1px solid #ddd;
      border-radius: 0.06rem;
      padding: .12rem 0.18rem;
    }
    .pj-text{
      display: flex;
      margin-top: .2rem;
      margin-bottom: .2rem;
      justify-content: space-between;
      >div{
        width: 40%;
        height: 2rem;
        text-align: center;
        padding-top: 0.2rem;
        box-sizing: border-box;
        img{
          width: 100%;
        }
        .icon{
          width: 1rem;
          height: 1rem;
          margin-bottom: 0.2rem;
        }
      }
    }
    .pj-content{
      margin-bottom: 0.4rem;
    }
  }

}

.chat-wrapper {
  background-color: #f7f7f7;
  height: 100%;

  &.slide-enter-active, &.slide-leave-active {
    transition: all 0.3s;
  }

  &.slide-enter, &.slide-leave-to {
    left: 100%;
  }

  .message-content {
    font-size: 0;
    padding: 0 0.3rem;
    height: 100%;

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
    /*position: absolute;*/
    /*top: 0;*/
    /*bottom: 1rem;*/
    width: 100%;
  }

}
.message-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
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

</style>
