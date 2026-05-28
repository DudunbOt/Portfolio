<script setup lang="ts">
import { computed } from 'vue'
import DOMPurify from 'dompurify'
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import SkillBadge from '@/components/shared/SkillBadge.vue'
import { usePortfolio } from '@/composables/usePortfolio'

const { profile, skillCategories } = usePortfolio()
const sanitizedBio = computed(() => {
  if (!profile.value?.bio) return ''
  return DOMPurify.sanitize(profile.value.bio, {
    ALLOWED_TAGS: ['strong', 'em', 'b', 'i', 'a', 'br', 'p', 'span', 'u'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class']
  })
})
</script>

<template>
  <SectionWrapper id="about" title="About Me">
    <div class="space-y-8">
      
      <p class="text-lg text-muted-foreground leading-relaxed" v-html="sanitizedBio" />
      <div class="space-y-6">
        <div v-for="category in skillCategories" :key="category.id">
          <h3 class="mb-3 text-lg font-semibold">{{ category.name }}</h3>
          <div class="flex flex-wrap gap-2">
            <SkillBadge
              v-for="skill in category.skills"
              :key="skill.id"
              :skill="skill"
            />
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>
