<template>
  <div class="top-up-wrapper" @click.stop>
    <header>
      <p>
        <i class='icon'></i>
        <span class='txt1'>订单记录</span>
      </p>
    </header>
    <div class="main">
      <router-link to='wallet-orderDetails' class='list-wrap'>
          <div class='list'>
              <div class='pic'>
                  <i class='icon'></i>
              </div>
              <div class='text'>
                  <div class='text1'>
                      <p class='txt1'><span class='name'>ETH</span></p>
                      <p class='txt2 green'>剩余付款时间：09分30秒</p>
                  </div>
                  <div class='text2'>
                      <p class='txt1'>2018-06-19 10:25</p>
                      <p class='txt2 green'>待支付</p>
                  </div>
              </div>
          </div>
      </router-link>
      <router-link to='wallet-orderDetails' class='list-wrap'>
          <div class='list'>
              <div class='pic'>
                  <i class='icon ico1'></i>
              </div>
              <div class='text'>
                  <div class='text1'>
                      <p class='txt1'><span class='name'>ETH</span></p>
                      <p class='txt2 gray'>剩余付款时间：09分30秒</p>
                  </div>
                  <div class='text2'>
                      <p class='txt1'>2018-06-19 10:25</p>
                      <p class='txt2 gray'>已取消</p>
                  </div>
              </div>
          </div>
      </router-link>
      <router-link to='wallet-orderDetails' class='list-wrap'>
          <div class='list'>
              <div class='pic'>
                  <i class='icon ico1'></i>
              </div>
              <div class='text'>
                  <div class='text1'>
                      <p class='txt1'><span class='name'>ETH</span></p>
                      <p class='txt2 black'>-0.0897</p>
                  </div>
                  <div class='text2'>
                      <p class='txt1'>2018-06-19 10:25</p>
                      <p class='txt2 red'>已完成</p>
                  </div>
              </div>
          </div>
      </router-link>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.top-up-wrapper {
  font-size: 0.28rem;
  color: #333;

  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }
  .green {
    color: #0ec55b;
  }
  .gray {
    color: #999;
  }
  .red {
    color: #d53d3d;
  }
  .black {
    color:#333;
  }

  header {
    height: 0.88rem;
    line-height: 0.88rem;
    width: 100%;
    padding: 0 0.3rem;
    background: #fff;
    margin-bottom: 0.2rem;

    .icon {
      width: 0.2rem;
      height: 0.36rem;
      @include bg-image("返回");
      margin-top: 0.28rem;
      float: left;
    }

    .txt1 {
      font-size: 0.36rem;
      font-weight: bold;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .main {
    width: 100%;
    background: #fff;
    .list-wrap {
      display: block;
      width: 100%;
      padding: 0.3rem 0 0.23rem;
      border-bottom: 0.01rem solid #e5e5e5;
      .list {
        width: 100%;
        padding: 0 0.3rem;
        display: flex;
        .pic {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          margin-right: 0.32rem;
          .icon {
            width: 100%;
            height: 100%;
            @include bg-image("买入");
          }
          .ico1 {
            @include bg-image("卖出");
          }
        }
        .text {
          width: 87%;
          font-size: 0.24rem;
          color: #333;
          .text1,
          .text2 {
            display: flex;
            justify-content: space-between;
          }

          .text1 {
            padding-bottom: 0.3rem;
            .txt2 {
              font-size: 0.24rem;
            }
            .name {
              font-size: 0.28rem;
              font-weight: bold;
            }
          }
          .text2 {
            font-size: 0.22rem;
          }
        }
      }
    }
  }
}
</style>
