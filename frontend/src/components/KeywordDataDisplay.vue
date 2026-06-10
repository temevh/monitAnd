<script setup lang="ts">
  import type { KeywordData } from '@/types'
  import moment from 'moment'
  import { computed, ref } from 'vue'
  import { COLORS } from '@/styles'
  const props = defineProps<{ data: KeywordData }>()
  const period = ref('monthly')

  const chartData = computed(() => {
    const dailyCounts: Record<string, number> = {}
    const handledData = props.data.search_logs
    if (period.value === 'weekly') {
      console.log('handledData', handledData)
      for (const date of handledData) {
        console.log(moment(new Date(date.searched_at)).week())
      }
    }
    for (const log of handledData) {
      const normalizedDate = new Date(log.searched_at).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      })
      dailyCounts[normalizedDate] = (dailyCounts[normalizedDate] || 0) + 1
    }

    const sortedLabels = Object.keys(dailyCounts).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    )

    const sortedValues = sortedLabels.map(date => dailyCounts[date])

    return {
      labels: sortedLabels,
      values: sortedValues,
    }
  })
</script>

<template>
  <v-card class="mx-auto text-center rounded-0 pa-4" color="#0f141c" max-width="600" theme="dark">
    <v-card-item title="INTEREST OVER TIME">
      <template #subtitle>
        Tracking activity loops for: <strong :style="{ color: COLORS.primary }">{{ props.data.phrase }}</strong>
      </template>
    </v-card-item>

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
