<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
import SocialLinks from '@/components/shared/SocialLinks.vue'
import { usePortfolio } from '@/composables/usePortfolio'

const { profile } = usePortfolio()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="px-4 md:px-6">
    <div class="mx-auto max-w-5xl">
      <Separator />
      <div class="flex flex-col items-center gap-4 py-8 md:flex-row md:justify-between">
        <p class="text-sm text-muted-foreground">
          &copy; {{ currentYear }} {{ profile?.name }}. All rights reserved.
        </p>
        <SocialLinks />
      </div>
    </div>
  </footer>
</template>
