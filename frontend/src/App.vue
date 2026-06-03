<script lang="ts" setup>
  import Main from './components/Main.vue'
  import { COLORS } from './styles.ts'
</script>

<template>
  <v-app>
    <v-main class="global-styles">
      <Main />
    </v-main>
  </v-app>
</template>

<style>
.global-styles{
  background-color: v-bind('COLORS.background');
}
a:hover{
    color: v-bind('COLORS.primary')
}
</style>
