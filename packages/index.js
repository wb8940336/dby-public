/*
 * @Description:
 * @Author: 子非鱼
 * @Date: 2021-05-10 09:39:42
 * @LastEditTime: 2021-06-04 14:33:34
 * @LastEditors: 子非鱼
 */

import Vue from 'vue'
import '@/assets/icons'
import "./element-ui"
import globalAudioPlayer from "./components/global-audio-player"
import tableContent from "./components/table-content"
import audioPlayer from "./components/audio-player"
import encrypt, { encryptBase64, decryptBase64 } from "./utils/encrypt.js";

const dbyPublic = {
    encrypt,
    encryptBase64,
    decryptBase64,
    audioPlayer
}

const components = [
    globalAudioPlayer,
    tableContent
]
const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
    Vue.prototype.$audioPlayer = globalAudioPlayer.install;
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export const component = {
    globalAudioPlayer,
    install
}
export { default as encrypt, encryptBase64, decryptBase64 } from './utils/encrypt.js'
export default dbyPublic
