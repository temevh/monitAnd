<script setup lang="ts">
  import type { News } from '@/types'
  import { COLORS } from '@/styles.ts'
  import NewsCard from './NewsCard.vue'

  const props = defineProps<{ news: News[] }>()
</script>

<template>
  <div class="news-feed-wrapper">

    <div class="header-container d-flex align-center px-4">
      <v-icon
        class="text-teal-accent-3 mr-2"
        icon="mdi-newspaper-variant-outline"
        size="large"
      />

      <h3 class="header-title">NEWS FEED</h3>
    </div>

    <div class="pa-4">
      <v-row no-gutters>
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
    </div>

  </div>
</template>

<style scoped>
.news-feed-wrapper {
  /* Deep outer frame styling */
  background-color: #0f141c;
  border: 1px solid #1e293b;
  width: 100%;
}

.header-container {
  height: 65px;
  border-bottom: 1px solid #1e293b;
}

.header-title {
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 1.5px;
  font-size: 1.15rem;
}

</style>
