import { reactive } from 'vue'

const tableHook = () => {
  interface TableData {
    page: number
    pageSize: number
    total: number
    loading: boolean
    tableData: any[]
  }

  const table = reactive<TableData>({
    page: 1,
    pageSize: 10,
    total: 0,
    loading: true,
    tableData: []
  })

  const pageSizeChange = (pageSize: number) => {
    table.pageSize = pageSize
  }

  const pageChange = (page: number) => {
    table.page = page
  }

  return {
    table,
    pageSizeChange,
    pageChange
  }
}

export default tableHook
