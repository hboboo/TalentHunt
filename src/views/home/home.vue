<template>
  <div>
    <section class="home-container">
      <section class="navbar-container">
        <div class="header-nav">
          <div>
            <span :class="{ active_job_type: changeShow == 'career' }" @click="handleClick('career', true)">全职</span>
          </div>
          <div>
            <span :class="{ active_job_type: changeShow == 'internship' }" @click="handleClick('internship', false)"
              >实习</span
            >
          </div>
          <van-icon name="search" class="search" />
        </div>
        <div class="recommendation-title">
          <span :class="{ active_content_type: content == 'complete' }" @click="selectContent('complete')">全部</span>
          <span :class="{ active_content_type: content == 'popular' }" @click="selectContent('popular')">热门</span>
          <div class="button-container">
            <div>
              <button>{{ siev }}<van-icon name="arrow-down" @click="showSiev" /></button>
            </div>
          </div>
        </div>
      </section>
      <section class="swipe-container">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(item, index) in images" :key="index">
            <img :src="item" />
          </van-swipe-item>
        </van-swipe>
      </section>
      <company-list :list="jobList"></company-list>
      <section class="tabbar-container">
        <van-tabbar route>
          <van-tabbar-item replace icon="home-o" to="/home">职位</van-tabbar-item>
          <van-tabbar-item replace icon="search" to="search">搜索</van-tabbar-item>
          <van-tabbar-item replace icon="friends-o" to="/chatList">沟通</van-tabbar-item>
          <van-tabbar-item replace icon="setting-o" to="/homePage">我的</van-tabbar-item>
        </van-tabbar>
      </section>
      <transition name="slide">
        <div class="siev-container" v-if="issiev">
          <van-popover v-model="showPopover" trigger="click" :actions="actions" @select="onSelect">
            <template #reference>
              <van-button type="primary">浅色风格</van-button>
            </template>
          </van-popover>
          <div class="confirm-container">
            <span class="eliminate">清除</span>
            <span class="confirm">确定</span>
          </div>
        </div>
      </transition>
    </section>
  </div>
</template>

<script>
import { Icon, Tabbar, TabbarItem, Swipe, SwipeItem, Popover ,Button} from "vant";
import companyList from "../../components/common/companyList.vue";
export default {
  name: "Home",

  data() {
    return {
      changeShow: "career", //默认选取全职
      content: "", //默认选取全部
      siev: "筛选",
      images: ["https://img01.yzcdn.cn/vant/apple-1.jpg", "https://img01.yzcdn.cn/vant/apple-2.jpg"],
      jobList: [], //渲染列表
      jobType: "", //储存第一次筛选的结果
      issiev: false,
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }],
    };
  },
  created() {
    this.getRecommendation(true);
  },

  mounted() {},

  methods: {
    //显示样式的切换&&传递一个查询参数请求招聘信息
    handleClick(jobType, isFullTime) {
      this.jobType = jobType; // 更新一级筛选结果
      this.changeShow = jobType; // 更新 changeShow 的值
      this.getRecommendation(isFullTime); //传入是否全职参数
    },

    //请求招聘列表
    getRecommendation(isFullTime) {
      const isFullTimeParam = isFullTime ? "true" : "false";
      this.content = "complete";
      this.$http
        .get("/job", {
          params: {
            is_full_time: isFullTimeParam,
          },
        })
        .then((res) => {
          this.jobList = res.data;
        });
    },

    //选择热门or全部
    selectContent(contentType) {
      this.content = contentType; //更新样式
      switch (contentType) {
        case "complete":
          if (this.jobType === "career") {
            this.getRecommendation(true); // 传入全职参数
          } else {
            this.getRecommendation(false); // 传入实习参数
          }
          break;
        case "popular":
          const filteredJobList = this.jobList.filter((item) => item.hot === true);
          this.$set(this, "jobList", filteredJobList);
          break;
      }
    },

    showSiev() {
      this.issiev = !this.issiev;
    },

    onSelect(action) {
      console.log(action.text);
    },
  },

  components: {
    [Icon.name]: Icon,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    companyList,
    [Popover.name]: Popover,
    [Button.name]: Button,
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.home-container {
  position: relative;
}

.navbar-container {
  display: flex;
  flex-direction: column;
  .header-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 0.15rem;
    .wh(100%, 1.95rem);
    div {
      display: flex;
      margin-left: 0.5rem;
      height: 100%;
      align-items: center;
      font-size: 0.8rem;
      .active_job_type {
        font-weight: 800;
        font-size: 1rem;
        border-bottom: 3px solid brown;
      }
    }
    .search {
      margin-left: 10rem;
      color: blue;
    }
  }
  .recommendation-title {
    display: flex;
    height: 2.5rem;
    font-size: 0.7rem;
    align-items: center;
    border-bottom: 1px solid @bc;
    span {
      margin-left: 0.6rem;
    }
    .active_content_type {
      font-weight: 800;
    }
    .button-container {
      display: flex;
      margin-left: 6rem;
      align-items: center;
      .button-left {
        margin-right: 0.9rem;
      }
    }
  }
}
.swipe-container {
  img {
    .wh(100%, 100%);
    max-height: 5rem;
    padding: 0.2rem 0;
  }
}
.siev-container {
  position: fixed;
  top: 4.5rem;
  background-color: #fff;
  z-index: 20;
  .wh(100%, 80%);
  .confirm-container {
    display: flex;
    background-color: #fafafa;
    height: 2.3rem;
    margin-top: 0.3rem;
    align-items: center;
    font-size: 0.6rem;
    .eliminate {
      margin: 0 0.8rem 0 1rem;
      padding: 0.3rem 1.5rem;
      background-color: #e5e5e5;
      border-radius: 0.1rem;
    }
    .confirm {
      margin: 0 0.8rem 0 1rem;
      padding: 0.3rem 3.2rem;
      background-color: #1dd3da;
      border-radius: 0.1rem;
      color: #fff;
    }
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-out;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
