<script setup lang="ts">
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import ProjectCard from '@/components/shared/ProjectCard.vue'
import { usePortfolio } from '@/composables/usePortfolio'

const { projects } = usePortfolio()
</script>

<template>
  <SectionWrapper id="projects" title="Projects">
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
    </div>
  </SectionWrapper>
</template>
