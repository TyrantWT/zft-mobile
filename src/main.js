// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Login from 'components/login/login';
import notFoundPage from 'components/404/404';
import MintUI from 'mint-ui';
import 'common/stylus/index.styl';
import 'mint-ui/lib/style.css';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(MintUI);
const routes = [
  {path: '/', component: Login},
  {path: '/login', component: Login},
  {path: '/404', component: notFoundPage}
];
let router = new VueRouter({
  routes,
  linkActiveClass: 'active'
});
/* eslint-disable no-new */
 new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');
