<template>
  <div class="compileInfo-container">
    <section class="compileInfo-top-container">
      <van-icon name="arrow-left" color="#1989fa" @click="goBack"/>
      <span>编辑你的资料</span>
    </section>
    <section class="form-container">
      <div class="form-div">
        <van-form @submit="onSubmit">
          <van-field name="userLogo" label="更换头像">
            <template #input>
              <van-uploader v-model="userLogo" multiple :max-count="1" ref="file" />
            </template>
          </van-field>
          <van-field v-model="username" name="username" label="名字" placeholder="请填写你的名字" />
          <van-field v-model="age" name="age" label="年龄" placeholder="请填写你的年龄" />
          <van-field v-model="gender" name="gender" label="性别" placeholder="请填写你的性别" />
          <van-field v-model="expectation" name="expectation" label="期望" placeholder="请填写你的求职期望" />
          <van-field
            v-model="advantage"
            rows="2"
            autosize
            label="个人优势"
            type="textarea"
            maxlength="200"
            placeholder="请填你的个人优势"
            show-word-limit
          />
          <van-field
            v-model="work"
            rows="2"
            autosize
            label="工作经历"
            type="textarea"
            maxlength="200"
            placeholder="请填你的工作经历"
            show-word-limit
          />
          <van-field
            v-model="project"
            rows="2"
            autosize
            label="项目经验"
            type="textarea"
            maxlength="200"
            placeholder="请填你的项目经验"
            show-word-limit
          />
          <van-field
            v-model="school"
            rows="2"
            autosize
            label="教育背景"
            type="textarea"
            maxlength="200"
            placeholder="请填你的教育背景"
            show-word-limit
          />
          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit">保存</van-button>
          </div>
        </van-form>
      </div>
    </section>
  </div>
</template>

<script>
import { Icon, Form, Field, Button, Uploader, Dialog } from "vant";
export default {
  name: "CompileInfo",

  data() {
    return {
      userLogo: [], //公司头像
      username: "", //用户名字
      age: "", //年龄
      gender: "", //性别
      expectation: "", //求职期望
      advantage: "", //个人优势
      work: "", //工作经历
      project: "", //项目经历
      school: "", //学校经历
    };
  },

  mounted() {},

  methods: {
    onSubmit() {
      const userId = localStorage.getItem("userId"); //读取当前用户id
      const formData = new FormData();

      //添加图片数据
      if (this.userLogo.length > 0) {
        formData.append("userLogo", this.userLogo[0].file);
      }

      formData.append("username", this.username);
      formData.append("age", this.age);
      formData.append("gender", this.gender);
      formData.append("expectation", this.expectation);
      formData.append("advantage", this.advantage);
      formData.append("work", this.work);
      formData.append("project", this.project);
      formData.append("school", this.school);

      this.$http
        .post(`/user/updateUserInfo/${userId}`, formData)
        .then((res) => {
          if (res.status === 200 && res.data && res.data.message === "用户信息更新成功") {
            Dialog.alert({
              message: "保存成功",
            }).then(() => {
               this.$router.push("/homePage");
            });
          } else {
            console.error("用户信息更新失败");
          }
        })
        .catch((error) => {
          console.error("请求失败", error.message);
        });
    },

    goBack() {
     this.$router.go(-1);
    }
  },

  components: {
    [Icon.name]: Icon,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Uploader.name]: Uploader,
  },
};
</script>

<style lang="less" scoped>
@import "../../../style/mixin.less";

.compileInfo-container {
  position: fixed;
  top: 0;
  left: 0;
  .wh(100%, 100%);
  z-index: 99;
  background-color: #f5f5f5;
  overflow-y: auto;
}

.compileInfo-top-container {
  position: relative;
  span {
    position: absolute;
    .sc(0.8rem, #000);
    font-weight: 600;
    right: 43%;
  }
}
.form-div {
  margin: 0.5rem 0.3rem;
  background-color: #fff;
  padding-bottom: 0.3rem;
}

/deep/.van-button--block {
  width: 8rem;
  margin-left: 2.7rem;
}
</style>
