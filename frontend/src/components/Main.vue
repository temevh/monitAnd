<script setup lang="ts">
  import type { KeywordData, News, RedditPost } from '@/types.ts'
  import { ref } from 'vue'
  import { selectedSources } from '@/utils/selectedSources.ts'
  import KeywordDataDisplay from './KeywordDataDisplay.vue'
  import KeywordInput from './KeywordInput.vue'
  import NewsList from './news/NewsList.vue'
  import RedditList from './reddit/RedditList.vue'
  const keyword = ref<string>('')
  const newsList = ref<News[]>([])
  const redditPosts = ref<RedditPost[]>([])
  const keywordData = ref<KeywordData>()
  const hasData = ref(false)

  async function searchPressed () {
    if (!keyword.value || keyword.value.trim() === '') {
      return
    }
    const sources = selectedSources()
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/keyword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword: keyword.value,
          sources: sources,
        }),
      })

      if (response.status === 200) {
        const data = await response.json()
        newsList.value = data.message.newsData || []
        redditPosts.value = data.message.redditPosts || []
        keywordData.value = data.message.keywordData || null
        console.log(keywordData.value)
        hasData.value = true
      } else {
        console.error('Server error', response.status)
      }
    } catch (error) {
      console.error('Network error', error)
    }
  }
</script>

<template>
  <KeywordInput v-if="!hasData" v-model:keyword="keyword" @search-pressed="searchPressed" />

  <v-container v-else id="contentDiv">
    <h1 class="keyword-header">{{ keyword }}</h1>
    <KeywordDataDisplay v-if="keywordData" :data="keywordData" />

    <v-row>
      <v-col
        lg="6"
        md="6"
        sm="12"
      >
        <NewsList :news="newsList" />
      </v-col>

      <v-col
        lg="6"
        md="6"
        sm="12"
      >
        <RedditList :posts="redditPosts" />
      </v-col>
    </v-row>
  </v-container></template>

<style scoped>
.keyword-header {
  justify-self:center;
}
</style>
