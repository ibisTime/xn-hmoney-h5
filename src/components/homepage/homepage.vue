<template>
  <div class="home-wrapper" @click.stop>
    <div class="header">
    </div>
    <div class="container">
        <div class="con-user">
            <div class="user-left">
                <img src="./user.png" alt="">
            </div>
            <div class="user-right">
                <h5>kylong</h5>
                <p>和他交易过 <span>0</span> 次</p>
            </div>
        </div>
        <div class="user-list">
            <div class="jy-box">
                <h5>{{userDataList.userStatistics.jiaoYiCount}}</h5>
                <p>交易次数</p>
            </div>
            <div class="xr-box">
                <h5>{{userDataList.userStatistics.beiXinRenCount}}</h5>
                <p>信任次数</p>
            </div>
            <div class="hp-box">
                <h5>{{userDataList.userStatistics.beiHaoPingCount / userDataList.userStatistics.beiPingJiaCount * 100}}%</h5>
                <p>好评率</p>
            </div>
            <div class="ls-box">
                <h5>100</h5>
                <p>历史交易</p>
            </div>
        </div>
        <div class="user-btns">
            <p class="xr-p">
                + 信任
            </p>
            <p class="lh-p">
                + 黑名单
            </p>
        </div>
    </div>
  </div>
</template>
<script>
import Scroll from 'base/scroll/scroll';
import { getUser, getUserRelation } from "api/person";

export default {
  data() {
    return {
        userDataList: {
            userStatistics: {
                jiaoYiCount: '',
                beiXinRenCount: '',
                beiHaoPingCount: '',
                beiPingJiaCount: '',
            }
        }
    };
  },
  created() {
      // currency: 币种; userId：查询用户的ID
    //   getUserRelation(currency, userId).then(data => {

    //   });
      getUser().then(data => {
          this.userDataList = data;
          var totalTradeCount = data.totalTradeCount == '0' ? '0' : base.formatMoney(data.totalTradeCount, '0', currency) + '+';
      });
  },
  computed: {},
  methods: {},
  components: {
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";
.home-wrapper{
    width: 100%;
    height: 100%;
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
        margin: -1.5rem auto 0;
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
                img{
                    width: 100%;
                }
            }
            .user-right{
                padding: .2rem 0;
                h5{
                    color: #333;
                    font-size: 0.36rem;
                    margin-bottom: 0.3rem;
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
                width: 24%;
                h5{
                    font-size: 0.36rem;
                    margin-bottom: 0.2rem;
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
