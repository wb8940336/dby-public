/*
 * @Description:
 * @Author: 子非鱼
 * @Date: 2021-04-09 13:40:26
 * @LastEditTime: 2021-05-10 16:09:24
 * @LastEditors: 子非鱼
 */

import CryptoJS from 'crypto-js';
//AES_TYPE = "AES/ECB/PKCS5Padding";


//base64加密
export function encryptBase64(str) {
    var wordArray = CryptoJS.enc.Utf8.parse(str);
    var base64 = CryptoJS.enc.Base64.stringify(wordArray);
    return base64;
}

//base64解密
export function decryptBase64(base64) {
    var wordArray = CryptoJS.enc.Base64.parse(base64);
    var parsedStr = wordArray.toString(CryptoJS.enc.Utf8);
    return parsedStr;
}

let encrypt = {
    config: {
        key: "acdhrm22xwo3dswz",
        type: "AES",
        mode: "ECB",
        padding: "Pkcs7"
    },
    //AES加密
    encryptAES: function (word) {
        const config = this.config;
        var key = CryptoJS.enc.Utf8.parse(config.key);
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS[config.type].encrypt(
            srcs,
            key,
            {
                mode: CryptoJS.mode[config.mode],
                padding: CryptoJS.pad[config.padding]
            }
        );
        return encrypted.toString();
    },
    //AES解密
    decryptAES: function (word) {
        const config = this.config;
        var key = CryptoJS.enc.Utf8.parse(config.key);
        var decrypt = CryptoJS[config.type].decrypt(
            word,
            key,
            {
                mode: CryptoJS.mode[config.mode],
                padding: CryptoJS.pad[config.padding]
            }
        );
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    },
    //base64加密
    encryptBase64,
    //base64解密
    decryptBase64
}
export default {
    install: function (Vue, options = {}) {
        encrypt.config = Object.assign(encrypt.config, options);
        Vue.prototype.$encrypt = encrypt;
    }
}