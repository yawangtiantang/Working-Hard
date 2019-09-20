<template>
  <div style="height:100%;">
    <el-table
      :data="tableData"
      :border="TableConfig.border"
      :stripe="TableConfig.stripe"
      :highlight-current-row="TableConfig.highlight"
      height="95%"
      @selection-change="handleSelectionChange"
      @cell-dblclick="cellDblClick"
      header-cell-class-name="header-cell-class-name"
      cell-class-name="cell-class-name"
    >
      <el-table-column v-if="TableConfig.multSelect" type="selection" width="55" align="center" fixed></el-table-column>
      <el-table-column type="index" width="60" align="center" fixed></el-table-column>
      <el-table-column
        v-for="(item,index) in DataConfig"
        :key="index"
        :align="item.align"
        :width="item.width"
        :prop="item.prop"
        :label=" item.label ? item.label : item.prop "
        :sortable="item.sortable"
        :fixed="item.fixed"
      >
        <template slot-scope="scope">
          <pre v-if="item.json" :class="item.mini ? 'ignore': 'normal' ">{{dataFormat(item.format,scope.row,scope.column)}}</pre>
          <span
            v-else
            :class="item.mini ? 'ignore': 'normal' "
          >{{dataFormat(item.format,scope.row,scope.column)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-col class="alncnt" v-show="TableConfig.showPage" :style="{fontSize:'150%',height:'4%'}">
      <i
        class="el-icon-arrow-left"
        :style="{color: pageDis == null || pageDis == 'right' ? '#409EFF':'transparent'}"
        @click="clickPage(false)"
      ></i>
      <i
        class="el-icon-arrow-right"
        :style="{color: pageDis == null || pageDis == 'left' ? '#409EFF':'transparent'}"
        @click="clickPage(true)"
      ></i>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "PageTable",
  data() {
    return {};
  },
  components: {},
  props: {
    tableData: {
      type: Array,
      default: () => {
        let arr = [{ test: "test" }];
        return arr;
      }
    },
    TableConfig: {
      type: Object,
      default: () => {
        let obj = {
          border: false,
          stripe: false,
          highlight: false,
          showPage: true,
          multSelect:false,
          disabled: ""
        };
        return obj;
      }
    },
    DataConfig: {
      type: Array,
      default: () => {
        let arr = [
          {
            align: "right",
            width: "100",
            prop: "test",
            label: "test",
            sortable: true,
            fixed: true,
            mini: true,
            format: true,
            json: true
          }
        ];
        return arr;
      }
    }
  },
  computed: {
    pageDis() {
      let text = null;
      let dis = this.TableConfig.disabled;
      if (dis && dis.length > 0) {
        text = dis;
      }
      return text;
    }
  },
  methods: {
    handleSelectionChange(list){
      this.$emit("multSelect",list)
    },
    cellDataFormat(r, c) {
      let iof = c.property.indexOf(".");
      if (iof == -1) {
        return r[c.property];
      } else {
        let s = c.property.substring(0, iof);
        let e = c.property.substring(iof + 1, c.property.length);
        let data = r[s][e];
        return {
          data,
          s,
          e
        };
      }
    },
    dataFormat(is, r, c) {
      let data = this.cellDataFormat(r, c);
      if (!is) return data;
      try {
        switch (typeof data) {
          case "string":
            return data.substr(0, 10);
          case "number":
            return data.toFixed(2);
          default:
            return JSON.stringify(data).substr(0, 10);
        }
      } catch (e) {
        return JSON.stringify(data);
      }
    },
    cellDblClick(row, column) {
      this.$emit("cellDblClick", row, column);
    },
    clickPage(is) {
      this.$emit("clickPage", is);
    }
  }
};
</script>
