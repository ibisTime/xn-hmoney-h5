<template>
    <div id="defPic">
        <div class="def-pic"><span>{{content}}</span></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            content: {
                type: String,
                default: 'Y'
            }
        }
    }
</script>

<style scoped>
#defPic{
    width: 100%;
    height: 100%;
}
.def-pic{
    width: 100%;
    height: 100%;
    background-color: #f15353;
    font-size: 0.55rem;
    text-align: center;
    color: #fff;
    border-radius: 100%;
    position: relative;
}
span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>

