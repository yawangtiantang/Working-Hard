<template>
  <div class="app-container" style="height:500px">
		<div class="nav">
			<div class="back" @click="goBack">
				<i class="el-icon-arrow-left">返回</i>
			</div>
			<div class="backadd">新增供应商</div>
		</div>
		
		<el-card class="box-card">
			<div class="top">
				<div style="margin:0 60px 0 20px;">
				</div>
			</div>
			<div class="center">
				<el-form :model="form" label-width="140px">
					<el-row class="search-form">
						<el-form-item label="供应商名称" label-width="83px" class="input-large">
							<el-input v-model='form.remark' placeholder="请输入供应商名称"></el-input>

						</el-form-item>
						<el-form-item label="负责人" label-width="140px" class="input-large">
							<el-input  v-model='form.remark' placeholder="请输入负责人姓名或手机"></el-input>
						</el-form-item>
						<el-form-item label="启用 :" prop="Supplier" label-width="140px" required class="input-short">
							<el-select v-model="form.Buhuo" placeholder="启用">
								<el-option
									v-for="(item, index) in stateList" :key="index" :label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="手机" label-width="140px" class="input-large">
							<el-input v-model='form.remark' placeholder="请输入手机号"></el-input>
						</el-form-item>
					</el-row>
					
					<el-row class="search-form">
						<el-form-item label="电话" label-width="83px" class="input-large">
							<el-input  v-model='form.remark' placeholder="请输入座机号"></el-input>
						</el-form-item>
						<el-form-item label="传真" label-width="140px" class="input-large">
							<el-input v-model='form.remark' placeholder="请输入传真号"></el-input>
						</el-form-item>
						<el-form-item label="开户行" label-width="140px" class="input-large">
							<el-input  v-model='form.remark' placeholder="请输入开户行"></el-input>
						</el-form-item>
						<el-form-item label="邮箱" label-width="140px" class="input-large">
							<el-input  v-model='form.remark' placeholder="请输入邮箱"></el-input>
						</el-form-item>
					</el-row>

					<el-row class="search-form">
						<el-form-item label="银行账户" label-width="83px" class="input-large">
							<el-input  v-model='form.remark' placeholder="请输入银行账户"></el-input>
						</el-form-item>
						<el-form-item label="默认折扣" label-width="140px" class="input-large">
							<el-input  v-model='form.remark' placeholder="100%"></el-input>
						</el-form-item>
						<el-form-item label="网址" label-width="140px" class="input-large">
							<el-input  v-model='form.remark' placeholder="请输入网址"></el-input>
						</el-form-item>
						<el-form-item label="排序" label-width="140px" class="input-large">
							<el-input  v-model='form.remark' placeholder="123"></el-input>
						</el-form-item>
					</el-row>

					<el-row class="search-form">
						<span style="width:100px;height:40px;text-align:center;line-height:40px">地址</span>
						<area-select type='all' :level='2' v-model="selected" :data="pcaa" :placeholders="placeArr"></area-select>
						<el-input  v-model='form.detailAddress' placeholder="详细地址"></el-input>
						
					</el-row>
				</el-form>
					<div class="botton-bottom">
						<el-button type="primary" class="order-botton" @click="save">保存</el-button>
						<el-button type="primary" class="order-botton" @click="reset">重置</el-button>
					</div>
			</div>
		</el-card>
  </div>

</template>

<script>
import { pca, pcaa } from 'area-data';
import {} from "@/api/index";
import http from "@/utils/request";
import { enumSaleStatus } from "@/utils/enums";
export default {
  data() {
    return {
			placeArr:['省','市','县/区'],
			selected: [],
			pca: pca,
			pcaa: pcaa,
      SupplierList: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "供应商1"
        }
      ],
      form: {},
      stateList: [
        {
          value: 0,
          label: "启用"
        },
        {
          value: 1,
          label: "禁用"
        }
      ],
      storehouseList: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "仓库1"
        }
      ],
      orderStatus: enumSaleStatus,
    };
  },
  filters: {},
  mounted() {},
  created() {},
  methods: {
		// 返回
    goBack() {
      this.$router.go(-1);
		},
		
		// 保存
		save() {
			console.log(this.selected)
		},

		// 重置
		reset() {
			this.form = {}
		}
  }
};
</script>

<style lang="scss" scoped>
// .area-select-wrap .area-select{
// 	margin-left:auto !important;
// 	margin-right:100px !important;
// }
// /deep/.area-select.medium{
// 	width:190px !important;
// 	height:40px !important;
// 	margin-right:30px !important;
// }
.nav {
	margin-bottom: 10px;
	.backadd {
		font-size: 14px;
		line-height: 25px;
		text-align: center;
		margin: 5px 0 0 30px;
		height: 25px;
		color: #999999;
	}
}
/deep/.botton-bottom {
	margin-top: 40px!important;
}
</style>
