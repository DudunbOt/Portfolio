<script setup lang="ts">
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-vue-next'
import type { Project } from '@/types'

interface Props {
  project: Project
}

defineProps<Props>()
</script>

<template>
  <Card class="flex flex-col">
    <CardHeader>
      <CardTitle>{{ project.title }}</CardTitle>
      <CardDescription>{{ project.description }}</CardDescription>
    </CardHeader>
    <CardContent class="flex-1">
      <div class="flex flex-wrap gap-2">
        <Badge
          v-for="tech in project.technologies"
          :key="tech"
          variant="outline"
        >
          {{ tech }}
        </Badge>
      </div>
    </CardContent>
    <CardFooter class="gap-2">
      <Button
        v-if="project.githubUrl"
        variant="outline"
        size="sm"
        as="a"
        :href="project.githubUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github class="mr-2 h-4 w-4" />
        Code
      </Button>
      <Button
        v-if="project.liveUrl"
        size="sm"
        as="a"
        :href="project.liveUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ExternalLink class="mr-2 h-4 w-4" />
        Live Demo
      </Button>
    </CardFooter>
  </Card>
</template>
