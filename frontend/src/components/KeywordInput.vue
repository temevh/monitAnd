<script setup lang="ts">
  import { COLORS } from '@/styles'
  const keyword = defineModel<string>('keyword', { required: true })
  const emit = defineEmits<{ (e: 'search-pressed'): void }>()

  function handleSearch () {
    if (!keyword.value || keyword.value.trim() === '') {
      return
    }

    emit('search-pressed')
  }
</script>

<template>
  <v-container class="d-flex align-center justify-center fill-height">
    <div class="glow-wrapper">
      <v-text-field
        v-model="keyword"
        :append-inner-icon="keyword.length > 0 ? 'mdi-magnify' : undefined"
        class="custom-glow-input"
        density="default"
        hide-details
        placeholder="Search something..."
        rounded="xl"
        type="text"
        variant="solo"
        @click:append-inner="handleSearch"
        @keydown.enter="handleSearch"
      />
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
  font-size: 1.75rem;
  transition: box-shadow 0.3s ease-in-out;
  box-shadow: 0 0 120px rgba(33, 150, 243, 0.4);
}

.custom-glow-input :deep(.v-field__input) {
  min-height: 80px !important;
  padding-top: 12px !important;
  padding-bottom: 12px !important;
}

.custom-glow-input :deep(.v-field--focused) {
  box-shadow: 0 0 400px v-bind('COLORS.primary') !important;
}
</style>
