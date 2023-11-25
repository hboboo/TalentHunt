<template>
  <div class="issue-container">
    <section class="issue-top-container">
      <van-icon name="arrow-left" color="#1989fa" @click="goBack"/>
      <span>岗位信息</span>
      <h3>我发布的岗位：</h3>
    </section>
    <section class="empty-contaienr" v-if="jobList.length === 0">
      <div class="empty-div">
        <van-empty description="暂无内容" />
      </div>
    </section>
    <section class="issue-list-container" v-else>
      <company-list :list="jobList"></company-list>
    </section>
  </div>
</template>

<script>
import { Icon, Empty } from "vant";
import companyList from "../../components/common/companyList.vue";
export default {
  name: 'MyIssue',

  data() {
    return {
      jobList:[]
    };
  },

  mounted() {
    this.getMyIssue()
  },

  methods: {
    getMyIssue() {
      const userId = localStorage.getItem("userId");
      this.$http.post("/job/jobsByUserId", { userId })
        .then((res) => {
          // 在这里更新 jobList 的值
          this.jobList = res.data.jobs;
        })
        .catch((error) => {
          console.error('Error fetching my issued jobs:', error);
        });
    },
    
    goBack() {
      this.$router.push('/homePage');
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

.issue-top-container {
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