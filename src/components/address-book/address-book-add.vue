<template>
  <div class="add_book">
    <div class="single_iup">
      <input v-model="addressName" type="text" placeholder="请输入地址名称"><span class="single_span_red" v-text="errorAddress"></span>
    </div>
    <div class="single_iup">
      <select v-model="symType">
        <option value="" selected>请选择地址类型</option>
        <option :value="item.symbol" v-for='(item,index) in coinList' :key='index'>{{item.symbol}}</option>
      </select>
      <span class="single_span_red" v-text="errorAddressType"></span>
    </div>
    <div class="single_iup">
      <input v-model="withdrawAddress" type="text" placeholder="请输入提现地址">
      <span class="single_span_red" v-text="errorWdAddress"></span>
    </div>
    <div class="foo_btn" @click.stop="addInfo">
      确定
    </div>
    <Toast :text="textMsg" ref="toast"/>
  </div>
</template>
<script>
  import { getCoinList } from 'api/account';
  import { addAddressBook } from 'api/mine';
  import { getUserId } from 'common/js/util';
  import Toast from 'base/toast/toast';
  export default {
    data() {
      return {
        coinList: [],
        symType: '',
        addressName: '',
        withdrawAddress: '',
        errorAddress: '',
        errorAddressType: '',
        errorWdAddress: '',
        textMsg: ''
      }
    },
    created() {
      getCoinList().then(data => {
        data.map(item => {
          item.symbol = item.symbol;
          item.ename = item.ename;
        })
        this.coinList = [...this.coinList, ...data];
      });
    },
    methods: {
      addInfo(){
        if(this.addressName){
          this.initErrors();
          if(this.symType){
            this.initErrors();
            if(this.withdrawAddress){
              this.initErrors();
              let config = {
                label: this.addressName,
                symbol: this.symType,
                address: this.withdrawAddress,
                userId: getUserId(),
                isCerti: true
              };
              addAddressBook(config).then(data => {
                if(data.isSuccess){
                  this.textMsg = '操作成功';
                  this.$refs.toast.show();
                  setTimeout(() => {
                    this.$router.push('/address-book');
                  }, 2000);
                }else {
                  this.textMsg = '操作失败';
                  this.$refs.toast.show();
                }
              });
            }else{
              this.errorWdAddress = '地址不能为空!';
            }
          }else{
            this.errorAddressType = '地址类型不能为空!';
          }
        }else {
          this.errorAddress = '地址名称不能为空!';
        }
      },
      initErrors(){
        this.errorAddress = '';
        this.errorAddressType = '';
        this.errorWdAddress = '';
      }
    },
    components: {
      Toast
    }
  }
</script>
<style scoped lang="scss">
  .add_book{
    height: 100%;
    background-color: #FFFFFF;
    padding: 0.2rem 0.3rem;
    .single_iup{
      padding: 0.34rem 0;
      font-size: 0.3rem;
      input, select{
        width: 60%;
        font-size: 0.28rem;
      }
    }
    .foo_btn{
      margin-top: 1rem;
      background-color: #DA5454;
      text-align: center;
      height: 1rem;
      line-height: 1rem;
      border-radius: 0.1rem;
      color: #fff;
      font-size: 0.3rem;
    }
  }
  .single_span_red{
    color: #DA5454
  }
</style>
