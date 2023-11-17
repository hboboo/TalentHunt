<template>
  <div class="company-details-container">
    <section class="top-container">
      <div class="company-info">
        <h3>{{jobDetails.company.companyName}}</h3>
        <div class="company">
          <span>{{jobDetails.company.financing}}·</span>
          <span>{{jobDetails.company.scale_company}}·</span>
          <span>{{jobDetails.company.industry}}</span>
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
        <span>{{jobDetails.company.workingHours.start}}-{{jobDetails.company.workingHours.end}}</span>
      </div>
      <div>
        <van-icon name="card" color="#fff"/>
        <span>{{jobDetails.company.rest_weekend}}</span>
      </div>
      <div>
        <van-icon name="todo-list" color="#fff"/>
        <span>{{jobDetails.company.overtime}}</span>
      </div>
    </section>
    <section class="company-address-container">
      <h1>公司地址</h1>
      <span>{{jobDetails.company.company_address}}</span>
    </section>
    <section class="company-introduce-container">
      <h1>公司介绍</h1>
      <p>{{jobDetails.company.company_introduction}}</p>
    </section>
  </div>
</template>

<script>
import {Image, Icon} from 'vant';
export default {
  name: 'CompanyDetails',
  props: {
    jobDetails: {
      type: Object,
      default: null,
    },
  },
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