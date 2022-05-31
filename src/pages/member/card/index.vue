<template>
  <div class="member-card-container">
    <el-col class="card-col" :xl="6" :lg="8" :md="12" :sm="12" :xs="24">
      <el-card shadow="hover" body-style="padding:0">
        <div class="add-card cannotselect">
          <el-icon class="el-icon-plus"><plus /></el-icon>
          创建应用
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<style lang="scss" scoped>
  .member-card-container {
    .card-col {
      margin-bottom: 30px;
      display: flex;
      justify-content: center;
    }
    .el-card {
      width: 300px;
    }
    .add-card {
      height: 120px;
      width: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: #c9c9c9;
      cursor: pointer;
      .el-icon-plus {
        font-weight: 600;
        margin-right: 10px;
        margin-top: 4px;
      }
    }
  }
</style>
