<template>
  <div class="out-mine">
    <div class="header">
      <p class="ck_p">挖矿余额</p>
      <h5 class="head_h">{{userAmount}}</h5>
      <div class="head_box">
        <div class="left">
          <p class="ck_p">昨日出矿</p>
          <p class="ck_num_p">{{totalPoolOutAmount}}</p>
        </div>
        <div class="right">
          <p class="ck_p">累计出矿</p>
          <p class="ck_num_p">{{yesterdayPoolOutAmount}}</p>
        </div>
      </div>
    </div>
    <div class="out_mine_con">
      <h5 class="con_h5">出矿记录</h5>
      <div class="mine_con_box">
        <div class="con_wrp">
          <Scroll
            ref="scroll"
            :data="recordList"
            :hasMore="hasMore"
            v-show="recordList.length > 0"
            @pullingUp="queryCalculateRecord"
          >
            <ul class="con_ul">
              <li
                class="single_li"
                @click="() => {toHistoryMine(item.outDatetime)}"
                v-for="(item, index) in recordList"
                :key="`out_record_${index}`"
              >
                <span class="left">{{item.outDatetime}}</span>
                <span class="right">{{item.dayPoolAmount}} <i class="icon icon_right_to"></i></span>
              </li>
            </ul>
          </Scroll>
          <div class="no-data" :class="{'hidden': recordList.length > 0}">
            <img src="./wu.png" />
            <p>暂无记录</p>
          </div>
        </div>
      </div>
      <div class="foo_box">
        <p @click="showModalFn">转入钱包</p>
      </div>
    </div>
    <div class="modal_box" v-if="isShowModal" @click="isShowModal = false">
      <div class="modal_con" @click.stop>
        <h5>转入钱包</h5>
        <div class="iup_box">
          <div class="left">
            <input
              type="text"
              v-model="amount"
              :placeholder="`最多可转入${userAmount}个TWT`"
              @blur="blurIn"
            />
          </div>
          <div class="right" @click="amount = userAmount">
            <span>全部金额</span>
          </div>
        </div>
        <div class="foo_btn" @click="confirmInto">
          确认转入
        </div>
        <div class="del" @click="isShowModal = false">
          <img src="../image/del.png" alt="">
        </div>
      </div>
    </div>
    <div class="modal_success" v-if="isSuccessModal" @click="isSuccessModal = false">
      <div class="success_modal_box" @click.stop>
        <div class="suc_m_header">
          <img class="s_m_h_img" src="../image/success_icon.png" alt="">
          <p class="s_m_h_p">转账成功</p>
        </div>
        <div class="con_btn"><span @click="toRecord">查看转账记录</span></div>
        <p class="tip">
          {{timer}}秒后自动跳转
        </p>
      </div>
    </div>
    <PawModal :isShow="isShowPawModal" @getPawList="getPawList" @removePaw="removePaw"/>
    <Toast :text="textMsg" ref="toast"/>
  </div>
</template>

<script>
  import {queryHistoryRecord, outMineApply, ownerDigAmount} from 'api/homeDig';
  import {getUser} from 'api/user';
  import {setTitle, formatAmount, formatDate, formatMoneyMultiply} from 'common/js/util';
  import PawModal from 'base/pwd-modal/index';
  import Scroll from 'base/scroll/scroll';
  import Toast from 'base/toast/toast';
  export default {
    data() {
      return {
        isShowModal: false,
        isSuccessModal: false,
        isShowPawModal: false,
        timer: 5,
        recordList: [],
        params: {
          start: 1,
          limit: 10
        },
        hasMore: true,
        userAmount: '',
        totalPoolOutAmount: '',
        yesterdayPoolOutAmount: '',
        amount: '',
        textMsg: '',
        interval: null
      }
    },
    created() {
      setTitle('出矿');
      this.queryCalculateRecord();
      ownerDigAmount().then(data => {
        this.userAmount = data.totalAmount > 0 ? formatAmount(data.totalAmount, '4', 'TWT') : '0';
        this.totalPoolOutAmount = data.totalPoolOutAmount > 0 ? formatAmount(data.totalPoolOutAmount, '4', 'TWT') : '0';
        this.yesterdayPoolOutAmount = data.yesterdayPoolOutAmount > 0 ? formatAmount(data.yesterdayPoolOutAmount, '4', 'TWT') : '0';
      });
      sessionStorage.removeItem('paw_go_back');
    },
    methods: {
      toHistoryMine(outDatetime) {
        this.$router.push(`/history-mine?outDatetime=${outDatetime}`);
      },
      getPawList(list) {
        this.isShowPawModal = false;
        const tradePwd = list.join('');
        if(tradePwd.length < 6) {
          this.textMsg = '请完整输入交易密码';
          this.$refs.toast.show();
          return;
        }
        outMineApply({
          amount: formatMoneyMultiply(this.amount, '', 'TWT'),
          tradePwd
        }).then(() => {
          this.isShowModal = false;
          this.isShowPawModal = false;
          this.isSuccessModal = true;
          if(this.interval) {
            clearInterval(this.interval);
          }
          this.interval = setInterval(() => {
            this.timer --;
            if(this.timer < 1) {
              this.$router.push('out-record');
              clearInterval(this.interval);
            }
          }, 1000);
        })
      },
      removePaw() {
        this.isShowPawModal = false;
      },
      queryCalculateRecord() {
        queryHistoryRecord(this.params).then(data => {
          data.list.forEach(item => {
            item.dayPoolAmount = item.dayPoolAmount > 0 ? formatAmount(item.dayPoolAmount, '4', 'TWT') : '0';
          });
          if (data.totalPage <= this.params.start) {
            this.hasMore = false;
          }
          this.recordList = [...this.recordList, ...data.list];
          this.params.start ++;
        });
      },
      confirmInto() {
        this.isShowPawModal = true;
      },
      showModalFn() {
        if(this.userAmount === 0) {
          this.textMsg = '账户余额不足';
          this.$refs.toast.show();
          return;
        }
        getUser().then(data => {
          if(data.tradepwdFlag) {
            this.isShowModal = true;
          }else {
            this.textMsg = '请先设置交易密码';
            this.$refs.toast.show();
            setTimeout(() => {
              const goBack = this.$route.path;
              sessionStorage.setItem('paw_go_back', goBack);
              this.$router.push('/security-tradePassword?istw=0');
            }, 1000);
            return;
          }
        });
      },
      blurIn () {
        window.scrollTo(0, Math.max(this.scrollHeight - 1, 0));
      },
      toRecord() {
        this.$router.push('out-record');
      }
    },
    components: {
      PawModal,
      Scroll,
      Toast
    },
    beforeDestroy() {
      if(this.interval) {
        clearInterval(this.interval);
      }
    }
  }
