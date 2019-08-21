<template>
<div style="margin-top:100px;">
<div class="item" v-for="item in arr" :key="item.name">
<div class="left">
<div class="d1">{{item.name}}</div>
<div class="d2">pic:{{item.appType | getPic}}</div>
</div>
<span class="right">url:{{item.appType | getUrl}}</span>
</div>
</div>
</template>

<script>
let resArr = [
{url:'http://baidu.com', appType:1, pic: 'A.png'}, 
{url:'http://tmall.com', appType:2, pic:'B.png'}, 
{url:'http://jd.com', appType:3, pic:'C.png'}];
export default {
name: '',
data() { 
return {
arr: [{name:'推荐有奖', appType:1}, {name:'推荐返佣', appType:2}]
}
},
filters: {
getUrl (val) {
let item = resArr.filter((item)=>{ 
return item.appType === val
})
if (item.length > 0) {
return item[0].url
} else {
return 'weizhi'
}
},
getPic (val) {
let item = resArr.filter((item)=>{ 
return item.appType === val
})
return item[0].pic
}
}
}
</script>

<style lang="scss" scoped>
.item {
font-size: 12px;
height: 1.46rem;
display: flex;
justify-content: space-between;
align-items: center;
background: #FFFFFF;
&:first-child {
margin-top: 0.2rem;
}
.left {
margin-left: 0.3rem;
text-align: left;
.d1 {
font-size: 0.32rem;
font-weight: 400;
color: #141E34;
overflow: hidden;
text-overflow: ellipsis;
-webkit-line-clamp: 1;
display: -webkit-box;
-webkit-box-orient: vertical;
}
.d2 {
font-size: 0.26rem;
font-weight: 400;
color: #9CA3B0;
margin-top: 0.1rem;
line-height: 0.37rem;
}
}
.right {
font-size: 0.28rem;
font-weight: 400;
color: #6D798F;
position: relative;
margin-right: 0.57rem;
white-space: nowrap;
flex: 1;
&.green {
color: #1CB855;
}
&.red {
color: #FF5555;
}
&:after {
content: "";
width: 0.2rem;
height: 0.2rem;
background: url("https://cdn-daikuan.360jie.com.cn/pic/45d129128b9881f48cc2870b13b05110.png?max_age=36000000") no-repeat;
background-size: 100% auto;
position: absolute;
top: 50%;
right: -0.32rem;
transform: translateY(-50%);
-webkit-transform: translateY(-50%);
}
}
}
</style>