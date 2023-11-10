<template>
  <div>
    <section class="job-container">
      <section class="navbar-top-container">
        <van-nav-bar left-arrow >
          <template #right>
            <div>
              <van-icon name="star-o" v-show="!isCollected" @click="collection"/>
              <van-icon name="star" v-show="isCollected" @click="uncollection" color="#efad0b" />
            </div>
          </template>
        </van-nav-bar>
      </section>
      <section class="header-container">
        <div class="header-info">
          <h2>招聘信息</h2>
          <span>11-17k</span>
        </div>
        <div class="header-ask">
          <div>
            <van-icon name="map-marked" color="#aab2ba"/>
            <span>黄埔·厂商</span>
          </div>
          <div>
            <van-icon name="bag" color="#aab2ba"/>
            <span>1-3年</span>
          </div>
          <div>
            <van-icon name="award" color="#aab2ba"/>
            <span>大专</span>
          </div>
        </div>
        <div class="header-hr-info">
          <div class="hr-img">
            <van-image
              round
              width="2rem"
              height="2rem"
              src="http://localhost:3000/uploads/avatars/avatars_654b440c876300001f0065fd.png"
            />
          </div>
          <div class="hr">
            <span class="hr-name">陶文婷</span>
            <span class="hr-company">厂商·HR</span>
          </div>
          <div class="hr-link">
            <van-icon name="arrow" color="#989ea3"/>
          </div>
        </div>
      </section>
      <section class="job-details-container">
        <div class="job-header">
          <h1>岗位详情</h1>
          <ul class="job-ul">
            <li class="job-tag">手游开发</li>
            <li class="job-tag">手游开发</li>
            <li class="job-tag">手游开发试一下哈哈</li>
          </ul>
        </div>
        <div class="job-duties">
          <h2 >岗位职责：</h2>
          <ul>
            <li class="job-li">1.使用c#进行客户端开发我是来柿子树哈哈哈</li>
            <li class="job-li">1.使用c#进行客户端开发</li>
            <li class="job-li">1.使用c#进行客户端开发</li>
            <li class="job-li">1.使用c#进行客户端开发</li>
            <li class="job-li">1.使用c#进行客户端开发</li>
            <li class="job-li">1.使用c#进行客户端开发</li>
          </ul>
        </div>
        <div class="job-requirements">
          <h2>任职要求：</h2>
          <ul>
            <li class="job-li">1.2年以上开发经验</li>
            <li class="job-li">1.2年以上开发经验</li>
            <li class="job-li">1.2年以上开发经验</li>
            <li class="job-li">1.2年以上开发经验</li>
            <li class="job-li">1.2年以上开发经验</li>
            <li class="job-li">1.2年以上开发经验</li>
            <li class="job-li">1.2年以上开发经验</li>
          </ul>
        </div>
      </section>
      <router-link to='/jobDetails/companyDetails'>
        <section class="company-container">
        <div class="company-img">
          <van-image
            width="2rem"
            height="2rem"
            fit="cover"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
        <div class="company-info">
          <h3>广州河马游戏科技有限公司</h3>
          <div class="company">
            <span>A轮·</span>
            <span>100-499人·</span>
            <span>游戏</span>
          </div>
        </div>
        <div class="company-link">
          <van-icon name="arrow" color="#989ea3"/>
        </div>
      </section>
      </router-link>
      <section class="bottom-container">
        <div class="button-container">
          <div class="text-div">
            <span class="text">立即沟通</span>
          </div>
        </div>
      </section>
    </section>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {Icon, Toast, NavBar, Image} from 'vant';
export default {
  name: 'JobDetails',

  data() {
    return {
      isCollected: false,
    };
  },

  mounted() {
    
  },

  methods: {
    collection(){
      this.isCollected = !this.isCollected;
      Toast.success('成功收藏')
    },
    uncollection(){
      this.isCollected = !this.isCollected;
      Toast.fail('取消收藏');
    }
  },

  components: {
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [NavBar.name]: NavBar,
    [Image.name]: Image,
  }
};
</script>

