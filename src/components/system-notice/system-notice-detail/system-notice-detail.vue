<template>
    <div class="notice_detail">
        <div class="detail_head">
            <h5 class="head_h5">{{noticeObj.title}}</h5>
            <p class="head_p">{{noticeObj.updateDatetime}}</p>
        </div>
        <div class="detail_con" v-html="noticeObj.content"></div>
    </div>
</template>

<script>
import {noticeDetail} from 'api/general';
import { setTitle, formatDate } from 'common/js/util';
export default {
    data() {
        return {
            noticeObj: {}
        }
    },
    created() {
        setTitle('公告详情');
        const code = this.$route.query.code;
        if(code) {
            noticeDetail(code).then(data => {
                data.updateDatetime = formatDate(data.updateDatetime, 'yyyy-MM-dd hh:mm:ss');
                this.noticeObj = data;
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .notice_detail{
        height: 100%;
        background-color: #fff;
        padding: 0.5rem 0.3rem 0;
        .detail_head{
            margin-bottom: 0.3rem;
            padding-bottom: 0.3rem;
            border-bottom: 0.02rem solid #E6E6E6;
            .head_h5{
                color: #333;
                font-size: 0.48rem;
                margin-bottom: 0.32rem;
            }
            .head_p{
                color: #999999;
                font-size: 0.24rem;
            }
        }
        .detail_con{
            color: #333333;
            font-size: 0.28rem;
        }
    }
</style>