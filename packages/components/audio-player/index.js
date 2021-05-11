/*
 * @Description:
 * @Author: 子非鱼
 * @Date: 2021-02-24 18:03:30
 * @LastEditTime: 2021-02-24 18:06:01
 * @LastEditors: 子非鱼
 */
export default `{
    template:\`
        <div class="init-audio-play">
            <div class="player-box">
                <div class="play-btn-img" :class="[played?'pause':'play']" @click="togglePlayStatus"></div>
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
        </div>
    \`,
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
            console.log(e)
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
}`