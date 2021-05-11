/*
 * @Description:
 * @Author: 子非鱼
 * @Date: 2021-05-11 14:04:53
 * @LastEditTime: 2021-05-11 14:26:01
 * @LastEditors: 子非鱼
 */
import Vue from 'vue'
import {
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Slider,
    Message,
} from 'element-ui';
//import "@/assets/scss/element-variables.scss";//可自定义主题色

Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Slider);

Vue.prototype.$message = Message;