<template>
  <div>
    <el-date-picker
      v-model="day"
      :editable="false"
      :type="typeS[type]"
      :value-format="valueF[type]"
      @change="picker"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  name: "DatePicker",
  data() {
    return {
      day: "",
      typeS: ["date", "month"],
      valueF: ["yyyy-MM-dd", "yyyy-MM"]
    };
  },
  props: {
    type: {
      type: Number,
      default: () => {
        return 0;
      }
    },
    dayNum: {
      type: Number,
      default: () => {
        return 0;
      }
    }
  },
  watch: {},
  methods: {
    picker() {
      this.$emit("change", this.day);
    }
  },
  mounted() {
    //渲染
    let date = new Date();
    date.setDate(date.getDate() - this.dayNum);
    this.day = date.format("yyyy-MM-dd");
  }
};
</script>