<template>
  <div class="container">
    <div class="topHead">
      <img src="../assets/simple/bg.png" alt="">
    </div>
    <div class="content">
      <div class="cardHead">
          <div class="cardTitle">注册流程</div>
          <div class="boxflex boxM">
              <div class="boxM">
                <p class="tipImg boxflex "><img src="../assets/simple/ic_basic.png" alt=""><span class="iconfont">&#xe701;</span></p>
                <p class="tcenter">基本信息</p>
              </div>
              
               <div class="boxM">
                <p class="tipImg boxflex"><img src="../assets/simple/ic_authentication.png" alt=""><span class="iconfont">&#xe701;</span></p>
                <p>实名认证</p>
              </div>
               <div class="boxM">
                <p class="tipImg boxflex"><img src="../assets/simple/ic_card.png" alt=""><span class="iconfont">&#xe701;</span></p>
                <p>驾驶证信息</p>
              </div>
               <div class="boxM">
                <p class="tipImg boxflex"><img src="../assets/simple/ic_car.png" alt=""></p>
                <p>车辆信息</p>
              </div>
          </div>
      </div>
      <div class="cardContent verify">
        <flexbox orient="vertical">
                  <flexbox-item style="margin-top: 0.25rem;display:flex;border-bottom:1px solid #ddd">
                    <div class="textMes">姓名：</div>
                        <div class="common-li">
                            <!--<x-input placeholder="验证码" v-model="code" :max="6"></x-input>-->
                            <div class="vux-x-input weui-cell">
                                <div class="weui-cell__hd"><!----> <!----> <!----></div>
                                <div class="weui-cell__bd weui-cell__primary">
                                  <input v-model="driverName" maxlength="6"  placeholder="请输入姓名" class="weui-input"> <!----> <!----> <!----> <!---->
                                </div>
                            </div>
                        </div>
                    </flexbox-item>
                    <flexbox-item style="display:flex;border-bottom:1px solid #ddd">
                      <div class="textMes">电话：</div>
                        <div class="common-li">
                            <!--<x-input class="weui-vcode" v-model="phone" :disabled="unable" name="mobile" placeholder="请输入手机号码" keyboard="number" :show-clear="false" :max="11">
                                <button slot="right" class="btn-self" @click="sendCode" :disabled="unable">{{codeBtnText}}</button>
                            </x-input>-->
                            <div class="vux-x-input weui-cell weui-vcode">
                                <div class="weui-cell__bd weui-cell__primary">
                                    <input v-model="phone" :disabled="unable" maxlength="11" name="mobile" type="tel" pattern="[0-9]*" placeholder="请输入手机号码" class="weui-input" style="color: #999;">
                                </div>
                                <!-- <div class="weui-cell__ft">
                                    <button @click="sendCode" :disabled="unable" class="btn-self">{{codeBtnText}}</button>
                                </div> -->
                            </div>
                        </div>
                    </flexbox-item>
                    <flexbox-item style="margin-top: 0.25rem;display:flex;border-bottom:1px solid #ddd">
                      <div class="textMes">验证码：</div>
                        <div class="common-li">
                            <!--<x-input placeholder="验证码" v-model="code" :max="6"></x-input>-->
                            <div class="vux-x-input weui-cell">
                                <div class="weui-cell__hd"><!----> <!----> <!----></div>
                                <div class="weui-cell__bd weui-cell__primary">
                                    <input v-model="code" maxlength="6" onkeyup='this.value=this.value.replace(/[^\d]/g,"")' type="tel" placeholder="请输入验证码" class="weui-input"> <!----> <!----> <!----> <!---->
                                </div>
                                 <div class="weui-cell__ft">
                                    <button @click="sendCode" :disabled="unable" class="btn-self">{{codeBtnText}}</button>
                                </div>
                            </div>
                        </div>
                    </flexbox-item>
                    <flexbox-item style="margin-top: 0.25rem;display:flex;border-bottom:1px solid #ddd">
                      <div class="textMes">所在城市：</div>
                      <div class="common-li" @click="chooseCity" style="position: relative">
                            <x-input placeholder="请选择城市" v-model="getCity" readonly="readonly"></x-input>
                            <img src="../assets/arrow_2.png" class="icon"/>
                        </div>
                    </flexbox-item>
                    <flexbox-item style="margin-top: 0.25rem;display:flex;">
                      <div class="textMes">业务类型：</div>
                        <div class="common-li" @click="getDriverType" style="position: relative">
                            <x-input placeholder="请选择业务类型" v-model="driverType" readonly="readonly"></x-input>
                            <!--<group>-->
                            <!--<popup-picker title="车型" :data="driverTypeList" v-model="driverType"></popup-picker>-->

                            <!--<popup-radio title="车型" :options="driverTypeList" v-model="driverType">
                                <p slot="popup-header" class="vux-1px-b demo3-slot">车型</p>
                            </popup-radio>-->

                            <!--</group>-->
                            <img src="../assets/arrow_2.png" class="icon"/>
                        </div>
                    </flexbox-item>
                    <!-- <flexbox-item style="margin-top: 0.81944rem;margin-bottom: 0.81944rem;display:flex;justify-content:space-between;">
                      <button class="reBtn" @click="fastRegiste">快速认证</button>
                      <button class="reBtn" @click="perfect">完善认证</button>
                        <x-button :disabled="!enableClick" :class="[enableClick?'able-btn':'unable-btn']" @click.native="checkCode">立即注册</x-button>
                    </flexbox-item> -->
                </flexbox>
      </div>
       
    </div>
     <div style="width:9rem; margin:0 auto;">
        <x-button>立即注册</x-button>
     </div>
  </div>
