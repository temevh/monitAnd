<script setup lang="ts">
  import type { News } from '@/types'
  import NewsCard from './NewsCard.vue'

  const props = defineProps<{ news: News[] }>()
</script>

<template>
  <v-container class="pa-4" fluid>
    <v-row v-if="props.news.length === 0" justify="center">
      <v-col class="text-center text-muted py-8" cols="12">
        <v-icon class="mb-2" icon="mdi-newspaper-variant-outline" size="large" />
        <p>No articles found. Try searching for a different keyword.</p>
      </v-col>
    </v-row>

    <v-row v-else>
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
