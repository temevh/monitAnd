<script setup lang="ts">
  import { COLORS } from '@/styles'
</script>

<template>
  <v-card
    class="news-card rounded-0 px-3"
    :style="{
      backgroundColor: COLORS.cardBackground,
      color: 'white'
    }"
    variant="flat"
  >
    <div class="d-flex flex-column text-left justify-center w-100 h-100">
      <slot name="content" />
      <slot name="metadata" />
    </div>
  </v-card>
</template>

<style scoped>
.news-card {
  border: 2px solid v-bind('COLORS.cardBorder');
}

.news-card:hover {
  border: 2px solid v-bind('COLORS.primary');
}

:deep(.metadata-row) {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  color: v-bind('COLORS.textMuted');
  letter-spacing: 1px;
}

:deep(.source-tag) {
  font-weight: 700;
}

:deep(.title-link) {
  color: #ffffff;
  text-decoration: none;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

:deep(.title-link:hover) {
  color: v-bind('COLORS.primary');
}

</style>
