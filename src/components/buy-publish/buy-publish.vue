<template>
  <div class="publish-wrapper" @click.stop>
    <div class='header'>
        <span @click='goBack()' class='icon'></span>
        <span class='txt1'>购买发布</span>
        <router-link to='my-advertising' class='txt2'>保存草稿</router-link>
    </div>
    <div class='publish-list'>
        <p><span class='txt1'>价格<i></i></span><input type="text"><span class='txt2'>CNY</span><span class='ico'></span></p>
        <p><span class='txt1'>溢价<i></i></span><input type="text"><span class='txt2'>CNY</span><span class='ico'></span></p>
        <p><span class='txt1'>最小量<i></i></span><input type="text"><span class='txt2'>CNY</span><span class='ico'></span></p>
        <p><span class='txt1'>最大量<i></i></span><input type="text" placeholder="单笔交易的最大额度"><span class='txt2'>CNY</span><span class='ico'></span></p>
        <p><span class='txt1'>付款方式<i></i></span><input readonly type="text" placeholder="请输入付款方式"><span class='icon'></span><span class='ico'></span></p>
        <p><span class='txt1'>付款期限<i></i></span><input type="text" placeholder="请输入付款期限"><span class='txt2'>分钟</span><span class='ico'></span></p>
    </div>
    <textarea class='message'>
        请写下您的广告留言吧
    </textarea>
    <div class='select' @click="show = !show">
        <p class='text'>
            <span>高级设置</span>
            <span :class="[!show ? 'icon' : 'ico']" ></span>
        </p>
    </div>
    <div v-show='show' class='select-box'>
      <div class='select-time'>
          <p class='text1'>
            <span class='txt1'>开放时间</span>
            <span class='txt2'><i :class="[select ? 'icon icon1' : 'icon']" @click='select = !select'></i>任何时候</span>
            <span class='txt3'><i :class="[!select ? 'icon icon1' : 'icon']" @click='select = !select'></i>自定义</span>
            <i class='icon ico2'></i>
          </p>
          <p class='text2'>
            <span class='txt1'>星期一</span>
            <span>00:00</span>
            <span class='txt2'>-</span>
            <span>24:00</span>
          </p>
          <p class='text2 text22'>
            <span class='txt1'>星期二</span>
            <span>00:00</span>
            <span class='txt2'>-</span>
            <span>24:00</span>
          </p>
          <p class='text3'>
            <i class='icon'></i>
            <span>添加时间段</span>
          </p>
      </div>
      <div class='select-last'>
        <p class='text1'>
          <span>仅粉丝</span>
          <span>
          <i class='icon ico1'></i>
          <i class='icon ico2'></i>
          </span>
        </p>
      </div>
    </div>
    <div class='footer'>
        <router-link to='otc'><button>直接发布</button></router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      select: false
    };
  },
  created() {},
  updated() {},
  computed: {},
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.publish-wrapper {
  font-size: 0.3rem;
  font-family: PingFangSC-Medium;
  color: #333;
  overflow: auto;

  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;

  }

  .header {
    width: 100%;
    padding: 0 0.3rem;
    background: #fff;
    display: flex;
    justify-content: space-between;
    line-height: 1rem;
    text-align: center;
    margin-bottom: 0.2rem;
    .icon {
      display: inline-block;
      width: 0.21rem;
      height: 0.36rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
      @include bg-image("返回");
      margin-top: 0.3rem;
    }
    .txt1 {
      font-size: 0.36rem;
      font-weight: bold;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);

    }
    a {
      font-size: 0.32rem;
      color: #333;
    }
  }

  .publish-list {
    width: 100%;
    padding: 0 0.3rem;
    background: #fff;
    margin-bottom: 0.2rem;

    input {
        width: 4.1rem;
        padding-left: 0.5rem;
        flex: 1;
    }

    input[attr="placeholder"] {
      color: #999;
    }

    p {
        border-bottom: 0.01rem solid #e5e5e5;
        display: flex;
        align-items: center;
    }

    p:last-child {
      border: none;
    }

    .txt1 {
        display: inline-block;
        width: 1.2rem;
        color: #666;
        line-height: 1rem;
        height: 1rem;
        text-align: justify;
        overflow: hidden;
      i {
          display: inline-block;
          width: 100%;
          height: 0;
      }
    }
    .txt2 {
      color: #333;
      margin-right: 0.14rem;
    }
    .ico {
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
      @include bg-image("问号");
      float: right;
    }
    .icon {
      display: inline-block;
      width: 0.16rem;
      height: 0.26rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
      @include bg-image("更多");
      float: right;
      margin-right: 0.14rem;
    }
  }

  .message {
    width: 100%;
    background: #fff;
    padding: 0.3rem 0;
    height: 2.2rem;
    font-size: 0.28rem;
    color: #999;
    margin-bottom: 0.2rem;
  }

  .select {
    width: 100%;
    padding: 0 0.3rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.28rem;
    line-height: 1rem;
    color: #666;
    background: #fff;

    .text {
      width: 100%;
      border-bottom: .01rem solid #e5e5e5;

      .icon {
        display: inline-block;
        width: 0.24rem;
        height: 0.14rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        @include bg-image("限价下拉");
        float: right;
        margin-top: 0.5rem;
      }

      .ico {
        display: inline-block;
        width: 0.24rem;
        height: 0.14rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        @include bg-image("限价下拉");
        float: right;
        margin-top: 0.5rem;
        @include bg-image("高级设置上拉");

      }
    }
  }

  .select-box {
    margin-bottom: 1.54rem;
  
    .select-time {
      width: 100%;
      padding: 0 .3rem;
      background: #fff;
      .text1 {
        font-size: .26rem;
        padding: .32rem 0 .4rem;
        color: #666;

        .icon {
          width: .3rem;
          height: .3rem;
          @include bg-image("未选择");
          vertical-align: middle;
          margin-right: .14rem;
        }

        .icon1 {
          width: .3rem;
          height: .3rem;
          @include bg-image("选中");
   
        }


        .txt2 {
          color: #333;
          margin-left: 1.8rem;
          margin-right: .6rem;
        }
        .txt3 {
          color: #333;
        }

        .ico2 {
          @include bg-image("问号");
          margin-right: 0;
          margin-left: .2rem;
        }
      }

      .text2 {
        font-size: .24rem;
        color: #333;
        padding-bottom: .22rem;
        .txt1 {
          margin-right: 1.08rem;
        }
        .txt2 {
          margin: 0 .6rem;
        }
      }

      .text22 {
        margin-bottom: .18rem;
      }

      .text3 {
        font-size: .24rem;
        color: #d53d3d;
        padding-bottom: .4rem;
        .icon {
          width: .24rem;
          height: .24rem;
          @include bg-image("添加时间段");
          vertical-align: middle;
        }
      }

    }

    .select-last {
      width: 100%;
      padding: 0 .3rem;
      background: #fff;
      height: .9rem;
      line-height: .9rem;
      .text1 {
        width: 100%;
        border-top: .01rem solid #e5e5e5;
        font-size: .26rem;
        color: #666;
        display: flex;
        justify-content: space-between;
        .icon {
          width: .3rem;
          height: .3rem;
        }
        .ico1 {
          @include bg-image("选择");
        }
        .ico2 {
          @include bg-image("问号");
          margin-left: .2rem;
        }

      }
    }

  }




  .footer {
    width: 100%;
    height: 1.3rem;
    position: fixed;
    bottom: 0;
    background: #fff;
    text-align: center;
    button {
      width: 6.9rem;
      height: 1rem;
      border-radius: 0.08rem;
      background: #d53d3d;
      font-size: 0.32rem;
      color: #fff;
      line-height: 1rem;
      margin-top: 0.15rem;
    }
  }
}
</style>
