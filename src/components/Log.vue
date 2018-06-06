<template>
  <div class="log">
    <div class="loglevel">
      <select v-model="selected">
        <option>Debug</option>
        <option>Info</option>
        <option>Warning</option>
        <option>Error</option>
      </select>
    </div>
    <div class="logclear" @click="clearLogs()" v-tooltip.bottom="{ content: 'Clear Log', delay: { show: 1500 } }">
      <font-awesome-icon :icon="clearIcon" size="xs" />
    </div>
    <div v-if="logEmpty()" class="logempty">
      <h2>empty log</h2>
    </div>
    <div v-else class="logtable">
      <table>
        <tr v-for="(log, idx) in filteredLogs" :class="log.level" :key="idx">
          <td class="time">{{log.time}}</td>
          <td class="lvl">{{log.level}}</td>
          <td class="msg">{{log.msg}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import faEraser from '@fortawesome/fontawesome-free-solid/faEraser'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Log extends Vue {

  // data properties
  public selected: string = 'Info'
  public logs: Array<{ time: string, level: string, msg: string }> = []

  public clearLogs() {
    this.logs = []
  }

  public logEmpty() {
    return this.logs.length === 0
  }

  public appendLog(log: { timestamp: Date, level: string, msg: string }) {
    const ts = new Date(log.timestamp)
    this.logs.unshift({
      level: log.level,
      msg: log.msg,
      time: ts.toLocaleString(),
    })
  }

  public mounted() {
    import(/* webpackChunkName: "sock" */ 'socket.io-client').then((io) => {
      if (process.env.VUE_APP_SOCKET) {
        const sock = io.connect('/log', {
          path: '/api',
          transports: ['websocket'],
        })
        sock.on('connect', () => {
          this.clearLogs()
          sock.on('log', (msg: Array<{ timestamp: Date, level: string, msg: string }>) => {
            msg.forEach(this.appendLog)
          })
        })
      }
    })
  }

  get clearIcon() {
    return faEraser
  }

  get filteredLogs() {
    return this.logs.filter((log) => this.levelToVal(log.level) <= this.levelToVal(this.selected))
  }

  private levelToVal(level: string) {
    // { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
    switch (level.toLowerCase().substring(0, 4)) {
      case 'debu': return 4
      case 'info': return 2
      case 'warn': return 1
      case 'erro': return 0
      default: return 2
    }
  }
}
</script>

<style lang="scss" scoped>
.log {
  height: 100%;
  padding-top: 8px;  
  padding-left: 0px;
  padding-right: 0px;
}
.logclear {
  position: absolute;
  top: 2px;
  right: 30px;
  cursor: pointer;
}
.loglevel {
  position: absolute;
  top: 2px;
  right: 54px;
  height: 24px;
  width: 74px;
}
.loglevel select {
  font-size: 0.8em;
  background-color: rgb(60, 60, 60);
  color: rgb(240, 240, 240);
  border-color: rgb(60, 60, 60);
  border: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  width: 100%;
}
.loglevel select:active, .loglevel select:focus {
  outline-style: none;
}
.logempty {
  padding-top: 40px;
  text-align: center;
}
.logtable {
  height: 100%;
  overflow-y: scroll;
}
tr {
  font-family: monospace;
  font-size: 12px;
  vertical-align: top;
}
td {
  display: inline-block;
  padding: 0;
  padding-left: 12px;
  vertical-align: top;
}
td.time {
  width: 160px;
}
td.lvl {
  width: 50px;
}
td.msg {
  width: calc(100vw - 222px - 50px);
}
tr.debug {
  color: grey;
}
tr.info {
  color: white;
}
tr.warn {
  color: goldenrod;
}
tr.error {
  color: orangered;
}
</style>
