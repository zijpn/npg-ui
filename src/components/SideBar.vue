<template>
  <div class="sidebar">
    <div class="item" @click="togglePanel(0)"
         v-tooltip.right="{ content: 'Project', delay: { show: 1500 } }"
         v-bind:class="{'active': projectActive}">
      <font-awesome-icon :icon="fileIcon" />
    </div>
    <div class="item" @click="togglePanel(1)"
         v-tooltip.right="{ content: 'Terminal', delay: { show: 1500 } }"
         v-bind:class="{'active': terminalActive}">
      <font-awesome-icon :icon="terminalIcon" />
    </div>
    <div class="item" @click="togglePanel(2)"
         v-tooltip.right="{ content: 'Log', delay: { show: 1500 } }"
         v-bind:class="{'active': logActive}">
      <font-awesome-icon :icon="logIcon" />
    </div>
  </div>
</template>

<script lang="ts">
import faBug from '@fortawesome/fontawesome-free-solid/faBug'
import faFile from '@fortawesome/fontawesome-free-solid/faFile'
import faTerminal from '@fortawesome/fontawesome-free-solid/faTerminal'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SideBar extends Vue {
  get fileIcon() {
    return faFile
  }

  get terminalIcon() {
    return faTerminal
  }

  get logIcon() {
    return faBug
  }

  get projectActive() {
    return this.$store.getters.projectPanelActive
  }

  get terminalActive() {
    return this.$store.getters.terminalPanelActive
  }

  get logActive() {
    return this.$store.getters.logPanelActive
  }

  public togglePanel(index: number) {
    this.$store.dispatch('togglePanel', index)
  }
}
</script>

<style lang="scss" scoped>

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

.item:hover, .active {
  color: white;
}

</style>
