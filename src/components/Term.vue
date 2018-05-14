<template>
  <div ref="xterm" class="term">
    <resize-observer @notify="resize"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Provide, Vue } from 'vue-property-decorator'
import { Terminal } from 'xterm'

@Component
export default class Term extends Vue {
  @Provide()
  public term!: Terminal

  public fit() {
    const parent = this.term.element.parentElement as Element
    const parentElementStyle = window.getComputedStyle(parent)
    const parentElementHeight = parseInt(parentElementStyle.getPropertyValue('height'), 10)
    const parentElementWidth = Math.max(0, parseInt(parentElementStyle.getPropertyValue('width'), 10))
    const elementStyle = window.getComputedStyle(this.term.element)
    const elementPadding = {
      bottom: parseInt(elementStyle.getPropertyValue('padding-bottom'), 10),
      left: parseInt(elementStyle.getPropertyValue('padding-left'), 10),
      right: parseInt(elementStyle.getPropertyValue('padding-right'), 10),
      top: parseInt(elementStyle.getPropertyValue('padding-top'), 10),
    }
    const elementPaddingVer = elementPadding.top + elementPadding.bottom
    const elementPaddingHor = elementPadding.right + elementPadding.left
    const availableHeight = parentElementHeight - elementPaddingVer
    const scrollBarWidth = (this.term as any).viewport.scrollBarWidth
    const availableWidth = parentElementWidth - elementPaddingHor - scrollBarWidth
    const renderer = (this.term as any).renderer
    if (renderer.dimensions.actualCellWidth && renderer.dimensions.actualCellWidth) {
      const cols = Math.floor(availableWidth / renderer.dimensions.actualCellWidth)
      const rows = Math.floor(availableHeight / renderer.dimensions.actualCellHeight)
      if (this.term.rows !== rows || this.term.cols !== cols) {
        renderer.clear()
        this.term.resize(cols, rows)
      }
    }
  }

  public resize() {
    const renderer = (this.term as any).renderer
    if (!renderer) {
      this.term.open(this.$refs.xterm as HTMLElement)
    }
    this.fit()
    this.term.focus()
  }

  public mounted() {
    this.initTerminal()
    this.term.on('resize', this.logResize)
  }

  private logResize(size: any) {
    // console.log('Resized to ' + size.cols + ' cols and ' + size.rows + ' rows.')
  }

  private initTerminal() {
    this.term = new Terminal({
      cursorBlink: true,
      scrollback: 2000,
    })
  }
}
</script>

<style lang="scss">
@import "~xterm/dist/xterm.css";
</style>

<style lang="scss" scoped>
.term {
  flex: 1;
}
</style>