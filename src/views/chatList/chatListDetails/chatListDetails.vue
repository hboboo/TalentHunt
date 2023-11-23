<template>
  <div class="chat-details-container">
    <section class="chat-top">
      <van-icon name="arrow-left" color="#1989fa" @click="goBack"/>
      <span>发送人的姓名</span>
    </section>
    <section class="chat-container">
      <div class="send-container">
        <ul class="send-ul">
          <li class="send-li" v-for="item in otherUserMessage" :key="item._id">
            <div class="send-time">
              <h3>星期天 18:51</h3>
            </div>
            <div class="send-text">
              <van-image width="1.2rem" height="1.2rem" fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
              <p>{{item.content}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="my-send-container">
        <ul class="send-ul">
          <li class="send-li" v-for="item in currentUserMessage" :key="item._id">
            <div class="send-time">
              <h3>星期天 18:51</h3>
            </div>
            <div class="send-text">
              <van-image width="1.2rem" height="1.2rem" fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
              <p>{{item.content}}</p>
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
      content: '', //聊天内容
      currentUserMessage: [],    //渲染自己发送的内容
      otherUserMessage: [],      //渲染其他人发送的信息
      otherUser: {
        sender: null,
        receiver: null
      },
      currentUser: {
        sender: null,
        receiver: null
      }
    };
  },

  
  created() {
    const userId = localStorage.getItem('userId');  //浏览器读取userId
    const otherUserId = this.$route.query.sender    //其他页面路由传递的其他用户id
    //其他人发送的信息
    this.otherUser.sender = otherUserId;
    this.otherUser.receiver = userId;
    //自己发的信息
    this.currentUser.sender = userId;
    this.currentUser.receiver = otherUserId
    this.getOtherUserMessage()
    this.getcurrentUserMessage()
  },

  mounted() {
    
  },

  methods: {
    sendMessage() {
      const currentTime = new Date().toISOString();
      const postData = {
        content: this.content,
        time: currentTime,
        sender: this.currentUser.sender,
        receiver: this.currentUser.receiver,
        isRead: false, // 标记为未读
      }
      this.$http.post('/chat', postData)
      .then(response => {
        this.currentUserMessage.push(postData);
        // console.log('Message sent successfully:', response.data);
        // 清空输入框内容
        this.content = "";
      })
      .catch(error => {
        // 处理错误，如果有的话
        console.error('Error sending message:', error);
      });
    },

    //获取其他用户信息发过来的信息
    getOtherUserMessage() {
      const postData = {
        sender: this.otherUser.sender,        //发送人的id
        receiver: this.otherUser.receiver     //接收人的id
      }
      this.$http.post('/chat/otherUser', postData)
      .then(res => {
        this.otherUserMessage = res.data
      })
      .catch(error => {
        console.log(error);
      })
    },

    //获取自己发的信息
    getcurrentUserMessage() {
      const postData = {
        sender: this.currentUser.sender,        //发送人的id
        receiver: this.currentUser.receiver     //接收人的id
      }
      this.$http.post('/chat/otherUser', postData)
      .then(res => {
        this.currentUserMessage = res.data
      })
      .catch(error => {
        console.log(error);
      })
    },

    goBack() {
      this.$router.go(-1)
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
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
