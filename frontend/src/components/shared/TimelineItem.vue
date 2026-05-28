<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Experience } from '@/types'

interface Props {
  experience: Experience
}

defineProps<Props>()
</script>

<template>
  <div class="relative pl-8 pb-8 last:pb-0">
    <!-- Timeline line -->
    <div
      class="absolute left-0 top-2 h-full w-px bg-border last:hidden"
    />
    <!-- Timeline dot -->
    <div
      class="absolute left-0 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary"
    />

    <Card>
      <CardHeader class="pb-2">
        <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle class="text-lg">{{ experience.role }}</CardTitle>
          <span class="text-sm text-muted-foreground">{{ experience.period }}</span>
        </div>
        <CardDescription class="text-base font-medium">
          {{ experience.company }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p class="text-muted-foreground mb-3">
          {{ experience.description }}
        </p>
        <div v-if="experience.technologies" class="flex flex-wrap gap-2">
          <Badge
            v-for="tech in experience.technologies"
            :key="tech"
            variant="secondary"
          >
            {{ tech }}
          </Badge>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
