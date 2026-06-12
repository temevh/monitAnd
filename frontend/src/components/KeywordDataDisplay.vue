<script setup lang="ts">
  import type { KeywordData } from '@/types'
  import moment from 'moment'
  import { computed, ref } from 'vue'
  import { COLORS } from '@/styles'

  const props = defineProps<{ data: KeywordData }>()
  const hoveredIndex = ref<number | null>(null)
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
  <v-card class="mx-auto text-center rounded-0 pa-4 position-relative" color="#0f141c" max-width="600" theme="dark">
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

    <div
      v-if="hoveredIndex !== null && chartData.labels[hoveredIndex]"
      class="custom-spark-tooltip"
    >
      <div class="tooltip-label">{{ chartData.labels[hoveredIndex] }}</div>

      <div class="tooltip-value">
        <strong>{{ chartData.values[hoveredIndex] }}</strong> searches
      </div>
    </div>

    <v-card-text>
      <v-sparkline
        auto-draw
        :auto-draw-duration="2000"
        :color="COLORS.primary"
        height="100"
        interactive
        :labels="chartData.labels"
        line-width="2"
        :model-value="chartData.values"
        padding="24"
        show-markers
        smooth
        stroke-linecap="round"
        @mouseenter:data="({ index }) => hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
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
.custom-spark-tooltip {
  position: absolute;
  top: 15px;
  right: 20px;
  z-index: 10;
  background-color: #1e293b;
  border: 1px solid v-bind('COLORS.primary');
  padding: 6px 12px;
  border-radius: 4px;
  color: white;
  font-size: 0.75rem;
  line-height: 1.3;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  pointer-events: none;
}

.tooltip-label {
  color: #94a3b8;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tooltip-value {
  margin-top: 2px;
}

:deep(.v-sparkline__labels text) {
  font-size: 4px !important;
  fill: rgba(255, 255, 255, 0.7) !important;
}
</style>
