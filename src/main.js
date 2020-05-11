import Vue from "vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import App from "./App.vue";

import "@/assets/scss/reset.scss";
import "element-ui/lib/theme-chalk/index.css";
import http from "@/api/config";
import "./mock";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'// nprogress样式文件

Vue.use(ElementUI);
Vue.prototype.$http = http;

NProgress.configure({
    easing: 'ease',  // 动画方式    
    speed: 2000,  // 递增进度条的速度    
    showSpinner: false, // 是否显示加载ico    
    trickleSpeed: 200, // 自动递增间隔    
    minimum: 0.3 // 初始化时的最小百分比
})

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    // 开启进度条
    NProgress.start();
    store.commit('getToken');
    store.commit('getMenu');
    let token = store.state.user.token;
    if (!token && to.name !== 'login') {
        next({ name: 'login' })
    } else {
        next();
    }
})

router.afterEach(() => {
    NProgress.done();
})

new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        store.commit('addMenu', router);
    }
}).$mount("#app");