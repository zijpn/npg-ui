<template>
  <div class="panel">
    <h2 style="text-align: center;">panel</h2> 
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Panel extends Vue {
}
</script>

<style scoped lang="scss">

.panel {
  background-color: rgb(30, 30, 30);
  color: rgb(204, 204, 204);
}

</style>
