// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from 'components/login/login';
import close from 'components/login/close';
import settlement from 'components/settlement/settlement';
import analyse from 'components/analyse/analyse';
import messages from 'components/messages/messages';
import getcode from 'components/login/getauth';
import notFoundPage from 'components/404/404';
import MintUI from 'mint-ui';
import 'common/stylus/index.styl';
import 'mint-ui/lib/style.css';
import axios from 'axios';

Vue.use(VueRouter);
Vue.use(MintUI);
Vue.prototype.$ajax = axios;
const routes = [
  {path: '/', redirect: '/getcode'},
  {path: '/close', component: close},  // 提示绑定成功，以及提供关闭按钮
  {path: '/getcode', component: getcode},  // 获取oauth2
  {path: '/login', component: Login},   // 绑定账户
  {path: '/settlement', component: settlement}, // 已/未结算统计页面
  {path: '/analyse', component: analyse}, // 运营分析
  {path: '/messages', component: messages}, // 已/未读消息
  {path: '/404', component: notFoundPage},
  {path: '*', component: notFoundPage}
];
let router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active'
});
/* eslint-disable no-new */
 new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');
