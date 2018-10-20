<template>
    <div id="swiper-box">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(swItem, index) in data" :key="index" :style="getImgSyl(swItem.pic)"></div>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import {getAvatar} from 'common/js/util';
    export default {
        props: {
            data: {
                type: Array,
                default: function(){
                    return []
                }
            }
        },
        data(){
            return {}
        },
        mounted(){
            setTimeout(() => {
                new Swiper('#swiper-box', {
                    loop: true
                });
            }, 20);
        },
        methods: {
            getImgSyl(imgs){
                return getAvatar(imgs);
            }
        }
    }
</script>

<style scoped>
    #swiper-box{
        width: 100%;
        height: 100%;
    }
    .swiper-slide{
        background-size: 100% 100%;
    }
</style>

