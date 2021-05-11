/*
 * @Description: 
 * @Author: 子非鱼
 * @Date: 2021-05-10 15:04:44
 * @LastEditTime: 2021-05-11 14:09:49
 * @LastEditors: 子非鱼
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui";
import "@/assets/scss/element-variables.scss";//可自定义主题色
import '@/assets/icons'
import dbyPublic, { component, encrypt, encryptBase64, decryptBase64 } from "/packages"

Vue.use(encrypt);
Vue.use(component);
Vue.config.productionTip = false;

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
