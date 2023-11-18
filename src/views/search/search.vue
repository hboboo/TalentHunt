<template>
  <div>
    <section class="search-container">
      <section class="header-nav">
        <van-icon name="arrow-left" />
        <van-search v-model="value" placeholder="请输入搜索关键词" style="width: 12rem"/>
        <button class="search-button" @click="test">搜索</button>
      </section>
      <section class="hot-searches-container">
        <h1 class="hot-searches-head">热门搜索</h1>
        <ul class="hot-tag-ul">
          <li>
            后端开发
          </li>
          <li>
            我试一下字数长度
          </li>
        </ul>
      </section>
      <section class="search-history">
        <h1 class="search-history-head">搜索历史</h1>
        <div v-if="searchHistory">
          <ul class="search-history-ul">
            <li>我试试<van-icon name="cross" style="margin-left: 10.5rem"/></li>
            <li>我试试<van-icon name="cross" style="margin-left: 10.5rem"/></li>
            <li>我试试<van-icon name="cross" style="margin-left: 10.5rem"/></li>
          </ul>
        </div>
        <div v-else>
          <h5 class="none-search-history">暂无搜索历史</h5>
        </div>
      </section>
      <section v-if="searchResults">
        <company-list></company-list>
        <company-list></company-list>
        <company-list></company-list>
        <company-list></company-list>
      </section>
      <section class="tabbar-container">
       <van-tabbar  route>
          <van-tabbar-item replace icon="home-o"  to="/home">职位</van-tabbar-item>
          <van-tabbar-item replace icon="search" to="/search">标签</van-tabbar-item>
          <van-tabbar-item replace icon="friends-o">标签</van-tabbar-item>
          <van-tabbar-item replace icon="setting-o" to="/homePage">我的</van-tabbar-item>
        </van-tabbar>
      </section>
    </section>
  </div>
</template>

<script>
import {Icon, Search, Tabbar,TabbarItem} from 'vant';
import companyList from '../../components/common/companyList.vue'
export default {
  name: 'Search',

  data() {
    return {
      value: '', //搜索内容的值
      searchResults : true,  //搜索结果
      searchHistory: true,  //搜索历史
    };
  },

  mounted() {
    
  },

  methods: {
    test(){
      //请求后打印导控制台
      this.$http.get('/job/find')
      .then((res) => {
        console.log(res.data);
      })
    }
  },

  components: {
    [Icon.name]: Icon,
    [Search.name]: Search,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    companyList,
  }
};
</script>

<style lang="less" scoped>
  @import '../../style/mixin.less';

  .header-nav{
    display: flex;
    align-items: center;
    background-color: #fff;
    .search-input{
      margin-left: 1.5rem;
    }
    .search-button{
      background-color: #fff;
      margin-left: 0.7rem;
      .sc(0.8rem,#1c7396)
    }
  }
  .hot-searches-head{
    margin: 0.4rem 0.4rem;
    .sc(0.9rem, #999);
  }
  .hot-tag-ul{
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    padding: .5rem;
    li{
      .sc(.6rem, #6d7885);
      padding: .3rem .3rem;
      background-color: #ebf5ff;
      border-radius: 0.2rem;
      border: 1px;
      margin: 0 .4rem .2rem 0;
    }
  }
  .search-history-head{
    margin: 0.4rem 0.4rem;
    .sc(0.9rem, #999);
  }
  .search-history-ul{
    display: flex;
    flex-direction: column;
    li{
      background-color: #fff;
      .sc(0.8rem, #666);
      text-indent: 0.4rem;
      border: 1px solid #d4d2d2;
      border-radius: 0.32rem;
      margin: 0.1rem 0.5rem;
    }
  }
  .none-search-history{
    background-color: #fff;
    .wh(100%, 5.8rem);
    text-align: center;
  }
</style>