<template>
  <div class="box-login cannotselect">
    <div class="box-logo">
      <img class="logo" src="@/assets/logo.png" />
    </div>
    <el-card class="box-card" shadow="always">
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.account" prefix-icon="el-icon-user" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            prefix-icon="el-icon-key"
            placeholder="密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-button type="primary" :loading="isLoading" @click="onLogin" class="login-btn">
          登录
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from '@vue/reactivity'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  const store = useStore()
  const router = useRouter()
  interface Login {
    account: string
    password: string
  }

  const form = reactive<Login>({
    account: 'admin',
    password: '123456'
  })
  const disabled = ref<boolean>(false)
  const isLoading = ref<boolean>(false)

  function onLogin() {
    disabled.value = true
    isLoading.value = true
    store
      .dispatch('user/login', {
        account: form.account,
        password: form.password
      })
      .then(res => {
        router.push({ name: 'Home' })
      })
  }
</script>

<style lang="scss">
  body {
    width: 100%;
    height: 100vh;
  }

  .box-login {
    height: 80vh;
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
