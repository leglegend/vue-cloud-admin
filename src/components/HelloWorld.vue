<template>
  <button type="button" @click="onClick">count is: {{ count }}</button>
  <el-input v-model="value" placeholder="请输入value"></el-input>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useStore } from 'vuex'
  import { login } from '../api/user'
  const value = ref('Hello World')
  const store = useStore()
  const count = computed(() => {
    return store.state.count
  })
  const onClick = () => {
    store.commit('increment')
  }
  onMounted(() => {
    login({ account: 'admin', password: '123456' }).then(res => {
      console.log(res)
    })
  })
</script>
