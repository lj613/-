<template>
<div id="main">
  <div class="center-container">
    <div class="avatar">
      <img src="../assets/images/4.jpg" alt class="avator-icon" />
      <div class="nick-name" @click="login">立即登录</div>
    </div>
    <ul class="order-tab">
      <li class="tab-item">
        <img src="../assets/images/movie.png" alt />
        <div class="msg">电影订单</div>
      </li>
      <li class="tab-item">
        <img src="../assets/images/product.png" alt />
        <div class="msg">电影订单</div>
      </li>
    </ul>
    <div class="list-item">
      <img src="../assets/images/voucher.png" alt />
      <span class="label">卖座券</span>
      <span class="iconfont icon--right-arrow"></span>
    </div>
     <div class="list-item">
      <img src="../assets/images/packet.png" alt />
      <span class="label">组合红包</span>
      <span class="iconfont icon--right-arrow"></span>
    </div>
     <div class="list-item">
      <img src="../assets/images/balance.png" alt />
      <span class="label">余额</span>
      <span>￥</span><span>0</span>
      <span class="iconfont icon--right-arrow"></span>
    </div>
     <div class="list-item">
      <img src="../assets/images/set.png" alt />
      <span class="label">设置</span>
      <span class="iconfont icon--right-arrow"></span>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name:'Center',
  methods: {
    login(){
      // console.log(111)
       this.$router.push("/login")
    }
  },
};
</script>
<style scoped>
#main{
  width: 100%;
  height: 100%;
  background-color: plum;
}
.center-container {
  position: relative;
  right: 0;
  left: 0;
  font-size: 15px;
  background: #f4f4f4;
  box-sizing: border-box;
}
div {
  box-sizing: border-box;
}
.center-container .avatar {
  text-align: center;
  margin-top: -44px;
  height: 200px;
  padding-left: 22px;
  padding-top: 64px;
  background: url(../assets/images/center-bg.png);
  background-size: cover;
  display: flex;
  align-items: center;
  color: #fff;
  box-sizing: border-box;
}
.center-container .avatar .avator-icon {
  width: 63px;
  height: 63px;
  border-radius: 35px;
  margin-right: 20px;
  border: 2px solid #fff;
}
.center-container .avatar .nick-name {
  font-size: 16px;
}
.center-container .order-tab {
  width: 100%;
  margin: 0 auto;
  display: flex;
  text-align: center;
  font-size: 13px;
  padding: 0;
  height: 79px;
  background: #fff;
  margin-bottom: 10px;
  align-items: center;
}
.center-container .order-tab .tab-item {
  position: relative;
  flex: 1;
  list-style: none;
}
.center-container .order-tab .tab-item img {
  width: 26px;
  height: 26px;
}
.center-container .order-tab .tab-item .msg {
  color: #797d82;
}
.center-container .list-item {
  background: #fff;
  padding: 0 15px;
  height: 49px;
  display: flex;
  align-items: center;
}
.center-container .list-item img {
  width: 20px;
  height: 20px;
}
.center-container .list-item .label {
  margin-left: 15px;
  color: #191a1b;
  flex: 1;
}
.center-container .list-item span{

  color: #a09d9d;
}
.center-container .list-item .iconfont  {
  text-align: right;
  font-weight: 500;
  color: #d6d1d1;
}
</style>