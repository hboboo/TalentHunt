<template>
  <div class="chatList-container">
    <section class="chatList-top">
      <van-icon name="arrow-left" color="#1989fa"  @click="goBack"/>
      <span>互动</span>
      <h2>聊天</h2>
    </section>
    <section class="chat-container">
      <ul class="chat-ul">
        <li class="chat-li" @click="toDetails" v-for="(sender, index) in Object.keys(senderMessages)" :key="index">
          <div class="chat-img">
            <van-image width="2rem" height="2rem" fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
            <van-badge :content="senderMessages[sender].messageCount" />
          </div>
          <div class="info">
            <div class="info-top">
              <h4 class="name">发送人名字</h4>
              <span class="time">{{ senderMessages[sender].latestMessage.time | formatTime }}</span>
            </div>
            <span class="text">{{ senderMessages[sender].latestMessage.content }}</span>
          </div>
        </li>
      </ul>
    </section>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { Icon, Image as VanImage, Badge } from "vant";
import {mapState} from 'vuex'
export default {
  name: "ChatList",

  data() {
    return {
      messages: [], // 存储返回的消息数据的数组
      senderMessages: {}, // 存储每个发送者的最新消息和消息数量
    };
  },

  mounted() {
    this.fetchMessages(); // 在组件挂载时调用方法
  },

  computed: {
    ...mapState(['userId'])
  },

  methods: {
    toDetails() {
      this.$router.push("/chatList/chatListDetails");
    },

    fetchMessages() {
      this.$http
        .get("/chat", {
          params: {
            receiver: this.userId,
          },
        })
        .then((response) => {
          // 请求成功处理返回的消息数据
          this.messages = response.data;
          this.processMessages();
        })
        .catch((error) => {
          // 处理错误
          console.error("Error fetching messages:", error);
        });
    },

    processMessages() {
      // 遍历消息，处理每个发送者的最新消息和消息数量
      this.messages.forEach((message) => {
        const senderId = message.sender;
        if (!this.senderMessages[senderId]) {
          // 如果发送者不存在于 senderMessages 中，添加一个新的条目
          this.$set(this.senderMessages, senderId, {
            latestMessage: message,
            messageCount: 1,
          });
        } else {
          // 如果发送者已存在，更新最新消息和消息数量
          this.$set(this.senderMessages[senderId], "latestMessage", message);
          this.$set(this.senderMessages[senderId], "messageCount", this.senderMessages[senderId].messageCount + 1);
        }
      });
    },

    goBack() {
      this.$router.push('/homePage');
    }
  },
  filters: {
    formatTime(timeString) {
      const time = new Date(timeString);
      const hours = time.getHours().toString().padStart(2, "0"); // 使用 padStart 补足两位
      const minutes = time.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },
  },
  components: {
    [Icon.name]: Icon,
    [VanImage.name]: VanImage,
    [Badge.name]: Badge,
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.chatList-top {
  position: relative;
  span {
    position: absolute;
    right: 7.7rem;
    .sc(0.8rem, #0989ff);
    font-weight: 700;
  }
  h2 {
    border-bottom: solid 1px #dddbdb;
    .sc(1.1rem, #000);
    font-weight: 900;
    padding-left: 0.2rem;
    margin-top: 0.2rem;
  }
}
.chat-container {
  padding: 0.5rem 0.2rem 0 0.2rem;
  .chat-ul {
    display: flex;
    flex-direction: column;
  }
  .chat-li {
    display: flex;
    margin: 0.2rem;
    .chat-img {
      position: relative;
      padding-top: 0.2rem;
      /deep/ .van-image__img {
        border-radius: 0.3rem;
      }
      /deep/ .van-badge {
        position: absolute;
        top: 0.1rem;
        left: 1.6rem;
      }
    }
    .info {
      margin-left: 0.5rem;
      width: 100%;
      border-bottom: solid 1px #dddbdb;

      .info-top {
        display: flex;
        position: relative;
        .name {
          .sc(0.8rem, #000);
        }
        .time {
          position: absolute;
          right: 0.2rem;
          .sc(0.5rem, #666);
        }
      }
      .text {
        .sc(0.8rem, #9d9c9c);
      }
    }
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease; /* 设置过渡的持续时间和缓动函数 */
}
.slide-enter, .slide-leave-to /* .slide-leave-active for <2.1.8 */ {
  transform: translateX(100%); /* 设置进场时的初始位置和出场时的最终位置 */
}
</style>
