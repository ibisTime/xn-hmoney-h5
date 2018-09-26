<template>
  <div class="bill-wrapper" @click.stop>
    <header>
      <p>
      <i class='icon'></i>
      <span class='txt1'>账单</span>
      <span class='txt2'>筛选</span>
      </p>
    </header>
    <div class='list-wrap'>
      <router-link :to="'bill-details' + '?code=' + data.code" class="bill-list" v-for='(item,index) in data' :key='index'>
        <div class="list">
          <div class='mark'>
            <i :class="[item.transAmount < 0 ? 'icon' : 'icon ico3']"></i>
          </div>
          <div class='item'>
            <p class='collect'>
              <span class='txt1'>{{item.bizType}}</span>
              <span :class="[item.transAmount < 0 ? 'txt2' : 'txt2 txt22']">{{item.transAmount}}{{item.currency}}</span>
            </p>
            <p class='time'>{{item.createDatetime}}</p>
            <p class='explain'>{{item.bizNote}}</p>
          </div>
        </div>
      </router-link>
      <router-link :to="'bill-details' + '?code=' + data.code" class="bill-list">
        <div class="list">
          <div class='mark'>
            <i class='icon'></i>
          </div>
          <div class='item'>
            <p class='collect'>
              <span class='txt1'>收款</span>
              <span class='txt2'>-10ETH</span>
            </p>
            <p class='time'>06-19 10:25</p>
            <p class='explain'>0xf750b2b488323dfpfdspo0xf70xf750b2b488323dfpfdspo50b2b</p>
          </div>
        </div>
      </router-link>
      <!-- <router-link to='bill-details' class="bill-list">
        <div class="list">
          <div class='mark'>
            <i class='icon ico1'></i>
          </div>
          <div class='item'>
            <p class='collect'>
              <span class='txt1'>充值</span>
              <span class='txt2 txt22'>+5000ETH</span>
            </p>
            <p class='time'>06-19 10:25</p>
            <p class='explain'>0xf750b2b488323dfpfdspo0xf70xf750b2b488323dfpfdspo50b2b</p>
          </div>
        </div>
      </router-link>
      <router-link to='bill-details' class="bill-list">
        <div class="list">
          <div class='mark'>
            <i class='icon ico2'></i>
          </div>
          <div class='item'>
            <p class='collect'>
              <span class='txt1'>转出</span>
              <span class='txt2'>-40ETH</span>
            </p>
            <p class='time'>06-19 10:25</p>
            <p class='explain'>0xf750b2b488323dfpfdspo0xf70xf750b2b488323dfpfdspo50b2b</p>
          </div>
        </div>
      </router-link> -->
      <!-- <router-link to='bill-details' class="bill-list">
        <div class="list">
          <div class='mark'>
            <i class='icon ico3'></i>
          </div>
          <div class='item'>
            <p class='collect'>
              <span class='txt1'>转入</span>
              <span class='txt2 txt22'>+250ETH</span>
            </p>
            <p class='time'>06-19 10:25</p>
            <p class='explain'>0xf750b2b488323dfpfdspo0xf70xf750b2b488323dfpfdspo50b2b</p>
          </div>
        </div>
      </router-link> -->
      <!-- <router-link to='bill-details' class="bill-list">
        <div class="list">
          <div class='mark'>
            <i class='icon ico4'></i>
          </div>
          <div class='item'>
            <p class='collect'>
              <span class='txt1'>提现</span>
              <span class='txt2'>+2500ETH</span>
            </p>
            <p class='time'>06-19 10:25</p>
            <p class='explain'>0xf750b2b488323dfpfdspo0xf70xf750b2b488323dfpfdspo50b2b</p>
          </div>
        </div>
      </router-link> -->
    </div>
    <!-- 筛选弹窗 -->
    <div class='select'>
      <!-- <p>
        <span>取消</span>
        <span>确定</span>
      </p> -->

    </div>
  </div>
</template>
<script>
import { getUrlParam } from 'common/js/util';
import { walletBill } from 'api/person';
import { getDictList } from 'api/general';

export default {
  data() {
    return {
      data: [],
      code: '12345'
    }
  },
  created() {
    this.getDictList();
  },
  methods: {
    getDictList() {
      // 获取数据字典
      getDictList('jour_biz_type_user').then( d => {
        // 获取账单列表
        walletBill(getUrlParam('accountNumber')).then((data) => {
          // 遍历账单列表 将type转化对应的账单类型
          data.list.map( v => {
            for(let i = 0, len = d.length; i < len; i++) {
              // 取出当前type对应的账单类型
              if(v.bizType === element.dkey) {
                v.bizType === element.dvalue;
                break;
              }
            }
          })
          this.data = data.list;
        });
      })
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.bill-wrapper {
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
    line-height: .88rem;
    width: 100%;
    padding: 0 .3rem;
    background: #fff;
    margin-bottom: .2rem;

    p {
      display: flex;
      justify-content: space-between;

      .icon {
        width: .2rem;
        height: .36rem;
        @include bg-image("返回");
        margin-top: .28rem;
      }

      .txt1 {
        font-size: .36rem;
        font-weight: bold;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);

      }

      .txt2 {
        font-size: .32rem;
      }

    }
  }

  .bill-list {
    display: block;
    width: 100%;
    background: #fff;
    padding: .26rem .3rem 0;

    .list {
      width: 100%;
      height: 1.52rem;
      display: flex;
      border-bottom: .01rem solid #e5e5e5;

      .mark {
        border-radius: 50%;
        margin-top: .26rem;

        .icon {
          width: .6rem;
          height: .6rem;
          @include bg-image("收款");
          margin-right: .32rem;
        }

        .ico1 {
          @include bg-image("充值");
        }

        .ico2 {
          @include bg-image("转出");
        }

        .ico3 {
          @include bg-image("转入");
        }

        .ico4 {
          @include bg-image("提现");
        }

      }

      .item {
        width: 86%;

        .collect {
          display: flex;
          justify-content: space-between;
         
          .txt1 {
            font-size: .28rem;
            font-weight: bold;
            line-height: .4rem;
            color: #333;
          }

          .txt2 {
            font-size: .32rem;
            color: #0ec55b;
            line-height: .45rem;
            font-weight: 600;
          }

          .txt22 {
            color: #d35d3d;
          }

        }

        .time {
          font-size: .22rem;
          line-height: .3rem;
          margin-bottom: .08rem;
          color: #333;
        }

        .explain {
          font-size: .22rem;
          color: #adbacd;
          line-height: .3rem;
          width: 4.9rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

      }

    }

  }





}

</style>
