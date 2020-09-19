<template>
  <header id="header" class="fixed" >
   <!-- <div class="left">
     <span class="name" @click="clickToCity">北京</span>
        <span class="iconfont icon-dropdown"></span>
   </div> -->
    <slot name="left"></slot>
   <div class="center">
     <h1>{{title}}</h1>
   </div>
   <!-- <div class="right">
        <span class="iconfont icon-search"></span>
   </div> -->
    <slot name="right"></slot>
  </header>
</template>
<script>
export default {
  name: "Header",
  props:{
    title:{
      type:String,
      default:'电影'
    }
  },
  methods: {
    clickToCity(){
         this.$router.push(`/city`)
    }
  },
 
};
</script>
<style scoped>
#header {
  width: 100%;
  height: 50px;
  color: #fff;
  background: #ff5f16;
  /* border-bottom: 1px solid #e54847; */
  /* overflow: hidden; */
  /* position: relative; */
  /* display: flex; */
  /* justify-content: space-between; */
  /* align-items: center; */
  /* padding: 0 15px; */
  /* box-sizing: border-box; */
  border: 1px solid #e54847;
}
#header .left {
  position: absolute;
  left: 5px;
  top: 50%;
  margin-top: -25px;
  font-size: 26px;

}
#header .left .name{
  font-size: 12px;
  font-weight: 200;
}
#header .left .icon-dropdown{
  
}
/* #header .center{
 font-size: 18px;
  text-align: center;
  line-height: 50px;
  font-weight: normal;
} */
#header h1 {
  font-size: 18px;
  text-align: center;
  line-height: 50px;
  font-weight: normal;
}
#header .right{
  position: absolute;
  right: 5px;
  top: 50%;
  margin-top: -20px;
  font-size: 26px;
}
#header .right .icon-search{
  font-size: 26px;
}
.fixed {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 40px;
  z-index: 4;

}
</style>