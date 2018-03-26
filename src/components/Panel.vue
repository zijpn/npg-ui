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
import faWindowClose from '@fortawesome/fontawesome-free-solid/faWindowClose'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Tab,
    Tabs,
  },
})
export default class Panel extends Vue {

  get closeIcon() {
    return faWindowClose
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
