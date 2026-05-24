<script setup lang="ts">
import { ref } from "vue";
import KeywordInput from "./KeywordInput.vue";
const keyword = ref<string>("");
</script>

<template>
  <KeywordInput v-model:keyword="keyword" />
</template>
