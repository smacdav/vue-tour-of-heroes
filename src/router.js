import Vue from 'vue'
import Router from 'vue-router'
import Heroes from "@/components/Heroes";
import Dashboard from "@/components/Dashboard";
import HeroDetail from "@/components/HeroDetail";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/heroes',
      name: 'heroes',
      component: Heroes
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '',
      name: 'home',
      redirect: '/dashboard'
    },
    {
      path:'/detail/:id',
      component: HeroDetail
    }
  ]
})
