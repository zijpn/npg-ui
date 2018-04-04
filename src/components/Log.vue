<template>
  <div>
    <div class="select">
      <select v-model="selected">
        <option>Debug</option>
        <option>Info</option>
        <option>Warning</option>
        <option>Error</option>
      </select>
    </div>
    <div class="clear" @click="clearLogs()" v-tooltip.bottom="{ content: 'Clear Log', delay: { show: 1500 } }">
      <font-awesome-icon :icon="clearIcon" size="xs" />
    </div>
    <div v-if="logEmpty()" class="empty">
      <h2>empty log</h2>
    </div>
    <div v-else class="logs">
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
import socket from '@/socket'
import faEraser from '@fortawesome/fontawesome-free-solid/faEraser'
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Log extends Vue {
  @Provide()
  public selected: string = 'Info'

  @Provide()
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
    const sock = socket.io.socket('/log')
    sock.on('connect', () => {
      this.clearLogs()
      sock.on('log', (msg: Array<{ timestamp: Date, level: string, msg: string }>) => {
        msg.forEach(this.appendLog)
      })
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
.clear {
  position: absolute;
  top: 2px;
  right: 30px;
  cursor: pointer;
}
.select {
  position: absolute;
  top: 5px;
  right: 54px;
  height: 20px;
}
select {
  font-size: 0.8em;
  background-color: rgb(60, 60, 60);
  color: rgb(240, 240, 240);
  border-color: rgb(60, 60, 60);
  border: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  height: 20px;
}
select:active select:focus {
  border-color: rgb(60, 60, 60);
  box-shadow: none;
}
.select::after {
  border: 1px solid white;
  right: 0.6em;
  border-top: 0px;
  border-right: 0px;
}
.empty {
  padding-top: 40px;
  text-align: center;
}
.logs {
  padding-top: 8px; 
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
  padding-left: 8px;
  vertical-align: top;
}
td.time {
  width: 160px;
}
td.lvl {
  width: 50px;
}
td.msg {
  width: calc(100vw - 218px - 50px);
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
