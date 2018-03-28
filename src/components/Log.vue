<template>
  <div>
    <h2 style="text-align: center;">debug log</h2>
    <div class="clear" @click="clearLogs()" v-tooltip.bottom="{ content: 'Clear Log', delay: { show: 1500 } }">
      <font-awesome-icon :icon="clearIcon" size="xs" />
    </div>
    <div class="select">
      <select v-model="selected" @change="levelChanged()">
        <option>Debug</option>
        <option>Info</option>
        <option>Warning</option>
        <option>Error</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import faEraser from '@fortawesome/fontawesome-free-solid/faEraser'
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Log extends Vue {
  @Provide()
  public selected: string = 'Info'

  get clearIcon() {
    return faEraser
  }

  public clearLogs() {
    // TODO
  }

  public levelChanged() {
    // TODO
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
</style>