/*
 * @Description: 
 * @Author: 子非鱼
 * @Date: 2021-05-10 15:04:44
 * @LastEditTime: 2021-05-11 14:25:25
 * @LastEditors: 子非鱼
 */
module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    "plugins": [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
}
