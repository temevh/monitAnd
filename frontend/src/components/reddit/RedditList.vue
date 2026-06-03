<script setup lang="ts">
  import type { RedditPost } from '@/types'
  import RedditCard from './RedditCard.vue'

  const props = defineProps<{ posts: RedditPost[] }>()
</script>

<template>
  <div class="news-feed-wrapper">

    <div class="header-container d-flex align-center px-4">
      <v-icon
        class="text-teal-accent-3 mr-2"
        icon="mdi-reddit"
        size="large"
      />

      <h3 class="header-title">REDDIT FEED</h3>
    </div>

    <div class="pa-4">
      <v-row no-gutters>
        <v-col
          v-for="(article, index) in props.posts"
          :key="index"
          cols="12"
        >
          <RedditCard
            :author="article.author"
            :date="article.date"
            :link="article.link"
            :subreddit="article.subreddit"
            :title="article.title"
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
