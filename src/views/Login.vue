<template>
  <div>
    <div class="login">
      <div class="logo">
        <img src="../assets/images/sculpture.jpg" alt />
      </div>
      <div class="login-form">
        <div>
          <form>
            <div class="form-group">
              <input type="tel" maxlength="13" placeholder="手机号" class="input-control" />
              <div class="getSmsCode">
                  获取验证码
              </div>
            </div>
             <div class="form-group">
              <input  placeholder="验证码" class="input-control" />
            </div>
            <div class="login-btn">
                <span>登陆</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  beforeMount() {
    this.$store.commit("HideTabbar", false);
  },
   beforeDestroy() {
    this.$store.commit("ShowTabbar", true);
  }
};
</script>
<style scoped>
.login {
    font-size: 15px;
}
.login .logo {
  margin: 79px auto 40px;
  text-align: center;
  height: 60px;
  line-height: 60px;
}
.login .logo img {
  width: 60px;
}
.login .login-form {
  width: 100%;
  position: relative;
  border-bottom: 1px solid #eee;
}
.login .login-form .form-group {
  line-height: 55px;
  margin: 0 25px;
  position: relative;
}
.login .login-form .input-control {
  height: 15px;
  line-height: 15px;
  padding: 20px 0;
  width: 100%;
  font-size: 15px;
  color: #191a1b;
  border: 0;
  outline-width: 0;
}
.login .login-form .getSmsCode {
  font-size: 13px;
  position: absolute;
  right: 0px;
  top: 13px;
  color: #bdc0c5;
  line-height: 30px;
  width: 90px;
  text-align: right;
  float: right;
  border-radius: 3px;
  cursor: pointer;
}
.login .login-form .login-btn {
    margin-top: 70px;
    line-height: 45px;
    font-size: 16px;
    margin: 70px 25px 0;
    border-radius: 3px;
    text-align: center;
    background-color: skyblue;
    height: 44px;
    color: #fff;
    border: none;
}
div {
  box-sizing: border-box;
}
</style>