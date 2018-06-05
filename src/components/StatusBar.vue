<template>
  <footer class="footer">
    <div class="version disable-select">
      ui: {{ uiVersion }}
    </div>
    <div class="version disable-select">
      server: {{ serverVersion }}
    </div>
    <div v-for="(b,idx) in backend" :key="b.idx" class="backend disable-select" :class="{ 'push': idx == 0 }" 
         v-tooltip.top="{ content: b.host, trigger: 'click' }">
      {{ b.name }}
      <span class="status-indicator" :class="[ b.status == 'Running' ? 'positive' : 'negative' ]"></span>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Prop, Provide, Vue } from 'vue-property-decorator'

@Component
export default class StatusBar extends Vue {

  @Prop({default: '0.1.0'})
  public uiVersion!: string

  @Provide()
  public backend: Array<{ host: string, name: string, status: string }> = []

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
          sock.on('version', (version: string) => {
            this.$store.dispatch('setServerVersion', version)
          })
          sock.on('backend', (backend: Array<{ host: string, name: string, status: string }>) => {
            this.backend = backend
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
  display: flex;
}
.version {
  padding-right: 10px;
}
.backend {
  padding: 0 5px;
  cursor: pointer;
}
.backend:hover {
  background-color: rgba(220, 220, 220, .2);;
}
.push {
  margin-left: auto;
}
.status-indicator {
  display: inline-block;
  vertical-align: middle;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: rgba(216, 226, 233, .5);
}
.positive {
  background-color: rgba(75, 210, 143, .9);
}
.negative {
  background-color: rgba(255, 77, 77, .9);
}
</style>
