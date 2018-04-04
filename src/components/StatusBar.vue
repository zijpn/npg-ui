<template>
  <footer class="footer">
    <div class="version disable-select">
      ui {{uiVersion}}, server {{serverVersion}}
    </div>
  </footer>
</template>

<script lang="ts">
import socket from '@/socket'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class StatusBar extends Vue {
  // Added "strictPropertyInitialization": false to tsconfig until we can use
  // 'definite assignment assertion' i.e.
  //     public uiVersion!: string
  // https://github.com/kaorun343/vue-property-decorator/issues/81
  // https://www.ryadel.com/en/ts2564-ts-property-has-no-initializer-typescript-error-fix-visual-studio-2017-vs2017/
  // https://github.com/vuejs/vetur/issues/682
  @Prop({default: '0.1.0'})
  public uiVersion: string

  // computed
  get serverVersion() {
    return this.$store.state.serverVersion
  }

  // lifecycle hook
  public mounted() {
    const sock = socket.io.socket('/server')
    sock.on('connect', () => {
      sock.emit('version')
      sock.on('version', (version: string) => {
        this.$store.dispatch('setServerVersion', version)
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.footer {
  padding: 0 10px;
  font-size: 12px;
  width: 100%;
  height: 22px;
  line-height: 22px;
  background-color: #007BCC;
  color: white;
  left: 0px;
  bottom: 0px;
  position: absolute;

}
.version {
  display: flex;
  justify-content: center;
  margin: auto;
}
</style>
