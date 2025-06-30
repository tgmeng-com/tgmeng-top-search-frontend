<template>
  <div class="bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-sm card-hover">
    <div class="p-4">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold flex items-center">
          <i class="fa fa-line-chart text-green-500 mr-2"></i> 热度趋势
        </h3>
        <span class="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full">
          24小时
        </span>
      </div>

      <div class="space-y-4">
        <div v-for="item in trends" :key="item.id" class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3">
              <i class="fa fa-arrow-up text-green-500"></i>
            </div>
            <div>
              <p class="text-sm font-medium">{{ item.title }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                <span class="text-green-500">{{ item.trend }}%</span> 热度上升
              </p>
            </div>
          </div>
          <div class="w-16 h-16">
            <canvas :id="'trend-chart-' + item.id"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue'
import Chart from 'chart.js/auto'

export default {
  props: {
    trends: Array
  },
  setup(props) {
    const chartInstances = ref([])

    const initCharts = () => {
      props.trends.forEach((item) => {
        const ctx = document.getElementById(`trend-chart-${item.id}`)?.getContext('2d')
        if (!ctx) return

        const isDark = document.documentElement.classList.contains('dark')
        const textColor = isDark ? '#F1F5F9' : '#334155'
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'

        const chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['', '', '', '', '', '', ''],
            datasets: [{
              data: item.data,
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              tension: 0.4,
              fill: true,
              pointRadius: 0,
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false ,
                // 如果有图例文字颜色配置，也可以用 textColor
                labels:{
                  color:textColor,
                }} },
            scales: {
              x: {
                display: false ,
                // 若 x 轴有文字等，也可设置文字颜色
                ticks: {
                  color: textColor
                },
                // 网格线颜色
                grid: {
                  color: gridColor
                }
              },
              y: { display: false, min: Math.min(...item.data) - 5, max: Math.max(...item.data) + 5,
                // y 轴文字颜色（如果显示的话）
                ticks: {
                  color: textColor
                },
                grid: {
                  color: gridColor
                }}
            }
          }
        })

        chartInstances.value.push(chart)
      })
    }

    onMounted(() => {
      nextTick(() => {
        initCharts()
      })
    })

    return {
      chartInstances
    }
  }
}
</script>