<!--
 * @Description: 
 * @Author: 子非鱼
 * @Date: 2021-02-02 15:27:19
 * @LastEditTime: 2021-03-13 12:21:45
 * @LastEditors: 子非鱼
-->
<!--  -->
<template>
    <div class="init-audio-play">
        <div class="player-box">
            <svg-icon className="play-btn" :icon="played?'pause':'play'" @click="togglePlayStatus"></svg-icon>
            <!-- play-btn-img 导出用 -->
            <!-- <div class="play-btn-img" :class="[played?'pause':'play']" @click="togglePlayStatus"></div> -->
            <el-slider :disabled="!successed" input-size="mini" class="slider" v-model="current" @change="onSlideChange" @input="onSlideInput" :show-tooltip="false"></el-slider>
            <div class="times">
                <span class="current">{{currentTimes}}</span>
                <span> / </span>
                <span>{{totalTimes}}</span>
            </div>
            <el-dropdown class="dropdown" trigger="click" @command="toggleSpeed">
                <span class="el-dropdown-link">
                    {{speed}}倍<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="init-drop-menu">
                    <el-dropdown-item v-for="(item,index) in speedList" :disabled="!successed" :key="index" :command="item">{{item}}倍</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <audio ref="audio" @loadedmetadata="getDuration" @progress="onProgress" @ended="playerEnd" @timeupdate="updateTime" :src="sourceUrl" preload :autoplay="autoplay"
            :loop="loop" :muted="muted"></audio>
        <!-- <el-radio-group v-model="speed" @change="speedChange">
            <el-radio :label="item" v-for="(item,index) in speedList" :key="index">{{item}}倍</el-radio>
        </el-radio-group> -->
    </div>
</template>

<script>
export default {
    name: 'audio-player',
    components: {},
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
            totalTimes: "00:00",
            currentTimes: "00:00",
            current: 0,
            duration: 0,
            played: false,
            playerObj: null,
            successed: false,
            speed: 1
        };
    },
    computed: {
        playKey() {
            let strW = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let str = "";
            for (let i = 0; i < 16; i++) {
                str += strW.charAt(Math.floor(Math.random() * strW.length));
            }
            return str;
        }
    },
    beforeDestroy() {
        if (!this.playerObj) return;
        this.playerObj.pause();
        this.playerObj = null;
    },
    methods: {
        reset() {
            if (!this.playerObj) return;
            this.current = 0;
            this.currentTimes = "00:00";
            if (!this.sourceUrl) this.played = false;
            if (this.playerObj) this.playerObj.currentTime = 0;
        },
        onProgress(e) {
            //console.log(e)
        },
        getDuration() {
            let obj = this.$refs.audio;
            var time = obj.duration;
            this.duration = time;
            this.totalTimes = this.formatTime(time);
            this.playerObj = obj;
            this.successed = true;
            if (this.autoplay) this.played = true;
        },
        formatTime(time) {
            var minute = time / 60;
            var minutes = parseInt(minute);
            if (minutes < 10) minutes = "0" + minutes;
            var second = time % 60;
            var seconds = Math.round(second);
            if (seconds < 10) seconds = "0" + seconds;
            return minutes + ":" + seconds
        },
        playerEnd() {
            this.played = false;
            //this.reset();
        },
        updateTime(e) {
            let currentTime = e.target.currentTime;
            this.current = Math.ceil(currentTime / this.duration * 100);
            this.currentTimes = this.formatTime(currentTime);
        },
        onSlideChange(val) {
            let currentTime = val / 100 * this.duration;
            this.playerObj.currentTime = currentTime;
        },
        onSlideInput(val) {
            console.log(val)
            //if (this.playerObj && this.played) this.playerObj.pause();
        },
        speedChange(e) {
            if (this.playerObj) this.playerObj.playbackRate = e;
        },
        toggleSpeed(item) {
            this.speed = item;
            if (!this.playerObj) return;
            this.playerObj.playbackRate = item;
        },
        togglePlayStatus() {
            if (!this.successed) {
                this.$message.error("音频加载失败");
                return
            };
            let cmp = this.$parent.$children;
            cmp.map(v => {
                if (v.playKey && v.playKey != this.playKey) {
                    v.played = false;
                    v.playerObj && v.playerObj.pause();
                }
            });
            this.played = !this.played;
            if (this.played) {
                this.playerObj && this.playerObj.play();
            } else {
                this.playerObj && this.playerObj.pause();
            }
        }
    }
}

</script>
<style lang='scss'>
.init-audio-play {
    padding: 10px 16px;
    background-color: #fff;
    .player-box {
        display: flex;
        align-items: center;
        .play-btn-img {
            width: 32px;
            height: 32px;
            background-image: url(~@/assets/img/play.png);
            cursor: pointer;
            transition: 0.3s ease;
            &:hover {
                opacity: 0.8;
            }
            &.pause {
                background-image: url(~@/assets/img/pause.png);
            }
        }
        .play-btn {
            border-radius: 50%;
            color: $--color-primary;
            width: 32px;
            height: 32px;
            font-size: 32px;
            cursor: pointer;
            transition: 0.3s ease;
            &:hover {
                opacity: 0.8;
            }
        }
        .slider {
            flex: 1;
            padding: 0 10px;
            margin: 0 10px;
        }
        .times {
            font-size: 14px;
            .current {
                color: $--color-primary;
            }
        }
        .dropdown {
            text-align: right;
            margin-left: 10px;
            .el-dropdown-link {
                width: 60px;
                display: inline-block;
                cursor: pointer;
            }
        }
    }
}
.init-drop-menu {
    z-index: 9999 !important;
}
</style>