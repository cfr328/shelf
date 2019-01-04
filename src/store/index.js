import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'; //

//导入模块
import app from './modules/app';
import upload from './modules/upload.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app,
        upload
    },
    plugins: [createLogger()]
})

//希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。