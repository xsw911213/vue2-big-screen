<style lang="scss" scoped>
.header-bar{
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 40px;
  padding: 10px 20px;
  background-color: #001529;
  box-shadow: 0 0 3px #888888;
  p{
    font-size: 30px;
    font-weight: 900;
    color: #fff;
    text-align: center;
  }
}
</style>
<template>
  <div>
    <div class="header-bar">
      <p>大屏设计器</p>
    </div>
    <div style="margin:20px 80px;">
      <a-button type="primary" @click="addItem">新建大屏</a-button>
      <a-table :columns="columns" :data-source="data" bordered style="margin-top:20px">
        <span slot="name" slot-scope="text, record">
          <a-button size="small" type="link" @click="previewItem(record)">{{record.name}}</a-button>
        </span>
        <span slot="action" slot-scope="text, record">
          <a-button size="small" type="primary" @click="editItem(record)">编辑</a-button>
          <a-button size="small" type="danger" @click="delItem(record)" style="margin-left:10px">删除</a-button>
        </span>
      </a-table>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: '大屏名称',
    key: 'name',
    scopedSlots: { customRender: 'name' },
    align: 'center'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
    width: 300
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' },
    width: 200
  }
]

const data = [
  {
    id: 1,
    key: '1',
    name: '大屏一',
    createTime: '2021-04-06'
  },
  {
    id: 2,
    key: '2',
    name: '大屏二',
    createTime: '2021-04-06'
  }
]

export default {
  data () {
    return {
      data,
      columns
    }
  },
  methods: {
    addItem () {
      window.sessionStorage.removeItem('previewData')
      this.$router.push({
        name: 'desginer',
        params: {
          id: 0
        }
      })
    },
    previewItem (item) {
      const { id } = item
      this.$router.push({
        name: 'viewResult',
        params: {
          id
        }
      })
    },
    editItem (item) {
      const { id } = item
      this.$router.push({
        name: 'desginer',
        params: {
          id
        }
      })
    },
    delItem (item) {
      console.log(item)
    }
  }
}
</script>
