<template>
  <div class="split-container">
    <slot></slot>
  </div>
</template>
 
<script lang="ts">
import Split from 'split.js'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SplitView extends Vue {
  // input properties
  @Prop({default: []})
  public elements!: string[]
  @Prop({default: 'horizontal'})
  public direction!: 'horizontal' | 'vertical'
  @Prop({default: []})
  public sizes!: number[]
  @Prop({default: []})
  public minSize!: number[]
  @Prop({default: 1})
  public gutterSize!: number
  @Prop({default: 10})
  public snapOffset!: number

  // data properties
  private split!: Split.Instance

  // methods
  public onDragEnd() {
    this.$emit('onDragEnd', this.split.getSizes())
  }

  public collapse(index: number) {
    this.split.collapse(index)
  }

  public setSizes(sizes: number[]) {
    this.split.setSizes(sizes)
  }

  public mounted() {
    const options: Split.Options = {
      cursor: this.direction === 'horizontal' ? 'col-resize' : 'row-resize',
      direction: this.direction,
      gutterSize: this.gutterSize,
      minSize: this.minSize,
      onDragEnd: this.onDragEnd,
      sizes: this.sizes,
      snapOffset: this.snapOffset,
    }
    this.split = Split(this.elements, options)
  }
}
</script>

<style lang="scss">
// style is not scoped ! we need to style split.js

.split-container {
  height: 100%;
}

.split-container > * {
  position: relative;
  overflow-y: hidden;
}

.split-container--horizontal {
  display: flex;
}

.gutter {
  background-color: rgba(128, 128, 128, 0.35);
  background-repeat: no-repeat;
  background-position: 50%;
}

.gutter.gutter-vertical {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=');
  cursor: row-resize;
}

.gutter.gutter-horizontal {
  float: left;
  cursor: col-resize;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==')
}

.split {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
