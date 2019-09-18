<template>
	<div class="purchase-order">
		<el-card>
			<div class="card-header">
        <div>
          <h5 class="sales-Order">上架商品</h5>
          <div class="goods">
            <div>
              <span class="marginR20">已上架商品数: 0</span>
              <span class="color-blue">批量上/下架商品</span>
            </div>
            <div class="marginR134">
              <span class="marginR20">进销存商品总数: 0</span>
              <span class="color-blue">管理进销存商品</span>
            </div>
          </div>
        </div>
				<div class="price-box">
          <h5 class="sales-Order">销售/价格展示</h5>
          <div class="goods">
             <div style="width:400px">
              <div style="width:400px">
                <span class="marginR20">销量展示:</span>
                <span><el-checkbox v-model="checked3">展示销量</el-checkbox><el-checkbox v-model="checked4">不展示销量</el-checkbox></span>
              </div>
              <div class="price-box">选择展示销量后,将展示该商品历史的所有的销量</div>
            </div>
            <div>
              <div>
                <span class="marginR20">默认价格类型:</span>
                <span><el-checkbox v-model="checked3">零售价</el-checkbox><el-checkbox v-model="checked4">批发价</el-checkbox></span>
              </div>
              <div class="price-box">在店铺中商品只有价格，所以在进销存系统中同步商品时，需从批发价和零售价中选择一个价格进行同步</div>
            </div>
           
          </div>
          
          
        </div>
        <div>
          <h5 class="sales-Order">商品标签</h5>
          <div class="goods">
            <div>
              <span class="marginR20">精品商品数量: 0</span>
              <span class="color-blue">批量设置</span>
            </div>
            <div>
              <span class="marginR20">热卖商品数量: 0</span>
              <span class="color-blue">批量设置</span>
            </div>
            <div>
              <span class="marginR20">新品商品数量: 0</span>
              <span class="color-blue">批量设置</span>
            </div>
          </div>
        </div>
			</div>
		</el-card> 

		<el-card class="box-card">
     <div class="card-header">
        <div class="content-head">
          <h5 class="sales-Order">上架商品</h5>
         <el-button type="primary" class="set-btn">新建运费模板</el-button>
        </div>
			</div>
       <table class="mailTable" style="width:600px;">
        <tr v-for="(item,index ) in tableData" :key="index">
          <td class="column">{{item.key}}</td>
          <td>{{item.value}}</td>
        </tr>
      </table>
		</el-card>
	</div>
</template>

<script>
import orderSearchDate from "@/components/order-search-date"
  export default {
		components: {
			orderSearchDate,
		},
    data() {
      return {
        styleObject: {
          
        },
        s_showByRow: true,
        checked1:true,
        checked2:false,
        checked3:true,
        checked4:false,
				tableData: [
        {key: '单号', value: '1001'},
        {key: '商品名称', value: '篮球'},
        {key: '价格', value: '120.00'},
        {key: '订单日期', value: '2017-03-01'},
        {key: '付款方式', value: '在线支付'},
        {key: '收货地址', value: '北京市海淀区西北旺镇'},
      ],
      }
    },
     computed: {
    rowCount: function() {
      return Math.ceil(this.tableData.length/2);
    }
  },
    methods: {
		
    }
  };
</script>

<style lang="scss" scoped>
table{
border-collapse:collapse;
}
table tr{
border:1px solid #E6EAEE;
}  
        table tr td{
border:1px solid #E6EAEE;
} 
.mailTable, .mailTable tr, .mailTable tr td{ border:1px solid #E6EAEE; }
　　.mailTable{ font-size: 12px; color: #71787E; }
　　.mailTable tr td{ border:1px solid #E6EAEE; width: 150px; height: 35px; line-height: 35px; box-sizing: border-box; padding: 0 10px; }
　　.mailTable tr td.column { background-color: #EFF3F6; color: #393C3E; }
	.purchase-order {
		// min-width: 1615px;
		.card-header {
			// display: flex;
      // align-items: flex-start;
      .price-box{
        margin-top:30px;
      }
       .goods{
          display:flex;
          width:100%;
          justify-content: space-between;
          margin-top:20px;
          .color-blue{
            color:#4e9bff;
          }
          .marginR134{
             margin-right:134px;
          }
          .marginR50{
            margin-right:40px;
          }
          .marginR20{
            margin-right:20px;
          }
        }
			.sales-Order {
				font-size: 18px;
				font-family: PingFangSC;
				font-weight: 600;
				color: rgba(51, 51, 51, 1);
				line-height: 18px;
				position: relative;
				text-indent: 10px;
        margin: 10px 60px 0 0;
			}
			.sales-Order::after {
				content: "";
				left: 0;
				top: 3px;
				position: absolute;
				width: 4px;
				height: 14px;
				background: rgba(51, 51, 51, 1);
				border-radius: 3px;
			}
			.build-botton {
				margin-left: 300px;
			}
		}
		.box-card {
      margin-top: 20px;
      .set-btn{
        
      }
      .content-head{
        display:flex;
        justify-content: space-between;
      }
		}
	}
	.el-card {
		min-width: 1475px;
	}
</style>