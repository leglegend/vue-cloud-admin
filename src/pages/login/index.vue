<template>
  <div class="box-login cannotselect">
    <div class="box-logo">
      <img class="logo" src="@/assets/logo.png" />
    </div>
    <el-card class="box-card" shadow="always">
      <el-form :model="form">
        <el-form-item>
          <el-input
            v-model="form.account"
            prefix-icon="el-icon-user"
            placeholder="账号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            prefix-icon="el-icon-key"
            placeholder="密码"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-button
          type="primary"
          :loading="isLoading"
          @click="onLogin"
          class="login-btn"
        >
          登录
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        account: 'admin',
        password: '123456'
      },
      disabled: false,
      isLoading: false
    }
  },
  methods: {
    onLogin () {
      this.disabled = true
      this.isLoading = true
      const loginInfo = {
        account: this.form.account,
        password: this.form.password
      }
      this.$store.dispatch('user/login', loginInfo).then((res) => {
        this.$router.push({
          path: '/'
        })
      })
      
    }
  },
  mounted() {
uniCloud.callFunction({
    name: 'user',
    data: { a: 1 }
   })
  .then(res => {
    console.log(res)
  });
  }
}
</script>

<style lang="scss">
  body {
    width: 100%;
    height: 100vh;
  }

  .box-login {
    height: 80%;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 500px;
    min-width: 300px;
    margin: 0 auto;

    .box-logo {
      width: 80%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 70px;

      .logo {
        width: 80%;
      }
    }

    .box-card {
      padding: 20px;
      width: 80%;
      margin: 0 auto;

      .login-btn {
        width: 100%;
        margin-top: 30px;
      }
    }
  }
</style>
