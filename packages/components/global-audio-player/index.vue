<!--
 * @Description: 
 * @Author: 子非鱼
 * @Date: 2021-02-22 16:34:06
 * @LastEditTime: 2021-05-10 18:12:39
 * @LastEditors: 子非鱼
-->
<!--  -->
<template>
    <transition name="fade">
        <div class="global-audio-player" v-if="visible">
            <div class="close-btn iconfont iconbianzu35" @click="visible=false"></div>
            <audio-player :ref="refKey" style="width:402px;box-shadow: 0px 4px 12px 0px rgba(51,51,51,0.15); " :sourceUrl="sourceUrl" :autoplay="true"></audio-player>
        </div>
    </transition>
</template>

<script>
import audioPlayer from "../audio-player/index.vue";
export default {
    name: 'global-audio-player',
    components: {
        audioPlayer
    },
    props: {
        //自动播放
        autoplay: {
            type: Boolean,
            default: false
        },
        //是否循环播放
        loop: {
            type: Boolean,
            default: false
        },
        //静音
        muted: {
            type: Boolean,
            default: false
        },
        //可配置播放速率
        speedList: {
            type: Array,
            default() {
                return [0.5, 1, 1.5, 2]
            }
        },
        //播放源
        sourceUrl: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            visible: false
        };
    },
    computed: {
        refKey() {
            return new Date().getTime();
        }
    },
    created() { },
    mounted() { },
    methods: {
        reset() {
            this.$refs[this.refKey].reset();
        }
    }
}

</script>
<style lang='scss' scoped>
.global-audio-player {
    position: fixed;
    right: 40px;
    bottom: 40px;
    width: 470px;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    /*transform: translate(0, 80px);
    opacity: 0;*/
    &.show {
        transform: translate(0, 0);
        opacity: 1;
    }
    .close-btn {
        display: block;
        cursor: pointer;
        transition: all 0.3s ease;
        color: #666;
        font-size: 32px;
        margin-right: 16px;
        &:hover {
            opacity: 0.8;
        }
    }
}
</style>