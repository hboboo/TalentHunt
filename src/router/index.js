import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'

const home = () => import('../views/home/home.vue')
const search = () => import('../views/search/search.vue')
const homePage = () => import('../views/homepage/homePage.vue')
const jobDetails = () => import('../views/jobDetails/jobDetails.vue')
const companyDetails = () => import('../views/jobDetails/companyDetails/companyDetails.vue')
const register = () => import('../views/register/register.vue')
const login = () => import('../views/login/login.vue')
const issueJob = () => import('../views/issueJob/issueJob.vue')

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: App,
  children: [
    {
      path: '',
      redirect: '/home'
    },
    //注册页面
    {
      path: '/register',
      component: register
    },
    //登录页面
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
      path: '/jobDetails/:id',
      name: 'jobDetails',
      component: jobDetails,
      props: true,
      children: [
        //公司详情页
        {
          path: 'companyDetails',
          name: 'companyDetails',
          component: companyDetails,
          props: true,
        }
      ]
    },
    //发布岗位页面
    {
      path: '/issueJob',
      component: issueJob
    }
  ]
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
