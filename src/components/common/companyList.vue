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
                  :src="baseImageUrl + item.userLogo"
                  />
                </div>
                <span>{{item.username}}-{{item.recruiter}}</span>
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
import {mapState} from 'vuex'
export default {
  name: "CompanyList",
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['baseImageUrl'])
  },
  props: {
    list: {
      type: Array,
      require: true,
    },
  },
   watch: {
    // 监听list变化
    list: {
      handler(newList) {
        // 对每个item的userId发起请求获取头像信息
        newList.forEach(item => {
          this.fetchUserAvatar(item);
        });
      },
      deep: true,
    },
  },
  mounted() {
    if (this.$route.path === '/collect') {
      this.list.forEach(item => {
        this.fetchUserAvatar(item);
      });
    }
    if (this.$route.path === '/myIssue') {
      this.list.forEach(item => {
        this.fetchUserAvatar(item);
      });
    }
  },
  methods: {
    fetchUserAvatar(item) {
    this.$http.post('/user/userId', { userId: item.userId })
      .then(response => {
        const userData = response.data;

        // 在item中保存头像信息
        this.$set(item, 'userLogo', userData.userLogo);
        this.$set(item, 'username', userData.username);
      })
      .catch(error => {
        console.error('获取用户头像失败', error);
      });
  },
  },

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
  padding-bottom: 2rem;
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
