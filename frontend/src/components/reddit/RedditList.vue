<script setup lang="ts">
  import type { RedditPost } from '@/types'
  import CommonList from '../common/CommonList.vue'
  import RedditCard from './RedditCard.vue'

  const props = defineProps<{ posts: RedditPost[] }>()
</script>

<template>
  <CommonList>
    <template #header>
      <v-icon
        class="text-red mr-2"
        icon="mdi-reddit"
        size="x-large"
      />

      <h3 class="header-title">REDDIT FEED</h3>
    </template>

    <template #content>
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
    </template>
  </CommonList>
</template>

<style scoped>
.news-feed-wrapper {
  background-color: #0f141c;
  border: 4px solid #1e293b;
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
