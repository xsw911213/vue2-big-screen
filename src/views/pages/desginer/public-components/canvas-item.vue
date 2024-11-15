<style lang="scss">
.canvas-item{
  position: absolute;
  &.vdr{
    border: none;
    &.active{
      outline: 1px dashed rgb(189, 189, 189);
      &.hide-out-line{
        outline: none;
      }
    }
  }
  &-cover{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    cursor: grab;
    z-index: 999;
    &:active{
      cursor: grabbing;
    }
  }
}
</style>

<template>
  <a-dropdown :trigger="['contextmenu']">
    <!-- <VueDragResize class="canvas-item" :parentLimitation="true" :isActive="edit && item.active" :isDraggable="edit" :isResizable="edit" :w="item.config.width" :h="item.config.height" :x="item.config.left" :y="item.config.top" :stickSize="6" :parentScaleX="zoom" :parentScaleY="zoom" @resizing="resize" @dragging="resize" @clicked="click"> -->
    <VueDragResize class="canvas-item" :class="{active: edit && item.active,'hide-out-line': !edit}" :parent="true" :draggable="edit" :resizable="edit" :w="item.config.width" :h="item.config.height" :x="item.config.left" :y="item.config.top" :grid="grid" :scale="zoom" @resizing="resize" @dragging="resize" @activated="click">
      <textC v-if="item.name.indexOf('text') >= 0" :item="item"/>
      <media v-else-if="item.name.indexOf('media') >= 0" :item="item" />
      <echarts v-else-if="item.name.indexOf('echarts') >= 0" :item="item" :edit="edit" />
      <scrolBoard v-else-if="item.name == 'table-scroll-board'" :item="item" />
      <modifyBorder v-else-if="item.name == 'modify-border'" :item="item" />
      <div v-if="edit" class="canvas-item-cover"></div>
    </VueDragResize>
    <a-menu slot="overlay">
      <a-menu-item  @click="deleteItem"><a-icon type="delete" />删除图层</a-menu-item>
      <a-menu-item v-show="item.index != maxNum" @click="moveCoverage('bottom')"><a-icon type="vertical-align-top" />图层置顶</a-menu-item>
      <a-menu-item v-show="item.index != 0" @click="moveCoverage('top')"><a-icon type="vertical-align-bottom" />图层置底</a-menu-item>
      <a-menu-item v-show="item.index != maxNum" @click="moveCoverage('down')"><a-icon type="to-top" />上移一层</a-menu-item>
      <a-menu-item v-show="item.index != 0" @click="moveCoverage('up')"> <a-icon type="to-top" style="transform: rotate(180deg);"/>下移一层</a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import VueDragResize from 'vue-draggable-resizable'
// import VueDragResize from 'vue-drag-resize'
import textC from '../components/text/text'
import media from '../components/media/media'
import echarts from '../components/charts/echarts'
import scrolBoard from '../components/table/scroll-board'
import modifyBorder from '../components/modify/border'
export default {
  data () {
    return {
      grid: [1, 1]
    }
  },
  components: {
    VueDragResize,
    textC,
    media,
    echarts,
    scrolBoard,
    modifyBorder
  },
  props: {
    item: Object,
    baseConfig: Object,
    maxNum: Number,
    zoom: {
      type: Number,
      default: 1
    },
    edit: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    baseConfig: {
      handler (v) {
        if (v.showGrid) {
          this.grid = [v.gridWidth, v.gridWidth]
        } else {
          this.grid = [1, 1]
        }
      },
      deep: true
    }
    // 'item': {
    //   handler (v) {
    //     console.log(v)
    //   },
    //   deep: true
    // }
  },
  mounted () {},
  methods: {
    // resize (newRect) {
    //   this.item.config.width = newRect.width
    //   this.item.config.height = newRect.height
    //   this.item.config.top = newRect.top
    //   this.item.config.left = newRect.left
    //   this.$emit('configChange')
    // },
    resize (left, top, width, height) {
      if (width && height) {
        this.item.config.width = width
        this.item.config.height = height
      }
      this.item.config.top = top
      this.item.config.left = left
      this.$emit('configChange')
    },
    click () {
      this.item.active = true
      this.$emit('click', this.item)
    },
    moveCoverage (handle) {
      this.$emit('moveCoverage', { item: this.item, handle })
    },
    deleteItem () {
      this.$emit('deleteItem', this.item.index)
    }
  }
}
</script>
