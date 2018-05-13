<template>
  <div class="panel">
    <tabs>
      <tab label="PROJECT">
        <project></project>
      </tab>
      <tab label="TERMINAL">
        <term></term>
      </tab>
      <tab label="LOG">
        <log></log>
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
    Log: () => import(/* webpackChunkName: "log" */ '@/components/Log.vue'),
    Project: () => import(/* webpackChunkName: "project" */ '@/components/Project.vue'),
    Tab,
    Tabs,
    Term: () => import(/* webpackChunkName: "term" */ '@/components/Term.vue'),
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

<style lang="scss" scoped>
.close {
  position: absolute;
  top: 9.5px;
  right: 9.5px;
  cursor: pointer;
}
.panel {
  background-color: rgb(30, 30, 30);
  color: rgb(204, 204, 204);
  display: flex;
  flex-direction: column;
}
.panel > div {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
