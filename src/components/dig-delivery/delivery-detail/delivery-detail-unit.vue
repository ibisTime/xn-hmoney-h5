<template>
    <div class="unit_detail">
        <div class="unit_container" v-html="deliveryUnitIntroduce"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            deliveryUnitIntroduce: ''
        }
    },
    created() {
        this.deliveryUnitIntroduce = sessionStorage.getItem('deliveryUnitIntroduce') || '';
    },
    beforeDestroy() {
        sessionStorage.removeItem('deliveryUnitIntroduce');
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