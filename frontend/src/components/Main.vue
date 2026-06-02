<script setup lang="ts">
  import type { News } from '@/types.ts'
  import { ref } from 'vue'
  import { COLORS } from '@/styles.ts'
  import KeywordInput from './KeywordInput.vue'
  import NewsList from './news/NewsList.vue'
  const keyword = ref<string>('')
  const newsList = ref<News[]>([])

  async function searchPressed () {
    if (!keyword.value || keyword.value.trim() === '') {
      return
    }
    console.log('keyword', keyword.value)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/keyword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword: keyword.value,
        }),
      })

      if (response.status === 200) {
        const data = await response.json()
        newsList.value = data.message
        console.group('📰 API Fetch Successful')
        console.log('Raw JSON Response Payload:', data)
        console.log('Type of response body:', typeof data)

        console.log('Formatted News Array View:')
        console.table(data.message)
        console.groupEnd()
      } else {
        console.error('Server error', response.status)
      }
    } catch (error) {
      console.error('Network error', error)
    }
  }
</script>

<template>
  <KeywordInput v-if="newsList.length === 0" v-model:keyword="keyword" @search-pressed="searchPressed" />

  <v-container v-if="keyword.length > 0" id="contentDiv">
    <h1 class="keyword-header">{{ keyword }}</h1>

    <v-row>
      <v-col
        v-for="n in 4"
        :key="n"
        cols="12"
        lg="6"
        md="6"
        sm="12"
      >
        <NewsList :news="newsList" />
      </v-col>
    </v-row>
  </v-container></template>

<style scoped>
.keyword-header {
  justify-self:center;
}

</style>
