<template>
  <div class="panel">
    <tabs>
      <tab label="PROJECT">
        PROJECT TAB
      </tab>
      <tab label="TERMINAL">
        TERMINAL TAB
      </tab>
      <tab label="LOG">
        LOG TAB
      </tab>
    </tabs>
    <div class="close" @click="closePanel()" v-tooltip.bottom="{ content: 'Close Panel', delay: { show: 1500 } }">
      <font-awesome-icon :icon="closeIcon" size="xs" />
    </div>
  </div>
</template>

<script lang="ts">
import Tab from '@/components/Tab.vue'
import Tabs from '@/components/Tabs.vue'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Tab,
    Tabs,
  },
})
export default class Panel extends Vue {
  get closeIcon() {
    return faTimes
  }

  public closePanel() {
    this.$store.dispatch('setPanelHeight', 0)
  }
}
</script>

<style scoped lang="scss">
.close {
  position: absolute;
  top: 9px;
  right: 9px;
  cursor: pointer;
}
.panel {
  background-color: rgb(30, 30, 30);
  color: rgb(204, 204, 204);
  display: flex;
  flex-direction: column;
}
.panel > div {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
