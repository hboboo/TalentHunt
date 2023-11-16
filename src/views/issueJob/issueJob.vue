<template>
  <div class="issuejob-container">
    <section class="top-container">
      <div class="arrow">
        <van-icon name="arrow-left" color="#989b9d"/>
      </div>
      <h1 class="title">发布岗位</h1>
    </section>
    <section class="form-container">
      <div class="form">
        <van-form @submit="onSubmit">
          <van-field
            v-model="jobname"
            name="岗位"
            label="岗位"
            placeholder="岗位名称"
            :rules="[{ required: true, message: '请填写岗位名称' }]"
          />
          <van-field
            readonly
            clickable
            name="薪资"
            :value="salary"
            label="薪资"
            placeholder="点击选择薪资区间"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="columns"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <van-field name="switch" label="热门推荐">
            <template #input>
              <van-switch v-model="switchChecked" size="20" />
            </template>
          </van-field>
          <van-field name="radio" label="工作时间">
            <template #input>
              <van-radio-group v-model="radio" direction="horizontal">
                <van-radio name="1">全职</van-radio>
                <van-radio name="2">实习</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            v-model="short_company_name"
            name="公司简称"
            label="公司简称"
            placeholder="公司简称"
            :rules="[{ required: true, message: '请填写公司简称' }]"
          />
          <van-field
            v-model="city"
            name="市"
            label="城市"
            placeholder="工作所在的市"
            :rules="[{ required: true, message: '请填写工作所在的市' }]"
          />
          <van-field
            v-model="district"
            name="区"
            label="区"
            placeholder="工作所在的区"
            :rules="[{ required: true, message: '请填写工作所在的区' }]"
          />
          <van-field
            v-model="job_tag"
            rows="2"
            autosize
            label="标签"
            type="textarea"
            maxlength="30"
            placeholder="请输入岗位标签逗号分隔"
            show-word-limit
          />
          <van-field
            v-model="job_responsibility"
            rows="2"
            autosize
            label="职责"
            type="textarea"
            maxlength="50"
            placeholder="请输入岗位职责逗号分隔"
            show-word-limit
          />
          <van-field
            v-model="job_require"
            rows="2"
            autosize
            label="任职要求"
            type="textarea"
            maxlength="50"
            placeholder="请输入任职要求逗号分隔"
            show-word-limit
          />
          <van-field
            readonly
            clickable
            name="学历要求"
            :value="job_exoerience"
            label="学历要求"
            placeholder="点击选择学历区间"
            @click="showPickerExoerience = true"
          />
          <van-popup v-model="showPickerExoerience" position="bottom">
            <van-picker
              show-toolbar
              :columns="exoerience"
              @confirm="onConfirmExoerience"
              @cancel="showPickerExoerience = false"
            />
          </van-popup>
          <van-field
            readonly
            clickable
            name="工作经验"
            :value="job_experience"
            label="工作经验"
            placeholder="点击选择经验区间"
            @click="showPickerExperience = true"
          />
          <van-popup v-model="showPickerExperience" position="bottom">
            <van-picker
              show-toolbar
              :columns="experience"
              @confirm="onConfirmExperience"
              @cancel="showPickerExperience = false"
            />
          </van-popup>
          <van-field
            v-model="recruiter"
            name="职务"
            label="职务"
            placeholder="请输入你的职务"
            :rules="[{ required: true, message: '请填写你所在公司的职务' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
    </section>
  </div>
</template>

<script>
import {Icon, Picker, Form, Button, Field, Popup, Switch, RadioGroup, Radio} from 'vant';
export default {
  name: 'IssueJob',

  data() {
    return {
      jobname: '',          //岗位名称
      salary: '',           //薪资
      showPicker: false,    //是否显示选择器
      columns: ['3k以下','3-5k','5-10k','10-20k','20k以上'],  //临时薪资选择器数据
      switchChecked: false,      //开关按钮
      radio: '1',             //是否全职的单选框
      short_company_name: '',  //公司简称
      city: '',                  //市
      district: '',              //区
      job_tag: '',               //岗位标签
      job_responsibility: '',     //工作职责
      job_require: '',           //任职要求
      showPickerExoerience: false,    //是否显示学历选择器
      job_exoerience: '' ,    //学历
      exoerience: ['初中以下', '中专', '高中', '大专', '本科', '硕士', '博士'],
      job_experience: '',    //工作经验
      showPickerExperience: false,    //是否显示经验选择器
      experience: ['在校生','应届生','1年以内','1-3年','3-5年','5-10年','10年以上'],
      recruiter: '',                //发布者的职务
    };
  },

  mounted() {
    
  },

  methods: {
    //提交表单
    onSubmit(values) {
      console.log('submit', values);
    },
    //选择器的值
    onConfirm(value) {
      this.salary = value;
      this.showPicker = false;
    },
    //学历选择器
    onConfirmExoerience(value) {
      this.job_exoerience = value;
      this.showPickerExoerience = false;
    },
    //工作经验选择器
    onConfirmExperience(value) {
      this.job_experience = value;
      this.showPickerExperience = false;
    },
  },

  components: {
    [Icon.name]: Icon,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Form.name]: Form,
    [Button.name]: Button,
    [Field.name]: Field,
    [Switch.name]: Switch,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
  }
};
</script>

<style lang="less" scoped>
  @import '../../style/mixin.less';

  .top-container {
    display: flex;
    position: relative;
    background-color: #fff;
    .arrow {
      padding-left: 0.3rem;
    }
    .title {
      position: absolute;
      .sc(0.8rem, #333);
      right: 7rem;
    }
  }
  .form {
    padding: 0 0.7rem;
    margin-top: 0.2rem;
  }
</style>