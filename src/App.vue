<template>
  <div id="app">
    <side-bar/>
    <main>
      <header id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </header>
      <router-view/>
    </main>
    <status-bar/>
  </div>
</template>

<script lang="ts">
import SideBar from '@/components/SideBar.vue'
import StatusBar from '@/components/StatusBar.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    SideBar,
    StatusBar,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
// global style (i.e. not scoped)
@import '~bulma';

#app {
  min-height: 100vh;
}

main {
  position: absolute;
  left: 50px;
  top: 0px;
  bottom: 22px;
  width: calc(100vw - 50px);
  padding: 0 5px;
}

.tooltip .tooltip-inner {
  max-width: 24rem;
  background: rgba(74, 74, 74, 0.9);
  color: #fff;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.75rem;
  border-radius: 3px;
  padding: .4rem .8rem;
}

.tooltip .tooltip-arrow {
  position: absolute;
  border-style: solid;
  border-color: rgba(74, 74, 74, 0.9);
}

.tooltip[x-placement^="right"] {
  margin-left: 8px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 8px 8px 8px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -8px;
  top: calc(50% - 8px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 8px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 8px 0 8px 8px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -8px;
  top: calc(50% - 8px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 8px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 8px 8px 0 8px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -8px;
  left: calc(50% - 8px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 8px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 8px 8px 8px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -8px;
  left: calc(50% - 8px);
  margin-top: 0;
  margin-bottom: 0;
}

</style>
