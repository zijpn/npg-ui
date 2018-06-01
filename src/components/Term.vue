<template>
  <div class="term">
     <div class="termselect">
      <select v-model="selected">
        <option v-for="term in terms" :key="term.id" :value="term.id">
          {{ term.id }}:{{ term.process }}
        </option>
      </select>
    </div>
    <div class="kill" @click="killTerm()" v-tooltip.bottom="{ content: 'Kill Terminal', delay: { show: 1500 } }">
      <font-awesome-icon :icon="trashIcon" size="xs" />
    </div>
    <div class="new" @click="newTerm()" v-tooltip.bottom="{ content: 'New Terminal', delay: { show: 1500 } }">
      <font-awesome-icon :icon="plusIcon" size="xs" />
    </div>
    <div v-for="term in terms" :key="term.id" :ref="'xterm' + term.id" class="termtab" v-show="term.id == selected"></div>
    <resize-observer @notify="resize"/>
  </div>
</template>

<script lang="ts">
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Term extends Vue {

  @Provide()
  public terms: Array<{ term: any, id: number, process: string }> = []

  @Provide()
  public selected: number = 0

  private sock: any = null
  private term: any = null

  get plusIcon() {
    return faPlus
  }

  get trashIcon() {
    return faTrashAlt
  }

  public killTerm() {
    const current = this.findTerm(this.selected)
    if (!current) {
      return
    }
    if (this.connected()) {
      this.sock.emit('destroy', {
        id: current.id,
      })
    }
    current.term.dispose()
    this.terms = this.terms.filter((term) => term.id !== current.id)
    this.selected = (this.terms[0]) ? this.terms[0].id : 0
    // $refs is non-reactive https://github.com/vuejs/vue/issues/4574
    Vue.nextTick().then(() => {
      delete this.$refs['xterm' + current.id]
    })
  }

  public newTerm() {
    import(/* webpackChunkName: "term" */ 'xterm').then(({Terminal}) => {
      if (this.connected()) {
        this.term = new Terminal({
          cursorBlink: true,
          fontSize: 12,
          scrollback: 2000,
        })
        this.term.setOption('theme', {
          background: '#1e1e1e',
        })
        this.sock.emit('create', {
          args: [],
          cols: this.term.cols,
          container: '',
          rows: this.term.rows,
        })
      }
    })
  }

  public resize() {
    const current = this.findTerm(this.selected)
    if (!current) {
      return
    }
    this.fit(current.term)
    current.term.focus()
  }

  public mounted() {
    import(/* webpackChunkName: "sock" */ 'socket.io-client').then((io) => {
      if (process.env.VUE_APP_SOCKET) {
        this.sock = io.default('/term', {
          path: '/api',
          transports: ['websocket'],
        })
        this.sock.on('connect', () => {
          this.sock.on('created', (msg: { container: string, id: number, process: string }) => {
            // add to array
            this.terms.unshift({
              id: msg.id,
              process: msg.process,
              term: this.term,
            })
            this.selected = msg.id
            // vue needs to create our div, so that we can reference it
            Vue.nextTick().then(() => {
              // when ref is used on or inside v-for, they are registered as Arrays
              // https://vuejs.org/v2/api/#ref
              const ref = this.$refs['xterm' + msg.id] as Element[]
              const parent = ref[0] as HTMLElement
              this.term.open(parent)
              this.fit(this.term)
              this.term.focus()
              this.term.on('data', this.sendData)
              this.term.on('resize', this.logResize)

            })
          })
          this.sock.on('close', (msg: { id: number }) => {
            if (msg.id !== this.selected) {
              // should not happen
              return
            }
            const current = this.findTerm(this.selected)
            if (current) {
              this.killTerm()
            }
          })
          this.sock.on('data', (msg: { data: string, id: number }) => {
            if (msg.id !== this.selected) {
              // should not happen
              return
            }
            const current = this.findTerm(this.selected)
            if (current) {
              current.term.write(msg.data)
            }
          })
        })
      }
    })
  }

  public beforeDestroy() {
    this.terms.forEach((term) => {
      term.term.dispose()
      if (this.connected()) {
        this.sock.emit('destroy', {
          id: term.id,
        })
      }
    })
  }

  private sendData(data: string) {
    const current = this.findTerm(this.selected)
    if (!current) {
      return
    }
    if (this.connected()) {
      this.sock.emit('data', {
        data,
        id: current.id,
      })
    }
  }

  private logResize(size: any) {
    // console.log('Resized to ' + size.cols + ' cols and ' + size.rows + ' rows.')
    const current = this.findTerm(this.selected)
    if (!current) {
      return
    }
    if (this.connected()) {
      this.sock.emit('resize', {
        cols: size.cols,
        id: current.id,
        rows: size.rows,
      })
    }
  }

  private fit(term: any) {
    const parent = term.element.parentElement as Element
    const parentElementStyle = window.getComputedStyle(parent)
    const parentElementHeight = parseInt(parentElementStyle.getPropertyValue('height'), 10)
    const parentElementWidth = Math.max(0, parseInt(parentElementStyle.getPropertyValue('width'), 10))
    const elementStyle = window.getComputedStyle(term.element)
    const elementPadding = {
      bottom: parseInt(elementStyle.getPropertyValue('padding-bottom'), 10),
      left: parseInt(elementStyle.getPropertyValue('padding-left'), 10),
      right: parseInt(elementStyle.getPropertyValue('padding-right'), 10),
      top: parseInt(elementStyle.getPropertyValue('padding-top'), 10),
    }
    const elementPaddingVer = elementPadding.top + elementPadding.bottom
    const elementPaddingHor = elementPadding.right + elementPadding.left
    const availableHeight = parentElementHeight - elementPaddingVer
    const scrollBarWidth = term.viewport.scrollBarWidth
    const availableWidth = parentElementWidth - elementPaddingHor - scrollBarWidth
    const renderer = term.renderer
    if (renderer.dimensions.actualCellWidth && renderer.dimensions.actualCellWidth) {
      const cols = Math.floor(availableWidth / renderer.dimensions.actualCellWidth)
      const rows = Math.floor(availableHeight / renderer.dimensions.actualCellHeight)
      if (term.rows !== rows || term.cols !== cols) {
        renderer.clear()
        term.resize(cols, rows)
      }
    }
  }

  private findTerm(id: number) {
    return this.terms.find((term) => term.id === id)
  }

  private connected() {
    return this.sock && this.sock.connected
  }
}
</script>

<style lang="scss">
@import "~xterm/dist/xterm.css";
</style>

<style lang="scss" scoped>
.termselect {
  position: absolute;
  top: 2px;
  right: 78px;
  height: 24px;
  width: 122px;
}
.termselect select {
  font-size: 0.8em;
  background-color: rgb(60, 60, 60);
  color: rgb(240, 240, 240);
  border-color: rgb(60, 60, 60);
  border: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  width: 100%;
}
.termselect select:active, .termselect select:focus {
  outline-style: none;
}
.term {
  height: 100%;
  padding-top: 8px;  
  padding-left: 15px;
  padding-right: 0px;
}
.termtab {
  height: 100%;
  width: 100%;
}
.kill {
  position: absolute;
  top: 2px;
  right: 30px;
  cursor: pointer;
}
.new {
  position: absolute;
  top: 2px;
  right: 52px;
  cursor: pointer;
}
</style>