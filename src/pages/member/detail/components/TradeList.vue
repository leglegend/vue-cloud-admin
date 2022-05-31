<template>
  <div>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="date" label="时间" width="120"></el-table-column>

      <el-table-column prop="type" label="类型" width="170"></el-table-column>
      <el-table-column prop="amount" label="金额" width="170"></el-table-column>
      <el-table-column prop="name" label="操作人"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'

  const tableData = reactive([
    {
      date: '5-21',
      type: '微信',
      amount: '100元',
      name: '店员'
    },
    {
      date: '5-21',
      type: '微信',
      amount: '100元',
      name: '店员'
    },
    {
      date: '5-21',
      type: '微信',
      amount: '100元',
      name: '店员'
    },
    {
      date: '5-21',
      type: '微信',
      amount: '100元',
      name: '店员'
    },
    {
      date: '5-21',
      type: '微信',
      amount: '100元',
      name: '店员'
    }
  ])
</script>

<style lang="scss" scoped>
  .table-pagination {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
</style>
