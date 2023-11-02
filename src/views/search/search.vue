<template>
  <div>
    <section class="search-container">
      <section class="header-nav">
        <van-icon name="arrow-left" />
        <van-search v-model="value" placeholder="请输入搜索关键词" style="width: 12rem"/>
        <button class="search-button">搜索</button>
      </section>
      <company-list></company-list>
    </section>
  </div>
</template>

<script>
import {Icon, Search } from 'vant';
import companyList from '../../components/common/companyList.vue'
export default {
  name: 'Search',

  data() {
    return {
      value: '', //搜索内容的值
    };
  },

  mounted() {
    
  },

  methods: {
    
  },

  components: {
    [Icon.name]: Icon,
    [Search.name]: Search,
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
</style>