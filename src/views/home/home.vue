<template>
  <div>
    <section class="home-container">
      <van-sticky>
        <section class="navbar-container">
        <div class="header-nav">
          <div>
            <span :class="{ active_job_type: changeShow == 'career' }" @click="handleClick('career', true)">全职</span>
          </div>
          <div>
            <span :class="{ active_job_type: changeShow == 'internship' }" @click="handleClick('internship', false)">实习</span>
          </div>
          <div class="identity-container" @click="goHomePage">
            <span>{{identityText}}<van-icon name="arrow" /></span>
          </div>
          <van-icon name="search" class="search" color="#060639" @click="goSearch"/>
        </div>
        <div class="recommendation-title">
          <span :class="{ active_content_type: content == 'complete' }" @click="selectContent('complete')">全部</span>
          <span :class="{ active_content_type: content == 'popular' }" @click="selectContent('popular')">热门</span>
          <div class="button-container" @click="showSiev" :class="{ 'active': isButtonActive }">
            <span>筛选</span>
            <van-icon name="arrow-down"/>
          </div>
        </div>
      </section>
      </van-sticky>
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
          <van-field
            readonly
            clickable
            name="学历要求"
            :value="job_education"
            label="学历要求"
            placeholder="点击选择学历区间"
            @click="showPickerEducation = true"
          />
          <van-popup v-model="showPickerEducation" position="bottom" round>
            <van-picker
              show-toolbar
              :columns="educationArray"
              @confirm="onConfirmEducation"
              @cancel="showPickerEducation = false"
            />
          </van-popup>
          <van-field
            readonly
            clickable
            name="薪资"
            :value="salary"
            label="薪资"
            placeholder="点击选择薪资区间"
            @click="showPickerSalary = true"
          />
          <van-popup v-model="showPickerSalary" position="bottom" round>
            <van-picker
              show-toolbar
              :columns="salaryArray"
              @confirm="onConfirmSalary"
              @cancel="showPickerSalary = false"
            />
          </van-popup>
          <van-field
            readonly
            clickable
            name="工作经验"
            :value="job_experience"
            label="工作经验"
            placeholder="点击选择经验区间"
            @click="showPickerExperience = true"
          />
          <van-popup v-model="showPickerExperience" position="bottom" round>
            <van-picker
              show-toolbar
              :columns="experience"
              @confirm="onConfirmExperience"
              @cancel="showPickerExperience = false"
            />
          </van-popup>
          <div class="confirm-container">
            <span class="eliminate" @click="clearFilters">清除</span>
            <span class="confirm" @click="confirmFilters">确定</span>
          </div>
        </div>
      </transition>
    </section>
  </div>
</template>

<script>
import { Icon, Tabbar, TabbarItem, Swipe, SwipeItem, Field, Popup, Picker,Sticky } from "vant";
import companyList from "../../components/common/companyList.vue";
export default {
  name: "Home",

  data() {
    return {
      changeShow: "career", //默认选取全职
      content: "", //默认选取全部
      images: ["https://img01.yzcdn.cn/vant/apple-1.jpg", "https://img01.yzcdn.cn/vant/apple-2.jpg"],
      jobList: [], //渲染列表
      jobType: "", //储存第一次筛选的结果
      issiev: false,
      showPickerEducation: false, //是否显示学历选择器
      job_education: "", //学历
      educationArray: ["初中以下", "中专", "高中", "大专", "本科", "硕士", "博士"],
      job_experience: "", //工作经验
      showPickerExperience: false, //是否显示经验选择器
      experience: ["在校生", "应届生", "1年以内", "1-3年", "3-5年", "5-10年", "10年以上"],
      salary: "", //薪资
      showPickerSalary: false, //薪资选择器
      salaryArray: ["3k以下", "3-5k", "5-10k", "10-20k", "20k以上"], //薪资选择器数据
      isButtonActive: false,
      role: ''
    };
  },
  created() {
    this.getRecommendation(true);
    this.role = localStorage.getItem('role');
  },

  mounted() {},

  computed: {
    identityText() {
      return this.role === 'jobSeeker' ? '应聘版' : '招聘版';
    },
  },

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
      this.isButtonActive = !this.isButtonActive;
    },

    confirmFilters() {
      // 向后端发送带有选择的过滤器值的请求
      // 根据你的后端 API，修改端点和参数
      this.$http
        .post("/job/filtrate", {
          job_education: this.job_education,
          job_experience: this.job_experience,
          salary: this.salary,
        })
        .then((res) => {
          // 处理后端返回的数据，可能需要更新 jobList 或者其他数据
          this.jobList = res.data
          this.issiev = false
          this.$forceUpdate();
        })
        .catch((error) => {
          // 处理错误
          console.error("Error while fetching filtered data:", error);
        });
    },

    clearFilters() {
      // 重置所有选择的值为初始空字符串状态
      this.job_education = "";
      this.job_experience = "";
      this.salary = "";
    },

    //薪资选择器
    onConfirmSalary(value) {
      this.salary = value;
      this.showPickerSalary = false;
    },
    //学历选择器
    onConfirmEducation(value) {
      this.job_education = value;
      this.showPickerEducation = false;
    },
    //工作经验选择器
    onConfirmExperience(value) {
      this.job_experience = value;
      this.showPickerExperience = false;
    },

    goHomePage() {
      this.$router.push('/homePage')
    },
    goSearch() {
      this.$router.push('/search')
    }
  },

  components: {
    [Icon.name]: Icon,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    companyList,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Sticky.name]: Sticky,
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
    position: relative;
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
      padding-right: 0.3rem;
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
.identity-container {
  position: absolute;
  right: 2rem;
  span {
    .sc(0.5rem, #333);
    font-weight: 550;
    border: solid 1px #bfb8b8;
    border-radius: 0.2rem;
    padding: 0 0.2rem;
  }
}
.active {
  border: solid 1px #bfb8b8;
  border-radius: 0.2rem;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-out;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}
/deep/.van-sticky--fixed {
  background-color: #fff;
}

</style>
