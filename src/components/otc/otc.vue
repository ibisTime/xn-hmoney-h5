<template>
<div>
  <div :class = "[Show ? 'filter otc-wrapper': 'otc-wrapper' ]" @click.stop>
      <div class='header'>
        <select name="" id="">
          <option value="ETH">ETH<span class="sicon"></span></option>
          <option value="ETH">ETH</option>
          <option value="ETH">ETH</option>
        </select>
        <p class="buySell">
        <span :class="[flag1 ? 'buy select' : 'buy']" @click='buy'>买币</span>
        <span :class="[flag2 ? 'sell select' : 'sell']" @click='sell'>卖币</span>
        </p>
        <router-link to='trading' class='trading'>币币交易</router-link>
      </div>
      <div class="top">
        <div class='top-main'>
            <p>地区<span></span></p>
            <p>货币<span></span></p>
            <p>支付方式<span></span></p>
            <p :class="[show ? 'act' : '']" @click="show = !show" >排序<span></span></p>
        </div>
      </div>
      <!-- 下拉选择 -->
      <div v-show='show' class='select4'>
        <div class='main'>
          <p>单价从低到高</p>
          <p>单价从高到低</p>
          <p>数量从低到高</p>
          <p>数量从高到低</p>
          <p>总额从低到高</p>
          <p>总额从高到低</p>
          <p>发布时间从早到晚</p>
          <p>发布时间从晚到早</p>
        </div>
      </div>
      <!-- banner -->
      <div class="slider-wrapper">
        <slider>
          <div class="home-slider" v-for="item in banners" :key="item.code">
            <a :href="item.url||'javascript:void(0)'" :style="getImgSyl(item.pic)"></a>
          </div>
        </slider>
      </div>
      <!-- 买币 -->
      <div v-show="flag1" class='main'>
        <router-link to='otc-buy'>
          <div class='content'>
            <div class='cont'>
              <div class='preson'>
                <div class='pic'>
                  <span class='green color'></span>
                </div>
                <span class='name'>已实名</span>
              </div>
              <div class='text'>
                <p class='title'>量采风<span class='ico'>支付宝</span></p>
                <p class='disc'>交易12•好评100%•信任5</p>
                <p class='limit'>限额：100-12345 CNY</p>
              </div>
              <div class='number'>
                <p class='num'>285600 CNY</p>
                <p class='shop'>购买</p>
              </div>
            </div>
          </div>
        </router-link>
        <router-link to='otc-buy'>
          <div class='content'>
            <div class='cont'>
              <div class='preson'>
                <div class='pic'>
                  <span class='yellow color'></span>
                </div>
                <span class='name'>已实名</span>
              </div>
              <div class='text'>
                <p class='title'>alen<span class='ico'>银行卡</span></p>
                <p class='disc'>交易12•好评100%•信任5</p>
                <p class='limit'>限额：100-12345 CNY</p>
              </div>
              <div class='number'>
                <p class='num'>285600 CNY</p>
                <p class='shop'>购买</p>
              </div>
            </div>
          </div>
        </router-link>
        <router-link to='otc-buy'>
          <div class='content'>
            <div class='cont'>
              <div class='preson'>
                <div class='pic'>
                  <span class='color gray'></span>
                </div>
                <span class='name'>已实名</span>
              </div>
              <div class='text'>
                <p class='title'>DFDFG<span class='ico'>银行卡</span></p>
                <p class='disc'>交易12•好评100%•信任5</p>
                <p class='limit'>限额：100-12345 CNY</p>
              </div>
              <div class='number'>
                <p class='num'>285600 CNY</p>
                <p class='shop'>购买</p>
              </div>
            </div>
          </div>
        </router-link>
        <router-link to='otc-buy'>
        <div class='content'>
          <div class='cont'>
            <div class='preson'>
              <div class='pic'>
                <span class='green color'></span>
              </div>
              <span class='name'>已实名</span>
            </div>
            <div class='text'>
              <p class='title'>的方菲<span class='ico'>支付宝</span></p>
              <p class='disc'>交易12•好评100%•信任5</p>
              <p class='limit'>限额：100-12345 CNY</p>
            </div>
            <div class='number'>
              <p class='num'>285600 CNY</p>
              <p class='shop'>购买</p>
            </div>
          </div>
        </div>
        </router-link>
      </div>
      <!-- 卖币 -->
      <div v-show='flag2' class='main'>
        <router-link to='otc-sell'>
          <div class='content'>
            <div class='cont'>
              <div class='preson'>
                <div class='pic'>
                  <span class='green color'></span>
                </div>
                <span class='name'>已实名</span>
              </div>
              <div class='text'>
                <p class='title'>量采风<span class='ico'>支付宝</span></p>
                <p class='disc'>交易12•好评100%•信任5</p>
                <p class='limit'>限额：100-12345 CNY</p>
              </div>
              <div class='number'>
                <p class='num'>285600 CNY</p>
                <p class='shop'>出售</p>
              </div>
            </div>
          </div>
        </router-link>
        <router-link to='otc-sell'>       
          <div class='content'>
            <div class='cont'>
              <div class='preson'>
                <div class='pic'>
                  <span class='yellow color'></span>
                </div>
                <span class='name'>已实名</span>
              </div>
              <div class='text'>
                <p class='title'>alen<span class='ico'>银行卡</span></p>
                <p class='disc'>交易12•好评100%•信任5</p>
                <p class='limit'>限额：100-12345 CNY</p>
              </div>
              <div class='number'>
                <p class='num'>285600 CNY</p>
                <p class='shop'>出售</p>
              </div>
            </div>
          </div>
        </router-link>  
        <router-link to='otc-sell'>
          <div class='content'>
            <div class='cont'>
              <div class='preson'>
                <div class='pic'>
                  <span class='color gray'></span>
                </div>
                <span class='name'>已实名</span>
              </div>
              <div class='text'>
                <p class='title'>DFDFG<span class='ico'>银行卡</span></p>
                <p class='disc'>交易12•好评100%•信任5</p>
                <p class='limit'>限额：100-12345 CNY</p>
              </div>
              <div class='number'>
                <p class='num'>285600 CNY</p>
                <p class='shop'>出售</p>
              </div>
            </div>
          </div>
        </router-link>
        <router-link to='otc-sell'>
          <div class='content'>
            <div class='cont'>
              <div class='preson'>
                <div class='pic'>
                  <span class='green color'></span>
                </div>
                <span class='name'>已实名</span>
              </div>
              <div class='text'>
                <p class='title'>的方菲<span class='ico'>支付宝</span></p>
                <p class='disc'>交易12•好评100%•信任5</p>
                <p class='limit'>限额：100-12345 CNY</p>
              </div>
              <div class='number'>
                <p class='num'>285600 CNY</p>
                <p class='shop'>出售</p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div  @click='relShow' class='release'>
      </div>

      <Footer></Footer>
      
  </div>
  <div v-show="Show" class='release2'>
    <div class='main'>
      <div class='buy' @click.stop='goBuyPublish'>
        <span></span>
        发布购买
      </div>
      <div class='sell' @click.stop='goSellPublish'>
        <span></span>
        发布卖出
      </div>
    </div>
    <div @click='relClose' class='close'></div>
