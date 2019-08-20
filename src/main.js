import Vue from 'vue'
import App from './App.vue'
import router from './router'
import HeroService from "@/services/HeroService";
import VueResource from 'vue-resource';
import MockHeroesApi from "@/MockHeroesApi";
import Rx from 'rxjs/Rx';
import VueRx from "vue-rx";

Vue.config.productionTip = false;
Vue.prototype.$heroService = HeroService.instance();
Vue.use(VueResource, VueRx, Rx);

let mockHeroesApi = new MockHeroesApi();
Vue.http.interceptors.unshift((request, next) => mockHeroesApi.handleRequest(request, next));

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
