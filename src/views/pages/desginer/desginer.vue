<style lang="scss">
.desginer{
  box-sizing: border-box;
  display: flex;
  position: absolute;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: #bcc8d4;
  background-color: #282c34;
}
.components-list{
  width: 100%;
  height: 46px;
  flex-shrink: 0;
  position: relative;
  &-item{
    cursor: pointer;
    padding: 10px 20px;
  }
}
.body{
  box-sizing: border-box;
  display: flex;
  position: relative;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  padding: 0 210px;
  color: #bcc8d4;
  background-color: #282c34;
  .model-text{
    padding: 0 20px;
    box-sizing: border-box;
    margin-bottom: 10px;
    line-height: 35px;
    height: 35px;
    text-align: center;
    font-size: 13px;
    letter-spacing: 2px;
    text-indent: 2px;
    background-color: #2d343c;
    color: #fff;
  }
  .left{
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    width: 210px;
    height: 100%;
    background-color: #001529;
    .coverage-list{
      position: relative;
      .coverage-item{
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: grab;
        &.active{
          background-color: #192835;
        }
        &:active{
          cursor: grabbing;
        }
        &:hover{
          box-shadow: 0 0 3px #888888 inset;
        }
      }
    }
  }
  .handle-area{
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    overflow: scroll;
    background-image:  url(https://img.alicdn.com/tfs/TB184VLcPfguuRjSspkXXXchpXa-14-14.png);
    background-repeat: repeat;
    .canvas{
      position: relative;
      background-color: rgba(16, 12, 42, 1);
      background-size: cover;
      &-grid{
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(hsla(0,0%,100%,.3) 1px,transparent 0), linear-gradient(90deg,hsla(0,0%,100%,.3) 1px,transparent 0);
      }
    }
  }
  .right{
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    width: 210px;
    height: 100%;
    color: #bcc8d4;
    background-color: #001529;
    overflow: scroll;
    // background-color: #fff;
    .base-config,.component-config{
      color: #bcc8d4;
      box-sizing: border-box;
      &-item{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
    }
    .component-none{
      text-align: center;
    }
    .handle-btns{
      position: relative;
      padding: 5px 20px;
      .handle-btn{
        margin-bottom: 10px;
      }
    }
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header{
    color: #bcc8d4;
  }
  .ant-collapse.ant-collapse-icon-position-left{
    background-color: #001529;
  }
  .ant-switch{
    background-color: #42444b;
  }
  .ant-switch.ant-switch-checked{
    background-color: #1890ff;
  }
}
</style>

<template>
  <div class="desginer">
    <div class="components-list">
      <a-menu mode="horizontal" theme="dark" :selectable="false">
        <a-sub-menu v-for="cate in components" :key="cate.key">
          <span slot="title"><span>{{cate.cateName}}</span></span>
          <a-menu-item v-for="item in cate.cateList" :key="item.name" @click="addToCanvas(item)">
            {{item.label}}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
    <div class="body">
      <div class="left">
        <p class="model-text">图层</p>
        <div class="coverage-list">
          <draggable v-model="canvasList" @end="dragCanvasItemEnd">
            <transition-group>
              <div v-for="(item, index) in canvasList" :key="item.id" @click="itemClick(item)" class="coverage-item" :class="{active: coverageActiveIndex == index}">
                {{item.label}}-{{item.id}}
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
      <div ref="handle" class="handle-area">
        <div class="canvas" :style="{width:`${baseConfig.width}px`,height:`${baseConfig.height}px`,zoom,backgroundImage:`linear-gradient(rgba(16, 12, 42, ${1 - baseConfig.backgroundImageOpacity}), rgba(16, 12, 42, ${1 - baseConfig.backgroundImageOpacity})),url(${baseConfig.backgroundImage})` }">
          <div v-show="baseConfig.showGrid" class="canvas-grid" :style="{backgroundSize:`${baseConfig.gridWidth}px ${baseConfig.gridWidth}px`}" />
          <canvasItem v-for="item in canvasList" :key="item.id" :maxNum="canvasList.length - 1" :baseConfig="baseConfig" :item="item" :zoom="zoom" @click="itemClick" @configChange="changeComponentConfig" @moveCoverage="moveCoverage" @deleteItem="deleteItem"></canvasItem>
        </div>
      </div>
      <div class="right">
        <p class="model-text">操作</p>
        <a-collapse :activeKey="activeTab" :bordered="false">
          <template #expandIcon="props">
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel key="1" header="画布设置" :style="panelStyle">
            <div class="base-config">
              <div class="base-config-item">画布宽度：<a-input-number v-model="baseConfig.width" :formatter="value => `${value}px`" :parser="value => value.replace('px', '')" @change="onChangeSize" /></div>
              <div class="base-config-item">画布高度：<a-input-number v-model="baseConfig.height" :formatter="value => `${value}px`" :parser="value => value.replace('px', '')" @change="onChangeSize" /></div>
              <div class="base-config-item">网格对齐：<a-switch v-model="baseConfig.showGrid" default-checked /></div>
              <div v-show="baseConfig.showGrid" class="base-config-item">网格宽度：<a-input-number v-model="baseConfig.gridWidth" :formatter="value => `${value}px`" :parser="value => value.replace('px', '')" @change="onChangeSize" /></div>
              <a-upload name="file" :action="$config.fileUpload" @change="bgUploadChange">
                <a-button style="width:180px"> <a-icon type="upload" /> 上传背景图片 </a-button>
              </a-upload>
              <div class="base-config-item">透明度：<a-slider v-model="baseConfig.backgroundImageOpacity" :min="0" :max="1" :step="0.1" style="width:90px"/></div>
              <a-button type="danger" style="width:180px;margin-top:15px" @click="deleteBg">删除背景图片</a-button>
            </div>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="组件配置" :style="panelStyle">
            <componentConfig v-if="activeCanvasItem" :activeCanvasItem="activeCanvasItem" @change="changeComponentConfig" @deleteItem="deleteItem"></componentConfig>
          </a-collapse-panel>
        </a-collapse>
        <div class="handle-btns">
          <a-button class="handle-btn" block @click="preview">预览</a-button>
          <a-button class="handle-btn" type="primary" block @click="submit">保存</a-button>
          <a-button class="handle-btn" type="danger" block @click="clearCanvas">清空</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import components from './components-library/index'
import canvasItem from './public-components/canvas-item'
import componentConfig from './public-components/component-config'
import randomString from 'random-string'
import draggable from 'vuedraggable'

let timer = null
export default {
  data () {
    return {
      hasInit: false,
      baseConfig: {
        width: 1920,
        height: 1080,
        showGrid: false,
        gridWidth: 10,
        backgroundImage: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fobjects.chopard.com%2Fmedia%2Fcatalog%2Fcategory%2FBG-HD-2016_2.jpg&refer=http%3A%2F%2Fobjects.chopard.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627451110&t=4e2ebe0451893471ab07e4f2fd54382c',
        backgroundImageOpacity: 0.5
      },
      zoom: 1,
      activeTab: '1',
      activeCanvasItem: null,
      panelStyle: 'background: #001529;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden',
      components,
      coverageActiveIndex: null,
      canvasList: []
    }
  },
  components: {
    canvasItem,
    componentConfig,
    draggable
  },
  methods: {
    listenKeyDown () {
      document.addEventListener('keydown', this.keyDown)
    },
    keyDown (e) {
      if (!this.activeCanvasItem || e.target.tagName === 'INPUT') {
        return false
      }
      // e.preventDefault()
      let unitDistance = 1
      if (this.baseConfig.showGrid) {
        unitDistance = this.baseConfig.gridWidth
      }
      // 使用键盘上下左右、微调元素位置
      if (e.keyCode === 38) {
        // 上
        this.activeCanvasItem.config.top -= unitDistance
        if (this.activeCanvasItem.config.top < 0) {
          this.activeCanvasItem.config.top = 0
        }
      } else if (e.keyCode === 40) {
        // 下
        this.activeCanvasItem.config.top += unitDistance
        if (this.activeCanvasItem.config.top > this.baseConfig.height - this.activeCanvasItem.config.height) {
          this.activeCanvasItem.config.top = this.baseConfig.height - this.activeCanvasItem.config.height
        }
      } else if (e.keyCode === 37) {
        // 左
        this.activeCanvasItem.config.left -= unitDistance
        if (this.activeCanvasItem.config.left < 0) {
          this.activeCanvasItem.config.left = 0
        }
      } else if (e.keyCode === 39) {
        // 右
        this.activeCanvasItem.config.left += unitDistance
        if (this.activeCanvasItem.config.left > this.baseConfig.width - this.activeCanvasItem.config.width) {
          this.activeCanvasItem.config.left = this.baseConfig.width - this.activeCanvasItem.config.width
        }
      }
      // 重新赋值更新视图
      const { index } = this.activeCanvasItem
      this.canvasList[index] = this.activeCanvasItem
      const arr = JSON.parse(JSON.stringify(this.canvasList))
      this.canvasList = [...arr]
    },
    onChangeSize (e) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        this.setCanvasZoom()
      }, 300)
    },
    setCanvasZoom () {
      const { width, height } = this.baseConfig
      const widthRate = this.$refs.handle.clientWidth / width
      const heightRate = this.$refs.handle.clientHeight / height
      console.log(this.$refs.handle.clientWidth, width)
      console.log(this.$refs.handle.clientHeight, height)
      console.log(widthRate, heightRate)
      this.zoom = (widthRate > heightRate ? heightRate : widthRate).toFixed(2) - 0.02
      this.init()
    },
    init () {
      if (this.hasInit) {
        return false
      }
      const { id } = this.$route.params
      let data = null
      // eslint-disable-next-line
      if (id == 0) {
        data = JSON.parse(window.sessionStorage.getItem('previewData'))
        console.log(data)
      }
      if (data) {
        this.baseConfig = data.baseConfig
        this.canvasList = data.canvasList
        this.canvasList.find(el => {
          if (el.active) {
            this.activeCanvasItem = el
            this.coverageActiveIndex = el.index
          }
        })
        this.hasInit = true
      }
    },
    bgUploadChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} 上传成功`)
        this.baseConfig.backgroundImage = `${this.$config.fileDownload}/${info.file.response.result.fileid}`
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    dragCanvasItemEnd () {
      const { id } = this.activeCanvasItem
      this.canvasList.forEach((item, index) => {
        item.index = index
        if (item.id === id) {
          this.itemClick(item)
        }
      })
    },
    addToCanvas (item) {
      item = JSON.parse(JSON.stringify(item))
      this.activeTab = '2'
      // this.activeCanvasItem = item
      item.active = false
      item.isGroup = false
      item.id = randomString({ length: 5 })
      item.index = this.canvasList.length
      this.canvasList.push(item)
    },
    itemClick (item) {
      this.activeTab = '2'
      // this.activeCanvasItem = null
      this.canvasList.forEach(el => {
        el.active = false
      })
      setTimeout(() => {
        this.activeCanvasItem = item
        this.canvasList[item.index].active = true
        this.coverageActiveIndex = item.index
        // 重新赋值更新视图
        const arr = JSON.parse(JSON.stringify(this.canvasList))
        this.canvasList = [...arr]
      }, 100)
    },
    changeComponentConfig () {
      const { id, config } = this.activeCanvasItem
      this.canvasList.find(item => {
        if (item.id === id) {
          item.config = config
        }
      })
    },
    moveCoverage (e) {
      const arr = this.canvasList
      const { index } = e.item
      const tem = JSON.parse(JSON.stringify(arr[index]))
      // 先从数组中删除对应元素
      arr.splice(index, 1)
      if (e.handle === 'bottom') {
        // 图层置顶，把对应item移动到数组最后 push
        arr.push(tem)
      } else if (e.handle === 'top') {
        // 图层置底，把对应item移动到数组最头 unshift
        arr.unshift(tem)
      } else if (e.handle === 'down') {
        // 上移一层，向后面交换
        arr.splice(index + 1, 0, tem)
      } else if (e.handle === 'up') {
        // 下移一层，向前面交换
        arr.splice(index - 1, 0, tem)
      }
      const newCanvasList = []
      arr.forEach((el, index) => {
        el.index = index
        if (el.id === tem.id) {
          el.active = true
          this.activeCanvasItem = el
        } else {
          el.active = false
        }
        newCanvasList.push(el)
      })
      this.canvasList = []
      this.canvasList = [...newCanvasList]
    },
    deleteItem (index) {
      // const { index } = this.activeCanvasItem
      this.canvasList.splice(index, 1)
      this.canvasList.forEach((el, idx) => {
        el.index = idx
      })
      this.activeCanvasItem = null
    },
    deleteBg () {
      this.baseConfig.backgroundImage = ''
    },
    clearCanvas () {
      const _this = this
      _this.$confirm({
        title: '注意',
        content: '此操作将清空画布，请谨慎操作',
        maskClosable: true,
        okText: '确定',
        cancelText: '取消',
        onOk () {
          _this.canvasList = []
          _this.deleteBg()
          window.sessionStorage.removeItem('previewData')
        }
      })
    },
    renderData () {
      const { baseConfig, canvasList } = this
      return {
        baseConfig,
        canvasList
      }
    },
    preview () {
      const data = this.renderData()
      window.sessionStorage.setItem('previewData', JSON.stringify(data))
      this.$router.push({
        name: 'viewResult',
        params: {
          id: 0
        }
      })
    },
    submit () {
      console.log(this.canvasList)
    }
  },
  mounted () {
    this.setCanvasZoom()
    this.listenKeyDown()
  },
  destroyed () {
    document.removeEventListener('keydown', this.keyDown)
  }
}
</script>
