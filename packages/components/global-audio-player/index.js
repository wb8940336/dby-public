/*
 * @Description:
 * @Author: 子非鱼
 * @Date: 2021-02-22 16:39:15
 * @LastEditTime: 2021-05-11 10:20:30
 * @LastEditors: 子非鱼
 */
import Vue from 'vue'
import globalAudioPlayer from "./index.vue"
const playerConstructor = Vue.extend(globalAudioPlayer)
let index = 6000;
let bottom = 40;
let instance = new playerConstructor().$mount();
globalAudioPlayer.install = function (options) {
    instance.visible = true;
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
        instance = Object.assign(instance, options);
        instance.$el.style.zIndex = index;
        //instance.$el.style.bottom = bottom + 'px';
        index++;
        //bottom += 100;
        instance.reset();
    })
};
export default globalAudioPlayer