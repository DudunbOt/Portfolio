<script setup lang="ts">
import SectionWrapper from '@/components/layout/SectionWrapper.vue'
import { Button } from '@/components/ui/button'
import SocialLinks from '@/components/shared/SocialLinks.vue'
import { usePortfolio } from '@/composables/usePortfolio'
import { Mail, MapPin } from 'lucide-vue-next'

const { profile } = usePortfolio()
</script>

<template>
  <SectionWrapper id="contact" title="Get in Touch">
    <div class="text-center">
      <p class="mx-auto mb-8 max-w-lg text-muted-foreground">
        Interested in working together? Feel free to reach out through email or connect with me on social media.
      </p>

      <div class="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button
          v-if="profile?.email"
          size="lg"
          as="a"
          :href="`mailto:${profile.email}`"
        >
          <Mail class="mr-2 h-5 w-5" />
          {{ profile.email }}
        </Button>

        <div
          v-if="profile?.location"
          class="flex items-center gap-2 text-muted-foreground"
        >
          <MapPin class="h-5 w-5" />
          <span>{{ profile.location }}</span>
        </div>
      </div>

      <div class="flex justify-center">
        <SocialLinks />
      </div>
    </div>
  </SectionWrapper>
</template>
