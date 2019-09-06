<template>
  <div class="address-list-wrapper">
    <div class="addr-scroll-wrapper">
      <scroll :data="addressList" :hasMore="hasMore">
        <ul>
          <li v-for="(item, index) in addressList" :key="index" class="border-bottom-1px" @click="setStoreRess(index, item)">
            <div class="content">
              <img src="./ok.png" class="okimg" alt="" v-show="isokIndex === index">
              <div class="info"><span class="name">{{item.addressee}}</span><span class="mobile">{{item.mobile}}</span></div>
              <div class="addr">{{item.province}} {{item.city}} {{item.district}} {{item.detailAddress}}</div>
            </div>
            <div class="opeator border-top-1px">
              <div class="default" @click.stop="setDefault(item, index)" v-show="!storeOrder">
                <i class="icon-chose" :class="item.isDefault === '1' ? 'active' : ''"></i>
                <span>设为默认地址</span>
              </div>
              <div :class="{'sto' : storeOrder}">
                <button class="edit" @click.stop="goEdit(item)">编辑</button>
                <button class="delete" @click.stop="deleteItem(item, index)">删除</button>
              </div>
            </div>
          </li>
        </ul>
      </scroll>
      <div class="add_address" @click="toAddRess">
        <span>+</span>新增
      </div>
    </div>
    <div class="no-result-wrapper">
      <no-result v-show="!hasMore && !addressList.length" title="您尚未添加收货地址"></no-result>
    </div>
    <full-loading v-show="loadingFlag" :title="loadingText"></full-loading>
    <confirm ref="confirm" :text="comText" @confirm="_deleteAddress" @cancel="cancelRess"></confirm>
    <toast ref="toast" :text="text"></toast>
    <router-view></router-view>
  </div>
