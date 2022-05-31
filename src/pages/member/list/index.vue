<template>
  <div class="member-list-container">
    <el-row>
      <el-col :span="24">
        <el-card shadow="hover">
          <el-form ref="searchFormRef" class="list-from" :model="searchForm" label-position="left">
            <el-row :gutter="50">
              <el-col :md="24" :lg="12">
                <el-form-item label="关键字:" label-width="80px" prop="keyWord">
                  <el-input
                    v-model.trim="searchForm.keyWord"
                    placeholder="手机号 | 姓名 | 昵称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="性别:" label-width="80px" prop="sex">
                  <el-select v-model="searchForm.sex" clearable placeholder="请选择">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="注册日期:" label-width="80px" prop="beginDate">
                  <div class="date-box">
                    <el-date-picker
                      v-model="searchForm.beginDate"
                      type="date"
                      placeholder="开始日期"
                      format="YYYY年MM月DD日"
                      value-format="YYYY-MM-DD"
                    ></el-date-picker>
                    <div class="box-center">-</div>
                    <el-date-picker
                      v-model="searchForm.endDate"
                      type="date"
                      placeholder="结束日期"
                      format="YYYY年MM月DD日"
                      value-format="YYYY-MM-DD"
                    ></el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="标签:" label-width="80px" prop="tags">
                  <el-select
                    v-model="searchForm.tags"
                    clearable
                    multiple
                    collapse-tags
                    placeholder="请选择"
                  >
                    <el-option label="程序员" value="1"></el-option>
                    <el-option label="技术宅" value="2"></el-option>
                    <el-option label="外卖员" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="none">
                <el-button
                  type="primary"
                  plain
                  icon="el-icon-plus"
                  :loading="dialogVisible"
                  @click="dialogVisible = true"
                >
                  新建会员
                </el-button>
              </el-col>
              <el-col class="form-button" :span="12">
                <el-button type="primary" @click="getTableList(table.page, table.pageSize)">
                  查询
                </el-button>
                <el-button @click="resetForm(searchFormRef)">重置</el-button>
              </el-col>
            </el-row>
          </el-form>
          <el-table
            v-loading="table.loading"
            :data="table.tableData"
            border
            stripe
            style="width: 100%"
          >
            <el-table-column prop="name" label="昵称" width="170"></el-table-column>
            <el-table-column prop="phone" label="手机号" width="160"></el-table-column>

            <el-table-column prop="date" label="注册时间" width="180"></el-table-column>

            <el-table-column prop="email" label="邮箱" width="180"></el-table-column>

            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button size="small" @click="handleView(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="table-pagination">
            <el-pagination
              background
              layout="total, sizes, prev, pager, next"
              :total="table.total"
              :page-sizes="[10, 30, 50]"
              :page-size="table.pageSize"
              :current-page="table.page"
              @size-change="pageSizeChange"
              @current-change="pageChange"
            ></el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- <create-member :visible.sync="dialogVisible" /> -->
  </div>
</template>

<script lang="ts" setup name="MemberList">
  import { queryUser } from '@/api/user'
  import useTable from '@/utils/hooks/table'
  import { onMounted, reactive, ref, toRef, watch } from 'vue'
  import type { FormInstance } from 'element-plus'
  // import CreateMember from './components/CreateMember.vue'

  const searchForm = reactive({
    keyWord: '',
    sex: '',
    beginDate: '',
    endDate: '',
    tags: []
  })

  const { table, pageChange, pageSizeChange } = useTable()

  const page = toRef(table, 'page')
  const pageSize = toRef(table, 'pageSize')

  const dialogVisible = ref(false)

  const searchFormRef = ref<FormInstance>()

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    searchForm.endDate = ''
    formEl.resetFields()
  }

  const handleView = (row: any) => {
    console.log(row)
  }

  const getTableList = (page: number = table.page, pageSize: number = table.pageSize) => {
    table.loading = true
    console.log({ ...searchForm })
    queryUser({
      page,
      pageSize,
      ...searchForm
    }).then((res: any) => {
      table.total = res.total
      table.tableData = res.dataList
      table.loading = false
    })
  }

  watch([page, pageSize], () => {
    getTableList(table.page, table.pageSize)
  })

  onMounted(() => {
    getTableList()
  })
</script>

<style lang="scss" scoped>
  .member-list-container {
    .none {
      visibility: hidden;
    }
    .el-table {
      min-height: 300px;
    }
    .el-input {
      max-width: 220px;
    }
    .card-min {
      position: relative;
      .el-icon-question {
        position: absolute;
        left: -16px;
        top: 12px;
      }
    }

    .date-box {
      display: flex;
      align-items: center;
      .box-center {
        margin: 0 10px;
      }
    }
    .list-from {
      margin-bottom: 20px;
      .form-button {
        display: flex;
        justify-content: flex-end;
      }
    }
    .table-pagination {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
    .user-logo {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
</style>
