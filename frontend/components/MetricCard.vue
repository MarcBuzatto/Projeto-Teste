<template>
  <div :class="['border-2 rounded-lg overflow-hidden bg-slate-900', colors.border]">
    <div :class="['h-8 border-b flex items-center px-3 font-mono text-xs', colors.text, colors.bg]">
      {{ title }}
    </div>
    <div class="p-4 text-center">
      <div :class="['text-2xl font-bold font-mono', colors.text]">
        {{ value }}
      </div>
      <div class="text-xs text-slate-400 mt-1">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  value: string | number
  label: string
  color: 'blue' | 'red' | 'yellow' | 'green' | 'purple'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'blue'
})

const colorMap: Record<string, Record<string, string>> = {
  blue: { border: 'border-blue-500/70', bg: 'bg-blue-500/10', text: 'text-blue-400' },
  red: { border: 'border-red-500/70', bg: 'bg-red-500/10', text: 'text-red-400' },
  yellow: { border: 'border-yellow-500/70', bg: 'bg-yellow-500/10', text: 'text-yellow-400' },
  green: { border: 'border-green-500/70', bg: 'bg-green-500/10', text: 'text-green-400' },
  purple: { border: 'border-purple-500/70', bg: 'bg-purple-500/10', text: 'text-purple-400' },
}

const colors = computed(() => colorMap[props.color] || colorMap.blue)
</script>
