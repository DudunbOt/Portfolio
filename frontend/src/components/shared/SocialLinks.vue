<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail, Twitter, Globe } from 'lucide-vue-next'
import { usePortfolio } from '@/composables/usePortfolio'

const { profile } = usePortfolio()

const iconMap: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  email: Mail,
  twitter: Twitter,
  website: Globe,
  default: Globe,
}

const getIcon = (iconName: string) => {
  return iconMap[iconName.toLowerCase()] || iconMap.default
}

const getUrl = (contact: { name: string; value: string; icon: string }) => {
  const iconLower = contact.icon.toLowerCase()
  if (iconLower === 'mail' || iconLower === 'email') {
    return `mailto:${contact.value}`
  }
  return contact.value
}
</script>

<template>
  <div class="flex gap-1">
    <Button
      v-for="contact in profile?.contacts"
      :key="contact.id"
      variant="ghost"
      size="icon"
      as="a"
      :href="getUrl(contact)"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="contact.name"
    >
      <component :is="getIcon(contact.icon)" class="h-5 w-5" />
    </Button>
  </div>
</template>
