<script setup lang="ts">
  import type { News } from '@/types'
  import { formatTime } from '@/utils/formatTime'
  import ListCard from '../ui/ListCard.vue'

  const props = defineProps<News>()
</script>

<template>
  <list-card>
    <template #content>
      <h3 class="text-body-1 font-weight-bold">
        <a
          class="title-link"
          :href="props.url"
          target="_blank"
        >
          {{ props.title }}
        </a>
      </h3></template>

    <template #metadata>
      <div class="metadata-row">
        <p>from</p>
        <span class="source-tag">{{ props.source }}</span>
        <span>{{ formatTime(props.date, "eu") }}</span>
      </div></template>
  </list-card>
</template>
