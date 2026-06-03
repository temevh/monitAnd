<script setup lang="ts">
  import type { News } from '@/types'
  import { COLORS } from '@/styles'
  import { formatTime } from '@/utils/formatTime'

  const props = defineProps<News>()
</script>

<template>
  <v-card
    class="news-card rounded-0 px-3 pb-4"
    :style="{
      backgroundColor: COLORS.cardBackground,
      color: 'white'
    }"
    variant="flat"
  >
    <div class="d-flex align-center justify-space-between w-100">
      <div class="d-flex flex-column text-left mr-4 overflow-hidden">
        <h3 class="text-body-1 font-weight-bold mb-2">
          <a
            class="custom-news-link"
            :href="props.url"
            target="_blank"
          >
            {{ props.title }}
          </a>
        </h3>

        <div class="metadata-row">
          <p>from</p>
          <span class="source-tag">{{ props.source }}</span>
          <span>{{ formatTime(props.date, "eu") }}</span>

        </div>
      </div>
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

.metadata-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  color: v-bind('COLORS.textMuted');
  letter-spacing: 1px;
}

.source-tag {
  font-weight: 700;
}

.views-tag {
  display: flex;
  align-items: center;
}

.custom-news-link {
  color: #ffffff;
  text-decoration: none;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.custom-news-link:hover {
  color: v-bind('COLORS.primary');
}

</style>
