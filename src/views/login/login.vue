<template>
  <div class="login-container">
    <section class="log-container">
      <h1>talentHunt</h1>
    </section>
    <section class="form-container">
      <form action="">
        <div class="user-name">
          <van-icon name="envelop-o" />
          <input type="text" placeholder="用户名/首次登录将此号码注册" required class="input-type">
        </div>
        <div class="user-password">
          <van-icon name="lock" color="#4e5b60"/>
          <input type="password" placeholder="密码" required class="input-type">
        </div>
        <div class="user-type">
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="1" icon-size="0.9rem">招聘者</van-radio>
            <van-radio name="2" icon-size="0.9rem">应聘者</van-radio>
          </van-radio-group>
        </div>
        <div class="submit">
          <button type="submit">登录</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import {Form, Field, RadioGroup, Radio, Icon} from 'vant'
export default {
  name: 'Login',

  data() {
    return {
      radio: 1
    };
  },

  mounted() {
    
  },

  methods: {
    
  },

  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Icon.name]: Icon,
  }
};
</script>

<style lang="less" scoped>
  @import '../../style/mixin.less';

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
    /* 设置字体颜色 */
    color: #888;
    /* 设置字体大小 */
    font-size: 14px; /* 根据需要调整大小 */
    }
    .input-type {
      margin-left: 0.5rem;
      border-bottom: solid 1px #fff;
      background: transparent;
    }
    .user-password {
      margin-top: 1.2rem;
    }
    .user-type {
      margin-top: 1.5rem;
      margin-left: 1.7rem;
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
      margin-top: 2.1rem;
      margin-left: 4.3rem;
      button {
        background-color: #1a7cb5;
        color: white;
        padding: 0.3rem 0.8rem; 
        border-radius: 0.7rem;
      }
    }
  }
</style>