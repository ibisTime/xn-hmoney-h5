<template>
    <div class="set_up_box">
        <div class="set_up_single" @click="setCNY">
            <div class="set_left">
                CNY
            </div>
            <div class="set_right">
                <i class="icon" :class="curry === 'CNY' ? 'set_icon' : ''"></i>
            </div>
        </div>
        <div class="set_up_single" @click="setUSDT">
            <div class="set_left">
                USD
            </div>
            <div class="set_right">
                <i class="icon" :class="curry === 'USD' ? 'set_icon' : ''"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            curry: 'CNY'
        }
    },
    created() {
        this.curry = sessionStorage.getItem('WALLET_CURRY') || 'CNY';
    },
    methods: {
        setCNY() {
            this.curry = 'CNY';
            sessionStorage.setItem('WALLET_CURRY', 'CNY');
        },
        setUSDT() {
            this.curry = 'USD';
            sessionStorage.setItem('WALLET_CURRY', 'USD');
        }
    }
}
</script>

<style scoped lang="scss">
    .set_up_box{
        height: 100%;
        background-color: #fff;
        padding: 0.2rem 0.3rem;
        .set_up_single{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.36rem 0;
            border-bottom: 0.02rem solid #D8D8D8;
            font-size: 0.32rem;
            .set_left{
                color: #333333;
            }
            .set_right{
                .icon{
                    display: inline-block;
                    width: 0.28rem;
                    height: 0.26rem;
                    background-size: 100% 100%;
                }
                .set_icon{
                    background-image: url('./set.png');
                }
            }
        }
    }
</style>