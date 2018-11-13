<template>
    <div>
        <div class="cz-box">
            <p>充值FMVP</p>
            <div class="cz-iup"><input type="number" v-model="count" placeholder="请输入充值数量"></div>
            <!--<div class="cz-iup"><input type="password" v-model="config.tradePwd" placeholder="请输入交易密码"></div>-->
        </div>
        <div class="qr-box" @click="qrczFn">
            确定
        </div>
      <Toast :text="textMsg" ref="toast" />
      <FullLoading ref="fullLoading" v-show="isLoading"/>
    </div>
</template>

<script>
import { rechargeGram } from 'api/store';
import { getUser } from 'api/person';
import { setTitle, getUserId, formatMoneyMultiply } from "common/js/util";
import FullLoading from 'base/full-loading/full-loading';
import Toast from 'base/toast/toast';
    export default {
        data(){
            return {
                config: {
                    userId: getUserId(),
                    count: ''
                    // tradePwd: ''
                },
                count: '',
                textMsg: '',
                isLoading: false
            }
        },
        created() {
            setTitle('充值');
        },
        methods: {
            qrczFn(){
                if(this.count == ''){
                    this.textMsg = '充值数量不能为空';
                    this.$refs.toast.show();
                    return;
                // }else if(this.config.tradePwd == ''){
                //     this.textMsg = '请输入交易密码';
                //     this.$refs.toast.show();
                //     return;
                }
                // getUser(getUserId()).then(res => {console.log(res)
                //     if (res.tradepwdFlag) {
                        this.isLoading = true;
                        this.config.count = formatMoneyMultiply(this.count, '', 'FMVP');
                        rechargeGram(this.config).then(data => {
                            if(data.code){
                              this.isLoading = false;
                              this.textMsg = '充值成功';
                                this.$refs.toast.show();
                                setTimeout(() => {
                                    this.$router.push('/shop');
                                }, 1500);
                            }
                        }, () => {
                          this.isLoading = false;
                          this.count = '';
                            // this.config.tradePwd = '';
                        });
                //     } else{
                //         this.textMsg = '请先设置交易密码';
                //         this.$refs.toast.show();
                //         setTimeout(function () {
                //             this.$router.push('/security-tradePassword?istw=0');
                //         }, 1500)
                //     }
                // });
            }
        },
        components: {
            Toast,
            FullLoading
        }
    }
</script>

<style scoped>
.cz-box{
    background-color: #fff;
    padding: 0.4rem 0.2rem 0.8rem;
    font-size: 0.34rem;
    color: #333;
}
.cz-box p{
    margin-bottom: 0.4rem;
}
.cz-iup{
    margin-top: 0.3rem;
}
.cz-iup input{
    width: 100%;
    padding: 0.2rem 0;
    font-size: 0.32rem;
    color: #333;
    border-bottom: 1px solid #ddd;
}
.qr-box{
    margin: 0 auto;
    margin-top: 0.3rem;
    background-color: #d53d3d;
    color: #fff;
    width: 90%;
    text-align: center;
    font-size: 0.36rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius: 0.08rem;
}
</style>

