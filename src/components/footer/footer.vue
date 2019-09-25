<template>
  <div class="foot-wrapper" @click.stop :style="{'background-color': bgColor}">
    <router-link tag="div" class="foot-item item-0" to="/page">
      <i></i>
      <p>{{ $t('footer.navbar.page') }}</p>
    </router-link>
    <router-link tag="div" class="foot-item item-1" to="/market">
      <i></i>
      <p>行情</p>
    </router-link>
    <router-link tag="div" class="foot-item item-2" to="/trading" @click.native="toTrading">
      <i></i>
      <p>{{ $t('footer.navbar.trading') }}</p>
    </router-link>
    <router-link tag="div" class="foot-item item-3" to="/wallet">
      <i></i>
      <p>{{ $t('footer.navbar.wallet') }}</p>
    </router-link>
    <router-link tag="div" class="foot-item item-4" to="/mine">
      <i>
        <span class="hasUnreadMsg" v-if="getUnreadMsgNum()"></span>
      </i>
      <p>{{ $t('footer.navbar.mine') }}</p>
    </router-link>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';

  export default {
    props: {
      bgColor: {
        type: String,
        default: '#fff'
      }
    },
    computed: {
      ...mapGetters([
        'unreadMsgNum'
      ])
    },
    methods: {
      // 是否显示小红点
      getUnreadMsgNum() {
        return this.unreadMsgNum > 0;
      },
      toTrading() {
        sessionStorage.removeItem('setBazDeal');
      }
    },
    components: {}
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .foot-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    height: .96rem;
    width: 100%;
    font: .22rem/.3rem PingFangSC-Regular;
    color: #B3B3B3;
    text-align: center;
    z-index: 99999;
    box-shadow: 0 -2px 12px 2px rgba(0, 0, 0, 0.05);

    .foot-item {
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      text-align: center;

      i {
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        position: relative;
      }

      .hasUnreadMsg {
        display: block;
        position: absolute;
        top: -0.04rem;
        right: -0.08rem;
        z-index: 9;
        width: 0.12rem;
        height: 0.12rem;
        border-radius: 50%;
        background-color: $color-red;
      }

      &.router-link-active {
        color: $primary-color;
      }

      &.item-0 {
        i {
          background-image: url('./page.png');
        }
        &.router-link-active {
          i {
            background-image: url('./page_active.png');
          }
        }
      }

      &.item-1 {
        i {
          background-image: url('hqing.png');
        }
        &.router-link-active {
          i {
            background-image: url('hqing_active.png');
          }
        }
      }

      &.item-2 {
        i {
          background-image: url('trading.png');
        }
        &.router-link-active {
          i {
            background-image: url('trading_active.png');
          }
        }
      }

      &.item-3 {
        i {
          background-image: url('money.png');
        }
        &.router-link-active {
          i {
            background-image: url('money_active.png');
          }
        }
      }

      &.item-4 {
        i {
          background-image: url('mine.png');
        }
        &.router-link-active {
          i {
            background-image: url('mine_active.png');
          }
        }
      }

    }

  }
</style>
