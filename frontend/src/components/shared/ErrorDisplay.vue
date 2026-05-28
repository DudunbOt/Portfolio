<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-vue-next'

defineProps<{
  error: Error
}>()

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div class="flex min-h-[50vh] flex-col items-center justify-center gap-6 p-4">
    <AlertCircle class="h-16 w-16 text-destructive" />
    <div class="text-center">
      <h2 class="mb-2 text-xl font-semibold">Unable to load portfolio</h2>
      <p class="text-muted-foreground">{{ error.message }}</p>
    </div>
    <Button @click="emit('retry')">
      <RefreshCw class="mr-2 h-4 w-4" />
      Try Again
    </Button>
  </div>
</template>
