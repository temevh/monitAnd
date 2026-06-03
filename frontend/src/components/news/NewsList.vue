<script setup lang="ts">
  import type { News } from '@/types'
  import CommonList from '../common/CommonList.vue'
  import NewsCard from './NewsCard.vue'

  const props = defineProps<{ news: News[] }>()
</script>

<template>
  <CommonList>
    <template #header>
      <v-icon
        class="text-teal-accent-3 mr-2"
        icon="mdi-newspaper-variant-outline"
        size="large"
      />

      <h3 class="header-title">NEWS FEED</h3>
    </template>

    <template #content>
      <v-col
        v-for="(article, index) in props.news"
        :key="index"
        cols="12"
      >
        <NewsCard
          :author="article.author"
          :content="article.content"
          :date="article.date"
          :source="article.source"
          :title="article.title"
          :url="article.url"
        />
      </v-col>
    </template>
  </CommonList>
</template>
