<template>
  <div class="sidebar">
    <div class="item tooltip">
      <span class="tooltiptext">Project</span>
      <font-awesome-icon :icon="fileIcon" />
    </div>
    <div class="item tooltip">
      <span class="tooltiptext">Terminal</span>
      <font-awesome-icon :icon="terminalIcon" />
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

.item {
  cursor: pointer;
  height: 40px;
  margin: 0;
  padding: 10px 0;
  color: white;
  font-size: 14px;
  text-align: center;
  color: grey;
}

.item:hover {
  color: white;
}

// https://www.w3schools.com/css/tryit.asp?filename=trycss_tooltip_arrow_left
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  max-width: 24rem;
  background: rgba(74, 74, 74, 0.9);
  color: #fff;
  text-align: center;
  border-radius: 3px;
  position: absolute;
  z-index: 1;
  top: auto;
  left: 100%;
  bottom: 50%;
  right: auto;
  opacity: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.75rem;
  padding: .4rem .8rem;
  transform: translate(0.5rem, 50%);
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  right: 100%;
  border-width: .5rem;
  border-style: solid;
  border-color: transparent rgba(74, 74, 74, 0.9) transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
  transition: opacity 0s linear 1s;
}

</style>
