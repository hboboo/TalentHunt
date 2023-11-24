<template>
  <div class="collect-container">
    <section class="collect-top-container">
      <van-icon name="arrow-left" color="#1989fa" @click="goBack"/>
      <span>职位收藏</span>
      <h3>你的收藏：</h3>
    </section>
    <section class="empty-contaienr" v-if="jobList.length === 0">
      <div class="empty-div">
        <van-empty description="暂无内容" />
      </div>
    </section>
    <section class="collect-list-container" v-else>
      <company-list :list="jobList"></company-list>
    </section>
  </div>
</template>

<script>
import { Icon, Empty } from "vant";
import companyList from "../../components/common/companyList.vue";
export default {
  name: "TalentHuntCollect",

  data() {
    return {
      jobList: [],
    };
  },

  mounted() {
    this.getCollect()
  },

  methods: {
    getCollect() {
      const userId = localStorage.getItem("userId");

      // 发起请求获取用户的 collectId 数组
      this.$http
        .post("/user/userId", { userId })
        .then((res) => {
          const collectIdArray = res.data.collectId;

          // 遍历 collectId 数组，逐个发起请求获取工作信息
          const promises = collectIdArray.map((jobId) => this.$http.post(`/job`, { jobId }));

          // 等待所有请求完成
          return Promise.all(promises);
        })
        .then((jobDetailsArray) => {
          // jobDetailsArray 包含了所有工作的详细信息
          this.jobList = jobDetailsArray.map((response) => response.data);

          // 在这里可以进一步处理获取到的工作信息，例如更新视图等操作
        })
        .catch((error) => {
          console.error("获取收藏工作列表失败", error);
        });
    },

    goBack() {
      this.$router.push("/homePage");
    },
  },

  components: {
    [Icon.name]: Icon,
    [Empty.name]: Empty,
    companyList,
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.collect-top-container {
  position: relative;
  span {
    position: absolute;
    .sc(0.8rem, #000);
    font-weight: 600;
    right: 43%;
  }
  h3 {
    .sc(0.6rem,#000);
    margin: 0.3rem 0 0.5rem 0.2rem;
  }
}
.empty-div {
  /deep/.van-empty__image {
    .wh(100%, 35%);
  }
  /deep/.van-empty__description {
    font-size: 1rem;
  }
}
</style>
