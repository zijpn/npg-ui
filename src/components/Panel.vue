<template>
  <div class="panel">
    <b-tabs size="is-small" :animated="false" v-model="activeTab">
      <b-tab-item label="PROJECT">
        PROJECT TAB
      </b-tab-item>
      <b-tab-item label="TERMINAL">
        TERMINAL TAB
      </b-tab-item>
      <b-tab-item label="LOG">
        LOG TAB
      </b-tab-item>
    </b-tabs>
    <div class="close" @click="closePanel()" v-tooltip.top="{ content: 'Close Panel', delay: { show: 1500 } }">
      <font-awesome-icon :icon="closeIcon" size="xs" />
    </div>
  </div>
</template>

<script lang="ts">
import faWindowClose from '@fortawesome/fontawesome-free-solid/faWindowClose'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Panel extends Vue {

  get closeIcon() {
    return faWindowClose
  }

  get activeTab() {
    return this.$store.state.panelTab
  }

  set activeTab(index: number) {
    this.$store.dispatch('setPanelTab', index)
  }

  public closePanel() {
    this.$store.dispatch('setPanelHeight', 0)
  }

}
</script>

<style scoped lang="scss">

.panel {
  background-color: rgb(30, 30, 30);
  color: rgb(204, 204, 204);
}

.close {
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 0 12px;
  line-height: 30px;
  cursor: pointer;
}

</style>
