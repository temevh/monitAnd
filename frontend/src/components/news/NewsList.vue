<script setup lang="ts">
  import type { News } from '@/types'
  import NewsCard from './NewsCard.vue'

  const props = defineProps<{ news: News[] }>()
</script>

<template>
  <v-container fluid>
    <v-row>
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
    </v-row>
  </v-container>
</template>
