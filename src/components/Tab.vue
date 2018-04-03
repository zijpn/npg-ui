<template>
  <div v-show="isActive" class="tab-item">
    <slot />
  </div>
</template>

<script lang="ts">
import Tabs from '@/components/Tabs.vue'
import { Component, Prop, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Tab extends Vue {
  @Prop()
  public label: string

  @Provide()
  public isActive: boolean = false

  public activate() {
    this.isActive = true
  }

  public deactivate() {
    this.isActive = false
  }

  public created() {
    const parent = this.$parent as Tabs
    parent.register(this)
  }

  public beforeDestroy() {
    const parent = this.$parent as Tabs
    parent.unregister(this)
  }
}
</script>

<style lang="scss" scoped>

.tab-item {
  flex: 1;
}

</style>