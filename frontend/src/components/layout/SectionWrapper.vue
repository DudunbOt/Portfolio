<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  id: string
  title?: string
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <section
    :id="props.id"
    :class="cn('py-16 md:py-24 px-4 md:px-6', props.class)"
  >
    <div class="mx-auto max-w-5xl">
      <h2
        v-if="props.title"
        class="text-3xl font-bold tracking-tight mb-8 md:mb-12"
      >
        {{ props.title }}
      </h2>
      <slot />
    </div>
  </section>
</template>
