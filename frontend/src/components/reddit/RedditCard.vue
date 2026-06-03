<script setup lang="ts">
  import type { RedditPost } from '@/types'
  import { formatTime } from '@/utils/formatTime'
  import ListCard from '../ui/ListCard.vue'

  const props = defineProps<RedditPost>()
</script>

<template>
  <list-card>
    <template #content>
      <h3 class="text-body-1 font-weight-bold mb-2">
        <a
          class="title-link"
          :href="props.link"
          target="_blank"
        >
          {{ props.title }}
        </a>
      </h3>
    </template>

    <template #metadata>
      <div class="metadata-row">
        <p>by</p>
        <a class="source-tag" :href="`https://www.reddit.com/${props.author }`" target="_blank">{{ props.author }}</a>
        <p>in</p>
        <a class="source-tag" :href="`https://www.reddit.com/${props.subreddit }`" target="_blank">{{ props.subreddit }}</a>
        <p>on</p>
        <span>{{ formatTime(props.date, "eu") }}</span>
      </div>
    </template>
  </list-card>
</template>

<style scoped>

</style>
