<template>
  <div class="chat-details-container">
    <section class="chat-top">
      <van-icon name="arrow-left" color="#1989fa" @click="goBack" />
      <span v-if="otherUser.senderInfo" class="info-name">{{ otherUser.senderInfo.username }}</span>
      <van-icon name="newspaper-o" @click="show = true" class="curriculum-vitae" />
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    </section>
    <section class="chat-container">
      <div class="send-container">
        <ul class="send-ul">
          <li class="send-li" v-for="item in sortedMessages" :key="item._id">
            <div class="send-time">
              <h3>{{ formatDate(item.time) }}</h3>
            </div>
            <div class="send-text left" v-if="item.sender === otherUser.sender && otherUser.senderInfo">
              <van-image
                width="1.2rem"
                height="1.2rem"
                fit="cover"
                :src="baseImageUrl + otherUser.senderInfo.userLogo"
              />
              <p>{{ item.content }}</p>
            </div>
            <div class="send-text right" v-else-if="item.sender === currentUser.sender && currentUser.senderInfo">
              <van-image
                width="1.2rem"
                height="1.2rem"
                fit="cover"
                :src="baseImageUrl + currentUser.senderInfo.userLogo"
              />
              <p>{{ item.content }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="input-content-contaienr">
      <form class="form" @submit.prevent="sendMessage">
        <van-field v-model="content" rows="1" autosize type="textarea" placeholder="请输入留言" />
        <button class="send" type="submit">发送</button>
      </form>
    </section>
  </div>
</template>

<script>
import { Icon, Image as VanImage, Field, ActionSheet, Toast } from "vant";
import { mapState } from "vuex";
export default {
  name: "ChatListDetails",

  data() {
    return {
      content: "", //聊天内容
      currentUserMessage: [], //渲染自己发送的内容
      otherUserMessage: [], //渲染其他人发送的信息
      otherUser: {
        sender: null,
        receiver: null,
        senderInfo: null, // 保存发送者的用户信息
      },
      currentUser: {
        sender: null,
        receiver: null,
        senderInfo: null, // 保存发送者的用户信息
      },
      show: false,
      actions: [
        { name: "发送简历", index: 1 },
        { name: "对方简历", index: 2 },
      ],
    };
  },

  computed: {
    ...mapState(["baseImageUrl"]),
    getAllMessages() {
      // 合并两个数组
      const allMessages = [...this.otherUserMessage, ...this.currentUserMessage];

      // 根据消息时间排序
      allMessages.sort((a, b) => {
        return new Date(a.time) - new Date(b.time);
      });

      return allMessages;
    },

    // 新增计算属性，用于过滤左侧消息
    leftMessages() {
      return this.getAllMessages.filter((item) => item.sender === this.otherUser.sender);
    },

    // 新增计算属性，用于过滤右侧消息
    rightMessages() {
      return this.getAllMessages.filter((item) => item.sender === this.currentUser.sender);
    },

    // 合并并排序所有消息
    sortedMessages() {
      const allMessages = [...this.leftMessages, ...this.rightMessages];

      // 根据消息时间排序
      allMessages.sort((a, b) => {
        return new Date(a.time) - new Date(b.time);
      });

      return allMessages;
    },
  },

  created() {
    const userId = localStorage.getItem("userId"); //浏览器读取userId
    const otherUserId = this.$route.query.sender; //其他页面路由传递的其他用户id

    //其他人发送的信息
    this.otherUser.sender = otherUserId;
    this.otherUser.receiver = userId;
    //自己发的信息
    this.currentUser.sender = userId;
    this.currentUser.receiver = otherUserId;
    this.getOtherUserMessage();
    this.getcurrentUserMessage();
  },

  mounted() {},

  methods: {
    sendMessage() {
      const currentTime = new Date().toISOString();
      const postData = {
        content: this.content,
        time: currentTime,
        sender: this.currentUser.sender,
        receiver: this.currentUser.receiver,
        isRead: false, // 标记为未读
      };
      this.$http
        .post("/chat", postData)
        .then((response) => {
          this.currentUserMessage.push(postData);
          // console.log('Message sent successfully:', response.data);
          // 清空输入框内容
          this.content = "";
        })
        .catch((error) => {
          // 处理错误，如果有的话
          console.error("Error sending message:", error);
        });
    },

    //获取其他用户信息发过来的信息
    getOtherUserMessage() {
      const postData = {
        sender: this.otherUser.sender, //发送人的id
        receiver: this.otherUser.receiver, //接收人的id
      };
      this.$http
        .post("/chat/otherUser", postData)
        .then((res) => {
          this.otherUserMessage = res.data;
          // 创建新的数组并赋值给响应式数据
          this.otherUserMessage = [...res.data];
          // 获取发送者的用户信息
          this.getUserInfo(this.otherUser.sender, "otherUser");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //获取自己发的信息
    getcurrentUserMessage() {
      const postData = {
        sender: this.currentUser.sender, //发送人的id
        receiver: this.currentUser.receiver, //接收人的id
      };
      this.$http
        .post("/chat/otherUser", postData)
        .then((res) => {
          this.currentUserMessage = res.data;
          // 创建新的数组并赋值给响应式数据
          this.currentUserMessage = [...res.data];
          // 获取发送者的用户信息
          this.getUserInfo(this.currentUser.sender, "currentUser");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    goBack() {
      this.$router.go(-1);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },

    //获取用户信息
    getUserInfo(userId, targetMessages) {
      this.$http
        .post("/user/userId", { userId })
        .then((response) => {
          // 将用户信息保存在对应的数据数组中
          this[targetMessages].senderInfo = { ...response.data, isUserInfo: true };
        })
        .catch((error) => {
          console.error(`Error fetching user info for ${userId}:`, error);
        });
    },

    //获取时间
    formatDate(dateTime) {
      const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" };
      return new Date(dateTime).toLocaleString("zh-CN", options);
    },

    //简历弹框
    onSelect(item) {
      this.show = false;

      switch (item.index) {
        case 1:
          // 发送简历：向服务器发送请求，存储进数据库
          const userId = this.currentUser.receiver;
          const resumeId = this.currentUser.sender;
          this.$http
            .post("/chat/storeResume", { userId, resumeId })
            .then((response) => {
              // 在这里可以处理响应，例如显示成功消息
              Toast.success("投递成功");
            })
            .catch((error) => {
              // 在这里可以处理错误，例如显示错误消息
              console.error("发送简历时出错:", error);
              Toast.fail("勿重复投递");
            });

          break;
        case 2:
          // 对方简历：跳转页面
          const sender = this.otherUser.sender;
          this.$router.push({ name: "ResumeDetails", params: { sender } });
          break;
      }
    },
  },

  components: {
    [Icon.name]: Icon,
    [VanImage.name]: VanImage,
    [Field.name]: Field,
    [ActionSheet.name]: ActionSheet,
    [Toast.name]: Toast,
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
  .info-name {
    position: absolute;
    right: 7.8rem;
    .sc(0.8rem, #666);
    font-weight: 700;
  }
  .curriculum-vitae {
    left: 80%;
  }
}

.chat-container {
  overflow-y: auto;
  background-color: #f1f1f1;
  padding: 0.5rem 0.2rem 2rem 0.2rem;
  .wh(100%, 95%);
}
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
  width: 4.3rem;
  text-align: center;
  margin-left: 5.1rem;
}

.send-text {
  margin-top: 0.2rem;
  display: flex;

  p {
    max-width: 80%;
    background-color: #fff;
    .sc(0.5rem, #000);
    padding: 0.3rem;
    word-wrap: break-word;
    border-radius: 0.5rem;
  }
}

.send-text.left {
  flex-direction: row;
}

.send-text.right {
  flex-direction: row-reverse;
  text-align: right;
}

.send-text p {
  margin: 0;
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
  /deep/ .van-cell {
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
