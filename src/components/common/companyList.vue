<template>
  <div>
    <section class="list-container">
      <ul>
        <li class="list-container-li" v-for="item in list" :key="item._id">
          <div class="header">
            <h3>{{item.title}}</h3>
            <span>{{item.salary}}</span>
          </div>
          <div class="describe">
            <span>{{item.company_name}}</span>
            <span>{{item.company_capital}}</span>
          </div>
          <div class="recruiter">
            <div class="recruiter-info">
              <van-icon name="user-circle-o" />
              <span>许诗柔-人事</span>
            </div>
            <span class="company-address">{{item.region}}-{{item.place}}</span>
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
    return {
    };
  },

  props: {
    list: {
      type: Array,
      require: true
    }
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
