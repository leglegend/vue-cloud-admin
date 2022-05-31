<template>
  <div class="member-detail">
    <el-card shadow="hover">
      <el-page-header @back="goBack" content="用户详情"></el-page-header>
    </el-card>

    <el-row class="member-detail-row" :gutter="15">
      <el-col class="member-info" :xs="24" :sm="10" :md="8" :lg="7" :xl="6">
        <el-card shadow="hover" body-style="padding:0">
          <div class="user-info">
            <div class="edit-user cannotselect" @click="editDetail">
              <i :class="editLoading ? 'el-icon-loading' : 'el-icon-edit-outline'"></i>
            </div>
            <div class="user-logo">
              <img
                src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-14903f47-ecdc-4230-b720-dd24d6d48f85/70ed1b9b-3cd1-4dd1-9768-780bf1c1f613.jpg"
              />
            </div>
            <div class="user-name">
              {{ detail.name }}
              <el-icon>
                <Male v-if="detail.sex == '1'" class="el-icon-male" />
                <Female v-else class="el-icon-female" />
              </el-icon>
            </div>
            <el-descriptions class="margin-top" :column="1">
              <el-descriptions-item>
                <template #label>
                  <el-icon class="margin-right"><Iphone /></el-icon>
                  {{ detail.phone }}
                </template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <el-icon class="margin-right"><House /></el-icon>
                  {{ detail.address }}
                </template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <el-icon class="margin-right"><Message /></el-icon>
                  {{ detail.mail }}
                </template>
              </el-descriptions-item>
            </el-descriptions>
            <el-divider></el-divider>
          </div>
          <radar-chart :detail="detail" />
          <div class="user-tag">
            <el-divider></el-divider>
            <el-tag>程序员</el-tag>
            <el-tag type="success">技术宅</el-tag>
            <el-tag type="warning">新手小白</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="14" :md="16" :lg="17" :xl="18">
        <el-card shadow="hover">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane class="card-list" label="应用" name="card">
              <el-row :gutter="15">
                <el-col
                  v-for="card in detail.Cards"
                  :key="card.CardId"
                  class="card-col"
                  :sm="24"
                  :md="12"
                  :lg="8"
                >
                  <!-- <member-card :card="card" /> -->
                </el-col>
                <el-col class="card-col" :sm="24" :md="12" :lg="8">
                  <el-card shadow="hover" body-style="padding:0">
                    <div class="add-card cannotselect">
                      <i class="el-icon-plus"></i>
                      添加应用
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="优惠券" name="coupon">优惠券</el-tab-pane>
          </el-tabs>
        </el-card>
        <el-card class="tarde-list" shadow="hover">
          <template slot="header">消费流水</template>
          <trade-list />
        </el-card>
      </el-col>
    </el-row>

    <edit-member
      :visible="editLoading"
      :detail="detail"
      @update="editLoading = $event"
      @success="getMemberDetail"
    />
  </div>
</template>

<script lang="ts" setup name="MemberDetail">
  import { getDetail } from '@/api/user'
  // import MemberCard from '@/components/MemberCard.vue'
  import RadarChart from './components/RadarChart.vue'
  import TradeList from './components/TradeList.vue'
  import EditMember from './components/EditMember.vue'
  import { computed, onMounted, reactive, ref } from 'vue'

  const member = reactive({
    detail: {} as any,
    loading: false
  })

  const detail = computed(() => {
    return member.detail
  })

  const getMemberDetail = () => {
    member.loading = true
    getDetail().then(res => {
      member.detail = res
      member.loading = false
    })
  }

  const activeName = ref('card')

  const goBack = () => {
    window.history.back()
  }

  onMounted(() => {
    getMemberDetail()
  })

  function handleClick(tab: any, event: any) {
    console.log(tab, event)
  }

  const editLoading = ref(false)

  function editDetail() {
    editLoading.value = true
  }
</script>

<style lang="scss" scoped>
  .member-detail {
    .member-detail-row {
      margin-top: 15px;
      .member-info {
        margin-bottom: 15px;
        .user-info {
          padding: 20px 20px 0px 20px;
          position: relative;
          .edit-user {
            padding: 15px;
            position: absolute;
            right: 0;
            top: 0;
            cursor: pointer;
            font-size: 20px;
            color: #909399;
          }
          .user-logo {
            display: flex;
            justify-content: center;
            padding-top: 10px;
            img {
              width: 80px;
              height: 80px;
              border-radius: 50%;
            }
          }
          .user-name {
            padding-top: 5px;
            line-height: 40px;
            height: 40px;
            font-size: 21px;
            text-align: center;
            color: #303133;
            .el-icon-male {
              color: skyblue;
            }
            .el-icon-female {
              color: pink;
            }
          }
          .margin-top {
            margin-top: 20px;
            padding-left: 20px;
          }
          .margin-right {
            margin-right: 5px;
          }
          .el-divider--horizontal {
            margin: 20px 0;
          }
        }
        .user-tag {
          padding: 0px 20px 20px 20px;
          .el-divider--horizontal {
            margin: 0 0 20px 0;
          }
          .el-tag {
            margin-right: 15px;
          }
        }
      }
      .card-list {
        .el-card {
          width: 300px;
        }
        .card-col {
          display: flex;
          padding: 20px 0;
          justify-content: center;
        }
        .add-card {
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #c9c9c9;
          background: #f5f5f5;
          cursor: pointer;
          .el-icon-plus {
            font-weight: 600;
            margin-right: 10px;
            margin-top: 4px;
          }
        }
      }
      .tarde-list {
        margin-top: 15px;
      }
    }
  }
</style>
