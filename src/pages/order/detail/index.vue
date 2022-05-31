<template>
  <el-card shadow="hover">
    <el-page-header @back="goBack" content="交易详情"></el-page-header>

    <el-descriptions class="margin-top" title="基础信息" :column="2" border>
      <el-descriptions-item>
        <template #label>
          <el-icon><user /></el-icon>
          用户名
        </template>
        <el-tag>传说中的腿腿</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon><phone /></el-icon>
          手机号
        </template>
        13333333333
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon><Edit /></el-icon>
          操作人
        </template>
        店员
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon><timer /></el-icon>
          操作时间
        </template>
        2022年5月1日
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon><tickets /></el-icon>
          备注
        </template>
        -
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions class="margin-top" title="交易信息" :column="2" border>
      <el-descriptions-item label="交易类型">付款</el-descriptions-item>
      <el-descriptions-item label="支付方式">微信</el-descriptions-item>
      <el-descriptions-item label="应付金额">100</el-descriptions-item>
      <el-descriptions-item label="实付金额">89元</el-descriptions-item>

      <el-descriptions-item label="积分">+89积分</el-descriptions-item>
    </el-descriptions>

    <el-descriptions class="margin-top" title="会员卡信息" :column="2" border>
      <el-descriptions-item label="会员卡名称">钻石会员</el-descriptions-item>
      <el-descriptions-item label="会员卡类型">储值卡</el-descriptions-item>
      <el-descriptions-item label="卡号">1521541020</el-descriptions-item>
      <el-descriptions-item label="卡余额">599</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script lang="ts" setup name="TradeDetail">
  const goBack = () => {
    window.history.back()
  }
</script>

<style lang="scss" scoped>
  .margin-top {
    margin-top: 30px;
  }
  .el-tag {
    margin-right: 10px;
  }
  .user-logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: block;
  }
</style>