<style lang="less" scoped>
  @import '../../style/mixin.less';

  .job-container {
    background-color: #fff;
    overflow: auto
  }

  .navbar-top-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: #fff;
    /deep/ .van-nav-bar__arrow{
      font-size: 1.3rem;
    }
    /deep/ .van-nav-bar__right {
      font-size: 1.1rem;
    }
    /deep/ .van-nav-bar__left {
      padding: 0 0.1rem;
    }
  }
  .header-container {
    display: flex;
    flex-direction: column;
    margin-top: 1.7rem;
    .header-info {
      display: flex;
      position: relative;
      h2 {
        .sc(1.2rem, #060101);
        font-weight: 600;
        text-indent: 0.5rem;
      }
      span {
        position: absolute;
        right: 1rem;
        bottom: 0;
        .sc(0.9rem, #1c7396);
      }
    }
    .header-ask {
      display: flex;
      padding: 0.4rem 0;
      .sc(0.8rem, #666);
      border-bottom: solid 1px #e9e4e4;
      div {
        margin: 0 0.4rem;
      }
    }
    .header-hr-info{
      display: flex;
      padding: 0.3rem 0;
      position: relative;
      .hr-img {
        margin-left: 0.4rem;
      }
      .hr{
        display: flex;
        flex-direction: column;
        text-indent: 0.5rem;
        position: absolute;
        left: 2.6rem;
        .hr-name{
          .sc(0.8rem, #060606);
          font-weight: 600;
          padding: 0.1rem 0 0.2rem 0;
        }
        .hr-company{
          .sc(0.7rem, #333)
        }
      }
      .hr-link {
        position: absolute;
        right: 1rem;
        top: 1rem;
      }
    }
  }  
  .job-details-container{
    border-top: solid 1px #e9e4e4;
    .job-header {
      margin-top: 0.7rem;
      h1{
        .sc(0.7rem, #060101);
        font-weight: 600;
        text-indent: 0.5rem;
      }
      .job-ul {
        display: flex;
        flex-wrap: wrap;
        margin-top: 0.3rem;
        .job-tag {
          background-color: #eef2f4;
          padding: 0.2rem;
          margin: 0.2rem;
          border-radius: 0.2rem;
          text-align: center;
          .sc(0.65rem, #7f7d7d)
        }
      }
    }
    .job-duties {
      margin: 0.5rem 0 0 0.4rem;
      h2 {
        .sc(0.7rem, #333);
      }
      ul {
        display: flex;
        flex-direction: column;
        .sc(0.65rem, #7f7d7d)
      }
      .job-li {
        margin-top: 0.5rem;
      }
    }
    .job-requirements {
      margin: 1rem 0 0 0.4rem;
      h2 {
        .sc(0.7rem, #333);
      }
      ul {
        display: flex;
        flex-direction: column;
        .sc(0.65rem, #7f7d7d)
      }
      .job-li {
        margin-top: 0.5rem;
      }
    }
  }
  .bottom-container {
    position: fixed;
    bottom: 0;
    .wh(100%, 2.1rem);
    background-color: #fff;
    border-top: solid 1px #dfdfdf;
    .button-container{
      display: flex;
      justify-content: center; 
      align-items: center;
      height: 100%;
      .text-div {
        background-color: #22b8b3;
        .wh(11rem, 1.5rem);
        border-radius: 0.5rem;
        display: flex;
        align-items: center; 
        justify-content: center; 
        .text {
          .sc(0.7rem, #fff)
        }
      }
    }
  }
  .company-container {
    display: flex;
    position: relative;
    margin: 1rem 0 2rem 0;
    .company-img {
      margin-left: 0.5rem;
      /deep/ .van-image__img {
        border-radius: 0.3rem;
      }
    }
    .company-info {
      display: flex;
      margin-left: 0.7rem;
      flex-direction: column;
      h3 {
       .sc(0.6rem, #051b1a)
      }
      .company {
        display: flex;
        .sc(0.5rem, #797d7d);
        margin-top: 0.2rem;
      }
    }
    .company-link {
      position: absolute;
      right: 1rem;
    }
  }
</style>