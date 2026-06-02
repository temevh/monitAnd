<script setup lang="ts">
  import type { News } from '@/types'
  import { COLORS, SHADOWS } from '@/styles' // 1. Import our design system tokens
  import { formatTime } from '@/utils/formatTime'

  const props = defineProps<News>()
</script>

<template>
  <v-card
    class="mx-auto news-card transition-swing rounded-0"
    density="comfortable"
    max-width="400"
    :style="{
      backgroundColor: COLORS.cardBackground,
      color: COLORS.textDark,
      boxShadow: SHADOWS.subtle
    }"
    variant="flat"
  >
    <v-card-item class="pt-4 pb-1">
      <div
        class="d-flex justify-space-between align-center text-caption font-weight-medium"
        :style="{ color: COLORS.textMuted }"
      >
        <span class="text-truncate mr-4">
          <v-icon class="mr-1" icon="mdi-newspaper-variant" size="x-small" />
          {{ props.source }} <span class="mx-1">•</span> {{ props.author || 'Anonymous' }}
        </span>

        <span v-if="props.date" class="text-no-wrap">
          {{ formatTime(props.date, "eu") }}
        </span>
      </div>
    </v-card-item>

    <v-card-text class="pt-1 pb-4">
      <h3 class="text-h6 font-weight-bold line-clamp-3 mb-1">
        <a
          class="custom-news-link"
          :href="props.url"
          :style="{ '--link-color': 'white', '--link-hover': COLORS.primary }"
          target="_blank"
        >
          {{ props.title }}
          <v-icon class="ml-1 icon-redirect" icon="mdi-open-in-new" size="x-small" />
        </a>
      </h3>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.news-card {
  border: 4px solid v-bind('COLORS.cardBorder');
}

.news-card:hover {
  box-shadow: v-bind('SHADOWS.hover') !important;
  border: 4px solid v-bind('COLORS.primary');
}

.custom-news-link {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.2s ease;
  line-height: 1.4;
  display: inline;
}

.custom-news-link:hover {
  color: var(--link-hover);
}

.icon-redirect {
  transition: transform 0.2s ease;
  opacity: 0.7;
}
.custom-news-link:hover .icon-redirect {
  transform: translate(1px, -1px);
  opacity: 1;
}

/* Elegant multi-line containment */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
