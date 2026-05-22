<script setup lang="ts">
import { ref, watch } from "vue";

const keyword = ref("");
watch(keyword, () => {
  console.log(keyword.value);
});
</script>

<template>
  <v-container class="d-flex align-center justify-center fill-height">
    <div class="glow-wrapper">
      <v-text-field
        label="Search something..."
        variant="solo"
        rounded="xl"
        density="default"
        class="custom-glow-input"
        hide-details
        v-model="keyword"
      >
      </v-text-field>
    </div>
  </v-container>
</template>

<style scoped>
.glow-wrapper {
  width: 100%;
  max-width: 650px;
  padding: 20px;
}

.custom-glow-input :deep(.v-field) {
  font-size: 2rem;
  transition: box-shadow 0.3s ease-in-out;
  box-shadow: 0 0 120px rgba(33, 150, 243, 0.4);
}

.custom-glow-input :deep(.v-field__input) {
  min-height: 80px !important;
  padding-top: 12px !important;
  padding-bottom: 12px !important;
}

.custom-glow-input :deep(.v-field--focused) {
  box-shadow: 0 0 200px rgb(238, 158, 11) !important;
}
</style>
