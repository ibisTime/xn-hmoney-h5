<template>
    <div class="unit_detail">
        <div class="unit_container" v-html="mainUnitIntroduce"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mainUnitIntroduce: ''
        }
    },
    created() {
        this.mainUnitIntroduce = sessionStorage.getItem('mainUnitIntroduce') || '';
    },
    beforeDestroy() {
        sessionStorage.removeItem('mainUnitIntroduce');
    }
}
</script>

<style lang="scss" scoped>
    .unit_detail{
        height: 100%;
        padding-bottom: 1rem;
        background-color: #fff;
        .unit_container{
            color: #222;
            line-height: 0.5rem;
            font-size: 0.3rem;
            padding: 0.2rem 0.4rem;
        }
    }
</style>