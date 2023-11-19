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
        <van-cell title="退出账号" is-link size="large" @click="exit"/>
        </div>
      </section>
      <section class="tabbar-container">
        <van-tabbar  route>
          <van-tabbar-item replace icon="home-o" to="/home">职位</van-tabbar-item>
          <van-tabbar-item replace icon="search">标签</van-tabbar-item>
          <van-tabbar-item replace icon="friends-o">标签</van-tabbar-item>
          <van-tabbar-item replace icon="setting-o" to="/homePage" class="van-tabbar-item--active">我的</van-tabbar-item>
        </van-tabbar>
      </section>
      <div v-if="userInfoData">
      <h2>{{ userInfoData.username }}</h2>
      <p>账号：{{ userInfoData.account }}</p>
      <p>角色：{{ userInfoData.userLogo }}</p>
      <!-- 其他用户信息... -->
    </div>
    </section>
  </div>
</template>

<script>
import { Image as VanImage, Cell, Tabbar,TabbarItem, Dialog} from 'vant';
export default {
  name: 'HomePage',

  data() {
    return {
      userInfoData: null
    };
  },

  mounted() {
    this.checkLoginStatus(); 
    this.getUserInfo()
  },

  methods: {
    checkLoginStatus() {
      // 使用Vuex中的getter获取用户登录状态
      const isAuthenticated = this.$store.getters.isAuthenticated;

      // 读取本地存储中的 token
      const storedToken = localStorage.getItem('token');

      // 如果本地存储中存在 token，并且用户未登录，则更新 Vuex 状态
      if (storedToken && !isAuthenticated) {
        const storedRole = localStorage.getItem('role'); // 如果有存储用户角色，也可以取出
        this.$store.dispatch('login', { isAuthenticated: true, token: storedToken, role: storedRole });

        // 可以执行其他操作，例如获取用户信息等
        Dialog.alert({
          title: '已识别到账号',
          message: '欢迎回来~',
        });
        } else if (!isAuthenticated) {
        // 如果用户未登录，则执行相应的操作，例如跳转到登录页面
        Dialog.alert({
          title: '未识别到账号',
          message: '账号还没登陆快去登录吧~',
        }).then(() => {
          this.$router.push('/login');
        });
      }
    },

    //退出账号
    exit () {
      Dialog.confirm({
        title: '退出账号',
        message: '确定要退出账号吗？',
      })
      .then(() => {
         // 用户点击确认，调用退出账号的操作
        this.$store.dispatch('logout'); 
        this.$router.push('/login');
      })
      .catch(() => {
        // on cancel
      });
    },
    // 获取用户详细信息
    getUserInfo() {
      // 从 Vuex 中获取 token
      const token = this.$store.getters.token;

      // 发起获取用户信息的请求
      this.$http.get('/user/info', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          // 请求成功，更新 data 中的属性
          this.userInfoData = response.data;
        })
        .catch(error => {
          // 请求失败，处理错误
          console.error('获取用户信息失败', error);
        });
    },
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