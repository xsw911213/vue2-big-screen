<style lang="scss">
.component-config{
  color: #bcc8d4;
  box-sizing: border-box;
  &-item{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    &-swiper-img{
      position: relative;
      width: 140px;
      height: 100px;
      img{
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>

<template>
  <div class="component-config">
    <template v-if="activeCanvasItem">
      <div class="component-config-item">图层：{{activeCanvasItem.label}}-{{activeCanvasItem.id}} <a-button type="danger" shape="circle" icon="delete" size="small" @click="deleteItem"/></div>
      <div class="component-config-item">元素宽度：<a-input-number v-model="activeCanvasItem.config.width" :formatter="value => `${value}px`" :parser="value => value.replace('px', '')" @change="changeComponentConfig"/></div>
      <div class="component-config-item">元素高度：<a-input-number v-model="activeCanvasItem.config.height" :formatter="value => `${value}px`" :parser="value => value.replace('px', '')" @change="changeComponentConfig"/></div>
      <div class="component-config-item">x坐标：<a-input-number v-model="activeCanvasItem.config.left" :formatter="value => `${value}px`" :parser="value => value.replace('px', '')" @change="changeComponentConfig"/></div>
      <div class="component-config-item">y坐标：<a-input-number v-model="activeCanvasItem.config.top" :formatter="value => `${value}px`" :parser="value => value.replace('px', '')" @change="changeComponentConfig"/></div>
      <template v-if="activeCanvasItem.config.dynamicCapability">
        <div class="base-config-item">使用接口数据：<a-switch v-model="activeCanvasItem.config.useApi"/></div>
        <template v-if="activeCanvasItem.config.useApi">
          <div class="component-config-item">接口地址：<a-textarea v-model="activeCanvasItem.config.api" :rows="2" @change="changeComponentConfig"/></div>
          <a-button class="handle-btn" type="primary" block @click="showDemoJson('readonly')">返回数据示例</a-button>
        </template>
        <template v-else>
          <template v-if="activeCanvasItem.name == 'echarts-line'">
            <div class="base-config-item">标题文字：<a-input @change="changeComponentConfig" v-model="activeCanvasItem.config.demoJson.data.title.text" style="width:100px"/></div>
            <div class="component-config-item">折线宽度：<a-input-number v-model="activeCanvasItem.config.demoJson.data.series[0].lineStyle.width" @change="changeComponentConfig" style="width:100px"/></div>
            <div class="base-config-item">显示折点：<a-switch defaultChecked @change="toggleLinePoint"/></div>
            <div v-show="activeCanvasItem.config.demoJson.data.series[0].symbolSize > 0" class="component-config-item">折点大小：<a-input-number v-model="activeCanvasItem.config.demoJson.data.series[0].symbolSize" @change="changeComponentConfig" :min="1" style="width:100px"/></div>
            <div class="base-config-item">平滑曲线：<a-switch v-model="activeCanvasItem.config.demoJson.data.series[0].smooth"/></div>
            <div class="base-config-item">面积堆叠：<a-switch @change="toggleLineArea"/></div>
            <div v-show="activeCanvasItem.config.demoJson.data.series[0].areaStyle.opacity > 0" class="base-config-item">透明度：<a-slider v-model="activeCanvasItem.config.demoJson.data.series[0].areaStyle.opacity" :min="0.1" :max="1" :step="0.1" style="width:100px"/></div>
            <div class="base-config-item">显示数值：<a-switch defaultChecked v-model="activeCanvasItem.config.demoJson.data.series[0].label.show" /></div>
            <div v-show="activeCanvasItem.config.demoJson.data.series[0].label.show" class="component-config-item">数值字体大小：<a-input-number v-model="activeCanvasItem.config.demoJson.data.series[0].label.fontSize" @change="changeComponentConfig" style="width:80px"/></div>
          </template>
          <template v-if="activeCanvasItem.name == 'echarts-bar'">
            <div class="base-config-item">标题文字：<a-input @change="changeComponentConfig" v-model="activeCanvasItem.config.demoJson.data.title.text" style="width:100px"/></div>
            <div class="base-config-item">柱体宽度自适应：<a-switch defaultChecked @change="toggleBarWidth"/></div>
            <div v-show="activeCanvasItem.config.demoJson.data.series[0].barWidth" class="component-config-item">柱体宽度：<a-input-number v-model="activeCanvasItem.config.demoJson.data.series[0].barWidth" @change="changeComponentConfig" style="width:100px"/></div>
            <div class="component-config-item">圆角半径：<a-input-number v-model="activeCanvasItem.config.demoJson.data.series[0].itemStyle.borderRadius" @change="changeComponentConfig" style="width:100px"/></div>
            <div class="base-config-item">显示数值：<a-switch defaultChecked v-model="activeCanvasItem.config.demoJson.data.series[0].label.show" /></div>
            <div v-show="activeCanvasItem.config.demoJson.data.series[0].label.show" class="component-config-item">数值字体大小：<a-input-number v-model="activeCanvasItem.config.demoJson.data.series[0].label.fontSize" @change="changeComponentConfig" style="width:80px"/></div>
          </template>
          <template v-if="activeCanvasItem.name == 'echarts-pie'">
            <div class="base-config-item">标题文字：<a-input @change="changeComponentConfig" v-model="activeCanvasItem.config.demoJson.data.title.text" style="width:100px"/></div>
            <div class="component-config-item">展现形式：
              <a-select @select="selectPieType" defaultValue="pie" style="width: 100px">
                <a-select-option value="pie">饼图</a-select-option>
                <a-select-option value="circle">环形</a-select-option>
                <a-select-option value="rose">南丁格尔</a-select-option>
              </a-select>
            </div>
            <div class="base-config-item">显示文字：<a-switch defaultChecked v-model="activeCanvasItem.config.demoJson.data.series[0].label.show" /></div>
            <div v-show="activeCanvasItem.config.demoJson.data.series[0].label.show" class="component-config-item">文字字体大小：<a-input-number v-model="activeCanvasItem.config.demoJson.data.series[0].label.fontSize" @change="changeComponentConfig" style="width:80px"/></div>
            <div v-show="activeCanvasItem.config.demoJson.data.series[0].label.show" class="component-config-item">文字显示位置：
              <a-select v-model="activeCanvasItem.config.demoJson.data.series[0].label.position" style="width: 80px">
                <a-select-option value="outside">外</a-select-option>
                <a-select-option value="inside">内</a-select-option>
              </a-select>
            </div>
          </template>
          <!-- <div v-if="activeCanvasItem.config.demoJson.data.xAxis" class="base-config-item">间隙居中：<a-switch @change="modelDemoJson" v-model="activeCanvasItem.config.demoJson.data.xAxis.boundaryGap"/></div> -->
          <!-- <template v-if="activeCanvasItem.name == 'echarts-line'">
            <div v-for="(item,index) in activeCanvasItem.config.demoJson.data.series" :key="index">
              <p>折线 {{index + 1}}</p>
              <div class="base-config-item">平滑曲线：<a-switch @change="modelDemoJson" v-model="item.smooth"/></div>
            </div>
          </template> -->
          <!-- <a-button class="handle-btn" type="primary" block @click="addAData" style="margin-bottom:15px">添加一条数据</a-button> -->
          <a-button class="handle-btn" type="primary" block @click="showDemoJson('eidt')">编辑代码</a-button>
        </template>
      </template>
      <template v-else>
        <template v-if="activeCanvasItem.name.indexOf('text-') >= 0">
          <div v-if="activeCanvasItem.name != 'text-time'" class="component-config-item">文字：<a-input v-model="activeCanvasItem.config.text" style="width:130px"/></div>
          <a-input v-if="activeCanvasItem.name == 'text-href'" v-model="activeCanvasItem.config.href" style="width:180px"/>
          <div class="component-config-item">字体大小：<a-input-number v-model="activeCanvasItem.config.fontSize" :formatter="value => `${value}px`" :parser="value => value.replace('px', '')" @change="changeComponentConfig"/></div>
          <div class="component-config-item">颜色：<a-input v-model="activeCanvasItem.config.color" style="width:130px"/></div>
          <div class="component-config-item">字体粗细：
            <a-select v-model="activeCanvasItem.config.fontWeight" style="width: 100px">
              <a-select-option value="lighter">细</a-select-option>
              <a-select-option value="normal">正常</a-select-option>
              <a-select-option value="bold">粗</a-select-option>
              <a-select-option value="100">100</a-select-option>
              <a-select-option value="200">200</a-select-option>
              <a-select-option value="300">300</a-select-option>
              <a-select-option value="400">400</a-select-option>
              <a-select-option value="500">500</a-select-option>
              <a-select-option value="600">600</a-select-option>
              <a-select-option value="700">700</a-select-option>
              <a-select-option value="800">800</a-select-option>
              <a-select-option value="900">900</a-select-option>
            </a-select>
          </div>
          <template v-if="activeCanvasItem.name != 'text-marquee'">
            <div class="component-config-item">排列方向：
              <a-select v-model="activeCanvasItem.config.writingMode" style="width: 100px">
                <a-select-option value="horizontal-tb">水平</a-select-option>
                <a-select-option value="vertical-rl">垂直</a-select-option>
              </a-select>
            </div>
            <!-- <div class="component-config-item">对齐方式：
              <a-select v-model="activeCanvasItem.config.justifyContent" style="width: 100px">
                <a-select-option value="flex-start">左对齐</a-select-option>
                <a-select-option value="center">居中</a-select-option>
                <a-select-option value="flex-end">右对齐</a-select-option>
              </a-select>
            </div> -->
          </template>
          <div class="component-config-item">文字间隔：<a-input-number v-model="activeCanvasItem.config.letterSpacing" :formatter="value => `${value}px`" :parser="value => value.replace('px', '')" @change="changeComponentConfig"/></div>
        </template>
        <template v-if="activeCanvasItem.name == 'media-image' || activeCanvasItem.name == 'media-video' || activeCanvasItem.name == 'media-swiper'">
          <template v-if="activeCanvasItem.name == 'media-swiper'">
            <!-- eslint-disable-next-line -->
            <div v-for="(item,index) in activeCanvasItem.config.imgList" class="component-config-item">
              <div class="component-config-item-swiper-img">
                <img :src="item.url">
              </div>
              <a-button type="danger" shape="circle" icon="delete" size="small" @click="delSwiperImg(index)"/>
            </div>
          </template>
          <a-upload name="file" :action="$config.fileUpload" @change="fileUploadChange">
            <a-button style="width:180px"> <a-icon type="upload" /> 上传{{activeCanvasItem.label}} </a-button>
          </a-upload>
        </template>
        <a-input v-if="activeCanvasItem.name == 'media-iframe'" v-model="activeCanvasItem.config.src" style="width:180px"/>
        <a-select v-if="activeCanvasItem.name == 'modify-border'" v-model="activeCanvasItem.config.style" style="width: 180px">
          <a-select-option v-for="i in 13" :value="i" :key="i">
            样式{{i}}
          </a-select-option>
        </a-select>
      </template>
    </template>
    <p v-else class="component-none">暂无选中元素</p>
    <a-modal v-model="demoJsonVisible" :footer="null" :title="modelTitle">
      <div style="max-height:450px;overflow: scroll;">
        <code-editor :value="JSON.stringify(activeCanvasItem.config.demoJson, null, 2)" :readonly="readonly" theme="dracula" wrap @change="onJsonCodeChange"/>
        <div v-if="!readonly" style="margin-top:15px;text-align: right;">
          <a-button type="primary" @click="setDemoJsonWidthCode">确定</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import CodeEditor from 'bin-ace-editor'
require('brace/mode/json')
require('brace/theme/dracula')
export default {
  components: {
    CodeEditor
  },
  data () {
    return {
      demoJsonVisible: false,
      jsonStr: '',
      readonly: false,
      modelTitle: ''
    }
  },
  props: {
    activeCanvasItem: Object
  },
  methods: {
    fileUploadChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} 上传成功`)
        const imgUlr = `${this.$config.fileDownload}/${info.file.response.result.fileid}`
        if (this.activeCanvasItem.name === 'media-swiper') {
          this.activeCanvasItem.config.imgList.push({ url: imgUlr })
        } else {
          this.activeCanvasItem.config.src = imgUlr
        }
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    toggleLinePoint (e) {
      if (e) {
        this.activeCanvasItem.config.demoJson.data.series[0].symbolSize = 8
      } else {
        this.activeCanvasItem.config.demoJson.data.series[0].symbolSize = 0
      }
    },
    toggleLineArea (e) {
      if (e) {
        this.activeCanvasItem.config.demoJson.data.series[0].areaStyle.opacity = 0.5
      } else {
        this.activeCanvasItem.config.demoJson.data.series[0].areaStyle.opacity = 0
      }
    },
    toggleBarWidth (e) {
      if (e) {
        this.activeCanvasItem.config.demoJson.data.series[0].barWidth = null
      } else {
        this.activeCanvasItem.config.demoJson.data.series[0].barWidth = 20
      }
    },
    selectPieType (e) {
      if (e === 'pie') {
        this.activeCanvasItem.config.demoJson.data.series[0].radius = '70%'
        this.activeCanvasItem.config.demoJson.data.series[0].roseType = false
      } else if (e === 'circle') {
        this.activeCanvasItem.config.demoJson.data.series[0].radius = ['40%', '70%']
        this.activeCanvasItem.config.demoJson.data.series[0].roseType = false
      } else if (e === 'rose') {
        this.activeCanvasItem.config.demoJson.data.series[0].radius = ['20%', '70%']
        this.activeCanvasItem.config.demoJson.data.series[0].roseType = true
      }
    },
    changeComponentConfig () {
      this.$emit('change')
    },
    deleteItem () {
      this.$emit('deleteItem', this.activeCanvasItem.index)
    },
    delSwiperImg (index) {
      this.activeCanvasItem.config.imgList.splice(index, 1)
    },
    showDemoJson (mode) {
      if (mode === 'readonly') {
        this.readonly = true
        this.modelTitle = '返回代码示例'
      } else if (mode === 'eidt') {
        this.readonly = false
        this.modelTitle = '编辑代码'
      }
      this.demoJsonVisible = true
    },
    // modelDemoJson (e) {
    //   const demoJson = JSON.parse(JSON.stringify(this.activeCanvasItem.config.demoJson))
    //   this.activeCanvasItem.config.demoJson = demoJson
    // },
    addAData () {
      const demoJson = JSON.parse(JSON.stringify(this.activeCanvasItem.config.demoJson))
      const item = JSON.parse(JSON.stringify(demoJson.data.series[0]))
      item.name = `数据 ${demoJson.data.series.length + 1}`
      const legend = JSON.parse(JSON.stringify(item.data))
      const dataLength = legend.length
      item.data = []

      for (let i = 0; i < dataLength; i++) {
        item.data.push({
          value: Math.random().toFixed(2) * 400 + 100,
          name: legend[i].name
        })
      }

      if (item.type === 'pie') {
        demoJson.data.series = []
      }
      demoJson.data.series.push(item)

      this.activeCanvasItem.config.demoJson = demoJson
    },
    onJsonCodeChange (val) {
      this.jsonStr = val
    },
    setDemoJsonWidthCode () {
      if (this.jsonStr) {
        this.activeCanvasItem.config.demoJson = JSON.parse(this.jsonStr)
      }
      this.demoJsonVisible = false
      this.changeComponentConfig()
    }
  }
}
</script>
