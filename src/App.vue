<template>
  <div id="app">
    <header id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </header>
    <main>
      <router-view/>
    </main>
    <status-bar/>
  </div>
</template>

<script lang="ts">
import StatusBar from '@/components/StatusBar.vue' // @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {
    StatusBar,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import '~bulma';

#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
 
main {
  flex: 1;
  width: 100%;
}

</style>
