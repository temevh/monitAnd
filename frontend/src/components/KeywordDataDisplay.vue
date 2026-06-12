<script setup lang="ts">
  import type { KeywordData } from '@/types'
  import moment from 'moment'
  import { computed, ref } from 'vue'
  import { COLORS } from '@/styles'
  const props = defineProps<{ data: KeywordData }>()
  const period = ref('monthly')

  const chartData = computed(() => {
    const handledData = props.data.search_logs
    if (!handledData || handledData.length === 0) {
      return { labels: [], values: [] }
    }

    const counts: Record<string, number> = {}
    if (period.value === 'weekly') {
      for (const log of handledData) {
        const momentDate = moment(log.searched_at)
        const weekNumber = momentDate.week()
        const year = momentDate.year()

        const weekLabel = `W ${weekNumber} (${year})`
        counts[weekLabel] = (counts[weekLabel] || 0) + 1
      }
    } else if (period.value === 'monthly') {
      for (const log of handledData) {
        const normalizedDate = new Date(log.searched_at).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        })
        counts[normalizedDate] = (counts[normalizedDate] || 0) + 1
      }
    }

    const labels = Object.keys(counts)
    const values = labels.map(label => counts[label])

    return {
      labels: labels,
      values: values,
    }
  })
</script>

<template>
  <v-card class="mx-auto text-center rounded-0 pa-4" color="#0f141c" max-width="600" theme="dark">
    <v-card-item title="INTEREST OVER TIME" />

    <v-btn-toggle
      v-model="period"
      density="compact"
      mandatory
      rounded="lg"
      variant="outlined"
    >
      <v-btn value="weekly">Weekly</v-btn>
      <v-btn value="monthly">Monthly</v-btn>
      <v-btn value="yearly">Yearly</v-btn>
      <v-btn value="all">All-time</v-btn>
    </v-btn-toggle>

    <v-card-text>
      <v-sparkline
        auto-draw
        :auto-draw-duration="2000"
        :color="COLORS.primary"
        height="100"
        :labels="chartData.labels"
        line-width="2"
        :model-value="chartData.values"
        padding="24"
        smooth
        stroke-linecap="round"
      >
        <template #label="item">
          {{ item.value }}
        </template>
      </v-sparkline>
    </v-card-text>

    <v-divider class="border-opacity-25" color="grey" />

    <v-card-actions class="justify-space-between text-caption px-4 text-grey-lighten-1">
      <span>Total Volume: <strong>{{ props.data.search_count }}</strong> searches</span>
      <span>Range: {{ chartData.labels[0] }} - {{ chartData.labels[chartData.labels.length - 1] }}</span>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
:deep(.v-sparkline__labels text) {
  font-size: 4px !important;
  fill: rgba(255, 255, 255, 0.7) !important;
  font-weight: 500;
}
</style>
