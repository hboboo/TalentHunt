<template>
  <div v-if="userInfoData">
    <section class="home-page-container">
      <section class="avatar-container">
        <div class="avatar">
          <van-image round width="3rem" height="3rem" :src="baseImageUrl + userInfoData.userLogo" class="avatar-img" />
          <h3>{{ userInfoData.username }}</h3>
        </div>
      </section>
      <section class="link-container">
        <div>
          <van-cell
            title="发布岗位"
            is-link
            size="large"
            v-if="userInfoData.role === 'recruiter'"
            @click="toIssueJob"
          />
          <van-cell
            title="我的发布"
            is-link
            size="large"
            v-if="userInfoData.role === 'recruiter'"
            @click="toMyIssue"
          />
          <van-cell title="我的收藏" is-link size="large" @click="toCollect" />
          <van-cell title="我的简历" is-link size="large" @click="toPersonalInfo"/>
          <van-cell title="关于软件" is-link size="large"  @click="show = true"/>
          <van-cell title="退出账号" is-link size="large" @click="exit" />
          <van-overlay :show="show" @click="show = false">
            <div class="wrapper" @click.stop>
              <div class="block">
                <span>此为毕设学习程序，建议您使用正规招聘平台进行简历投递</span>
              </div>
            </div>
          </van-overlay>
        </div>
      </section>
      <section class="tabbar-container">
        <van-tabbar route>
          <van-tabbar-item replace icon="home-o" to="/home">职位</van-tabbar-item>
          <van-tabbar-item replace icon="search" to="/search">搜索</van-tabbar-item>
          <van-tabbar-item replace icon="friends-o" to="/chatList">沟通</van-tabbar-item>
          <van-tabbar-item replace icon="setting-o" to="/homePage" class="van-tabbar-item--active">我的</van-tabbar-item>
        </van-tabbar>
      </section>
    </section>
  </div>
</template>

<script>
import { Image as VanImage, Cell, Tabbar, TabbarItem, Dialog, Overlay } from "vant";
import { mapState } from "vuex";
export default {
  name: "HomePage",

  data() {
    return {
      userInfoData: null,
      show: false
    };
  },

  computed: {
    ...mapState(["baseImageUrl"]),
  },

  mounted() {
    this.checkLoginStatus();
    this.getUserInfo();
  },

  methods: {
    checkLoginStatus() {
      const isAuthenticated = this.$store.getters.isAuthenticated;
      const storedToken = localStorage.getItem("token");

      if (storedToken && !isAuthenticated) {
        const storedRole = localStorage.getItem("role");
        const storedUserId = localStorage.getItem("userId");
        this.$store
          .dispatch("login", { isAuthenticated: true, token: storedToken, role: storedRole, userId: storedUserId })
          .then(() => {
            // 获取用户信息
            this.getUserInfo();
          })
          .catch(() => {
            Dialog.alert({
              title: "未识别到账号",
              message: "账号还没登陆快去登录吧~",
            });
            this.$router.push("/login");
          });
      } else if (!isAuthenticated) {
        Dialog.alert({
          title: "未识别到账号",
          message: "账号还没登陆快去登录吧~",
        }).then(() => {
          this.$router.push("/login");
        });
      }
    },

    exit() {
      Dialog.confirm({
        title: "退出账号",
        message: "确定要退出账号吗？",
      })
        .then(() => {
          localStorage.removeItem("searchHistory");
          this.$store.dispatch("logout");
          this.$router.push("/login");
        })
        .catch(() => {
          // 取消退出账号
        });
    },

    getUserInfo() {
      const token = this.$store.getters.token;

      this.$http
        .get("/user/info", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          this.userInfoData = response.data;
        })
        .catch((error) => {
          console.error("获取用户信息失败", error);
          this.handleAuthenticationError();
        });
    },

    handleAuthenticationError() {
      Dialog.alert({
        title: "身份验证过期",
        message: "请重新登录",
      }).then(() => {
        localStorage.removeItem("searchHistory");
        this.$store.dispatch("logout");
        this.$router.push("/login");
      });
    },

    toIssueJob() {
      this.$router.push("/issueJob");
    },
    toCollect() {
      this.$router.push("/collect");
    },
    toMyIssue() {
      this.$router.push("/myIssue");
    },
    toPersonalInfo() {
      this.$router.push("/personalInfo");
    }
  },
  components: {
    [VanImage.name]: VanImage,
    [Cell.name]: Cell,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Overlay.name]: Overlay,
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.avatar {
  .wh(100%, 11.4rem);
  background-color: cadetblue;
  position: relative;
  .avatar-img {
    .center;
  }
  h3 {
    position: absolute;
    top: 65%;
    left: 44.5%;
    .sc(0.7rem, #666);
  }
}
.wrapper {
  position: relative;
  .block {
    position: absolute;
    top: 8rem;
    left: 14.9%;
    background-color: #fff;
    .wh(11.5rem, 3.8rem);
    .sc(0.8rem,#000);
    padding: 0.5rem;
    border-radius: 0.3rem;
  }
}
</style>
