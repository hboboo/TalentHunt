<template>
  <div class="resume-details-container" >
    <div class="top-bar">
      <van-icon name="arrow-left" color="#1989fa" @click="goBack" />
      <span class="user-name">对方的简历</span>
    </div>
    <van-skeleton title avatar :row="5" :loading="loading">
      <section class="basic-info-container" v-if="user">
      <div class="head-portrait-container">
        <span>头像：</span>
        <van-image class="portrait" round width="1.5rem" height="1.5rem" :src="baseImageUrl + user.userLogo"  />
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
      <section class="resume-info-container" v-if="user">
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
    </van-skeleton> 
  </div>
</template>

<script>
import { Icon, Image as VanImage, Skeleton, Dialog } from "vant";
import {mapState} from 'vuex'
export default {
  name: "ResumeDetails",

  data() {
    return {
      userId: null, //自己的id
      otherUserId: null, //要查看对方的id
      user: null, //数据库返回的用户简历信息
      loading: true, //骨架显示
    };
  },
  computed: {
    ...mapState(["baseImageUrl"]),
  },
  mounted() {},

  created() {
    this.userId = localStorage.getItem("userId");
    this.otherUserId = this.$route.params.sender;

    console.log(this.otherUserId);
    console.log(this.userId);

    this.getUserResume();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
    //获取对方简历
    getUserResume() {
      this.$http
        .post("/chat/getUserInfo", { userId: this.userId, otherUserId: this.otherUserId })
        .then((response) => {
          this.user = response.data.otherUser;
          this.loading = false;
          console.log(this.user);
        })
        .catch((error) => {
          Dialog.alert({
            message: "对方未对你投递简历",
          }).then(() => {
            this.goBack()
          });
        });
    },
  },
  components: {
    [Icon.name]: Icon,
    [VanImage.name]: VanImage,
    [Skeleton.name]: Skeleton,
    [Dialog.name]: Dialog,
  },
};
</script>
<style lang="less" scoped>
@import "../../style/mixin.less";

.resume-details-container {
  padding-bottom: 0.5rem;
}
.top-bar {
  height: 2rem;
  background-color: #eaeaea;
  display: flex;
  align-items: center;
  .user-name {
    margin-left: 3.3rem;
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
/deep/ .van-skeleton__title,
.van-skeleton__row,
.van-skeleton__avatar {
  background-color: #c8ceda;
}
</style>
