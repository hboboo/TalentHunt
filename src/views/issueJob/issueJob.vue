<template>
  <div class="issuejob-container">
    <section class="top-container">
      <div class="arrow">
        <van-icon name="arrow-left" color="#989b9d" />
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
            @click="showPickerSalary = true"
          />
          <van-popup v-model="showPickerSalary" position="bottom" round>
            <van-picker
              show-toolbar
              :columns="salaryArray"
              @confirm="onConfirmSalary"
              @cancel="showPickerSalary = false"
            />
          </van-popup>
          <van-field name="hot" label="热门推荐">
            <template #input>
              <van-switch v-model="hot" size="20" />
            </template>
          </van-field>
          <van-field name="is_full_time" label="工作时间">
            <template #input>
              <van-radio-group v-model="is_full_time" direction="horizontal">
                <van-radio :name="true">全职</van-radio>
                <van-radio :name="false">实习</van-radio>
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
            :value="job_education"
            label="学历要求"
            placeholder="点击选择学历区间"
            @click="showPickerEducation = true"
          />
          <van-popup v-model="showPickerEducation" position="bottom" round>
            <van-picker
              show-toolbar
              :columns="educationArray"
              @confirm="onConfirmEducation"
              @cancel="showPickerEducation = false"
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
          <van-popup v-model="showPickerExperience" position="bottom" round>
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
          <h2 class="separate">请完善你公司相关的信息</h2>
          <van-field
            v-model="companyName"
            name="公司全称"
            label="公司全称"
            placeholder="请输入你公司全称"
            :rules="[{ required: true, message: '请填写你所在公司的全称' }]"
          />
          <van-field
            readonly
            clickable
            name="融资"
            :value="financing"
            label="融资"
            placeholder="点击选择融资区间"
            @click="showPickerFinancing = true"
          />
          <van-popup v-model="showPickerFinancing" position="bottom" round>
            <van-picker
              show-toolbar
              :columns="financingArry"
              @confirm="onConfirmFinancing"
              @cancel="showPickerFinancing = false"
            />
          </van-popup>
          <van-field
            readonly
            clickable
            name="规模"
            :value="scale_company"
            label="规模"
            placeholder="点击选择公司规模"
            @click="showPickerScale = true"
          />
          <van-popup v-model="showPickerScale" position="bottom" round>
            <van-picker show-toolbar :columns="ScaleArry" @confirm="onConfirmScale" @cancel="showPickerScale = false" />
          </van-popup>
          <van-field
            readonly
            clickable
            name="行业"
            :value="industry"
            label="行业"
            placeholder="点击选择公司行业"
            @click="showPickerIndustry = true"
          />
          <van-popup v-model="showPickerIndustry" position="bottom" round>
            <van-picker
              show-toolbar
              :columns="industryArry"
              @confirm="onConfirmIndustry"
              @cancel="showPickerIndustry = false"
            />
          </van-popup>
          <van-field
            readonly
            clickable
            name="上班时间"
            :value="start"
            label="上班时间"
            placeholder="点击选择时间"
            @click="showPickerStart = true"
          />
          <van-popup v-model="showPickerStart" position="bottom" round>
            <van-datetime-picker type="time" @confirm="onConfirmStart" @cancel="showPickerStart = false" />
          </van-popup>
          <van-field
            readonly
            clickable
            name="下班时间"
            :value="end"
            label="下班时间"
            placeholder="点击选择时间"
            @click="showPickerEnd = true"
          />
          <van-popup v-model="showPickerEnd" position="bottom" round>
            <van-datetime-picker type="time" @confirm="onConfirmEnd" @cancel="showPickerEnd = false" />
          </van-popup>
          <van-field
            readonly
            clickable
            name="周末"
            :value="rest_weekend"
            label="周末"
            placeholder="点击选择公司周末休息"
            @click="showPickerWeekend = true"
          />
          <van-popup v-model="showPickerWeekend" position="bottom" round>
            <van-picker
              show-toolbar
              :columns="weekendArry"
              @confirm="onConfirmWeekend"
              @cancel="showPickerWeekend = false"
            />
          </van-popup>
          <van-field
            readonly
            clickable
            name="加班"
            :value="overtime"
            label="加班"
            placeholder="点击选择公司是否加班"
            @click="showPickerOvertime = true"
          />
          <van-popup v-model="showPickerOvertime" position="bottom" round>
            <van-picker
              show-toolbar
              :columns="overtimeArry"
              @confirm="onConfirmOvertime"
              @cancel="showPickerOvertime = false"
            />
          </van-popup>
          <van-field
            v-model="company_address"
            rows="2"
            autosize
            label="地址"
            type="textarea"
            maxlength="30"
            placeholder="请输入公司地址"
            show-word-limit
          />
          <van-field
            v-model="company_introduction"
            rows="2"
            autosize
            label="介绍"
            type="textarea"
            maxlength="100"
            placeholder="请输入有关公司介绍"
            show-word-limit
          />
          <van-field name="companyLogo" label="公司头像">
            <template #input>
              <van-uploader v-model="companyLogo" multiple :max-count="1" :after-read="afterRead" ref="file" />
            </template>
          </van-field>
          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
    </section>
  </div>
</template>

