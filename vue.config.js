/*
 * @Description:
 * @Author: 子非鱼
 * @Date: 2021-05-10 15:10:54
 * @LastEditTime: 2021-05-11 14:55:27
 * @LastEditors: 子非鱼
 */
const isLocal = process.env.NODE_ENV === 'development';
module.exports = {
    outputDir: "dist",
    assetsDir: "static",
    lintOnSave: false,//是否开启eslint保存检测
    productionSourceMap: false,
    configureWebpack: config => {
        let production = process.env.NODE_ENV === 'production';
        if (production) {
            config.mode = 'production';
            config["performance"] = {//打包文件大小配置
                "maxEntrypointSize": 10000000,
                "maxAssetSize": 30000000
            }
        }
    },
    chainWebpack: config => {
        const svgRule = config.module.rule("svg");
        svgRule.uses.clear();
        svgRule.exclude.add(/node_modules/); // 正则匹配排除node_modules目录
        svgRule
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]"
            });

        config.module
            .rule('js')
            .include
            .add(__dirname + 'packages')
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                // 修改它的选项...
                return options
            })
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/variable.scss";` //引入scss全局变量
            },
            postcss: {
                plugins: [
                    //postcss
                ]
            }
        },
        extract: !isLocal
    }
}