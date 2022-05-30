<template>
  <el-card class="home-table-list" shadow="hover" body-style="padding:0px">
    <template v-slot:header>
      <span>今日流水</span>
    </template>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="time" label="时间" width="120"></el-table-column>
      <el-table-column prop="name" label="用户" width="170"></el-table-column>
      <el-table-column prop="money" label="消费"></el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
  import { getList } from '@/api/report'
  import { reactive } from '@vue/reactivity'
  import { onMounted } from 'vue'
  let tableData = reactive([])
  onMounted(() => {
    getList().then((res: any) => {
      tableData = res
    })
  })
</script>

<style lang="scss" scoped>
  .home-table-list {
    padding: 0;
  }
  .popover-content {
    .user-logo {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
</style>
