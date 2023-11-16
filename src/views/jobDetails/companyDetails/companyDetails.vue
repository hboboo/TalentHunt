<template>
  <div class="company-details-container">
    <section class="top-container">
      <div class="company-info">
        <h3>广州河马游戏科技有限公司</h3>
        <div class="company">
          <span>A轮·</span>
          <span>100-499人·</span>
          <span>游戏</span>
        </div>
      </div>
      <div class="company-img">
        <van-image
          width="2rem"
          height="2rem"
          fit="cover"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
    </section>
    <section class="company-condition-container">
      <div> 
        <van-icon name="clock" color="#fff"/>
        <span>上午09:30-下午07:00</span>
      </div>
      <div>
        <van-icon name="card" color="#fff"/>
        <span>双休</span>
      </div>
      <div>
        <van-icon name="todo-list" color="#fff"/>
        <span>偶尔加班</span>
      </div>
    </section>
    <section class="company-address-container">
      <h1>公司地址</h1>
      <span>广州海珠区小米大厦9楼我们是一家专注于推动科技创新的公司</span>
    </section>
    <section class="company-introduce-container">
      <h1>公司介绍</h1>
      <p>欢迎来到创新科技，我们是一家专注于推动科技创新的公司。致力于为客户提供卓越的解决方案，我们的团队充满活力、创意无限。通过不断追求卓越和技术创新，我们助力企业实现业务增长和数字化转型。让我们携手共创美好未来！</p>
    </section>
  </div>
</template>

<script>
import {Image, Icon} from 'vant';
export default {
  name: 'CompanyDetails',

  data() {
    return {
      
    };
  },

  mounted() {
    window.scrollTo(0, 0);
  },

  methods: {
    
  },

  components: {
    [Image.name]: Image,
    [Icon.name]: Icon,
  }
};
</script>

<style lang="less" scoped>
  @import '../../../style/mixin.less';

  .company-details-container{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
    margin-top: 1.55rem;
    background-color: rgba(20, 20, 20, 0.5);
    backdrop-filter: blur(20px);
		z-index: 18;
	}
  .top-container {
    display: flex;
    position: relative;
    margin-top: 0.9rem;
    .company-info {
      position: absolute;
      left: 0.5rem;
      h3 {
        .sc(0.7rem, #fff);
      }
      .company {
        padding-top: 0.4rem;
        .sc(0.5rem, #fff);
      }
    }
    .company-img {
      position: absolute;
      right: 1.1rem;
      /deep/ .van-image__img {
        border-radius: 0.3rem;
      }
    }
  }
  .company-condition-container {
    display: flex;
    flex-direction: column;
    margin: 3.3rem 1.2rem 1rem 1.2rem;
    border: solid 1px #fff;
    border-radius: 0.5rem;
    div {
      margin: 0.2rem 0 0.2rem 0.5rem;
    }
    span {
      .sc(0.7rem, #fff);
      padding-left: 0.7rem;
    }
  }
  .company-address-container {
    margin-left: 0.5rem;
    h1 {
      .sc(0.8rem, #fff);
    }
    span {
      .sc(0.6rem, #fff);
      margin-top: 0.5rem;
      padding-left: 0.2rem;
    }
  }
  .company-introduce-container {
    margin-left: 0.5rem;
    margin-top: 0.8rem;
    h1 {
      .sc(0.8rem, #fff);
    }
    p {
      .sc(0.5rem, #fff);
      margin-top: 0.5rem;
      text-indent: 1em;
      line-height: 1.5; 
      padding-right: 0.2rem
    }
  }
</style>