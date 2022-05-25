<template>
  <el-card shadow="hover" body-style="padding:0;">
    <div class="card-box">
      <div class="card-bg cannotselect">
        <img alt :src="card.CardImg" />
      </div>
      <div class="card-title">
        {{ card.CardName }}
        <el-tag type="warning" size="mini" v-if="card.CardDiscount != 10">
          {{ card.CardDiscount }}折
        </el-tag>
        <el-tag type="primary" size="mini" v-if="card.CardGivingValue"
          >送{{ card.CardGivingValue }}元</el-tag
        >
      </div>
      <div class="card-context">
        <div class="context-item" v-if="!card.CardId">
          <div>售价</div>
          <div>{{ card.Price }}元</div>
        </div>
        <div class="context-item" v-else>
          <div>余额</div>
          <div>{{ card.CardPrice }}元</div>
        </div>
        <div class="context-item">
          <div>有效期</div>
          <div>{{ card.ValidityDate }}</div>
        </div>
      </div>
      <div class="card-button">
        <el-tooltip content="编辑" placement="top">
          <i class="el-icon-edit"></i>
        </el-tooltip>
        <el-tooltip content="分享" placement="top">
          <i class="el-icon-share"></i>
        </el-tooltip>
        <el-tooltip content="删除" placement="top">
          <i class="el-icon-delete"></i>
        </el-tooltip>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'MemberCard',
  props: ['card'],
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.el-card {
  width: 300px;
  .card-box {
    min-height: 120px;
    position: relative;
    padding-bottom: 3px;
    .card-bg {
      height: 120px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        display: block;
        transition: 0.4s;
        opacity: 0.75;
      }
    }
    .card-title {
      color: #303133;
      padding: 0 10px;
      font-size: 18px;
      line-height: 35px;
    }
    .card-context {
      padding: 0 10px;
      font-size: 15px;
      .context-item {
        display: flex;
        justify-content: space-between;
        color: #606266;
        line-height: 17px;
        padding-bottom: 4px;
      }
    }
    .card-button {
      position: absolute;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      right: 0;
      top: 0;
      font-size: 18px;
      height: 30px;
      padding-right: 5px;
      color: #303133;
      i {
        padding: 0 5px;
      }
    }
    &:hover {
      .card-bg {
        img {
          width: 110%;
          opacity: 1;
        }
      }
    }
  }
}
</style>
