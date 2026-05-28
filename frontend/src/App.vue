<script setup lang="ts">
import { onMounted } from 'vue'
import TheNavbar from '@/components/layout/TheNavbar.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'
import ErrorDisplay from '@/components/shared/ErrorDisplay.vue'
import { usePortfolio } from '@/composables/usePortfolio'

const { loadPortfolio, isLoading, error, hasData } = usePortfolio()

onMounted(() => {
  loadPortfolio()
})
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <TheNavbar />
    <main>
      <!-- Loading State -->
      <div v-if="isLoading && !hasData" class="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>

      <!-- Error State -->
      <ErrorDisplay
        v-else-if="error && !hasData"
        :error="error"
        @retry="loadPortfolio(true)"
      />

      <!-- Content -->
      <template v-else>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </template>
    </main>
    <TheFooter />
  </div>
</template>
