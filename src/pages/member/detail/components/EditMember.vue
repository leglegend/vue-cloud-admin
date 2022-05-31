<template>
  <el-dialog
    title="编辑会员"
    :width="isMobile ? '95%' : '500px'"
    v-model="dialogVisible"
    :before-close="closeDialog"
  >
    <div class="create-form">
      <el-form ref="formRef" :model="form" label-width="80px">
        <el-form-item label="手机号" prop="phone" required>
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name" required>
          <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="name" required>
          <el-input v-model="form.address" placeholder="请输入住址"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="mail" required>
          <el-input v-model="form.mail" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" required>
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="0">女</el-radio>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button :disabled="loading" @click="closeDialog">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit(formRef)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { editUser } from '@/api/user'
  import { ElMessage } from 'element-plus'
  import { useStore } from 'vuex'
  import { computed, reactive, ref, watch } from 'vue'
  import type { FormInstance } from 'element-plus'

  const formRef = ref<FormInstance>()

  const store = useStore()
  const isMobile = computed(() => store.state.isMobile)
  const form = reactive({
    name: '',
    phone: '',
    address: '',
    mail: '',
    sex: ''
  })
  const dialogVisible = ref(false)
  const loading = ref(false)
  const props = defineProps(['visible', 'detail'])
  const visible = computed(() => props.visible)
  const detail = computed(() => props.detail)

  const emit = defineEmits(['success', 'update'])

  const onSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        doEditMember()
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  watch(
    visible,
    val => {
      loading.value = false
      refreshDate(detail.value)
      dialogVisible.value = val
    },
    { immediate: true }
  )

  function refreshDate(value: any) {
    form.name = value.name
    form.phone = value.phone
    form.address = value.address
    form.mail = value.mail
    form.sex = value.sex
  }

  function doEditMember() {
    loading.value = true
    editUser(form)
      .then(res => {
        loading.value = false
        emit('success')
        closeDialog()
        ElMessage({
          message: '编辑成功',
          type: 'success',
          duration: 5 * 1000
        })
      })
      .catch(res => {
        loading.value = false
      })
  }

  function closeDialog() {
    if (loading.value) return
    dialogVisible.value = false
    emit('update', !visible.value)
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
