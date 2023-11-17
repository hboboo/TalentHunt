<template>
  <div>
    <section class="list-container">
      <ul>
        <router-link :to="{ name: 'jobDetails', params: { id: item._id }}"  v-for="item in list" :key="item._id">
          <li class="list-container-li">
            <div class="header">
              <h3 class="ellipsis">{{ item.jobname }}</h3>
              <span>{{ item.salary }}</span>
            </div>
            <div class="describe">
              <span>{{ item.short_company_name }}</span>
              <span v-if="item.company">{{ item.company.financing}}</span>
            </div>
            <div class="recruiter">
              <div class="recruiter-info">
                <div class="hr-img">
                  <van-image
                  round
                  width="0.8rem"
                  height="0.8rem"
                  src="https://img01.yzcdn.cn/vant/cat.jpeg"
                  />
                </div>
                <span>许诗柔-{{item.recruiter}}</span>
              </div>
              <span class="company-address">{{ item.city }}-{{ item.district }}</span>
            </div>
          </li>
        </router-link>
      </ul>
    </section>
  </div>
</template>

<script>
import { Icon, Image as VanImage } from "vant";
export default {
  name: "CompanyList",
  data() {
    return {};
  },

  props: {
    list: {
      type: Array,
      require: true,
    },
  },

  mounted() {},
  methods: {},
  components: {
    [Icon.name]: Icon,
    [VanImage.name]: VanImage
  },
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
    position: relative;
    .wh(100%,1.8rem,);
    align-items: center;
    h3 {
      .sc(0.9rem, #0a0a0a);
      font-weight: 600;
      margin-left: 0.4rem;
    }
    span {
      position: absolute;
      .sc(0.9rem, #1c7396);
      font-weight: 600;
      right: 1.5rem;
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
    position: relative;
    .wh(100%,1.8rem,);
    align-items: center;
    .recruiter-info {
      display: flex;
      .sc(0.7rem, #333);
      margin-left: 0.4rem;
      .hr-img {
        margin-top: 0.1rem;
      }
      span {
        padding-left: 0.2rem;
      }
    }
    .company-address {
      position: absolute;
      right: 1.5rem;
      .sc(0.6rem, #666);
      font-weight: 500;
    }
  }
}
</style>
