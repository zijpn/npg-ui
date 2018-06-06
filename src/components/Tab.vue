<template>
  <div v-show="isActive">
    <slot />
  </div>
</template>

<script lang="ts">
import Tabs from '@/components/Tabs.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Tab extends Vue {

  @Prop({default: 'TAB'})
  public label!: string

  // data properties
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
</style>
