<template>
  <div class="sidebar">
    <div class="item" v-tooltip.right="{ content: 'Project', delay: { show: 1500 } }">
      <font-awesome-icon :icon="fileIcon" />
    </div>
    <div class="item" v-tooltip.right="{ content: 'Terminal', delay: { show: 1500 } }">
      <font-awesome-icon :icon="terminalIcon" />
    </div>
  </div>
</template>

<script lang="ts">
import socket from '@/socket'
import faFile from '@fortawesome/fontawesome-free-solid/faFile'
import faTerminal from '@fortawesome/fontawesome-free-solid/faTerminal'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
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

</style>
