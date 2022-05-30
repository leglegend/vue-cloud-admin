<template>
  <div class="home-container">
    <board />
    <el-row :gutter="30" class="home-row">
      <el-col :sm="16" :xs="24" class="home-col">
        <line-chart />
      </el-col>
      <el-col :sm="8" :xs="24" class="home-col">
        <pie-chart />
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col class="home-col" :sm="12" :xs="24">
        <table-list />
      </el-col>
      <el-col class="quick-cards" :sm="12" :xs="24">
        <el-row :gutter="30">
          <el-col
            v-for="(card, index) in quickCards"
            :key="index"
            class="card-col"
            :sm="8"
            :xs="12"
          >
            <el-card shadow="hover">
              <div class="card">
                <div class="card-icon">
                  <el-icon>
                    <component :is="card.icon" :style="{ color: card.color }"></component>
                  </el-icon>
                </div>
                <div class="card-title">{{ card.name }}</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup name="Home">
  import Board from './components/Board.vue'
  import LineChart from './components/LineChart.vue'
  import PieChart from './components/PieChart.vue'
  import TableList from './components/TableList.vue'

  const quickCards = [
    { icon: 'Help', name: '帮助', color: 'rgb(149, 222, 100)' },
    {
      icon: 'Picture',
      name: '店铺码',
      color: 'rgb(105, 192, 255)'
    },
    {
      icon: 'Edit',
      name: '记账',
      color: 'rgb(255, 214, 102)'
    },
    {
      icon: 'Postcard',
      name: '制卡',
      color: 'rgb(92, 219, 211)'
    },
    {
      icon: 'CirclePlus',
      name: '创建会员',
      color: 'rgb(179, 127, 235)'
    },
    {
      icon: 'User',
      name: '会员列表',
      color: 'rgb(255, 133, 192)'
    }
  ]
  const cardStype = {
    padding: '20px 0'
  }
</script>

<style lang="scss" scoped>
  .home-container {
    .home-row {
      padding-top: 10px;
    }
    .home-col {
      margin-bottom: 30px;
    }
    .quick-cards {
      .card-col {
        margin-bottom: 20px;
        .card {
          height: 90px;
          display: flex;
          align-content: center;
          justify-content: center;
          flex-wrap: wrap;
          .card-icon {
            height: 50px;
            display: flex;
            align-items: center;
            i {
              font-size: 50px;
              font-weight: 500;
              color: rgb(149, 222, 100);
              transition: 0.2s;
            }
          }
          .card-title {
            width: 100%;
            text-align: center;
            padding-top: 10px;
          }
          &:hover {
            .card-icon {
              i {
                font-size: 55px;
              }
            }
          }
        }
      }
    }
  }
</style>
