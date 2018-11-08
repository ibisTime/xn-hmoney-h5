<template>
    <div>
        <div class="cz-box">
            <p>充值数量：</p>
            <div class="cz-iup"><input type="text" v-model="czNumber" placeholder="请输入充值数量"></div>
        </div>
        <div class="qr-box" @click="qrczFn">
            确定
        </div>
    </div>
</template>

<script>
import { setTitle } from "common/js/util";
    export default {
        data(){
            return {
                czNumber: 0
            }
        },
        created() {
            setTitle('充值');
        },
        methods: {
            qrczFn(){}
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
.cz-iup input{
    width: 100%;
    padding: 0.2rem 0;
    font-size: 0.32rem;
    color: #333;
    border-bottom: 1px solid #ccc;
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

