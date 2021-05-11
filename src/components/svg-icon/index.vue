<!--
 * @Description: 
 * @Author: 子非鱼
 * @Date: 2021-02-19 09:29:03
 * @LastEditTime: 2021-02-20 09:55:31
 * @LastEditors: 子非鱼
-->
<!--  -->
<template>
    <svg :class='svgClass' aria-hidden="true" v-on="$listeners">
        <use :xlink:href='iconName' />
    </svg>
</template>

<script>
export default {
    name: "SvgIcon",
    props: {
        icon: {
            type: String,
            required: true
        },
        className: {
            type: String,
            default: ""
        }
    },
    computed: {
        iconName() {
            return `#icon-${this.icon}`
        },
        svgClass() {
            if (this.className) {
                return "svg-icon " + this.className
            } else {
                return "svg-icon"
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: middle;
    fill: currentColor;
    overflow: hidden;
}
</style>