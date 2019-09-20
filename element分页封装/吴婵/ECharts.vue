<template>
  <div class="shadow" v-bind:id="id" :class="className" :style="{height:height,width:width}"></div>
</template>
<script>
export default {
  mixins: [],
  name: "ECharts",
  components: {},
  data() {
    // const deID = Math.floor(Math.random() * 104650);
    return {
      MyChart: null
    };
  },
  props: {
    className: {
      type: String,
      default: "echarsCSS"
    },
    id: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      default: null
    },
    // clearCache: {
    //   type: Boolean,
    //   default: true
    // },
    width: {
      type: String,
      default: "99.9%"
    },
    height: {
      type: String,
      default: "27.77777vh"
    }
  },
  computed: {},
  methods: {
    async initChart() {
      console.warn(`------------------------initCharts-${this.id}-start`);
      let _this = this;
      // _this.MyChart = _this.$echarts.init(myChart);
      _this.MyChart = await require("echarts").init(
        document.getElementById(_this.id)
      );
      if (_this.MyChart._$handlers.click) {
        _this.MyChart._$handlers.click.length = 0;
      }
      await window.removeEventListener("click", _this.click);
      await _this.MyChart.on("click", _this.click);
      // _this.MyChart.on("click", function(p) {
      //   _this.$emit("clickECharts", p);
      //   // if (_this.mFunction) _this.mFunction(p);
      // });
      // window.addEventListener("resize", function() {
      //   _this.MyChart.resize;
      // });
      await window.addEventListener("resize", _this.__resizeHandler);
      await _this.setChart();
      console.warn(`------------------------initCharts-${this.id}-end`);
    },
    click(p) {
      let _this = this;
      let d = JSON.parse(JSON.stringify(p.data));
      _this.$emit("clickECharts", Object.assign({}, null, d));
    },
    clear() {
      this.MyChart.clear();
      console.warn(`------------------------initCharts-${this.id}-clear`);
    },
    async setChart() {
      let _this = this;
      await _this.clear();
      await _this.MyChart.setOption(_this.data, true);
      console.warn(`------------------------initCharts-${this.id}-setChart`);
    },
    __resizeHandler() {
      if (this.MyChart) {
        this.MyChart.resize();
      }
    }
  },
  watch: {
    data: {
      handler(n, o) {
        if (JSON.stringify(n) !== JSON.stringify(o)) this.setChart();
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    // this.$nextTick(() => {
    this.initChart();
    // });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.__resizeHandler);
    if (!this.MyChart) {
      return;
    }
    this.MyChart.dispose();
    this.MyChart = null;
  },
  destroyed() {}
};
</script>

<style scoped >
.echarsCSS {
  width: 100%;
  height: 27.77777vh;
}
</style>
