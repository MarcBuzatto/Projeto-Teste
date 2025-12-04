<template>
  <div class="min-h-screen bg-slate-950 text-slate-50 overflow-hidden">
    <!-- Background Grid Effect -->
    <div class="fixed inset-0 opacity-10 pointer-events-none">
      <div
        class="absolute inset-0"
        :style="{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, 0.1) 25%, rgba(0, 255, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.1) 75%, rgba(0, 255, 255, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, 0.1) 25%, rgba(0, 255, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.1) 75%, rgba(0, 255, 255, 0.1) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }"
      />
    </div>

    <!-- Header -->
    <div class="relative border-b border-cyan-500/50 bg-slate-950/80 backdrop-blur">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full" :class="isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'" />
          <span class="text-sm font-mono">{{ isConnected ? 'CONECTADO' : 'DESCONECTADO' }}</span>
        </div>
        <h1 class="text-2xl font-bold text-cyan-400 font-mono">CYBER INFERENCE DASHBOARD</h1>
        <div class="text-xs text-slate-400 font-mono">
          {{ new Date().toLocaleTimeString('pt-BR') }}
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative max-w-7xl mx-auto p-4 space-y-4">
      <!-- Metrics Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="TOTAL"
          :value="metrics.totalEvents || 0"
          label="Events"
          color="blue"
        />
        <MetricCard
          title="HIGH RISK"
          :value="metrics.riskDistribution?.find((r: any) => r.level === 'HIGH')?.count || 0"
          label="Detections"
          color="red"
        />
        <MetricCard
          title="MEDIUM RISK"
          :value="metrics.riskDistribution?.find((r: any) => r.level === 'MEDIUM')?.count || 0"
          label="Detections"
          color="yellow"
        />
        <MetricCard
          title="LOW RISK"
          :value="metrics.riskDistribution?.find((r: any) => r.level === 'LOW')?.count || 0"
          label="Detections"
          color="green"
        />
        <MetricCard
          title="AVG HIGH DELAY"
          :value="`${Math.round(metrics.avgTimeBetweenHighRiskMs / 1000)}s`"
          label="Response Time"
          color="purple"
        />
      </div>

      <!-- Main Grid: Video + Logs -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
        <!-- Video Player Simulado -->
        <div class="lg:col-span-2">
          <div class="h-full border-2 border-cyan-500/70 rounded-lg overflow-hidden bg-slate-900 relative group">
            <!-- Frame Container -->
            <div
              id="video-container"
              class="w-full h-full relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center"
            >
              <!-- Bounding Boxes -->
              <div class="absolute inset-0">
                <div
                  v-for="(box, idx) in currentBoxes"
                  :key="idx"
                  class="absolute border-2 transition-all duration-100"
                  :style="{
                    left: box.x + '%',
                    top: box.y + '%',
                    width: box.w + '%',
                    height: box.h + '%',
                    borderColor: box.color,
                    boxShadow: `0 0 10px ${box.color}, inset 0 0 10px ${box.color}22`,
                  }"
                >
                  <div
                    class="text-xs font-mono px-1 py-0.5"
                    :style="{ color: box.color, textShadow: `0 0 5px ${box.color}` }"
                  >
                    {{ box.label }} {{ Math.round(box.confidence * 100) }}%
                  </div>
                </div>
              </div>

              <!-- Center Status -->
              <div class="relative z-10 text-center">
                <div class="text-cyan-400 font-mono text-sm mb-2">
                  {{ isConnected ? 'STREAM ATIVO' : 'AGUARDANDO CONEXÃO' }}
                </div>
                <div
                  v-if="!isConnected"
                  class="text-slate-500 text-xs font-mono animate-pulse"
                >
                  Conectando ao servidor...
                </div>
              </div>

              <!-- Frame Info Overlay -->
              <div class="absolute bottom-2 right-2 text-xs font-mono text-slate-400 bg-slate-900/80 px-2 py-1 rounded border border-slate-700">
                Frame: {{ streamData.frameId || 'N/A' }} | Latência: {{ streamData.latency }}ms
              </div>
            </div>

            <!-- Header -->
            <div class="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-b border-cyan-500/50 flex items-center px-3 font-mono text-xs text-cyan-300">
              VIDEO STREAM
              <span class="ml-auto">{{ streamData.ts ? new Date(streamData.ts).toLocaleTimeString('pt-BR') : 'N/A' }}</span>
            </div>
          </div>
        </div>

        <!-- Logs Laterais -->
        <div class="h-full border-2 border-purple-500/70 rounded-lg overflow-hidden bg-slate-900 flex flex-col">
          <div class="h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-purple-500/50 flex items-center px-3 font-mono text-xs text-purple-300">
            RISK LOG
          </div>
          <div class="flex-1 overflow-y-auto scrollbar-hide p-2 space-y-2">
            <div
              v-if="riskLogs.length === 0"
              class="text-xs text-slate-500 font-mono text-center py-4"
            >
              Aguardando eventos de risco...
            </div>
            <div
              v-for="(log, idx) in riskLogs"
              :key="idx"
              class="p-2 rounded border text-xs font-mono transition-all"
              :class="{
                'border-red-500/50 bg-red-950/30 text-red-300': log.level === 'HIGH',
                'border-yellow-500/50 bg-yellow-950/30 text-yellow-300': log.level === 'MEDIUM',
                'border-green-500/50 bg-green-950/30 text-green-300': log.level === 'LOW',
              }"
            >
              <div class="flex justify-between">
                <span class="font-bold">{{ log.level }}</span>
                <span class="text-slate-400">{{ log.time }}</span>
              </div>
              <div class="text-xs text-slate-300 mt-1">
                Score: {{ (log.score * 100).toFixed(0) }}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PPE & Emotions Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- PPE Distribution -->
        <div class="border-2 border-green-500/70 rounded-lg overflow-hidden bg-slate-900">
          <div class="h-8 bg-gradient-to-r from-green-500/20 to-teal-500/20 border-b border-green-500/50 flex items-center px-3 font-mono text-xs text-green-300">
            PPE DETECTED
          </div>
          <div class="p-4 space-y-2 max-h-40 overflow-y-auto scrollbar-hide">
            <div
              v-for="ppe in metrics.ppeDistribution"
              :key="ppe.class"
              class="flex items-center justify-between text-xs font-mono"
            >
              <span class="text-slate-300">{{ ppe.class }}</span>
              <div class="flex items-center gap-2">
                <div class="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-green-500 to-teal-400 transition-all"
                    :style="{ width: `${Math.min((ppe.count / Math.max(...(metrics.ppeDistribution?.map((p: any) => p.count) || [1]))) * 100, 100)}%` }"
                  />
                </div>
                <span class="w-8 text-right text-green-400">{{ ppe.count }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Emotions Distribution -->
        <div class="border-2 border-pink-500/70 rounded-lg overflow-hidden bg-slate-900">
          <div class="h-8 bg-gradient-to-r from-pink-500/20 to-rose-500/20 border-b border-pink-500/50 flex items-center px-3 font-mono text-xs text-pink-300">
            EMOTIONS DETECTED
          </div>
          <div class="p-4 space-y-2 max-h-40 overflow-y-auto scrollbar-hide">
            <div
              v-for="emotion in metrics.emotionDistribution"
              :key="emotion.emotion"
              class="flex items-center justify-between text-xs font-mono"
            >
              <span class="text-slate-300">{{ emotion.emotion }}</span>
              <div class="flex items-center gap-2">
                <div class="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all"
                    :style="{ width: `${Math.min((emotion.count / Math.max(...(metrics.emotionDistribution?.map((e: any) => e.count) || [1]))) * 100, 100)}%` }"
                  />
                </div>
                <span class="w-8 text-right text-pink-400">{{ emotion.count }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="relative border-t border-cyan-500/50 bg-slate-950/80 backdrop-blur mt-6">
      <div class="max-w-7xl mx-auto px-4 py-3 text-center text-xs text-slate-400 font-mono">
        © 2025 CYBER INFERENCE | Real-time Safety Monitor | Status: {{ isConnected ? 'OPERATIONAL' : 'OFFLINE' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineComponent } from 'vue'
import { io, Socket } from 'socket.io-client'

// Components
const MetricCard = defineComponent({
  props: {
    title: { type: String, required: true },
    value: { type: [String, Number], required: true },
    label: { type: String, required: true },
    color: { type: String, required: true }
  },
  setup(props) {
    const colorMap: Record<string, Record<string, string>> = {
      blue: { border: 'border-blue-500/70', bg: 'bg-blue-500/10', text: 'text-blue-400' },
      red: { border: 'border-red-500/70', bg: 'bg-red-500/10', text: 'text-red-400' },
      yellow: { border: 'border-yellow-500/70', bg: 'bg-yellow-500/10', text: 'text-yellow-400' },
      green: { border: 'border-green-500/70', bg: 'bg-green-500/10', text: 'text-green-400' },
      purple: { border: 'border-purple-500/70', bg: 'bg-purple-500/10', text: 'text-purple-400' },
    }
    const colors = colorMap[props.color] || colorMap.blue
    return { colors }
  },
  template: `
    <div :class="['border-2 rounded-lg overflow-hidden bg-slate-900', colors.border]">
      <div :class="['h-8 border-b flex items-center px-3 font-mono text-xs', colors.text, colors.bg]">{{ title }}</div>
      <div class="p-4 text-center">
        <div :class="['text-2xl font-bold font-mono', colors.text]">{{ value }}</div>
        <div class="text-xs text-slate-400 mt-1">{{ label }}</div>
      </div>
    </div>
  `
})

// State
const isConnected = ref(false)
const socket = ref<Socket | null>(null)
const streamData = ref({
  ts: null as any,
  frameId: null as any,
  latency: 0,
  overlay: { boxes: [], emotions: [], risk: null }
})
const currentBoxes = ref<any[]>([])
const riskLogs = ref<any[]>([])
const metrics = ref({
  totalEvents: 0,
  riskDistribution: [] as any[],
  ppeDistribution: [] as any[],
  emotionDistribution: [] as any[],
  avgTimeBetweenHighRiskMs: 0,
})

// Fetch metrics on mount
const fetchMetrics = async () => {
  try {
    const res = await fetch('http://localhost:3000/inference/metrics')
    const data = await res.json()
    metrics.value = data
  } catch (err) {
    console.error('Failed to fetch metrics:', err)
  }
}

// Format boxes with colors
const formatBoxes = (boxes: any[], risk: any) => {
  return boxes.map((box: any) => {
    let color = '#00ff00' // green
    if (risk?.level === 'HIGH') color = '#ff0000' // red
    else if (risk?.level === 'MEDIUM') color = '#ffaa00' // orange
    return {
      x: box.x || Math.random() * 80,
      y: box.y || Math.random() * 80,
      w: box.w || 15,
      h: box.h || 12,
      color,
      label: box.label || 'Operator',
      confidence: box.confidence || 0.85,
    }
  })
}

// Setup WebSocket
onMounted(async () => {
  await fetchMetrics()

  socket.value = io('http://localhost:3000', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  })

  socket.value.on('connect', () => {
    isConnected.value = true
    console.log('Connected to WebSocket')
  })

  socket.value.on('disconnect', () => {
    isConnected.value = false
    console.log('Disconnected from WebSocket')
  })

  socket.value.on('stream', (payload: any) => {
    streamData.value = payload
    
    // Update boxes
    if (payload.overlay?.boxes) {
      currentBoxes.value = formatBoxes(payload.overlay.boxes, payload.overlay.risk)
    }

    // Add to logs if HIGH risk
    if (payload.overlay?.risk?.level === 'HIGH') {
      const time = new Date().toLocaleTimeString('pt-BR')
      riskLogs.value.unshift({
        level: 'HIGH',
        time,
        score: payload.overlay.risk.score || 0.85,
      })
      // Keep only last 20 logs
      if (riskLogs.value.length > 20) {
        riskLogs.value.pop()
      }
    }

    // Simulate latency
    streamData.value.latency = Math.round(Math.random() * 50 + 20)
  })

  socket.value.on('error', (error: any) => {
    console.error('WebSocket error:', error)
  })
})

onUnmounted(() => {
  if (socket.value) {
    socket.value.disconnect()
  }
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
  }
}
</style>
