<template>
    <div id="defPic">
        <div
            class="def-pic"
            :style="picUrl ? {backgroundImage: `url('${picUrl}')`} : {backgroundColor: '#DE5851'}"
        >
            <span v-show="!picUrl" :style="{fontSize: txtSize}">{{content}}</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            content: {
                type: String,
                default: 'Y'
            },
            picUrl: {
              type: String,
              default: ''
            },
            txtSize: {
                type: String,
                default: '0.55rem'
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "~common/scss/variable";
#defPic{
    width: 100%;
    height: 100%;
}
.def-pic{
    width: 100%;
    height: 100%;
    text-align: center;
    color: #fff;
    border-radius: 100%;
    position: relative;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>

