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
const chatList = () => import('../views/chatList/chatList.vue')
const chatListDetails = () => import('../views/chatList/chatListDetails/chatListDetails.vue')
const collect = () => import('../views/collect/collect.vue')
const myIssue = () => import('../views/myIssue/myIssue.vue')
const personalInfo = () => import('../views/personalInfo/personalInfo.vue')
const compileInfo = () => import('../views/personalInfo/compileInfo/compileInfo.vue')
const resumeDetails = () => import('../views/resumeDetails/resumeDetails.vue')

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
    },
    //聊天列表
    {
      path: '/chatList',
      name: 'chatList',
      component: chatList,
      children: [
        //聊天详情页
        {
          path: 'chatListDetails',
          component: chatListDetails
        },
      ]
    },
    //收藏页面
    {
      path: '/collect',
      component: collect
    },
    //我的发布页面
    {
      path: '/myIssue',
      component: myIssue
    },
    //个人资料页面
    {
      path: '/personalInfo',
      component: personalInfo,
      children: [
        {
          path: 'compileInfo',
          component: compileInfo
        }
      ]
    },
    //简历页面
    {
      path: '/resumeDetails/:sender',
      name: 'ResumeDetails',
      component: resumeDetails
    }
  ]
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
