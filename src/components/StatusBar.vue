<template>
  <footer class="footer">
    <div class="version">
      ui {{uiVersion}}, server {{serverVersion}}
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class StatusBar extends Vue {
  // Added "strictPropertyInitialization": false to tsconfig until we can use
  // 'definite assignment assertion' i.e.
  //     public uiVersion!: string
  // https://github.com/kaorun343/vue-property-decorator/issues/81
  // https://www.ryadel.com/en/ts2564-ts-property-has-no-initializer-typescript-error-fix-visual-studio-2017-vs2017/
  // https://github.com/vuejs/vetur/issues/682
  @Prop({default: '0.1.0'})
  public uiVersion: string
  @Prop({default: 'dev'})
  public serverVersion: string
}
</script>

<style scoped lang="scss">
.footer {
  padding: 2px;
  font-size: 12px;
}
.version {
  display: flex;
  justify-content: center;
  margin: auto;
}
</style>