</script>

<style scoped lang="scss">
  .out-mine {
    position: relative;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    .header {
      background-image: url('../image/Mask@2x.png');
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      text-align: center;
      padding-top: 0.46rem;
      padding-bottom: 0.46rem;
      margin-bottom: 0.4rem;
      .ck_p {
        font-size: 0.24rem;
        color: #FFEEEC;
      }
      .head_h {
        font-size: 0.48rem;
        color: #fff;
        margin-top: 0.18rem;
        margin-bottom: 0.52rem;
      }
      .head_box {
        display: flex;
        .left {
          width: 50%;
        }
        .right {
          width: 50%;
        }
        .ck_num_p {
          font-size: 0.32rem;
          color: #fff;
          margin-top: 0.04rem;
        }
      }
    }
    .out_mine_con {
      padding: 0 0.3rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      .con_h5 {
        color: #333;
        font-size: 0.28rem;
      }
      .mine_con_box{
        flex: 1;
        position: relative;
        .con_wrp{
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
        }
      }
      .con_ul {
        padding-bottom: 1rem;
        .single_li {
          height: 1rem;
          line-height: 1rem;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #E6E6E6;
          .left {
            color: #333;
            font-size: 0.24rem;
          }
          .right {
            color: #D53D3D;
            font-size: 0.28rem;
            display: flex;
            align-items: center;
            .icon{
              margin-left: 0.1rem;
              display: inline-block;
              width: 0.14rem;
              height: 0.14rem;
            }
          }
        }
      }
    }
    .foo_box {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0.4rem 0.3rem;
      box-shadow: 0 -0.04rem 0.08rem 0 #E6E6E6;
      p {
        text-align: center;
        height: 1rem;
        line-height: 1rem;
        color: #fff;
        font-size: 0.32rem;
        background-color: #D53D3D;
        -webkit-border-radius: 0.08rem;
        -moz-border-radius: 0.08rem;
        border-radius: 0.08rem;
      }
    }
    .modal_box {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 1;
      transition: all 0.3s;
      .modal_con {
        width: 100%;
        height: 5.9rem;
        background-color: #fff;
        padding: 0.3rem;
        position: absolute;
        bottom: 0;
        h5 {
          text-align: center;
          color: #333;
          font-size: 0.36rem;
          margin-bottom: 0.88rem;
        }
        .iup_box {
          border-bottom: 1px solid #D6D6D6;
          padding-bottom: 0.36rem;
          display: flex;
          position: relative;
          .left {
            flex: 1;
            input {
              width: 100%;
              font-size: 0.36rem;
              color: #333;
            }
          }
          .right {
            span {
              padding: 0.1rem 0.16rem;
              font-size: 0.24rem;
              color: #3D7CD5;
              background-color: rgba(61, 124, 213, 0.3);
              border-radius: 0.32rem;
            }
          }
        }
        .foo_btn {
          position: absolute;
          bottom: 0.4rem;
          left: 0.3rem;
          right: 0.3rem;
          height: 1rem;
          line-height: 1rem;
          text-align: center;
          background-color: #D53D3D;
          color: #fff;
          font-size: 0.36rem;
          -webkit-border-radius: 0.2rem;
          -moz-border-radius: 0.2rem;
          border-radius: 0.2rem;
        }
        .del {
          position: absolute;
          right: 0.2rem;
          top: -0.3rem;
          img {
            width: 0.4rem;
            height: 0.4rem;
          }
        }
      }
    }
    .modal_success{
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.5);
      .success_modal_box{
        position: absolute;
        left: 0.5rem;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        background-color: #fff;
        border-radius: 0.1rem;
        padding: 0.6rem 0;
        text-align: center;
      }
      .suc_m_header{
        margin-bottom: 0.36rem;
        .s_m_h_img{
          width: 1.2rem;
          height: 1.2rem;
          margin-bottom: 0.26rem;
        }
        .s_m_h_p{
          color: #333;
          font-size: 0.4rem;
        }
      }
      .con_btn{
        color: #999999;
        margin-bottom: 0.64rem;
        font-size: 0.66rem;
        span{
          font-size: 0.28rem;
          padding: 0.14rem 0.32rem;
          border: 1px solid #aaa;
          border-radius: 0.06rem;
        }
      }
      .tip{
        color: #999;
        font-size: 0.22rem;
      }
    }
  }
</style>
