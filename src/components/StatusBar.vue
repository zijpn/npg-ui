<template>
  <footer class="footer">
    <div class="version disable-select">
      ui: {{ uiVersion }}
    </div>
    <div class="version disable-select">
      server: {{ serverVersion }}
    </div>
    <div v-for="(b,idx) in backend" :key="b.idx" class="backend disable-select" :class="{ 'push': idx == 0 }">
      <v-popover>
        <!-- popover target (for events and position) -->
        <div class="">
          {{ b.name }}
          <span class="status-indicator" :class="[ b.status == 'Running' ? 'positive' : 'negative' ]"></span>
        </div>
        <!-- content of the popover -->
        <template slot="popover">
          <p>{{ b.host }}</p>
          <div v-close-popover class="mbutton" @click="openTerminal(b.name)" v-if="b.status == 'Running'">
            <span style="padding-right: 8px">Terminal</span>
            <font-awesome-icon :icon="terminalIcon" />
          </div>
        </template>
      </v-popover>
    </div>
  </footer>
</template>

<script lang="ts">
import faTerminal from '@fortawesome/fontawesome-free-solid/faTerminal'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class StatusBar extends Vue {

  // data properties
  public uiVersion: string = '0.1.0'
  public backend: Array<{ host: string, name: string, status: string }> = []

  // computed
  get terminalIcon() {
    return faTerminal
  }

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
          sock.emit('backend')
          sock.on('backend', (backend: Array<{ host: string, name: string, status: string }>) => {
            this.backend = backend
          })
        })
      }
    })
  }

  public openTerminal(name: string) {
    // open terminal panel if not visible
    if (!this.$store.getters.terminalPanelActive) {
      this.$store.dispatch('togglePanel', 1)
    }
    // terminal request
    this.$store.dispatch('setTerminal', {
      backend: name,
      container: '',
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
.mbutton {
  cursor: pointer;
  margin-top: 5px;
  padding: 2px 4px;
  font-size: 14px;
  text-align: center;
  color: rgb(179, 179, 179);
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
}
.mbutton:hover, .active {
  color: white;
}
</style>
