<template>
  <footer class="footer">
    <div class="version disable-select">
      ui {{uiVersion}}, server {{serverVersion}}
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class StatusBar extends Vue {
  @Prop({default: '0.1.0'})
  public uiVersion!: string

  // computed
  get serverVersion() {
    return this.$store.state.serverVersion
  }

  // lifecycle hook
  public mounted() {
    import(/* webpackChunkName: "sock" */ 'socket.io-client').then((io) => {
      if (process.env.VUE_APP_SOCKET) {
        const sock = io.connect('/server', {
          path: '/api',
          transports: ['websocket'],
        })
        sock.on('connect', () => {
          sock.emit('version')
          sock.on('version', (version: string) => {
            this.$store.dispatch('setServerVersion', version)
          })
        })
      }
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
