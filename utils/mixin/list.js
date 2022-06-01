const list = {
  data () {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      loading: true,
      tableData: []
    }
  },
  watch: {
    page () {
      this.getList()
    },
    pageSize () {
      if (this.page === 1) {
        this.getList()
      } else {
        this.page = 1
      }
    }
  },
  methods: {
    sizeChange (pageSize) {
      this.pageSize = pageSize
    },
    currentChange (page) {
      this.page = page
    }
  }
}

export default list
