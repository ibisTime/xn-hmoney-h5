<template>
  <div class="order-wrapper" @click.stop>
    <header>
        <p>
        <i class='icon'></i>
        <span class='title'>我的广告</span>
        </p>
    </header>
    <div class='tabs'>
        <p @click="change1">
            <span :class="[show1? 'select' : '']">待发布</span>
        </p>
        <p @click="change2">
            <span :class="[!show1? 'select' : '']">已发布</span>
        </p>
    </div>
    <!-- 待发布 -->
    <div v-show='show1' class='adver'>
        <router-link to='buy-publish' class='list-wrap'>
            <div class='list1'>
                <div class='pic'>
                    <i class='icon'></i>
                </div>
                <div class='text1'>
                    <p class='txt1'><span class='name'>FUN MVP</span><span class='green'>支付宝</span></p>
                    <p class='txt2'>交易12 • 好评100 • 信任5</p>
                    <p class='txt3'>限额：100-12345CNY</p>
                </div>
                <div class='text2'>
                    <p class='txt1'>285600CNY</p>
                    <router-link to='' class='txt2 select'>发布</router-link>
                </div>
            </div>
            <div class='list2'>
                <router-link to='buy-publish' class='text1'>
                    <p><i class='icon'></i><span>编辑</span></p>
                </router-link>|
                <router-link to='' class='text2'>
                    <p><i class='icon'></i><span>下架</span></p>
                </router-link>
            </div>
        </router-link>
        <!-- <router-link to='buy-publish' class='list-wrap'>
            <div class='list1'>
                <div class='pic'>
                    <i class='icon'></i>
                </div>
                <div class='text1'>
                    <p class='txt1'><span class='name'>FUN MVP</span><span class='green'>银行卡</span></p>
                    <p class='txt2'>交易12 • 好评100 • 信任5</p>
                    <p class='txt3'>限额：100-12345CNY</p>
                </div>
                <div class='text2'>
                    <p class='txt1'>285600CNY</p>
                    <router-link to='' class='txt2 select'>发布</router-link>
                </div>
            </div>
            <div class='list2'>
                <router-link to='buy-publish' class='text1'>
                    <p><i class='icon'></i><span>编辑</span></p>
                </router-link>|
                <router-link to='' class='text2'>
                    <p><i class='icon'></i><span>下架</span></p>
                </router-link>
            </div>
        </router-link>
        <router-link to='buy-publish' class='list-wrap'>
            <div class='list1'>
                <div class='pic'>
                    <i class='icon'></i>
                </div>
                <div class='text1'>
                    <p class='txt1'><span class='name'>FUN MVP</span><span class='green'>支付宝</span></p>
                    <p class='txt2'>交易12 • 好评100 • 信任5</p>
                    <p class='txt3'>限额：100-12345CNY</p>
                </div>
                <div class='text2'>
                    <p class='txt1'>285600CNY</p>
                    <router-link to='' class='txt2 select'>发布</router-link>
                </div>
            </div>
            <div class='list2'>
                <router-link to='buy-publish' class='text1'>
                    <p><i class='icon'></i><span>编辑</span></p>
                </router-link>|
                <router-link to='' class='text2'>
                    <p><i class='icon'></i><span>下架</span></p>
                </router-link>
            </div>
        </router-link>
        <router-link to='buy-publish' class='list-wrap'>
            <div class='list1'>
                <div class='pic'>
                    <i class='icon'></i>
                </div>
                <div class='text1'>
                    <p class='txt1'><span class='name'>FUN MVP</span><span class='green'>银行卡</span></p>
                    <p class='txt2'>交易12 • 好评100 • 信任5</p>
                    <p class='txt3'>限额：100-12345CNY</p>
                </div>
                <div class='text2'>
                    <p class='txt1'>285600CNY</p>
                    <router-link to='' class='txt2 select'>发布</router-link>
                </div>
            </div>
            <div class='list2'>
                <router-link to='buy-publish' class='text1'>
                    <p><i class='icon'></i><span>编辑</span></p>
                </router-link>|
                <router-link to='' class='text2'>
                    <p><i class='icon'></i><span>下架</span></p>
                </router-link>
            </div>
        </router-link> -->
    </div>
    <!-- 已发布 -->
    <div v-show="!show1" class='has-adver'>
        <router-link to='buy-publish?type=1' class='list-wrap'>
            <div class='list1'>
                <div class='pic'>
                    <i class='icon'></i>
                </div>
                <div class='text1'>
                    <p class='txt1'><span class='name'>FUN MVP</span><span class='green'>支付宝</span></p>
                    <p class='txt2'>交易12 • 好评100 • 信任5</p>
                    <p class='txt3'>限额：100-12345CNY</p>
                </div>
                <div class='text2'>
                    <p class='txt1'>285600CNY</p>
                    <router-link to='' class='txt2'>发布</router-link>
                </div>
            </div>
            <div class='list2'>
                <router-link to='sell-publish' class='text1'>
                    <p><i class='icon'></i><span>编辑</span></p>
                </router-link>|
                <router-link to='' class='text2'>
                    <p><i class='icon'></i><span>下架</span></p>
                </router-link>
            </div>
        </router-link>
        <!-- <router-link to='buy-publish?type=1' class='list-wrap'>
            <div class='list1'>
                <div class='pic'>
                    <i class='icon'></i>
                </div>
                <div class='text1'>
                    <p class='txt1'><span class='name'>FUN MVP</span><span class='green'>银行卡</span></p>
                    <p class='txt2'>交易12 • 好评100 • 信任5</p>
                    <p class='txt3'>限额：100-12345CNY</p>
                </div>
                <div class='text2'>
                    <p class='txt1'>285600CNY</p>
                    <router-link to='' class='txt2'>发布</router-link>
                </div>
            </div>
            <div class='list2'>
                <router-link to='sell-publish' class='text1'>
                    <p><i class='icon'></i><span>编辑</span></p>
                </router-link>|
                <router-link to='' class='text2'>
                    <p><i class='icon'></i><span>下架</span></p>
                </router-link>
            </div>
        </router-link>
        <router-link to='buy-publish?type=1' class='list-wrap'>
            <div class='list1'>
                <div class='pic'>
                    <i class='icon'></i>
                </div>
                <div class='text1'>
                    <p class='txt1'><span class='name'>FUN MVP</span><span class='green'>支付宝</span></p>
                    <p class='txt2'>交易12 • 好评100 • 信任5</p>
                    <p class='txt3'>限额：100-12345CNY</p>
                </div>
                <div class='text2'>
                    <p class='txt1'>285600CNY</p>
                    <router-link to='' class='txt2'>发布</router-link>
                </div>
            </div>
            <div class='list2'>
                <router-link to='sell-publish' class='text1'>
                    <p><i class='icon'></i><span>编辑</span></p>
                </router-link>|
                <router-link to='' class='text2'>
                    <p><i class='icon'></i><span>下架</span></p>
                </router-link>
            </div>
        </router-link>
        <router-link to='buy-publish?type=1' class='list-wrap'>
            <div class='list1'>
                <div class='pic'>
                    <i class='icon'></i>
                </div>
                <div class='text1'>
                    <p class='txt1'><span class='name'>FUN MVP</span><span class='green'>银行卡</span></p>
                    <p class='txt2'>交易12 • 好评100 • 信任5</p>
                    <p class='txt3'>限额：100-12345CNY</p>
                </div>
                <div class='text2'>
                    <p class='txt1'>285600CNY</p>
                    <router-link to='' class='txt2'>发布</router-link>
                </div>
            </div>
            <div class='list2'>
                <router-link to='sell-publish' class='text1'>
                    <p><i class='icon'></i><span>编辑</span></p>
                </router-link>|
                <router-link to='' class='text2'>
                    <p><i class='icon'></i><span>下架</span></p>
                </router-link>
            </div>
        </router-link> -->
    </div>
  </div>
