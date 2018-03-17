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
</style>
