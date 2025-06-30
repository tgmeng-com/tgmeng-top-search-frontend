<template>
  <div class="bg-white dark:bg-dark-card rounded-xl p-5 shadow-sm">
    <canvas ref="chartRef" height="200"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect } from 'vue'
import Chart from 'chart.js/auto'

export default {
  setup() {
    const chartRef = ref(null)
    let chartInstance = null

    const isDarkMode = ref(document.documentElement.classList.contains('dark'))

    // 监听主题变化
    const toggleObserver = new MutationObserver(() => {
      isDarkMode.value = document.documentElement.classList.contains('dark')
    })

    toggleObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    const initChart = () => {
      if (chartInstance) chartInstance.destroy()

      const ctx = chartRef.value.getContext('2d')
      const textColor = isDarkMode.value ? '#F1F5F9' : '#334155'
      const gridColor = isDarkMode.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'

      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
          datasets: [
            { label: '知乎', data: [30, 15, 20, 60, 80, 75, 90, 70], borderColor: '#0084FF', backgroundColor: 'rgba(0, 132, 255, 0.1)', tension: 0.4, fill: true },
            { label: '豆瓣', data: [20, 10, 15, 30, 40, 60, 50, 45], borderColor: '#41AC52', backgroundColor: 'rgba(65, 172, 82, 0.1)', tension: 0.4, fill: true },
            { label: '微博', data: [50, 30, 40, 80, 95, 85, 100, 90], borderColor: '#E6162D', backgroundColor: 'rgba(230, 22, 45, 0.1)', tension: 0.4, fill: true },
            { label: '虎扑', data: [25, 15, 25, 40, 50, 65, 55, 60], borderColor: '#FF7300', backgroundColor: 'rgba(255, 115, 0, 0.1)', tension: 0.4, fill: true }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top', labels: { color: textColor } }
          },
          scales: {
            x: { grid: { color: gridColor }, ticks: { color: textColor } },
            y: { grid: { color: gridColor }, ticks: { color: textColor, callback: v => v + '%' }, min: 0, max: 100 }
          }
        }
      })
    }

    onMounted(() => {
      initChart()
    })

    watchEffect(() => {
      if (chartInstance) {
        chartInstance.options.scales.x.grid.color = isDarkMode.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        chartInstance.options.scales.x.ticks.color = isDarkMode.value ? '#F1F5F9' : '#334155'
        chartInstance.options.scales.y.grid.color = isDarkMode.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        chartInstance.options.scales.y.ticks.color = isDarkMode.value ? '#F1F5F9' : '#334155'
        chartInstance.options.plugins.legend.labels.color = isDarkMode.value ? '#F1F5F9' : '#334155'
        chartInstance.update()
      }
    })

    return {
      chartRef
    }
  }
}
</script>