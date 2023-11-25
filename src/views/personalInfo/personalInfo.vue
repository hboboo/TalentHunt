<template>
  <div class="personalInfo-container" v-if="user">
    <section class="personalInfo-top-container">
      <van-icon name="arrow-left" color="#1989fa" @click="goBack" />
      <span>个人资料</span>
      <van-icon name="records-o" class="compile" @click="showChildComponent" />
    </section>
    <section class="basic-info-container">
      <div class="head-portrait-container">
        <span>头像：</span>
        <van-image class="portrait" round width="1.5rem" height="1.5rem" :src="baseImageUrl + user.userLogo" />
      </div>
      <div class="name">
        <span>姓名：</span>
        <span>{{user.username}}</span>
      </div>
      <div class="age">
        <span>年龄：</span>
        <span>{{user.age}}</span>
      </div>
      <div class="gender">
        <span>性别：</span>
        <span>{{user.gender}}</span>
      </div>
    </section>
    <section class="resume-info-container">
      <div class="expectation">
        <span>求职期望：</span>
        <span>{{user.expectation}}</span>
      </div>
      <div class="advantage">
        <span>个人优势：</span>
        <p>{{user.advantage}}</p>
      </div>
      <div class="work-experience">
        <span>工作经历：</span>
        <p>{{user.work}}</p>
      </div>
      <div class="project-experience">
        <span>项目经历：</span>
        <p>{{user.project}}</p>
      </div>
      <div class="education-experience">
        <span>教育经历：</span>
        <p>{{user.school}}</p>
      </div>
    </section>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { Icon, Image as VanImage } from "vant";
import {mapState} from 'vuex'
export default {
  name: "PersonalInfo",

  data() {
    return {
      user: null,
    };
  },

  computed: {
    ...mapState(["baseImageUrl"]),
  },

  mounted() {
    this.getUserInfo();
  },

  methods: {
    showChildComponent() {
      this.$router.push("/personalInfo/compileInfo");
    },

    getUserInfo() {
      const userId = localStorage.getItem("userId"); //读取当前用户id

      // 发送请求获取用户信息
      this.$http
        .post("/user/userInfo", { userId })
        .then((response) => {
            this.user = response.data.user;
        })
        .catch((error) => {
          console.error("请求失败", error.message);
        });
    },

    goBack() {
      this.$router.push("/homePage");
    }
  },
  components: {
    [Icon.name]: Icon,
    [VanImage.name]: VanImage,
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.personalInfo-top-container {
  position: relative;
  span {
    position: absolute;
    .sc(0.8rem, #000);
    font-weight: 600;
    right: 43%;
  }
  .compile {
    position: absolute;
    right: 5%;
    top: 8.7%;
  }
}

.basic-info-container {
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  border-radius: 0.2rem;
  background-color: #fff;
  span {
    .sc(0.6rem,#000);
    padding-right: 1.9rem;
    padding-left: 0.2rem;
  }
  .head-portrait-container {
    position: relative;
    padding: 0.3rem;
    border-bottom: solid 1px #d8d8d8;
    margin: 0.2rem;
    .portrait {
      .ct;
    }
  }
  .name {
    padding: 0.3rem;
    border-bottom: solid 1px #d8d8d8;
    margin: 0.2rem;
  }
  .age {
    padding: 0.3rem;
    border-bottom: solid 1px #d8d8d8;
    margin: 0.2rem;
  }
  .gender {
    padding: 0.3rem;
    border-bottom: solid 1px #d8d8d8;
    margin: 0.2rem;
  }
}
.resume-info-container {
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  border-radius: 0.2rem;
  background-color: #fff;
  span {
    .sc(0.6rem,#000);
    padding-right: 0.9rem;
    padding-left: 0.2rem;
  }
  p {
    .sc(0.6rem,#000);
    text-indent: 0.9rem;
    margin-top: 0.2rem;
  }
  div {
    padding: 0.3rem;
    border-bottom: solid 1px #d8d8d8;
    margin: 0.2rem;
  }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
