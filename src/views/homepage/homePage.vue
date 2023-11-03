<template>
  <div>
    <section class="home-page-container">
      <section class="avatar-container">
        <div class="avatar">
            <van-image
            round
            width="3rem"
            height="3rem"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            class="avatar-img"
            />
          <h3>用户名</h3>
        </div>
      </section>
      <section class="link-container">
        <div>
        <van-cell title="我的发布" is-link size="large"/>
        <van-cell title="我的收藏" is-link size="large"/>
        <van-cell title="我的信息" is-link size="large"/>
        <van-cell title="关于软件" is-link size="large"/>
        </div>
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
import { Image as VanImage, Cell, Tabbar,TabbarItem} from 'vant';
export default {
  name: 'HomePage',

  data() {
    return {
      tabbarActive: 0,  //tabbar状态栏索引
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
  components: {
    [VanImage.name]: VanImage,
    [Cell.name]: Cell,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  }
};
</script>

<style lang="less" scoped>
  @import '../../style/mixin.less';

  .avatar{
    .wh(100%, 11.4rem);
    background-color: cadetblue;
    position: relative;
    .avatar-img{
      .center;
    }
    h3{
      position: absolute;
      top: 65%;
      left: 42.3%;
      .sc(0.7rem, #666);
    }
  }

</style>