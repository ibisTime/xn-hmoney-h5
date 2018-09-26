<template>
  <div class="guest-wrapper" @click.stop>
    <header>
        <p>
        <i class='icon'></i>
        <span class='title'>我的获客</span>
        </p>
    </header>
    <div class='main'>
        <router-link to='mine' class='list-wrap' v-for='(item,index) in list' :key="index">
            <div class='list'>
                <div class='pic'>
                    <i class='icon'></i>
                </div>
                <div class='text'>
                    <div class='text1'>
                        <p class='txt1'><span class='name'>{{item.user.realName}}</span><span class='slogn1' :class="[item.user.idNO ? 'slogn1' : 'slogn2']">{{item.user.idNO ? '已认证' : '未认证'}}</span></p>
                        <p class='txt2 gray'>{{item.user.createDatetime}}</p>
                    </div>
                    <div class='text2'>
                        <p class='txt1'>交易金额：{{item.tradeCount}}</p>
                        <p class='txt2'>{{item.regAwardCount ? '待获佣：' : '获佣：'}}<span class='gray' :class="[item.regAwardCount ? 'gray' : 'red']">{{item.tradeCount}}{{item.tradeCount ? 'X' : ''}}</span></p>
                    </div>
                </div>
            </div>
        </router-link>
        <!-- <router-link to='mine' class='list-wrap'>
            <div class='list'>
                <div class='pic'>
                    <i class='icon'></i>
                </div>
                <div class='text'>
                    <div class='text1'>
                        <p class='txt1'><span class='name'>FUN MVP</span><span class='slogn2'>未认证</span></p>
                        <p class='txt2 gray'>2018-09-03</p>
                    </div>
                    <div class='text2'>
                        <p class='txt1'>交易金额：26890.00CNY</p>
                        <p class='txt2 red'>获佣：45X</p>
                    </div>

                </div>
            </div>
        </router-link> -->
        <!-- <router-link to='mine' class='list-wrap'>
            <div class='list'>
                <div class='pic'>
                    <i class='icon'></i>
                </div>
                <div class='text'>
                    <div class='text1'>
                        <p class='txt1'><span class='name'>不懂</span><span class='slogn1'>已认证</span></p>
                        <p class='txt2 gray'>2018-09-03</p>
                    </div>
                    <div class='text2'>
                        <p class='txt1'>交易金额：26890.00</p>
                        <p class='txt2'>获佣：<span class='red'>200X</span></p>
                    </div>

                </div>
            </div>
        </router-link>
        <router-link to='mine' class='list-wrap'>
            <div class='list'>
                <div class='pic'>
                    <i class='icon'></i>
                </div>
                <div class='text'>
                    <div class='text1'>
                        <p class='txt1'><span class='name'>Sting</span><span class='slogn1'>已认证</span></p>
                        <p class='txt2 gray'>2018-09-03</p>
                    </div>
                    <div class='text2'>
                        <p class='txt1'>交易金额：26890.00</p>
                        <p class='txt2'>获佣：<span class='red'>200X</span></p>
                    </div>

                </div>
            </div>
        </router-link> -->

    </div>
  </div>
</template>
<script>
import { myGuest } from "../../api/person";
import { getUser, formatDate, moneyFormat, isUnDefined } from "../../common/js/util";

export default {
  data() {
    return {
      list: [],
      start: 1,
      limit: 10
    };
  },
  created() {
      this.myGuest();
  },
  methods: {
    myGuest() {
      myGuest(this.start, this.limit).then(data => {
        console.log(data);
        data.list.map( v => {
            v.tradeCount = moneyFormat(v.tradeCount);
            v.regAwardCount = isUnDefined(v.regAwardCount);
            v.user.createDatetime = formatDate(v.user.createDatetime, 'yyyy-MM-dd');
        });
        this.list = data.list;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.guest-wrapper {
  font-size: 0.28rem;
  color: #333;
  width: 100%;
  .red {
    color: #d53d3d;
  }
  .gray {
    color: #999;
  }

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
    margin-bottom: 0.2rem;

    .icon {
      width: 0.21rem;
      height: 0.36rem;
      @include bg-image("返回");
      float: left;
      margin-top: 0.31rem;
    }
  }
  .main {
    width: 100%;
    background: #fff;
    .list-wrap {
      display: block;
      width: 100%;
      padding: 0.4rem 0;
      border-bottom: 0.01rem solid #e5e5e5;
      .list {
        width: 100%;
        padding: 0 0.3rem;
        display: flex;
        .pic {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          margin-right: 0.22rem;
          .icon {
            width: 100%;
            height: 100%;
            @include bg-image("头像(4)");
          }
        }
        .text {
          width: 83%;
          font-size: 0.24rem;
          color: #323232;
          .text1,
          .text2 {
            display: flex;
            justify-content: space-between;
          }

          .text1 {
            padding-bottom: 0.27rem;
            .name {
              font-size: 0.28rem;
              font-weight: bold;
            }
            .slogn1 {
              display: inline-block;
              width: 0.74rem;
              border-radius: 0.04rem;
              background: #d53d3d;
              font-size: 0.2rem;
              color: #fff;
              text-align: center;
              line-height: 0.28rem;
              margin-left: 0.23rem;
            }
            .slogn2 {
              display: inline-block;
              width: 0.74rem;
              border-radius: 0.04rem;
              background: #b3b3b3;
              font-size: 0.2rem;
              color: #fff;
              text-align: center;
              line-height: 0.28rem;
              margin-left: 0.23rem;
            }
          }
        }
      }
    }
  }
}
</style>
