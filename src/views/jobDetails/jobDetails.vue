<template>
  <div v-if="jobDetails">
    <section class="job-container">
      <section class="navbar-top-container">
        <van-nav-bar left-arrow @click-left="handleGoBack">
          <template #right>
            <div>
              <van-icon name="star-o" v-show="!isCollected" @click="collection" />
              <van-icon name="star" v-show="isCollected" @click="uncollection" color="#efad0b" />
            </div>
          </template>
        </van-nav-bar>
      </section>
      <section class="header-container">
        <div class="header-info">
          <h2>{{ jobDetails.jobname }}</h2>
          <span>{{ jobDetails.salary }}</span>
        </div>
        <div class="header-ask">
          <div>
            <van-icon name="map-marked" color="#aab2ba" />
            <span>{{ jobDetails.city }}·{{ jobDetails.district }}</span>
          </div>
          <div>
            <van-icon name="bag" color="#aab2ba" />
            <span>{{ jobDetails.job_experience }}</span>
          </div>
          <div>
            <van-icon name="award" color="#aab2ba" />
            <span>{{ jobDetails.job_education }}</span>
          </div>
        </div>
        <div class="header-hr-info">
          <div class="hr-img" v-if="userData && userData.userLogo">
            <van-image round width="2rem" height="2rem" :src="baseImageUrl + userData.userLogo" />
          </div>
          <div class="hr" v-if="userData && userData.username">
            <span class="hr-name">{{ userData.username }}</span>
            <span class="hr-company">{{ jobDetails.short_company_name }}·{{ jobDetails.recruiter }}</span>
          </div>
          <div class="hr-link">
            <van-icon name="arrow" color="#989ea3" />
          </div>
        </div>
      </section>
      <section class="job-details-container">
        <div class="job-header">
          <h1>岗位详情</h1>
          <ul class="job-ul">
            <li class="job-tag" v-for="item in jobDetails.job_tag" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="job-duties">
          <h2>岗位职责：</h2>
          <ul>
            <li class="job-li" v-for="item in jobDetails.job_responsibility" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="job-requirements">
          <h2>任职要求：</h2>
          <ul>
            <li class="job-li" v-for="item in jobDetails.job_require" :key="item">{{ item }}</li>
          </ul>
        </div>
      </section>
      <router-link :to="{ name: 'companyDetails' }">
        <section class="company-container">
          <div class="company-img">
            <van-image
              width="2rem"
              height="2rem"
              fit="cover"
              :src="'http://localhost:3000' + jobDetails.company.companyLogo"
            />
          </div>
          <div class="company-info">
            <h3>{{ jobDetails.company.companyName }}</h3>
            <div class="company">
              <span>{{ jobDetails.company.financing }}·</span>
              <span>{{ jobDetails.company.scale_company }}·</span>
              <span>{{ jobDetails.company.industry }}</span>
            </div>
          </div>
          <div class="company-link">
            <van-icon name="arrow" color="#989ea3" />
          </div>
        </section>
      </router-link>
      <section class="bottom-container">
        <div class="button-container">
          <div class="text-div">
            <span class="text" @click="communicate">立即沟通</span>
          </div>
        </div>
      </section>
      <transition mode="out-in" name="fade">
        <router-view :jobDetails="jobDetails"></router-view>
      </transition>
    </section>
  </div>
</template>

