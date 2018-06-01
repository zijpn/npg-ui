<template>
  <div class="b-tabs">
    <nav class="tabs is-small">
      <ul>
        <li v-for="(tab, index) in tabs" :key="index" :class="{ 'is-active': activeTab === index }">
          <a @click="tabClick(index)">
            <span>{{tab.label}}</span>
          </a>
        </li>
      </ul>
    </nav>
    <section class="tab-content">
      <slot />
    </section>
  </div>
</template>

<script lang="ts">
import Tab from '@/components/Tab.vue'
import { Component, Prop, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Tabs extends Vue {

  get activeTab() {
    return this.$store.state.panelTab
  }

  @Provide()
  public tabs: Tab[] = []

  public register(tab: Tab) {
    this.tabs.push(tab)
  }

  public unregister(tab: Tab) {
    this.tabs = this.tabs.filter((o) => o !== tab)
  }

  public tabClick(index: number) {
    this.$store.dispatch('setPanelTab', index)
  }

  public mounted() {
    this.tabs[0].activate()
    this.$store.watch(
      (state) => {
        return this.$store.state.panelTab
      },
      (index) => {
        this.tabs.forEach((t, i) => {
          if (index === i) {
            t.activate()
          } else {
            t.deactivate()
          }
        })
      },
    )
  }
}
</script>

<style lang="scss" scoped>

.tabs {
  margin-bottom: 0;
  flex-shrink: 0;
}

.tabs a {
  color: rgba(231, 231, 231, 0.5);
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: rgb(30, 30, 30);
}

.tabs a:hover {
  color: #fff;
  border-bottom-color: rgb(30, 30, 30);
}

.tabs li.is-active a {
  border-bottom-color: #3273dc;
}

.tabs {
  margin-bottom: 0 !important;
}

.tabs ul {
  border-bottom-style: none;
}

.tab-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tab-content > div {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}

</style>