</template>
<script>
import { myAdver } from "api/person";

export default {
  data() {
    return {
      show1: true,
    };
  },
  created() {
    //   this.myAdver1();
  },
  methods: {
    change1() {
      this.show1 = true;
    },
    change2() {
      this.show1 = false;
    },
    // 未发布
    myAdver1() {
        // myAdver('ETH').then((data) => {
        //     console.log(data);
        // });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.order-wrapper {
  font-size: 0.28rem;
  color: #333;
  overflow: auto;

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
    background: #fff;
    width: 100%;
    font-weight: bold;
    padding: 0 0.3rem;

    .icon {
      width: 0.21rem;
      height: 0.36rem;
      @include bg-image("返回");
      float: left;
      margin-top: 0.31rem;
    }
  }

  .tabs {
    width: 100%;
    display: flex;
    line-height: 0.9rem;
    text-align: center;
    width: 100%;
    padding: 0 0.3rem;
    background: #fff;
    margin-bottom: 0.18rem;

    p {
      flex: 1;
      font-size: 0.32rem;
      color: #666;
      span {
        padding-bottom: 0.25rem;
      }
      .select {
        border-bottom: 0.04rem solid #d53d3d;
        color: #d53d3d;
      }
    }
  }

  .list-wrap {
    display: block;
    color: #333;
    width: 92%;
    height: 2.6rem;
    margin: 0 auto;
    background: #fff;
    border-radius: 0.1rem;
    margin-bottom: .18rem;
    .list1 {
      padding: 0.4rem 0.18rem 0.36rem 0.14rem;
      display: flex;
      position: relative;
      border-bottom: .01rem solid #ececec;
      .pic {
        width: 0.76rem;
        height: 0.76rem;
        margin-right: 0.2rem;
        .icon {
          width: 100%;
          height: 100%;
          @include bg-image("头像(4)");
        }
      }
      .text1 {
        .txt1 {
          margin-bottom: 0.2rem;
          span {
            display: inline-block;
          }
          .name {
            font-size: 0.3rem;
            font-weight: bold;
          }
          .green {
            width: .74rem;
            font-size: 0.2rem;
            color: #fff;
            margin-left: 0.12rem;
            text-align: center;
            background: #0ec55b;
            border-radius: 0.03rem;
            line-height: .28rem;
          }
        }
        .txt2, .txt3 {
            font-size: .24rem;
            color: #999;
        }
        .txt2 {
            margin-bottom: .18rem;
        }
      }
      .text2 {
          right: .18rem;
          position: absolute;
          font-size: .28rem;
          font-weight: bold;
          text-align: right;
          .txt1 {
            margin-bottom: .32rem;
          }
          .txt2 {
              display: inline-block;
              text-align: center;
              line-height: .5rem;
              font-size: .28rem;
              color: #999;
              width: 1.1rem;
              height: .5rem;
              border: .01rem solid #999;
              border-radius: .06rem;
          }
          .select {
              color: #d53d3d;
              border-color: #d53d3d;
          }
      }
    }
    .list2 {
        display: flex;
        line-height: .6rem;
        color: #eaeaea;
        a {
            font-size: .24rem;
            color: #333;
        }
        .text1, .text2 {
            flex: 1;
            text-align: center;
            line-height: .6rem;
            .icon {
                width: .24rem;
                height: .24rem;
                vertical-align: baseline;
                margin-right: .06rem;
            }
        }
        .text1 .icon {
            @include bg-image("编辑");
        }
        .text2 .icon {
            @include bg-image("矩形51");
        }
    }
  }
}
</style>
