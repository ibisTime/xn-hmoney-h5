<template>
  <div class="home-wrapper" @click.stop>
    <div class="header">
    </div>
    <div class="container">
        <div class="con-user">
            <div class="user-left">
                <p :style="getUserPic(userDataList.photo)" :class="{'hidden': !(userDataList.photo)}" alt=""></p>
                <!-- <img src="./user.png" :class="{'hidden': (userDataList.photo)}" alt=""> -->
                <HeadPic :content="userDataList.nickname.substring(0, 1)" :class="{'hidden': userDataList.photo}"/>
            </div>
            <div class="user-right">
                <h5>{{userDataList.nickname}}</h5>
                <!-- <p>和他交易过 <span>0</span> 次</p> -->
            </div>
        </div>
        <div class="user-list">
            <div class="jy-box">
                <h5>{{userDataList.userStatistics && userDataList.userStatistics.jiaoYiCount}}</h5>
                <p>{{$t('homepage.subject.jycs')}}</p>
            </div>
            <div class="xr-box">
                <h5>{{userDataList.userStatistics && userDataList.userStatistics.beiXinRenCount}}</h5>
                <p>{{$t('homepage.subject.xrcs')}}</p>
            </div>
            <div class="hp-box" @click="$router.push('userpj?userId=' + userId)">
                <h5>{{userDataList.userStatistics && getPercentum(userDataList.userStatistics.beiHaoPingCount, userDataList.userStatistics.beiPingJiaCount)}}</h5>
                <p>{{$t('homepage.subject.xrl')}}</p>
            </div>
            <div class="ls-box">
                <h5>
                    {{totalTradeCount}}{{currency}}
                </h5>
                <p>{{$t('homepage.subject.lsjy')}}</p>
            </div>
        </div>
        <div class="user-btns">
            <p class="xr-p" @click="xrClickFn">
                {{xrText}}
            </p>
            <p class="lh-p" @click="lhClickFn">
                {{lhText}}
            </p>
        </div>
    </div>
    <FullLoading ref="fullLoading" v-show="isLoading"/>
    <Toast :text="textMsg" ref="toast" />
  </div>
</template>
<script>
import { getUrlParam, setTitle, formatAmount, getAvatar, getPercentum } from 'common/js/util';
import { getUser, getUserRelation, addUserRelation, removeUserRelation } from "api/person";
import FullLoading from 'base/full-loading/full-loading';
import Toast from 'base/toast/toast';
import HeadPic from 'base/head-pic/headPic';

export default {
  data() {
    return {
        userDataList: {
            nickname: '',
            userStatistics: {
                jiaoYiCount: '',
                beiXinRenCount: '',
                beiHaoPingCount: '',
                beiPingJiaCount: '',
            }
        },
        textMsg: this.$t('common.czcg'),
        isLoading: true,
        totalTradeCount: '',
        xrText: '+ ' + this.$t('homepage.subject.xr'),
        lhText: '+ ' + this.$t('homepage.subject.hmd'),
        trust: '',
        addBlack: '',
        userId: '',
        currency: ''
    };
  },
  created() {
      setTitle(this.$t('homepage.subject.grzy'));
      this.currency = getUrlParam('currency');
      this.userId = getUrlParam('userId');
      // currency: 币种; userId：查询用户的ID
      this.getGxFn();
      getUser(this.userId).then(data => {
          this.isLoading = false;
          this.userDataList.nickname = data.nickname;
      }, () => {
          this.isLoading = false;
      });
  },
  methods: {
      // 计算百分比
      getPercentum(num1, num2){
          return getPercentum(num1, num2);
      },
      // 获取头像
      getUserPic(pic){
          return getAvatar(pic);
      },
      getGxFn(){
          getUserRelation(this.currency, this.userId).then(data => {
            this.trust = data.isTrust;
            this.addBlack = data.isAddBlackList;
            // 查询与用户信任关系
            if(data.isTrust === '0'){
                this.xrText = '+ ' + this.$t('homepage.subject.xr');
            }else{
                this.xrText = this.$t('homepage.subject.yxr');
            }
            if(data.isAddBlackList === '0'){
                this.lhText = '+ ' + this.$t('homepage.subject.hmd');
            }else{
                this.lhText = this.$t('homepage.subject.ylh');
            }
            let tradeCount =  ((Math.floor(parseFloat(formatAmount(data.totalTradeCount, '0', this.currency)) * 10000)) / 10000).toFixed(4);
            this.totalTradeCount = data.totalTradeCount === '0' ? '0' : tradeCount;
            this.userDataList.userStatistics = {
              ...data
            }
        });
      },
      xrClickFn(){
          this.isLoading = true;
          if(this.trust === '0'){
              this.jlFn('1');
          }else{
              this.jcFn('1');
          }
      },
      lhClickFn(){
          this.isLoading = true;
          if(this.addBlack === '0'){
              this.jlFn('0');
          }else{
              this.jcFn('0');
          }
      },
      jcFn(type){
        removeUserRelation({
            toUser: this.userId,
            type
        }).then(() => {
          this.getGxFn();
          this.isLoading = false;
        }, () => {
            this.isLoading = false;
        })
      },
      jlFn(type){
        addUserRelation({
            type,
            toUser: this.userId
        }).then(() => {
          this.getGxFn();
          this.isLoading = false;
        }, () => {
            this.isLoading = false;
        });
      }
  },
  components: {
      FullLoading,
      Toast,
      HeadPic
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";
.home-wrapper{
    width: 100%;
    height: 12rem;
    background-color: #fff;
    h5{
        font-weight: 600;
    }
    .header{
        height: 2.6rem;
        background-image: linear-gradient(48deg, #E95D5D 0%, #F87F61 100%);
        box-shadow: 4px 0 16px 4px rgba(207,96,9,0.16);
    }
    .container{
        width: 92%;
        font-size: 0.22rem;
        padding-top: 0.5rem;
        border-radius: 0.08rem;
        margin: -0.8rem auto 0;
        background-color: #fff;
        box-shadow: 0px 3px 6px 1px rgba(0,0,0,0.1);
        .con-user{
            display: flex;
            margin: 0 .2rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #e5e5e5;
            margin-bottom: .46rem;
            >div{
                height: 1.3rem;
            }
            .user-left{
                width: 1.3rem;
                margin-right: 0.2rem;
                p{
                    width: 100%;
                    height: 100%;
                    background-position: center;
                    background-size: cover;
                    border-radius: 100%;
                }
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .user-right{
                padding: .2rem 0;
                h5{
                    color: #333;
                    font-size: 0.36rem;
                    margin-top: 0.16rem;
                }
                p{
                    font-size: 0.26rem;
                }
                span{
                    color: #D53D3D;
                }
            }
        }
        .user-list{
            display: flex;
            justify-content: center;
            margin-bottom: 0.7rem;
            div{
                text-align: center;
                width: 20%;
                h5{
                    font-size: 0.36rem;
                    margin-bottom: 0.2rem;
                }
                &:nth-of-type(4){
                    width: 36%;
                }
            }
        }
        .user-btns{
            display: flex;
            justify-content: center;
            padding-bottom: 0.56rem;
            p{
                width: 2rem;
                height: 0.72rem;
                line-height: 0.72rem;
                text-align: center;
                border: 1px solid #D53D3D;
                border-radius: 4px;
                color: #D53D3D;
                font-size: 0.32rem;
                font-family: PingFangSC-Regular;
                &:nth-of-type(2){
                    margin-left: 0.92rem;
                }
            }
        }
    }
}
</style>
