import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'

const home = () => import('../views/home/home.vue')
const search = () => import('../views/search/search.vue')
const homePage = () => import('../views/homepage/homePage.vue')

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: App,
  children: [
    {
      path: '',
      redirect: '/home'
    },
    //招聘首页
    {
      path: '/home',
      component: home
    },
    //搜索岗位页面
    {
      path: '/search',
      component: search
    },
    //个人主页
    {
      path: '/homepage',
      component: homePage
    },
  ]
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
