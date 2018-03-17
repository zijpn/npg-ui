<template>
  <div class="sidebar">
    <div class="item">
      <font-awesome-icon :icon="fileIcon" />
    </div>
    <div class="item">
      <font-awesome-icon :icon="terminalIcon" size="xs" />
    </div>
  </div>
</template>

<script lang="ts">
// vscode: explicitly reference d.ts file (intellisense bug?)
/* tslint:disable:no-reference */
/// <reference path='../globals.d.ts' />

import socket from '@/socket'
import faFile from '@fortawesome/fontawesome-free-solid/faFile'
import faTerminal from '@fortawesome/fontawesome-free-solid/faTerminal'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {
    FontAwesomeIcon,
  },
})
export default class SideBar extends Vue {
  get fileIcon() {
    return faFile
  }
  get terminalIcon() {
    return faTerminal
  }
}
</script>

<style scoped lang="scss">
.sidebar {
  width: 50px;
  background-color: rgb(51, 51, 51);
  top: 0px;
  left: 0px;
  bottom: 22px;
  position: absolute;
  display: flex;
  flex-direction: column;
}
.sidebar>.item {
  cursor: pointer;
  transition: transform 50ms ease;
  overflow: hidden;
  height: 40px;
  line-height: 40px;
  margin-right: 0;
  color: white;
  text-align: center;
}
</style>
