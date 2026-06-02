<script setup lang="ts">
  import type { News } from '@/types'
  import { computed, ref } from 'vue'
  const props = defineProps<News>()

  const isExpanded = ref(false)

  const contentPreview = computed(() => {
    if (props.content?.length > 120) {
      return props.content?.slice(0, 120) + '...'
    }

    return props.content
  })

</script>

<template>
  <v-card class="mx-auto my-2" density="compact" max-width="600" variant="outlined">
    <v-card-item class="pb-0">
      <div class="d-flex justify-space-between align-center text-caption text-medium-emphasis">
        <span>{{ props.source }} • {{ props.author || 'Anonymous' }}</span>
        <span v-if="props.date">{{ props.date }}</span>
      </div>
    </v-card-item>

    <v-card-title class="pt-1 text-subtitle-1 font-weight-bold text-wrap line-clamp-2">
      <a class="text-decoration-none text-primary" :href="props.url" target="_blank">
        {{ props.title }}
        <v-icon class="ml-1" icon="mdi-open-in-new" size="x-small" />
      </a>
    </v-card-title>

    <v-card-text class="text-body-2 pb-2">
      {{ isExpanded ? props.content : contentPreview }}
    </v-card-text>

    <v-card-actions class="pt-0 justify-end">
      <v-btn
        color="secondary"
        density="compact"
        :icon="isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        variant="text"
        @click="isExpanded = !isExpanded"
      />
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
