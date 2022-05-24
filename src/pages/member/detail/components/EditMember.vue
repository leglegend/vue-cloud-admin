<template>
  <el-dialog
    title="编辑会员"
    :width="isMobile ? '95%' : '500px'"
    :visible="dialogVisible"
    :before-close="closeDialog"
  >
    <div class="create-form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号" prop="phone" required>
          <el-input
            v-model="form.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name" required>
          <el-input
            v-model="form.name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="name" required>
          <el-input
            v-model="form.address"
            placeholder="请输入住址"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="mail" required>
          <el-input
            v-model="form.mail"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" required>
          <el-radio
              v-model="form.sex"
              label="1"
            >
              男
            </el-radio>
            <el-radio
              v-model="form.sex"
              label="0"
            >
              女
            </el-radio>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button :disabled="loading" @click="closeDialog">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editUser } from '@/api/user.js'
import { Message } from 'element-ui'
import mobile from '@/utils/mixin/mobile.js'

export default {

  props: ['visible', 'detail'],
  data () {
    return {
      form: {
        name: '',
        phone: '',
        address: '',
        mail: '',
        sex: ''
      },
      dialogVisible: false,
      loading: false
    }
  },
  mixins: [mobile],
  watch: {
    visible: {
      immediate: true,
      handler (value) {
        this.loading = false
        if (value) {
          this.refreshDate(this.detail)
          this.dialogVisible = true
        }
      }
    }
  },
  methods: {
    closeDialog () {
      if (this.loading) return
      this.dialogVisible = false
      this.$emit('update:visible', !this.visible)
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        this.doEditMember()
      })
    },
    refreshDate ({ name, phone, address, mail, sex }) {
      this.form = Object.assign({ name, phone, address, mail, sex })
    },
    doEditMember () {
      this.loading = true
      editUser(this.form)
        .then((res) => {
          this.loading = false
          this.$emit('success')
          this.closeDialog()
          Message({
            message: '编辑成功',
            type: 'success',
            duration: 5 * 1000
          })
        })
        .catch((res) => {
          this.loading = false
        })
    }
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>
  .create-form {
    padding: 0 10px;
  }
  .member-card {
    max-height: 900px;
  }
</style>
