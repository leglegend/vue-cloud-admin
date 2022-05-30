import { reactive } from 'vue'

const tableHook = () => {
  const tableRef = useRef<HTMLTableElement>(null)
  const [tableData, setTableData] = useState<TableData>({
    columns: [],
    rows: [],
    total: 0
  })
  const [tableState, setTableState] = useState<TableState>({
    page: 1,
    limit: 10,
    sort: '',
    order: 'asc'
  })
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const [tableError, setTableError] = useState<string>('')

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableState({
      ...tableState,
      page: pagination.current,
      limit: pagination.pageSize
    })
  }

  const handleTableSort = (pagination: TableSortInfo) => {
    setTableState({
      ...tableState,
      sort: pagination.columnKey,
      order: pagination.order
    })
  }

  const handleTableData = (data: TableData) => {
    setTableData(data)
  }

  const handleTableLoading = (loading: boolean) => {
    setTableLoading(loading)
  }

  const handleTableError = (error: string) => {
    setTableError(error)
  }

  const handleTableRef = (ref: React.RefObject<HTMLTableElement>) => {
    tableRef.current = ref.current
  }

  const table = reactive({
    page: 1,
    pageSize: 10,
    total: 0,
    loading: false,
    tableData: []
  })

  return {
    tableRef,
    tableData,
    tableState,
    tableLoading,
    tableError,
    handleTableChange,
    handleTableSort,
    handleTableData,
    handleTableLoading,
    handleTableError,
    handleTableRef
  }
}

export default tableHook
