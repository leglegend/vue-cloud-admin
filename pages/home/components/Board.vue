<template>
  <el-row class="home-card-row" :gutter="30">
    <el-col :sm="6" :xs="12">
      <div class="home-card persion">
        <div class="card-icon cannotselect">
          <i class="el-icon-user-solid"></i>
        </div>
        <div class="card-content">
          <div class="content-title hidden-xs-only">顾客人次</div>
          <div class="content-number">{{ board.people }}</div>
        </div>
      </div>
    </el-col>
    <el-col :sm="6" :xs="12">
      <div class="home-card card">
        <div class="card-icon cannotselect">
          <i class="el-icon-s-goods"></i>
        </div>
        <div class="card-content">
          <div class="content-title hidden-xs-only">售卡数量</div>
          <div class="content-number">{{ board.card }}</div>
        </div>
      </div>
    </el-col>
    <el-col :sm="6" :xs="12">
      <div class="home-card money">
        <div class="card-icon cannotselect">
          <i class="el-icon-s-flag"></i>
        </div>
        <div class="card-content">
          <div class="content-title hidden-xs-only">今日营收</div>
          <div class="content-number">{{ board.money }}</div>
        </div>
      </div>
    </el-col>
    <el-col :sm="6" :xs="12">
      <div class="home-card member">
        <div class="card-icon cannotselect">
          <i class="el-icon-s-finance"></i>
        </div>
        <div class="card-content">
          <div class="content-title hidden-xs-only">卡内消费</div>
          <div class="content-number">{{ board.member }}</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getBoard } from "@/api/report.js";

export default {
  name: "Board",
  data() {
    return {
      board: {
        people: 0,
        card: 0,
        money: 0,
        member: 0,
      },
    };
  },
  methods: {
    getBoard() {
      getBoard().then((res) => {
        this.board = res;
      });
    },
  },
  mounted() {
    this.getBoard();
  },
};
</script>

<style lang="scss" scoped>
.home-card-row {
  flex-wrap: wrap;
  padding-top: 10px;
  .home-card {
    padding: 0;
    display: flex;
    align-items: center;
    padding: 15px 0 15px 0px;
    color: white;
    width: 100%;
    border-radius: 3px;
    transition: 0.3s;
    justify-content: space-between;
    margin-bottom: 20px;
    opacity: 0.85;
    .card-icon {
      display: flex;
      width: 40%;
      justify-content: center;
      align-items: center;
      font-size: 50px;
      transition: 0.3s;
      height: 60px;
    }
    .card-content {
      width: 60%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      text-align: center;
      .content-title {
        font-size: 20px;
        color: #f0f0f0;
        width: 100%;
      }
      .content-number {
        font-size: 25px;
        width: 100%;
        font-weight: 600;
      }
    }
    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
      opacity: 1;
      .card-icon {
        font-size: 60px;
      }
    }
  }
  .persion {
    background: #40c9c6;
  }
  .card {
    background: #36a3f7;
  }
  .money {
    background: #f4516c;
  }
  .member {
    background: #34bfa3;
  }
}
</style>
