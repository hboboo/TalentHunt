<template>
  <div>
    <section class="list-container">
      <ul>
        <li class="list-container-li">
          <div class="header">
            <h3>前端开发</h3>
            <span>6-10k</span>
          </div>
          <div class="describe">
            <span>公司名字</span>
            <span>公司资本</span>
          </div>
          <div class="recruiter">
            <div class="recruiter-info">
              <van-icon name="user-circle-o" />
              <span>许诗柔-人事</span>
            </div>
            <span class="company-address">黄埔区 厂商</span>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import {Icon} from 'vant';
export default {
  name: "CompanyList",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  components: {
    [Icon.name]: Icon,
  }
};
</script>

<style lang="less" scoped>
  @import "../../style/mixin.less";
  .list-container {
    margin: 0.1rem 0.3rem;
    .list-container-li {
    margin-bottom: 0.3rem;
    border-radius: 0.48rem;
    background-color: #fff;
    }
    .header {
    display: flex;
    .wh(100%,1.8rem,);
    align-items: center;
    h3 {
      .sc(0.9rem, #0a0a0a);
      font-weight: 600;
      margin-left: 0.4rem;
    }
    span {
      .sc(0.9rem, #1c7396);
      font-weight: 600;
      margin-left: 8rem;
    }
    }
    .describe {
    display: flex;
    span {
      .sc(0.7rem, #666);
      margin-left: 0.4rem;
    }
    }
    .recruiter {
    display: flex;
    .wh(100%,1.8rem,);
    align-items: center;
    .recruiter-info {
      .sc(0.7rem, #333);
      margin-left: 0.4rem;
    }
    .company-address {
      margin-left: 6.2rem;
      .sc(0.6rem, #666);
      font-weight: 500;
    }
    }
  }
</style>
