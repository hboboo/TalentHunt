<template>
  <div class="chat-details-container">
    <section class="chat-top">
      <van-icon name="arrow-left" color="#1989fa" />
      <span>发送人的姓名</span>
    </section>
    <section class="chat-container">
      <div class="send-container">
        <ul class="send-ul">
          <li class="send-li">
            <div class="send-time">
              <h3>星期天 18:51</h3>
            </div>
            <div class="send-text">
              <van-image width="1.2rem" height="1.2rem" fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
              <p>
                策划师蛇口街道哈刷卡机快捷键哈山萨达跨境电商废弃物i哦日期哦为i来看下很残酷久啊还是看见啊山东科技啊阿萨抠脚大汉阿看见四大欠王i人是咋算科技活动
              </p>
            </div>
          </li>
          <li class="send-li">
            <div class="send-time">
              <h3>星期天 18:51</h3>
            </div>
            <div class="send-text">
              <van-image width="1.2rem" height="1.2rem" fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
              <p>
                策划师蛇口街道哈刷卡机快捷键哈山萨达跨境电商废弃物i哦日期哦为i来看下很残酷久啊还是看见啊山东科技啊阿萨抠脚大汉阿看见四大欠王i人是咋算科技活动
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="my-send-container">
        <ul class="send-ul">
          <li class="send-li">
            <div class="send-time">
              <h3>星期天 18:51</h3>
            </div>
            <div class="send-text">
              <van-image width="1.2rem" height="1.2rem" fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
              <p>
                策划师蛇口街道哈刷卡机快捷键哈山萨达跨境电商废弃物i哦日期哦为i来看下很残酷久啊还是看见啊山东科技啊阿萨抠脚大汉阿看见四大欠王i人是咋算科技活动
              </p>
            </div>
          </li>
          <li class="send-li">
            <div class="send-time">
              <h3>星期天 18:51</h3>
            </div>
            <div class="send-text">
              <van-image width="1.2rem" height="1.2rem" fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
              <p>
                策划师蛇口街道哈刷卡机快捷键哈山萨达跨境电商废弃物i哦日期哦为i来看下很残酷久啊还是看见啊山东科技啊阿萨抠脚大汉阿看见四大欠王i人是咋算科技活动
              </p>
            </div>
          </li>
          <li class="send-li">
            <div class="send-time">
              <h3>星期天 18:51</h3>
            </div>
            <div class="send-text">
              <van-image width="1.2rem" height="1.2rem" fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
              <p>
                策划师蛇口街道哈刷卡机快捷键哈山萨达跨境电商废弃物i哦日期哦为i来看下很残酷久啊还是看见啊山东科技啊阿萨抠脚大汉阿看见四大欠王i人是咋算科技活动
              </p>
            </div>
          </li>
          <li class="send-li">
            <div class="send-time">
              <h3>星期天 18:51</h3>
            </div>
            <div class="send-text">
              <van-image width="1.2rem" height="1.2rem" fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
              <p>
                策划师蛇口街道哈刷卡机快捷键哈山萨达跨境电商废弃物i哦日期哦为i来看下很残酷久啊还是看见啊山东科技啊阿萨抠脚大汉阿看见四大欠王i人是咋算科技活动
              </p>
            </div>
          </li>
          <li class="send-li">
            <div class="send-time">
              <h3>星期天 18:51</h3>
            </div>
            <div class="send-text">
              <van-image width="1.2rem" height="1.2rem" fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
              <p>
                策划师蛇口街道哈刷卡机快捷键哈山萨达跨境电商废弃物i哦日期哦为i来看下很残酷久啊还是看见啊山东科技啊阿萨抠脚大汉阿看见四大欠王i人是咋算科技活动
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="input-content-contaienr">
      <form class="form" @submit.prevent="sendMessage">
        <van-field
          v-model="content"
          rows="1"
          autosize
          type="textarea"
          placeholder="请输入留言"
        />
        <button class="send" type="submit">发送</button>
      </form>
    </section>
  </div>
</template>

<script>
import { Icon, Image as VanImage, Field } from "vant";
export default {
  name: "ChatListDetails",

  data() {
    return {
      content: '',
      sender: '655e13f0869c101e85f09d46',
      receiver: '655b14c1abe5460953b36362'
    };
  },

  mounted() {},

  methods: {
    sendMessage() {
      const currentTime = new Date().toISOString();
      const postData = {
        content: this.content,
        time: currentTime,
        sender: this.sender,
        receiver: this.receiver,
        isRead: false, // 标记为未读
      }
      this.$http.post('/chat', postData)
      .then(response => {
        console.log('Message sent successfully:', response.data);
      })
      .catch(error => {
        // 处理错误，如果有的话
        console.error('Error sending message:', error);
      });
    }
  },

  components: {
    [Icon.name]: Icon,
    [VanImage.name]: VanImage,
    [Field.name]: Field,
  },
};
</script>

<style lang="less" scoped>
@import "../../../style/mixin.less";

.chat-details-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  z-index: 999;
}
.chat-top {
  position: relative;
  span {
    position: absolute;
    right: 6.4rem;
    .sc(0.8rem, #666);
    font-weight: 700;
  }
}
.chat-container {
  overflow-y: auto;
  background-color: #f1f1f1;
  padding: 0.5rem 0.2rem 2rem 0.2rem;
  .wh(100%, 95%);
}
.send-ul {
  .send-li {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
  }
  .send-time {
    display: inline-block;
    .sc(0.4rem, #fff);
    background-color: #d7d7d7;
    padding: 0.1rem;
    margin-left: 34.5%;
    width: 3.2rem;
  }
  .send-text {
    margin-top: 0.2rem;
    display: flex;
    p {
      max-width: 80%;
      background-color: #fff;
      .sc(0.5rem, #000);
      padding: 0.3rem;
      margin-left: 0.3rem;
      word-wrap: break-word;
      align-self: flex-start;
      border-radius: 0rem 0.5rem 0.5rem 0.5rem;
    }
  }
}
.my-send-container {
  .send-li {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
  }
  .send-time {
    display: inline-block;
    .sc(0.4rem, #fff);
    background-color: #d7d7d7;
    padding: 0.1rem;
    margin-left: 34.5%;
    width: 3.2rem;
  }
  .send-text {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 0.2rem;
    display: flex;
    p {
      max-width: 80%;
      background-color: #fff;
      .sc(0.5rem, #000);
      padding: 0.3rem;
      margin-right: 0.3rem;
      word-wrap: break-word;
      align-self: flex-start;
      border-radius: 0.5rem 0rem 0.5rem 0.5rem;
    }
  }
}
.input-content-contaienr {
  z-index: 18;
  display: flex;
  position: fixed;
  padding: 0.5rem 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f1f1f1;
  .form {
    display: flex;
  }
  align-items: center;
  /deep/ .van-cell  {
    width: 12rem;
    margin-left: 0.5rem;
  }
  .send {
    margin-left: 0.9rem;
    padding: 0.3rem 0.5rem;
    .sc(0.5rem, #fff);
    background-color: #0376f1;
    border-radius: 0.3rem;
    align-self: flex-start;
  }
}
</style>
