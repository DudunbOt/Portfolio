<script setup lang="ts">
import { computed } from 'vue'
// import DOMPurify from 'dompurify'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { usePortfolio } from '@/composables/usePortfolio'
import { ArrowRight, Download } from 'lucide-vue-next'

const { scrollToSection } = useSmoothScroll()
const { profile } = usePortfolio()

const initials = computed(() => {
  if (!profile.value?.name) return ''
  return profile.value.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
})

// const sanitizedBio = computed(() => {
//   if (!profile.value?.bio) return ''
//   return DOMPurify.sanitize(profile.value.bio, {
//     ALLOWED_TAGS: ['strong', 'em', 'b', 'i', 'a', 'br', 'p', 'span', 'u'],
//     ALLOWED_ATTR: ['href', 'target', 'rel', 'class']
//   })
// })
</script>

<template>
  <section
    v-if="profile"
    id="hero"
    class="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 md:px-6"
  >
    <div class="mx-auto max-w-3xl text-center">
      <Avatar class="mx-auto mb-8 h-32 w-32">
        <AvatarImage src="me.png" :alt="profile.name" />
        <AvatarFallback class="text-3xl">{{ initials }}</AvatarFallback>
      </Avatar>

      <h1 class="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        {{ profile.name }}
      </h1>

      <p class="mb-6 text-xl text-muted-foreground sm:text-2xl">
        {{ profile.title }}
      </p>

      <!-- <p class="mx-auto mb-8 max-w-2xl text-muted-foreground" v-html="sanitizedBio"></p> -->

      <div class="flex flex-wrap justify-center gap-4">
        <Button size="lg" @click="scrollToSection('contact')">
          Get in Touch
          <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
        <Button
          v-if="profile.resumeUrl"
          variant="outline"
          size="lg"
          as="a"
          :href="profile.resumeUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Download class="mr-2 h-4 w-4" />
          Resume
        </Button>
      </div>
    </div>
  </section>
</template>