<script>
import { Icon, Toast, NavBar, Image } from "vant";
import { mapState } from "vuex";
export default {
  name: "JobDetails",

  data() {
    return {
      isCollected: false, // 收藏
      jobDetails: null, // 存储岗位详情的数据
      userData: null, //用户数据
      sendUserId: null, //hr的Id
      collectId: null, //当前工作id
      currentUser: null, //当前用户数据
    };
  },

  computed: {
    ...mapState(["baseImageUrl"]),
  },
  mounted() {},
  created() {
    this.fetchJobDetauls();
    this.getCollect();
  },
  methods: {
    //收藏
    collection() {
      const userId = localStorage.getItem("userId");
      const jobId = this.collectId; // 假设你有一个变量 jobId 存储工作的 id
      this.$http
        .post("user/addJobToCollection", { userId, jobId })
        .then((response) => {
          // 如果请求成功，更新收藏状态并显示成功消息
          if (response.status === 200) {
            this.isCollected = true;
            Toast.success("成功收藏");
          } else {
            // 处理请求失败的情况
            Toast.error("收藏失败");
          }
        })
        .catch((error) => {
          // 处理异常情况
          console.error("错误", error.message);
          Toast.error("收藏失败");
        });
    },
    //取消收藏
    uncollection() {
      const userId = localStorage.getItem("userId");
      const jobId = this.jobId;
      this.$http
        .post("user/removeJobFromCollection", { userId, jobId })
        .then((response) => {
          // 如果请求成功，更新收藏状态并显示取消收藏的消息
          if (response.status === 200) {
            this.isCollected = false;
            Toast.fail("取消收藏");
          } else {
            // 处理请求失败的情况
            Toast.error("取消收藏失败");
          }
        })
        .catch((error) => {
          // 处理异常情况
          console.error("错误", error.message);
          Toast.error("取消收藏失败");
        });
    },

    fetchJobDetauls() {
      // 在组件加载完成后，获取路由参数中的id
      const jobId = this.$route.params.id;
      this.collectId = jobId;
      this.$http
        .get(`/job/${jobId}`)
        .then((response) => {
          this.jobDetails = response.data;
          const userId = this.jobDetails.userId;
          this.sendUserId = userId; //存一下当前Id
          // 第二个请求使用userId
          return this.$http.post("/user/userId", { userId });
        })
        .then((response2) => {
          this.userData = response2.data;
        })
        .catch((error) => {
          console.error("获取岗位详情失败", error);
        });
    },

    handleGoBack() {
      // 返回上一级路由
      this.$router.go(-1);
    },

    //沟通
    communicate() {
      this.$router.push({
        path: "/chatList/chatListDetails",
        query: { sender: this.sendUserId },
      });
    },

    //获取用户收藏情况
    getCollect() {
      const userId = localStorage.getItem("userId");
      this.$http
        .post("/user/userId", { userId })
        .then((res) => {
          this.currentUser = res.data;
          this.isCollected = this.currentUser.collectId.includes(this.collectId);
        })
        .catch((error) => {
          console.error("获取用户详情失败", error);
        });
    },
  },

  components: {
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [NavBar.name]: NavBar,
    [Image.name]: Image,
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.job-container {
  background-color: #fff;
  overflow: auto;
  position: relative;
}

.navbar-top-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: #fff;
  /deep/ .van-nav-bar__arrow {
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
  .header-hr-info {
    display: flex;
    padding: 0.3rem 0;
    position: relative;
    .hr-img {
      margin-left: 0.4rem;
    }
    .hr {
      display: flex;
      flex-direction: column;
      text-indent: 0.5rem;
      position: absolute;
      left: 2.6rem;
      .hr-name {
        .sc(0.8rem, #060606);
        font-weight: 600;
        padding: 0.1rem 0 0.2rem 0;
      }
      .hr-company {
        .sc(0.7rem, #333);
      }
    }
    .hr-link {
      position: absolute;
      right: 1rem;
      top: 1rem;
    }
  }
}
.job-details-container {
  border-top: solid 1px #e9e4e4;
  .job-header {
    margin-top: 0.7rem;
    h1 {
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
        .sc(0.65rem, #7f7d7d);
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
      .sc(0.65rem, #7f7d7d);
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
      .sc(0.65rem, #7f7d7d);
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
  .button-container {
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
        .sc(0.7rem, #fff);
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
      .sc(0.6rem, #051b1a);
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