</template>
<script>
  import Scroll from 'base/scroll/scroll';
  import FullLoading from 'base/full-loading/full-loading';
  import Confirm from 'base/confirm/confirm';
  import Toast from 'base/toast/toast';
  import NoResult from 'base/no-result/no-result';
  import {setTitle} from 'common/js/util';
  import {deleteAddress, getAddressList, setDefaultAddress} from 'api/user';
  // import { changeOrderRess } from 'api/store';

  export default {
    data() {
      return {
        text: '删除成功',
        hasMore: true,
        loadingFlag: false,
        loadingText: '',
        addressList: [],
        deleteIndex: 0,
        storeOrder: '',    // 商品订单进入
        isokIndex: -1,
        setIndex: 0,
        comText: '确定删除地址吗',
        toBank: '',    // 回商城地址
        setRessCode: '',
        shopCode: ''
      };
    },
    created() {
      this.storeOrder = sessionStorage.getItem('storetype');
      this.currentItem = null;
      this.getAddress();
      this.isokIndex = Number(sessionStorage.getItem('isokIndex') || this.isokIndex);
      this.toBank = sessionStorage.getItem('toBank');
    },
    methods: {
      toAddRess() {
        sessionStorage.removeItem('ressCode');
        this.go('/mine-address-addedit');
      },
      go(url) {
        this.$router.push(url);
      },
      getAddress() {
        getAddressList().then((data) => {
          this.addressList = data;
          this.hasMore = false;
        }).catch(() => {
          this.hasMore = false;
        });
      },
      setDefault(item, index) {
        if (item.isDefault !== '1') {
          this.loadingText = '设置中...';
          this.loadingFlag = true;
          setDefaultAddress(item.code).then(() => {
            this.loadingFlag = false;
            this.addressList.forEach((item, i) => {
              if (index === i) {
                this.addressList[index].isDefault = '1';
              }else{
                this.addressList[i].isDefault = '0';
              }
            });
            this.setCurAddr(item);
          }).catch(() => {
            this.loadingFlag = false;
          });
        }
      },
      goEdit(item) {
        this.$router.push(`/mine-address-addedit?ressCode=${item.code}`);
      },
      goAdd() {
        this.$router.push(this.$route.path + '/add');
      },
      deleteItem(item, index) {
        this.currentItem = item;
        this.deleteIndex = index;
        this.comText = '确定删除地址吗';
        this.$refs.confirm.show();
      },
      cancelRess() {
        this.currentItem = null;
        if(this.storeOrder) {
          sessionStorage.removeItem('setRess');
          return;
        }
      },
      _deleteAddress() {
        if (this.currentItem) {
          this.loadingText = '删除中...';
          this.loadingFlag = true;
          deleteAddress(this.currentItem.code).then(() => {
            this.loadingFlag = false;
            this.addressList.splice(this.deleteIndex, 1);
            if(this.deleteIndex < this.isokIndex) {
              this.isokIndex --;
              return;
            }
            if(this.deleteIndex === this.isokIndex) {
              this.isokIndex = -1;
              sessionStorage.removeItem('isokIndex');
              sessionStorage.removeItem('setRess');
            }
          }).catch(() => {
            this.loadingFlag = false;
          });
          return;
        }
        if(this.storeOrder) {
          this.isokIndex = this.setIndex;
          sessionStorage.setItem('isokIndex', this.isokIndex);
          this.text = '操作成功';
          this.$refs.toast.show();
          setTimeout(() => {
            this.$router.replace(this.toBank);
          }, 1000);
          return;
        }
      },
      setStoreRess(index, item) { // 选择地址
        if(this.storeOrder) {
          this.comText = '确定使用该地址吗？';
          this.$refs.confirm.show();
          this.setIndex = index;
          this.setRessCode = item.code;
          this.currentItem = null;
          sessionStorage.setItem('setRess', JSON.stringify(item));
        }
      }
    },
    components: {
      Scroll,
      Toast,
      Confirm,
      FullLoading,
      NoResult
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .address-list-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    .sto{
      padding-left: 0.2rem;
    }
    ul {
      li {
        position: relative;
        @include border-bottom-1px($color-border);
        font-size: $font-size-small;
        background-color: #fff;

        &:last-child {
          @include border-none();
        }

        .content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 1.6rem;
          padding: 0 0.3rem;
          position: relative;
          .okimg{
            position: absolute;
            top: 0.7rem;
            right: 0.3rem;
            width: 0.6rem;
            height: 0.6rem;
          }
          .info {
            font-size: $font-size-medium-x;
            display: flex;
            .name {
              flex: 1;
            }
            .mobile {
              width: 2.1rem;
            }
            span {
              line-height: 0.42rem;
            }
          }

          .addr {
            padding-top: 0.3rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: $font-size-medium-x;
            color: #666;
          }
        }

        .opeator {
          display: flex;
          align-items: center;
          height: 0.9rem;
          font-size: 0;
          @include border-top-1px($color-border);

          .default {
            flex: 1;
            display: flex;
            align-items: center;
            .icon-chose {
              margin-left: 0.3rem;
              display: inline-block;
              vertical-align: middle;
              width: 0.36rem;
              height: 0.36rem;
              background-size: 0.36rem;
              @include bg-image('un-select');

              &.active {
                background-image: url('./deli_yuan.png');
              }
            }

            span {
              display: inline-block;
              vertical-align: middle;
              padding-left: 0.1rem;
              line-height: 0.33rem;
              font-size: $font-size-small;
              color: $color-text-l;
            }
            .act {
              color: $primary-color;
            }
          }

          button {
            display: inline-block;
            vertical-align: middle;
            font-size: 0.24rem;
            padding: 0.06rem 0.25rem;
            background: #fff;
            border: 1px solid #979797;
            border-radius: 0.04rem;
            color: #666;
          }

          .delete {
            margin-left: 0.5rem;
            margin-right: 0.3rem;
          }
        }
      }
    }

    .no-result-wrapper {
      position: absolute;
      width: 100%;
      top: 40%;
      left: 0;
      transform: translateY(-50%);
    }

    .addr-scroll-wrapper {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: auto;
    }

    footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.98rem;
      line-height: 0.98rem;
      text-align: center;
      font-size: $font-size-large-s;
      color: #fff;
      background: $primary-color;
    }
    .add_address{
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      height: 0.98rem;
      box-shadow: 0 -0.04rem 0.08rem 0 #E6E6E6;
      color: #ED655F;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.32rem;
      background-color: #fff;
      span{
        display: inline-block;
        margin-right: 0.08rem;
        font-size: 0.32rem;
        width: 0.32rem;
        height: 0.32rem;
        border: 0.02rem solid #ED655F;
        border-radius: 100%;
        line-height: 0.22rem;
        text-align: center;
      }
    }
  }
</style>
