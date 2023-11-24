<template>
  <div>
    <section class="search-container">
      <section class="header-nav">
        <van-icon name="arrow-left" @click="refresh" />
        <van-search v-model="searchValue" placeholder="请输入搜索关键词" style="width: 12rem" />
        <button class="search-button" @click="getSearch">搜索</button>
      </section>
      <section class="search-history" v-if="searchhistoryarray.length > 0">
        <h1 class="search-history-head">搜索历史</h1>
        <div>
          <ul class="search-history-ul">
            <li v-for="(item, index) in searchhistoryarray" :key="index" @click="searchWithoutStorage(item)">
              {{ item }}
            </li>
          </ul>
        </div>
      </section>
      <section class="empty-container" v-if="searchhistoryarray.length === 0 && jobList.length === 0">
        <van-empty description="暂无搜索历史"  />
      </section>
      <section class="collect-list-container" >
        <company-list :list="jobList"></company-list>
      </section>
      <section class="tabbar-container">
        <van-tabbar route>
          <van-tabbar-item replace icon="home-o" to="/home">职位</van-tabbar-item>
          <van-tabbar-item replace icon="search" to="search" class="van-tabbar-item--active">搜索</van-tabbar-item>
          <van-tabbar-item replace icon="friends-o" to="/chatList">消息</van-tabbar-item>
          <van-tabbar-item replace icon="setting-o" to="/homePage">我的</van-tabbar-item>
        </van-tabbar>
      </section>
    </section>
  </div>
</template>

<script>
import { Icon, Search, Tabbar, TabbarItem, Empty } from "vant";
import companyList from "../../components/common/companyList.vue";
export default {
  name: "Search",

  data() {
    return {
      searchValue: "", //搜索内容的值
      jobList: [],
      searchhistoryarray: [], //搜索历史数组
    };
  },

  mounted() {
    this.searchhistoryarray = JSON.parse(localStorage.getItem("searchHistory")) || [];
  },

  methods: {
    getSearch() {
      // 检查搜索关键词是否为空
      if (!this.searchValue.trim()) {
        // 如果为空，不执行搜索
        return;
      }
      const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
      searchHistory.unshift(this.searchValue.trim());
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      this.$http
        .post("job/search", { keyword: this.searchValue })
        .then((response) => {
          // 处理后端返回的搜索结果
          this.jobList = response.data;
        })
        .catch((error) => {
          console.error("搜索失败", error);
        });
    },
    searchWithoutStorage(keyword) {
      // 执行搜索，但不添加到浏览器存储
      this.$http
        .post("job/search", { keyword })
        .then((response) => {
          // 处理后端返回的搜索结果
          this.jobList = response.data;
        })
        .catch((error) => {
          console.error("搜索失败", error);
        });
    },

    refresh() {
     window.location.reload();
    }
  },

  components: {
    [Icon.name]: Icon,
    [Search.name]: Search,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    companyList,
    [Empty.name]: Empty,
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.header-nav {
  display: flex;
  align-items: center;
  background-color: #fff;
  .search-input {
    margin-left: 1.5rem;
  }
  .search-button {
    background-color: #fff;
    margin-left: 0.7rem;
    .sc(0.8rem,#1c7396);
  }
}
.hot-searches-head {
  margin: 0.4rem 0.4rem;
  .sc(0.9rem, #999);
}
.search-history-head {
  margin: 0.4rem 0.4rem;
  .sc(0.9rem, #999);
}
.search-history-ul {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.3rem;
  li {
    background-color: #eef2f4;
    padding: 0.2rem;
    margin: 0.2rem;
    border-radius: 0.2rem;
    text-align: center;
    .sc(0.65rem, #7f7d7d);
  }
}
.empty-container {
  /deep/.van-empty__image {
    .wh(100%, 30%);
  }
  /deep/.van-empty__description {
    font-size: 1rem;
  }
}
</style>
