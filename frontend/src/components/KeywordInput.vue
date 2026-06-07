<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { COLORS } from '@/styles'

  const keyword = defineModel<string>('keyword', { required: true })
  const emit = defineEmits<{ (e: 'search-pressed'): void }>()

  const expanded = ref(false)

  const redditSelected = ref(localStorage.getItem('reddit_selected') === 'true')
  const newsSelected = ref(localStorage.getItem('news_selected') === 'true')
  const twitterSelected = ref(localStorage.getItem('twitter_selected') === 'true')

  const activeSources = computed(() => {
    let count = 0
    if (redditSelected.value) count++
    if (newsSelected.value) count++
    if (twitterSelected.value) count++
    return count
  })

  function handleSearch () {
    if (!keyword.value || keyword.value.trim() === '') {
      return
    }
    emit('search-pressed')
  }

  function setRemoveSource (source: string): void {
    switch (source) {
      case 'reddit': {
        localStorage.setItem('reddit_selected', String(redditSelected.value))
        break
      }
      case 'news': {
        localStorage.setItem('news_selected', String(newsSelected.value))
        break
      }
      case 'twitter': {
        localStorage.setItem('twitter_selected', String(twitterSelected.value))
        break
      }
    }
  }
</script>

<template>
  <v-container class="stable-landing-view d-flex flex-column align-center">
    <div class="field-wrapper">
      <p class="text-subtitle-1 text-grey-lighten-1 mb-1">Enter a keyword to start</p>

      <v-text-field
        v-model="keyword"
        append-inner-icon="mdi-magnify"
        class="keyword-input"
        :class="{ 'has-input': keyword.length > 0 }"
        hide-details
        placeholder="Keyword"
        @click:append-inner="handleSearch"
        @keydown.enter="handleSearch"
      />

      <div class="d-flex align-center justify-space-between mt-2">
        <v-btn class="settings-btn" rounded="xs" @click="expanded = !expanded">
          Settings
          <v-icon end icon="mdi-cog" />
        </v-btn>

        <div class="text-caption text-grey-lighten-1 mt-2">
          <p v-if="activeSources === 0">Using all sources</p>
          <p v-else-if="activeSources === 1">{{ activeSources }} source selected</p>
          <p v-else>{{ activeSources }} sources selected</p>
        </div>
      </div>
    </div>

    <div v-if="expanded" class="settings-div">
      <p class="text-subtitle-2 font-weight-medium mb-3">Select sources to use (leave empty for all)</p>

      <div class="checkboxes">
        <v-checkbox
          v-model="redditSelected"
          class="custom-checkbox"
          density="comfortable"
          hide-details
          :style="{ color: COLORS.primary }"
          @update:model-value="setRemoveSource('reddit')"
        >
          <span class="checkbox-label">REDDIT</span>
        </v-checkbox>

        <v-checkbox
          v-model="newsSelected"
          class="custom-checkbox"
          density="comfortable"
          hide-details
          :style="{ color: COLORS.primary }"
          @update:model-value="setRemoveSource('news')"
        >
          <span class="checkbox-label">NEWS</span>
        </v-checkbox>

        <v-checkbox
          v-model="twitterSelected"
          class="custom-checkbox"
          density="comfortable"
          hide-details
          :style="{ color: COLORS.primary }"
          @update:model-value="setRemoveSource('twitter')"
        >
          <span class="checkbox-label font-weight-bold">X / TWITTER</span>
        </v-checkbox>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.stable-landing-view {
  min-height: 100vh;
  padding-top: 25vh;
}

.keyword-input {
  border: 4px solid v-bind('COLORS.primary');
  font-size: 2rem;
  width: 100%;
}

.keyword-input.has-input :deep(.v-field__append-inner) {
  opacity: 1;
}

.settings-div {
  background-color: v-bind('COLORS.cardBackground');
  width: 100%;
  max-width: 50rem;
  padding: 20px;
  margin-top: 15px;
  color: white;
}

.checkboxes {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.custom-checkbox :deep(.v-selection-control) {
  min-height: auto !important;
  justify-content: flex-start !important;
  margin-inline-start: 0 !important;
}

.custom-checkbox :deep(.v-selection-control__wrapper) {
  margin-left: 0 !important;
  width: auto !important;
}

.checkbox-label {
  color: #ffffff;
  padding-left: 8px;
  letter-spacing: 1px;
  font-size: 0.9rem;
}

.settings-btn {
  color: v-bind('COLORS.primary');
  padding: 1rem;
  font-size: 1rem;
}

.field-wrapper {
  width: 100%;
  max-width: 50rem;
}
</style>
