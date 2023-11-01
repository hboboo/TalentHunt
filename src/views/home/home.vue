<template>
  <div>
    <section class="home-container">
      <section class="navbar-container">
         <van-nav-bar title="" left-text="TalentHunt" @click-left="reload">
          <template #right>
            <van-icon name="search" size="18" />
          </template>
        </van-nav-bar>
      </section>
      <section class="tab-container">
        <van-tabs v-model="tabActive" animated>
        <van-tab title="全职">内容 1</van-tab>
        <van-tab title="实习">内容 2</van-tab>
        </van-tabs>
      </section>
      <section class="tabbar-container">
        <van-tabbar v-model="tabbarActive">
          <van-tabbar-item icon="home-o">职位</van-tabbar-item>
          <van-tabbar-item icon="search">标签</van-tabbar-item>
          <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
          <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
        </van-tabbar>
      </section>
    </section>
  </div>
</template>

<script>
import { NavBar, Icon,Tab, Tabs,Tabbar, TabbarItem } from 'vant';
export default {
  name: 'Home',
  
  data() {
    return {
      tabActive: 0, //展示tab标签内容索引
      tabbarActive: 0,//tabbar状态栏索引
    };
  },

  mounted() {
    
  },

  methods: {
    //点击标题刷新页面
    reload() {
      window.location.reload()
    }
  },

  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  }
};
</script>

<style lang="less" scoped>

</style>