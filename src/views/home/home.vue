<template>
  <div>
    <section class="home-container">
      <section class="navbar-container">
        <div class="header-nav">
          <div>
            <span :class="{active_job_type: changeShow == 'career'}" @click="handleClick('career',true)">全职</span>
          </div>
          <div>
            <span :class="{active_job_type: changeShow == 'internship'}" @click="handleClick('internship',false)">实习</span>
          </div>
          <van-icon name="search" class="search"/>
        </div>
        <div class="recommendation-title">
          <span :class="{active_content_type: content == 'recommendation'}" @click="content = 'recommendation'">推荐</span>
          <span :class="{active_content_type: content == 'popular'}" @click="content = 'popular'">热门</span>
          <div class="button-container">
            <div>
               <button class="button-left">{{city}}<van-icon name="arrow-down" /></button>
            </div>
            <div>
              <button>{{siev}}<van-icon name="arrow-down" /></button>
            </div>
          </div>
        </div>
      </section>
      <section class="swipe-container">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img :src="image">
          </van-swipe-item>
        </van-swipe>
      </section>
      <company-list :list='jobList'></company-list>
      <section class="tabbar-container">
        <van-tabbar v-model="tabbarActive">
          <van-tabbar-item icon="home-o">职位</van-tabbar-item>
          <van-tabbar-item icon="search">标签</van-tabbar-item>
          <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
          <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
        </van-tabbar>
      </section>
    </section>
  </div>
</template>

<script>
import {Icon,Tabbar,TabbarItem,Swipe,SwipeItem} from 'vant';
import companyList from '../../components/common/companyList.vue'
export default {
  name: 'Home',
  
  data() {
    return {
      tabbarActive: 0,  //tabbar状态栏索引
      changeShow: 'career', //默认选取全职
      content: 'recommendation',  //默认选取推荐
      city: '广州', //按钮
      siev: '筛选',
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
      ],
      jobList: []
    };
  },
  created() {
    this.getRecommendation(true)
  },

  mounted() {
    
  },

  methods: {
    //显示样式的切换&&传递一个查询参数请求招聘信息
    handleClick(jobType, isFullTime) {
      this.changeShow = jobType;    // 更新 changeShow 的值
      this.getRecommendation(isFullTime)  //传入是否全职参数
    },

    //请求招聘列表
    getRecommendation(isFullTime) {
      const isFullTimeParam = isFullTime ? 'true' : 'false'; 
      this.$http.get('/job/find', {
        params: {
          is_full_time: isFullTimeParam
        }
      })
      .then((res) =>{
        this.jobList = res.data
      })
    },

  },

  components: {
    [Icon.name]: Icon,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    companyList,
  }
};
</script>

<style lang="less" scoped>
  @import '../../style/mixin.less';

  .navbar-container{
    display: flex;
    flex-direction: column;
    .header-nav{
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-top: 0.15rem;
      .wh(100%, 1.95rem);
      div{
        display: flex;
        margin-left: 0.5rem;
        height: 100%;
        align-items: center;
        font-size: 0.8rem;
        .active_job_type{
          font-weight: 800;
          font-size: 1rem;
          border-bottom: 3px solid brown;
        }
      }
      .search{
        margin-left: 10rem;
        color: blue;
      }
    }
    .recommendation-title{
      display: flex;
      height: 2.5rem;
      font-size: 0.7rem;
      align-items: center;
      border-bottom: 1px solid @bc;
      span{
        margin-left: 0.6rem;
      }
      .active_content_type{
        font-weight: 800;
      }
      .button-container{
        display: flex;
        margin-left: 6rem;
        align-items: center;
        .button-left{
          margin-right: 0.9rem;
        }
      }
    }
  }
  .swipe-container{
    img{
      .wh(100%, 100%);
      max-height: 5rem;
      padding: 0.2rem 0;
    }
  }
</style>