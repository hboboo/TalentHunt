import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'

const home = () => import('../views/home/home.vue')
const search = () => import('../views/search/search.vue')
const homePage = () => import('../views/homepage/homePage.vue')
const jobDetails = () => import('../views/jobDetails/jobDetails.vue')
const companyDetails = () => import('../views/jobDetails/companyDetails/companyDetails.vue')
const login = () => import('../views/login/login.vue')

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: App,
  children: [
    {
      path: '',
      redirect: '/home'
    },
    //登录注册页面
    {
      path: '/login',
      component: login
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
    //招聘岗位信息详情页
    {
      path: '/jobDetails',
      component: jobDetails,
      children: [
        //公司详情页
        {
          path: 'companyDetails',
          component: companyDetails
        }
      ]
    },
  ]
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
