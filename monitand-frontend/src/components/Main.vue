<script setup lang="ts">
  import { ref } from 'vue'
  import KeywordInput from './KeywordInput.vue'
  const keyword = ref<string>('')

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
        console.log(data)
      } else {
        console.error('Server error', response.status)
      }
    } catch (error) {
      console.error('Network error', error)
    }
  }
</script>

<template>
  <KeywordInput v-model:keyword="keyword" @search-pressed="searchPressed" />
</template>
