<script setup lang="ts">
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import TimelineItem from '@/components/shared/TimelineItem.vue'
import { usePortfolio } from '@/composables/usePortfolio'

const { experience } = usePortfolio()
</script>

<template>
  <SectionWrapper id="experience" title="Experience">
    <div class="ml-1">
      <TimelineItem
        v-for="exp in experience"
        :key="exp.id"
        :experience="exp"
      />
    </div>
  </SectionWrapper>
</template>
