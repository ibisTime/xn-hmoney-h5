<template>
    <div class="set_up_box">
        <div class="set_up_single" @click="toSetSymbol">
            <div class="set_left">
                本地货币
            </div>
            <div class="set_right">
                <i class="icon icon_right_to"></i>
            </div>
        </div>
        <div class="set_up_single" @click="toAbout">
            <div class="set_left">
                版本更新说明
            </div>
            <div class="set_right">
                <i class="icon icon_right_to"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        toAbout() {
            this.$router.push(`/about-platformIntroduced?ckey=h5_version`);
        },
        toSetSymbol() {
            this.$router.push(`/set-up_symbol`);
        }
    }
}
</script>

<style scoped lang="scss">
    .set_up_box{
        height: 100%;
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
                    width: 0.26rem;
                    height: 0.32rem;
                }
            }
        }
    }
</style>