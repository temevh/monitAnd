<script setup lang="ts">
import { ref, watch } from "vue";
import KeywordInput from "./KeywordInput.vue";
const keyword = ref<string>("");
watch(keyword, () => {
  console.log(keyword.value);
});
</script>

<template>
  <KeywordInput v-model:keyword="keyword" />
</template>