<script>
import {
  Icon,
  Picker,
  Form,
  Button,
  Field,
  Popup,
  Switch,
  RadioGroup,
  Radio,
  DatetimePicker,
  Uploader,
  Dialog,
} from "vant";
import { mapState } from "vuex";
export default {
  name: "IssueJob",

  data() {
    return {
      jobname: "", //岗位名称
      salary: "", //薪资
      showPickerSalary: false, //薪资选择器
      salaryArray: ["3k以下", "3-5k", "5-10k", "10-20k", "20k以上"], //薪资选择器数据
      hot: false, //是否热门
      is_full_time: true, //是否全职的单选框
      short_company_name: "", //公司简称
      city: "", //市
      district: "", //区
      job_tag: "", //岗位标签
      job_responsibility: "", //工作职责
      job_require: "", //任职要求
      showPickerEducation: false, //是否显示学历选择器
      job_education: "", //学历
      educationArray: ["初中以下", "中专", "高中", "大专", "本科", "硕士", "博士"],
      job_experience: "", //工作经验
      showPickerExperience: false, //是否显示经验选择器
      experience: ["在校生", "应届生", "1年以内", "1-3年", "3-5年", "5-10年", "10年以上"],
      recruiter: "", //发布者的职务
      financing: "", //融资情况
      showPickerFinancing: false, //显示融资选择器
      financingArry: ["未融资", "天使轮", "A轮", "B轮", "C轮", "上市"],
      companyName: "", //公司全称
      scale_company: "", //公司规模的值
      showPickerScale: false, //对应它的选择器开关
      ScaleArry: ["0-20人", "20-99人", "100-499人", "500-999人", "1000人以上"],
      industry: "", //公司行业的值
      showPickerIndustry: false,
      industryArry: ["互联网", "金融", "教育", "医疗", "电商", "制造业", "媒体", "房地产"],
      start: "", //上班时间
      showPickerStart: false, //显示时间选择器
      end: "", //上班时间
      showPickerEnd: false, //显示时间选择器
      rest_weekend: "", //  周末休息的值
      showPickerWeekend: false,
      weekendArry: ["双休", "单休", "大小周"],
      overtime: "", //加班情况
      showPickerOvertime: false,
      overtimeArry: ["不加班", "偶尔加班", "经常加班"],
      company_address: "", //公司地址
      company_introduction: "",
      companyLogo: [], //公司头像
    };
  },

  computed: {
    ...mapState(["userId"]),
  },

  mounted() {},

  methods: {
    // 提交表单
    onSubmit() {
      // 创建一个 FormData 对象，用于发送文件
      const formData = new FormData();

      // 添加表单数据
      formData.append("jobname", this.jobname);
      formData.append("salary", this.salary);
      formData.append("hot", this.hot);
      formData.append("is_full_time", this.is_full_time);
      formData.append("short_company_name", this.short_company_name);
      formData.append("city", this.city);
      formData.append("district", this.district);
      formData.append(
        "job_tag",
        this.job_tag.split("，").map((item) => item.trim())
      ); // 处理岗位标签为数组
      formData.append(
        "job_responsibility",
        this.job_responsibility.split("，").map((item) => item.trim())
      ); // 处理工作职责为数组
      formData.append(
        "job_require",
        this.job_require.split("，").map((item) => item.trim())
      ); // 处理任职要求为数组
      formData.append("job_education", this.job_education);
      formData.append("job_experience", this.job_experience);
      formData.append("recruiter", this.recruiter);
      formData.append("financing", this.financing);
      formData.append("companyName", this.companyName);
      formData.append("scale_company", this.scale_company);
      formData.append("industry", this.industry);
      formData.append("company_address", this.company_address);
      formData.append("company_introduction", this.company_introduction);
      formData.append("start", this.start);
      formData.append("end", this.end);
      formData.append("rest_weekend", this.rest_weekend);
      formData.append("overtime", this.overtime);
      formData.append("userId", this.userId);

      // 添加图片数据
      if (this.companyLogo.length > 0) {
        // 如果有选择图片，将图片文件添加到 FormData 中
        formData.append("companyLogo", this.companyLogo[0].file);
      }

      // 发送 POST 请求到后端
      this.$http
        .post("/submit", formData)
        .then((res) => {
          console.log(res.data); // 输出后端返回的数据

          Dialog.confirm({
            title: "岗位发布成功",
            message: "是否再发布一个岗位",
          })
            .then(() => {
              window.location.reload();
            })
            .catch(() => {
              this.$router.push('/homePage');
            });
        })
        .catch((error) => {
          console.error("请求失败", error.message);
        });
    },

    afterRead(file) {
      console.log(file);
    },

    //薪资选择器
    onConfirmSalary(value) {
      this.salary = value;
      this.showPickerSalary = false;
    },
    //学历选择器
    onConfirmEducation(value) {
      this.job_education = value;
      this.showPickerEducation = false;
    },
    //工作经验选择器
    onConfirmExperience(value) {
      this.job_experience = value;
      this.showPickerExperience = false;
    },
    //公司融资情况
    onConfirmFinancing(value) {
      this.financing = value;
      this.showPickerFinancing = false;
    },
    //公司规模情况
    onConfirmScale(value) {
      this.scale_company = value;
      this.showPickerScale = false;
    },
    //公司所在行业情况
    onConfirmIndustry(value) {
      this.industry = value;
      this.showPickerIndustry = false;
    },
    //上班时间
    onConfirmStart(time) {
      this.start = time;
      this.showPickerStart = false;
    },
    //下班时间
    onConfirmEnd(time) {
      this.end = time;
      this.showPickerEnd = false;
    },
    //周末上班情况
    onConfirmWeekend(value) {
      this.rest_weekend = value;
      this.showPickerWeekend = false;
    },
    //加班情况
    onConfirmOvertime(value) {
      this.overtime = value;
      this.showPickerOvertime = false;
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
    [DatetimePicker.name]: DatetimePicker,
    [Uploader.name]: Uploader,
    [Dialog.name]: Dialog,
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

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
  .separate {
    .sc(0.6rem, #2b78ca);
    padding: 0.5rem 0;
  }
}
</style>