</div>

</div>
</template>
<script>
import Footer from 'components/footer/footer';
import {formatImg} from 'common/js/util';
import {getBannerList} from 'api/general';
import Slider from 'base/slider/slider';
export default {
  data() {
    return {
      banners: [],
      show: false,
      Show: false,
      flag1: true,
      flag2: false
    };
  },
  created() {
    this.getInitData();
  },
  updated() {
    this.getInitData();
  },
  computed: {
  },
  methods: {
    getInitData() {
      this.getBannerList();
    },
    getBannerList() {
      return getBannerList().then((data) => {
        this.banners = data;
      });
    },
    getImgSyl(imgs) {
      return {
        backgroundImage: `url(${formatImg(imgs)})`
      };
    },
    buy() {
      this.flag1 = true;
      this.flag2 = false;
    },
    sell() {
      this.flag1 = false;
      this.flag2 = true;
    },
    goOtcBuy() {
      this.$router.push('otc-buy');
    },
    relShow() {
      this.Show = true;
    },
    relClose() {
      this.Show = false;
    },
    goBuyPublish() {
      this.$router.push('buy-publish');
    },
    goSellPublish() {
      this.$router.push('sell-publish');
    }
  },
  components: {
    Footer,
    Slider
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.otc-wrapper {
  font-family: PingFangSC-Medium;
  font-size: .3rem;
  color: #333;
  height: 100%;
  background: #fafafa;
  overflow: auto;
  z-index: 10;

  .header {
    width: 100%;
    padding: 0 .3rem;
    height: .98rem;
    line-height: .98rem;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top:0;

    select {
      font-weight: bold;
      
      .sicon {
        display: inline-block;
        width: .23rem;
        height: .16rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        @include bg-image("下拉白色");

      }
    }

    .buySell {
      font-size: .34rem;
      font-weight: bold;

      .select {
        color: #d53d3d;
        border-bottom: .04rem solid #d53d3d;
      }

      .buy {
        padding-bottom: .15rem;
        margin-right: 1.1rem;
        font-weight: bold;
      }
      .sell {
        font-weight: bold;
        padding-bottom: .15rem;
      }
    }

    a {
      font-size: .32rem;
      font-weight: bold;
      color: #333;
    }
    
  }

  .top {
    width: 100%;
    padding:0;
    height: .64rem;
    background: #fafafa;
    position: fixed;
    top: .98rem;

    .top-main {
      width: 100%;
      padding: 0 .3rem;
      display: flex;
      justify-content: space-between;
      font: .26rem/.64rem PingFangSC-Medium;

      .act {
        color: #d53d3d;
        span {
          @include bg-image("排序上啦");
        }
      }

      span {
        display: inline-block;
        width: .15rem;
        height: .1rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        @include bg-image("限价下拉");
        vertical-align: middle;
        margin-left: .14rem;
      }

    }
  }

  .select4 {
    position: fixed;
    top: 1.62rem;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: rgba(0,0,0,.4);
    .main {
      line-height: .9rem;
      font-size: .28rem;
      color: #666;
      width: 100%;
      padding: 0 .3rem;
      background: #fff;
      p {
        border-bottom: .01rem solid #e5e5e5;
      }
      p:hover {
        color: #d53d3d;
      }
    }
  }

  .slider-wrapper {
    margin: 1.82rem auto .2rem auto;
    height: 2.8rem;
    width: 91%;
    border-radius: .08rem;
  }
  .slider, .home-slider {
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    @include bg-image('banner');
  }

  .main {
    .content {
      width: 92%;
      margin: 0 auto;
      height: 1.9rem;
      background: #fff;
      margin-top: .2rem;

      .cont {
        width: 100%;
        padding: .4rem .2rem;
        display: flex;
        position: relative;
        .preson {
          margin-right: .2rem;
          .pic {
            width: .76rem;
            height: .76rem;
            border-radius: 50%;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
            @include bg-image("头像(4)");
            position: relative;

            .color {
              display: inline-block;
              width: .2rem;
              height: .2rem;
              border-radius: 50%;
              position: absolute;
              right: 0;
              bottom: 0;
            }

            .green {
              background: #74c758;
            }

            .yellow {
              background: #fcd705;
            }

            .gray {
              background: #ccc;
            }
          }
          .name {
            display:block;
            width: .76rem;
            height: .3rem;
            border-radius: .04rem;
            border: .01rem solid #d53d3d;
            font: .18rem/.24rem PingFangSC-Medium;
            color:#d53d3d;
            margin-top: .1rem;
            text-align: center;
            line-height: .3rem;
          }
        }

        .text {
          .title {
            font: bold .3rem/.28rem PingFangSC-Medium;
            color: #333;
            margin-bottom: .2rem;
            .ico {
              display: inline-block;
              text-align: center;
              width: .76rem;
              height: .3rem;
              background: #74c758;
              border-radius: .03rem;
              margin-left: .12rem;
              font: .2rem/.28rem PingFangSC-Medium;
              color: #fff;
            }
          }

          .disc, .limit {
            font-size: .24rem;
            color: #999;
            line-height: .24rem;
            margin-bottom: .18rem;
          }
          
        }

        .number {
          font-size: .28rem;
          position: absolute;
          right: .2rem;
          text-align: right;
          .num {
            color: #0ec55b;
            margin-bottom: .32rem;
          }
          .shop {
            display: inline-block;
            width: 1.1rem;
            height: .5rem;
            line-height: .5rem;
            text-align: center;
            border-radius: .06rem;
            border: .01rem solid #d53d3d;
            color: #d53d3d;
          }
        }
      }
    }

  }

  .release {
    width: 1.06rem;
    height:1.06rem;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    @include bg-image("发布");
    position: fixed;
    right: .3rem;
    bottom: 1.52rem;

  }
}

  .release2 {
    width: 100%;
    height: 100%;
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    opacity: 0.64;
    z-index: 1000;

    .main {
      width: 100%;
      position: absolute;
      bottom: 2.26rem;
      font-size: .3rem;
      color:#333;
      padding: 0 1.42rem;
      display: flex;
      justify-content: space-between;

      span {
        display: block;
        width: 1.35rem;
        height:1.35rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        margin-bottom: .3rem;
      }

      .buy {
          text-align: center;
          span {
          @include bg-image("发布购买");
        }
      }

      .sell {
        text-align: center;
          span {
          @include bg-image("发布卖出");
        }
      }



    }

    .close {
      width: .36rem;
      height: .36rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
      @include bg-image("叉");
      position: absolute;
      bottom: .6rem;
      left: 50%;
      transform: translateX(-50%);
    }

  }


.filter {
    -webkit-filter: blur(.45rem);
    -moz-filter: blur(.45rem);
    -o-filter: blur(.45rem);
    -ms-filter: blur(.45rem);
    filter: blur(.45rem); 
}


</style>
