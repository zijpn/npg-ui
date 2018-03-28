<template>
  <div>
    <h2 style="text-align: center;">terminal</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Terminal } from 'xterm'
import * as termFit from 'xterm/dist/addons/fit/fit'
import * as termLinks from 'xterm/dist/addons/webLinks/webLinks'

Terminal.applyAddon(termFit)
Terminal.applyAddon(termLinks)

@Component
export default class Term extends Vue {
}
</script>

<style lang="scss">
@import "~xterm/dist/xterm.css";
</style>

<style lang="scss" scoped>

</style>