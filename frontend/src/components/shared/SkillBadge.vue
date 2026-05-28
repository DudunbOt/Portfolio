<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import type { Skill } from '@/types'

interface Props {
  skill: Skill
}

defineProps<Props>()
</script>

<template>
  <Badge variant="secondary">
    {{ skill.name }}
  </Badge>
</template>