</template>
<script>
 import * as qiniu from 'qiniu-js'
    import {BM} from '../utils/common'
    import axios from 'axios'
    import { mapGetters } from 'vuex'
    import { TransferDom, XInput, Group, XButton, Cell,Flexbox, FlexboxItem, XImg, PopupPicker, Popup } from 'vux'
    export default{
        directives: {
            TransferDom
        },
        data(){
            return{
              driverName:'',
              city:'',
              driverTypeList:[],
              driverType:'',
              phone:'',
              code:'',
              codeBtnText:'获取',
              unable: false,
              haveType:false,
              enableClick:false,
              defaultText:'定位中',
              timer:null,
              count:60,
              recomId:null,
              shareId:null,
              enterpriseId:null,
              businessId: ''
            }
        },
        computed:{
            // getCity(){
            //     return this.$store.getters.getCityName;
            // },
            getCity :{
              get: function () {     
               return this.$store.getters.getCityName;
            },
            set :function(){

            }
            }
        },
        created (){
            if(BM.isAndroid()){
                window.app.setTitle && window.app.setTitle('司机注册')
            }
            if(BM.isIphone()){
                var message={
                    'method':'driverRegisterCanClick',
                    'param':{"title":'司机注册'}
                }
                window.webkit.messageHandlers.webViewApp.postMessage(message);
            }
        },
        activated (){
            this.recomId = BM.getUrlParam ('recomId');
            this.shareId = BM.getUrlParam ('shareId');
        },
        mounted(){
            this.getCarModel();
        },
        methods:{
          fastRegiste(){
              this.$router.push({name:"fastok"})
          },
          perfect(){
              this.$router.push({name:"ceshi"})
          },
            chooseCity () {
                this.$router.push("/cityList");
            },
            sendCode (){
                var that = this;
                let regExp=/^1[3|4|5|6|7|8|9]\d{9}$/;
                if (!that.phone){
                    that.$common.showError('请输入手机号');
                    return;
                }
                if (that.phone && !regExp.test(that.phone)){
                    that.$common.showError('手机号格式不对哦');
                    return;
                }
                that.unable = true;
                getCode(that)
            },
            checkCode() {
                var that = this;
                var param = {
                    "verifyCode":that.code,
                    "phone": that.phone,
                    "recomId": that.recomId,  // 推荐拉新活动id
                    "shareId": that.shareId,   // 分享人id
                    "businessId": that.businessId
                };
                that.$http('post',BMConfig.ACTION.CHECKVERIFYCODE,param,function(response){
                    let data = response.data;
                    if(data.success){
                        var info = data.data.DriverRegister;
                        that.$store.commit('setPhone',that.phone)
                        that.$store.commit('setCityName',that.getCity)
                        that.$store.commit('setDriverType',that.driverType)
                        if (info) {
                            var status = info.status;
                            if (status == "0" || status == "1" || status == "3") {
                                that.$router.push({name:"success",params:{status:status}});
                                that.$store.commit('clearSelf');
                                return;
                            }else if(status=="2"){
                                that.$store.commit('setQueryDriverInfo',info);
                                if(BM.isQQios()){
                                    that.$router.replace('/driverInfoIos');
                                }else{
                                    that.$router.replace('/driverInfo');
                                }
                                return;
                            }else{
                                if(that.driverType === '出租车' || that.driverType.indexOf('出租车')!= -1){
                                    that.$router.push('/agreementTaxi')
                                    console.log("that.driverType11",that.driverType)
                                }else{
                                    that.$router.push('/agreement')
                                }
                            }
                        }
                    }
                },function () {
                    that.driverType = '';
                    that.phone = '';
                    that.code = '';
                    that.count = 0;
                })
            },
            getDriverType(){
                var that = this;
                if(that.driverTypeList.length<=0){
                    console.log(that.driverTypeList.length)
                    that.$common.showError('该城市下暂无可用车型');
                    that.haveType = false;
                }else{
                    that.haveType = true;
                }
            },
            changeModel(){
//                this.getCarModel();
            },
            chooseDriverType(val, id, businessId){
                this.haveType = false;
                this.driverType = val;
                this.$store.commit("setDriverTypeId",id);
                this.$store.commit("setDriverType",val);
                this.$store.commit("setCarBusinessId",businessId);
                this.businessId = businessId
            },
            getCarModel() {
                var that = this;
                let param = {
                    city: that.getCity
                }
                that.$http('post',BMConfig.ACTION.QUERYCARMODEL,param,function(response){
                    let carType = response.data.data.list;
                    if(carType.length<0){
                        that.$common.showError('该城市下暂无可用车型');
                    }
                    that.driverType = '';
                    that.driverTypeList = carType;
                    console.log(response.data.data);
                })
            }
        },
        watch:{
            phone(val){
                var reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
                if(val.length == 11 && reg.test(val) && this.code && this.driverType){
                    this.enableClick = true;
                }else{
                    this.enableClick = false;
                }
            },
            code(val){
                var reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
                if(this.phone.length == 11 && reg.test(this.phone) && val && this.driverType){
                    this.enableClick = true;
                }else{
                    this.enableClick = false;
                }
            },
            driverType(val){
                var reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
                if(this.phone.length == 11 && reg.test(this.phone) && this.code && val){
                    this.enableClick = true;
                }else{
                    this.enableClick = false;
                }
            },
            'getCity'(val){
                console.log('change==',val)
                if(val){
                    this.getCarModel();
                }
            }
        },
        components: {
            XInput,
            XButton,
            Group,
            Cell,
            Flexbox,
            FlexboxItem,
            XImg,
            PopupPicker,
            Popup
        },
    }
    function countDown(that){    //倒计时
        clearInterval(that.timer)
        that.timer = setInterval(() => {
            if (that.count > 0 && that.count <= 60) {
                that.count--;
                that.unable = true;
                that.codeBtnText = that.count + 's';
            } else {
                clearInterval(that.timer);
                that.count = 60;
                that.timer = null;
                that.unable = false;
                that.codeBtnText = "验证";
            }
        }, 1000)
    }

    function getCode(that) {
        var param = {"phone": that.phone};
        that.$http('post',BMConfig.ACTION.VERIFYCODEWITHDRIVER,param,function(response){
            let data = response.data;
            if(data.success){
                that.unable = true;
                countDown(that)
            }
        })
    }
