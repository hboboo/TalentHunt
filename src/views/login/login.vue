<template>
  <div class="login-container">
    <section class="top-container">
      <div class="top-nav">
        <h4 @click="goRegister">去注册</h4>
      </div>
    </section>
    <section class="welcome-container">
      <div class="welcome-banner">
        <p>你好，</p>
        <p>欢迎来到TalentHunt！</p>
      </div>
    </section>
    <section class="form-contaienr">
      <div class="form">
        <form @submit.prevent="submitForm">
          <div class="user-name">
            <van-icon name="envelop-o" />
            <input type="text" placeholder="用户名" required class="input-type" v-model="account" />
          </div>
          <div class="user-password">
            <van-icon name="lock" color="#4e5b60" />
            <input type="password" placeholder="密码" required class="input-type" v-model="password" />
          </div>
          <div class="submit">
            <button type="submit">登录</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { Icon, Dialog } from "vant";
export default {
  name: "Login",

  data() {
    return {
      account: "",
      password: "",
    };
  },

  mounted() {},

  methods: {
    //跳转注册页面
    goRegister() {
      this.$router.push("/register");
    },

    //登录
    submitForm() {
      this.$http
        .post("/user/login", {
          account: this.account,
          password: this.password,
        })
        .then((res) => {
          if (res.data.message === "登录成功") {
            // 登录成功后调用Vuex的action更新状态
            this.$store.dispatch("login", {
              isAuthenticated: true,
              token: res.data.token,
              role: res.data.role,
              userId: res.data.userId,
            });
            // 跳转到首页或其他需要跳转的页面
            this.$router.push("/home");
          } else {
            console.error("登录失败", res.data.message);
          }
        })
        .catch((error) => {
          console.error("请求失败", error.message);
          if (error.response && error.response.status === 401 && error.response.data.message === "用户未注册") {
            Dialog.alert({
              message: "该用户未注册",
            });
          } else if (error.response.data.message === "密码错误") {
            Dialog.alert({
              message: "密码错误，请重新输入",
            });
          }
        });
    },
  },

  components: {
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.login-container {
  position: fixed;
  top: 0;
  left: 0;
  .wh(100%, 100%);
  background-color: #fff;
}
.top-container {
  .wh(100%, 1.7rem);
  .top-nav {
    position: relative;
    h4 {
      position: absolute;
      top: 0.2rem;
      right: 0.6rem;
      .sc(0.8rem, #194ab3);
      font-weight: 600;
    }
  }
}
.welcome-banner {
  padding: 1rem 0.8rem;
  p {
    margin-bottom: 0.3rem;
    .sc(1rem, #000);
    font-weight: 900;
  }
}
.form {
  padding: 1rem 0.8rem;
  input::placeholder {
    font-size: 0.6rem;
  }
  .user-name {
    margin-bottom: 0.8rem;
    .input-type {
      margin-left: 0.6rem;
      border-bottom: solid 1px #999;
    }
  }
  .user-password {
    margin-bottom: 2rem;
    .input-type {
      margin-left: 0.6rem;
      border-bottom: solid 1px #999;
    }
  }
  .submit {
    button {
      .wh(13rem, 1.8rem);
      .sc(0.8rem, #fff);
      background-color: #f15f14;
      padding: 0.2rem 0;
    }
  }
}
</style>
