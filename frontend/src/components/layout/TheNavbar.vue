<script setup lang="ts">
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/shared/ThemeToggle.vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { usePortfolio } from '@/composables/usePortfolio'

const { scrollToSection } = useSmoothScroll()
const { profile } = usePortfolio()

const navLinks = [
  { label: 'About', section: 'about' },
  { label: 'Projects', section: 'projects' },
  { label: 'Experience', section: 'experience' },
  { label: 'Contact', section: 'contact' },
]
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm"
  >
    <nav class="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-6">
      <button
        class="text-lg font-semibold tracking-tight hover:text-primary/80 transition-colors"
        @click="scrollToSection('hero')"
      >
        {{ profile?.name ?? 'Portfolio' }}
      </button>

      <div class="flex items-center gap-1">
        <Button
          v-for="link in navLinks"
          :key="link.section"
          variant="ghost"
          size="sm"
          class="hidden sm:inline-flex"
          @click="scrollToSection(link.section)"
        >
          {{ link.label }}
        </Button>
        <ThemeToggle />
      </div>
    </nav>
  </header>
</template>