</script>
<style>
.tcenter{
  /* text-align: center; */
  /* margin-left:0.2rem; */
}
.boxM{
  margin:0 0.35rem;
}
.boxflex{
  display:flex;
}
.cardTitle{
  width:8rem;
  height:0.8rem;
  text-align: center;
  line-height: 0.8rem;
  margin:0 auto;
  font-size:0.45rem;
  font-weight:600;
  margin-top:0.9rem;
}
 .zhiyin{
      display:inline-block;
      width:20%;
      height:30px;
      line-height: 30px;
      text-align: center;
      font-size:0.4rem;
      /* color:#fff; */
    }
    .zhiyin_icon{
      display:inline-block;
      width:5%;
      height:30px;
      line-height: 30px;
      text-align: center;
    }
    .tipImg{
      width:0.4rem;
      height:0.4rem;
      margin-left:0.5rem;
    }
    .tipImg img{
      width:0.4rem;
      height:0.4rem;
    }
    .tipImg span{
      margin-left:0.7rem;
      width:0.4rem;
      height:0.4rem;
      text-align: center;
      line-height: 0.4rem;
    }
 .container{
  background-color: #f2f2f2;
}
.topHead{
  width:100%;
  height:4rem;
}
.topHead img{
  width:100%;
  height:100%;
}
.content{
  width:100%;
  height:11.78rem;
 padding:0 0.5rem;
}
#app{
  background-color: #f2f2f2;
}
.cardHead{
  position:absolute;
  margin:0 auto;
  width:9rem;
  height:3.8rem;
  background-color: #fff;
  border-radius:5px;
  margin-top:-2rem;
}
/* .cardContent{
  position:absolute;
  margin:0 auto;
  width:9rem;
  height:6rem;
  background-color: #fff;
  border-radius:5px;
  margin-top:2rem;
} */

 @import '~vux/src/styles/1px.less';
    .topImg{
    width:100%;
    height:6rem;
    }
    .zhiyin{
      display:inline-block;
      width:20%;
      height:30px;
      line-height: 30px;
      text-align: center;
      font-size:0.4rem;
      color:#fff;
    }
    .zhiyin_icon{
      display:inline-block;
      width:5%;
      height:30px;
      line-height: 30px;
      text-align: center;
    }
    .reBtn{
      width:40%;
      height:36px;
      line-height: 36px;
      text-align: center;
      font-size: 0.45rem;
      border-radius:5px;
      color:inherit;
      border:1px solid #fff;
      background-color: #fff;
    }
    .textMes{
      width:2.8rem;
      height:48px;
      line-height: 48px;
      text-align: center;
      /* // margin-right:0.5rem; */
      color:inherit;
      font-size:0.4rem;
    }
    .city-choose input::-webkit-input-placeholder,{
        /* WebKit browsers */
        color: #fff;
    }
    .city-choose input:-moz-placeholder{
        /* Mozilla Firefox 4 to 18 */
        color: #fff;
    }
    .city-choose input::-moz-placeholder{
        /* Mozilla Firefox 19+ */
        color: #fff;
    }
    .city-choose input:-ms-input-placeholder{
        /* Internet Explorer 10+ */
        color: #fff;
    }
    input[disabled],input:disabled,input.disabled{
       color: #999!important;
        -webkit-text-fill-color:#999;
        -webkit-opacity:1;
        opacity: 1;
    }
    .code{
        width: 100%;
        height:auto;
        background: url('../assets/banner.png')0 0 no-repeat;
        background-size: cover;
        position: relative;
    }
    .desc-index{
        height: 0.29333rem;
        font-size: 0.29333rem;
        color: #fff;
        margin: 0.24rem 0 1rem;
        text-align: center;
    }
    .foot-index{
        text-align: center;
        line-height: 0.45rem;
        font-size: 0.29333rem;
        color: #d3d3d3;
        padding-bottom: 0.2rem;
    }
    .wrap{
      padding-left:0;
      padding-right:0;
        width: 100%;
        padding-top: 80%;
    }
    .city-choose{
        color: #fff;
        font-size: 0.44rem;
        width: 50%;
        /*height: 1rem;*/
        border-radius: 4px;
        border: solid 1px #ffffff;
        margin:auto;
        background: #ff7801;
        position: relative;
    }
    .city-choose .weui-input{
        text-align: center;
        color: #fff!important;
    }
    .icon{
        position: absolute;
        top:50%;
        right:0.2777777rem;
        width: 0.18rem;
        margin-top: -0.16667rem;
    }
    .verify{
       position:absolute;
  margin:0 auto;
  /* width:9rem;
  height:6rem; */
  background-color: #fff;
  border-radius:5px;
  margin-top:2rem;
        width: 9rem;
        height: 45%;
        font-size: 0.46667rem;
        color: #999;
        /* margin: 0.70833rem auto auto; */
    }
    .common-li{
      font-size:0.4rem;
        width:85%;
        background: #fff;
        border-radius: 4px;
        letter-spacing: 3px;
    }
    .common-li .weui-cells{
        border-radius: 4px;
        margin-top: 0;
    }
    .btn-self{
        /*width: .86111rem;*/
        font-size: 0.46667rem;
        color: #999;
        letter-spacing: 3px;
        background: #fff;
        outline: none;
        border:none;
        position: relative;
    }
    .btn-self:before{
        content: '';
        position: absolute;
        top:50%;
        left:-0.63889rem;
        width: 1px;
        height: 0.388889rem;
        margin-top: -0.194444rem;
        background-color: #999999;
    }
    .icon-arrow{
        width: 0.18rem;
        height: 0.33333rem!important;
        margin: 0.44444rem 0.68055rem 0 0;
    }
    .unable-btn{
        background-color: #aaaaaa!important;
        color: #fff!important;
    }
    .able-btn{
        background-color: #ff7801!important;
        color: #fff!important;
    }
    .vux-label{
        color: #999!important;
    }
    .car-type{
        width: 100%;
        max-height: 5rem;
        position: fixed;
        bottom: 0;
        left: 0;
        overflow-y: scroll;
    }
</style>
