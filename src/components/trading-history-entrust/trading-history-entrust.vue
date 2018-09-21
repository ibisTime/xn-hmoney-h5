<template>
  <div class="publish-wrapper" @click.stop>
    <div class='header'>
        <i class='icon'></i>
        <span class='txt1'>历史委托</span>
    </div>
    <div class='main'>
        <div class='list'>
            <p class='text1'>
                <span class='green'>买入</span>
                <span>2018-04-12:00</span>
                <span class='red'>已完成</span>
            </p>
            <div class='text2'>
                <div class='txt1'>
                <p>价格(ETH)</p>
                <p class='black'>13.60</p>
                </div>
                <div class='txt2'>
                <p>数量(X)</p>
                <p class='black'>7.4569</p>
                </div>
                <div class='txt3'>
                <p>实际成交(X)</p>
                <p class='black'>7.0430</p>
                </div>
            </div>
        </div>
        <div class='list'>
            <p class='text1'>
                <span class='green'>买入</span>
                <span>2018-04-12:00</span>
                <span class='red'>已完成</span>
            </p>
            <div class='text2'>
                <div class='txt1'>
                <p>价格(ETH)</p>
                <p class='black'>13.60</p>
                </div>
                <div class='txt2'>
                <p>数量(X)</p>
                <p class='black'>7.4569</p>
                </div>
                <div class='txt3'>
                <p>实际成交(X)</p>
                <p class='black'>7.0430</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  created() {},
  updated() {},
  computed: {},
  methods: {
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.publish-wrapper {
    width: 100%;
    background: #fff;
    font-size: .28rem;
    color: #999;
    overflow: auto;
    .icon {
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;    
    }

    .header {
        padding: 0 .3rem;
        font-size: .36rem;
        text-align: center;
        line-height: .88rem;
        color: #333;
        .icon {
            float: left;
            width: .2rem;
            height: .36rem;
            @include bg-image("返回");
            margin-top: .26rem;
        }
    }

    .main {
        width: 100%;
        padding: 0 .3rem;
        .red {
            color: #d53d3d;
        }
        .green {
            color: #0ec55b;
        }
        .black {
            color: #333;
        }
        .gray {
            color: #a0a0a2;
        }

            .list {
            width: 100%;
            padding: .4rem 0;
            border-top: .01rem solid #e5e5e5;
            .text1 {
                padding-bottom: .4rem;
                .green {
                margin-right: .36rem;
                }
                .red {
                float: right;
                }
            }
            .text2 {
                display: flex;
                justify-content: space-between;
                font-size: .24rem;
                .black {
                font-size: .28rem;
                padding-top: .2rem;
                }
                .txt1 {
                text-align: left;
                }
                .txt2 {
                text-align: center;
                }
                .txt3 {
                text-align: right;
                }
            }
            }

    }


}
</style>
