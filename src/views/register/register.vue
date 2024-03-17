<template>
  <div class="login-container">
    <section class="log-container">
      <h1>talentHunt</h1>
    </section>
    <section class="form-container">
      <form @submit.prevent="submitForm">
        <div class="user-name">
          <van-icon name="envelop-o" />
          <input type="text" placeholder="账号" required class="input-type" v-model="account" />
        </div>
        <div class="user-password">
          <van-icon name="lock" color="#4e5b60" />
          <input type="password" placeholder="密码" required class="input-type" v-model="password" />
        </div>
        <div class="hint">
          <h3>完善注册信息</h3>
        </div>
        <div class="user-type">
          <van-radio-group v-model="role" direction="horizontal">
            <van-radio name="recruiter" icon-size="0.9rem">招聘者</van-radio>
            <van-radio name="jobSeeker" icon-size="0.9rem">求职者</van-radio>
          </van-radio-group>
        </div>
        <div class="user-info">
          <div class="user-info-name">
            <h2>昵称</h2>
            <input type="text" placeholder="输入昵称" required v-model="username" class="name-type" />
          </div>
          <div class="user-info-logo">
            <h2>头像</h2>
            <van-uploader v-model="userLogo" multiple :max-count="1" ref="file" class="log" />
          </div>
        </div>
        <div class="submit">
          <button type="submit">注册</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { Form, Field, RadioGroup, Radio, Icon, Uploader, Dialog } from "vant";
export default {
  name: "Login",

  data() {
    return {
      account: "", //账号
      password: "", //密码
      role: "jobSeeker", //角色
      username: "", //姓名
      userLogo: [], //头像
    };
  },

  mounted() {},

  methods: {
    submitForm() {
      const formData = new FormData();

      formData.append("account", this.account);
      formData.append("password", this.password);
      formData.append("role", this.role);
      formData.append("username", this.username);

      // 添加图片数据
      if (this.userLogo.length > 0) {
        // 如果有选择图片，将图片文件添加到 FormData 中
        formData.append("userLogo", this.userLogo[0].file);
      }

      // 发送 POST 请求到后端
      this.$http
        .post("/user", formData)
        .then((res) => {
          if (res.data.message === "注册成功") {
            Dialog.alert({
              message: "恭喜您注册成功！",
            }).then(() => {
              // 注册成功后的跳转逻辑
              this.$router.push("/login");
            });
          } else {
            console.error("注册失败", res.data.message);
          }
        })
        .catch((error) => {
          console.error("请求失败", error.message);
        });
    },
  },

  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Icon.name]: Icon,
    [Uploader.name]: Uploader,
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
  background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
}
.log-container {
  position: absolute;
  top: 11.4%;
  h1 {
    color: #e4efe9;
    text-shadow: 2px 4px 4px rgba(4, 5, 6, 0.8);
    font-size: 2.3rem;
    margin-left: 1.6rem;
  }
}
.form-container {
  position: absolute;
  top: 31%;
  left: 10%;
  input::placeholder {
    color: #888;
    font-size: 14px;
  }
  .input-type {
    margin-left: 0.5rem;
    border-bottom: solid 1px #fff;
    background: transparent;
  }
  .user-password {
    margin-top: 1.2rem;
  }
  .hint {
    .sc(0.7rem, #0e7da3);
    margin-top: 0.6rem;
    font-weight: 600;
  }
  .user-type {
    margin-top: 0.9rem;
    margin-left: 1.4rem;
    .sc(0.9rem, #000);
    font-weight: 600;
    /deep/.van-radio__icon--round .van-icon {
      border: solid 1px #fff;
    }
    /deep/.van-radio--horizontal {
      margin-right: 1.9rem;
    }
  }
  .submit {
    margin-top: 0.7rem;
    margin-left: 4.3rem;
    button {
      background-color: #1a7cb5;
      color: white;
      padding: 0.3rem 0.8rem;
      border-radius: 0.7rem;
    }
  }
  .user-info {
    margin-top: 1rem;
    .name-type {
      margin-left: 2.2rem;
      width: 9.6rem;
      border-bottom: solid 1px #fff;
      background: transparent;
    }
    h2 {
      .sc(0.8rem, #666);
    }
    .user-info-logo {
      margin-top: 0.3rem;
      .log {
        margin-top: 0.5rem;
        margin-left: 2.1rem;
      }
    }
  }
}
</style>
