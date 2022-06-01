<template>
  <div class="member-card-container">
    <el-row :gutter="30">
      <el-col
        v-for="card in cardList"
        :key="card.PrepaidCardId"
        class="card-col"
        :xl="6"
        :lg="8"
        :md="12"
        :sm="12"
        :xs="24"
      >
        <member-card :value="card.PrepaidCardId" :card="card" />
      </el-col>
      <el-col class="card-col" :xl="6" :lg="8" :md="12" :sm="12" :xs="24">
        <el-card shadow="hover" body-style="padding:0">
          <div
            class="add-card cannotselect"
            :loading="dialogVisible"
            @click="dialogVisible = true"
          >
            <i class="el-icon-plus"></i>
            创建应用
          </div>
        </el-card>
      </el-col>
    </el-row>
    <create-card :visible.sync="dialogVisible" />
  </div>
</template>

<script>
import { getCardList } from '@/api/member.js'
import MemberCard from '@/components/MemberCard.vue'
import CreateCard from './components/CreateCard.vue'

export default {
  name: 'Card',
  components: {
    MemberCard,
    CreateCard
  },
  data () {
    return {
      cardList: [],
      dialogVisible: false
    }
  },
  methods: {
    getCardList () {
      getCardList().then((res) => {
        this.cardList = res.PrepaidCards
      })
    }
  },
  mounted () {
    this.getCardList()
  }
}
</script>

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
