<template>
  <div>
    <div v-if="loading" class="flex flex-col items-center justify-center text-gray-400" style="height: 80px;">
      <div class="atom-spinner">
        <div class="spinner-inner">
          <div class="spinner-line"></div>
          <div class="spinner-line"></div>
          <div class="spinner-line"></div>
          <div class="spinner-circle">&#9679;</div>
        </div>
      </div>
      <span>全网实时热点词云获取中...</span>
    </div>

    <div v-show="!loading" ref="chart" style="width: 100%; height: 80px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import {cacheSearchForCiYun} from "@/api/api";
import store from "@/store";

export default {
  name: 'WordCloud',
  data() {
    return {
      loading: true,
      chartInstance: null
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.loading = true;
      cacheSearchForCiYun().then(response => {
        // 使用 $nextTick 确保 DOM 更新完成
        this.$nextTick(() => {
          setTimeout(() => {
            this.renderChart(response);
          }, 10);
        });
        this.loading = false;
      }).catch(error => {
        console.warn(`加载失败：`, error);
        this.$nextTick(() => {
          setTimeout(() => {
            this.renderChart(null);
          }, 10);
        });
        this.loading = false;
      });
    },

    renderChart(response) {
      // 确保图表容器存在
      if (!this.$refs.chart) {
        console.error('图表容器未找到');
        return;
      }

      let chartData = [];

      // 处理数据
      if (response && response.data && response.data.code === 200) {
        chartData = response.data.data || [];
      } else {
        chartData = [
          {word: '电影', frequency: 100},
          {word: '音乐', frequency: 80},
          {word: '科技', frequency: 60},
          {word: '游戏', frequency: 50},
          {word: '美食', frequency: 40},
          {word: '旅游', frequency: 30}
        ];
      }

      // 如果数据为空，使用测试数据
      if (chartData.length === 0) {
        chartData = [
          {word: '热搜', frequency: 100},
          {word: '热门', frequency: 80},
          {word: '趋势', frequency: 60},
          {word: '分析', frequency: 50},
          {word: '数据', frequency: 40}
        ];
      }

      // 转换数据格式
      const echartsData = chartData
          .slice(0, this.wordCloudNum)
          .map(item => ({
            name: item.word,
            value: item.frequency
          }));

      // 销毁旧的图表实例
      if (this.chartInstance) {
        this.chartInstance.dispose();
      }

      // 初始化图表
      this.chartInstance = echarts.init(this.$refs.chart);

      const option = {
        // 标题
        title: {
          text: '',
          textStyle: {
            fontSize: 12,
            color: '#333',
            fontWeight: 'bold'
          },
          left: 'center',
          top: 10
        },

        // 提示框
        tooltip: {
          show: true,
          formatter: function (params) {
            return `${params.name}<br/>热度: ${params.value}`;
          }
        },

        // 词云系列
        series: [{
          type: 'wordCloud',

          // 形状：circle(圆形), cardioid(心形), triangle(菱形), triangle(三角形), pentagon(五边形), star(星形)
          shape: 'circle',

          // 位置和大小
          left: 'center',
          top: 'center',
          width: '100%',
          height: '100%',
          right: null,
          bottom: null,

          // 字体大小范围
          sizeRange: [8, 60],

          // 旋转范围
          rotationRange: [-45, 90],
          rotationStep: 15,

          // 网格大小，控制词间距
          gridSize: 2,

          // 是否绘制到边界外
          drawOutOfBound: false,

          // 文字样式
          textStyle: {
            fontFamily: 'Microsoft YaHei, Arial, sans-serif',
            fontWeight: 'bold',
            // 颜色配置
            color: function () {
              // 漂亮的渐变色系
              const colorPalettes = [
                ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
                ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C', '#ff9f7f', '#fb7293', '#E062AE', '#E690D1'],
                ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78', '#73a373', '#73b9bc', '#7289ab']
              ];

              const palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
              return palette[Math.floor(Math.random() * palette.length)];
            }
          },

          // 强调样式（鼠标悬停）
          emphasis: {
            focus: 'self',
            textStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },

          // 数据
          data: echartsData
        }]
      };

      this.chartInstance.setOption(option);

      // 添加点击事件监听
      this.chartInstance.on('click', (params) => {
        if (params.name) {
          // 通过 Vuex 触发搜索
          store.commit('setSearchShow', true)
          this.$store.commit('triggerSearch', params.name);
          if (window.umami) {
            window.umami.track('☁️🔍词云点击搜索:' + params.name);
          }
        }
      });

      // 响应窗口大小变化
      window.addEventListener('resize', () => {
        if (this.chartInstance) {
          this.chartInstance.resize();
        }
      });
    }
  },

  beforeUnmount() {
    // 组件销毁时清理图表
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  },
  computed: {
    wordCloudNum: {
      get() {
        return this.$store.state.wordCloudNum;
      },
      set(value) {
        this.$store.commit('setWordCloudNum', value);
      }
    }
  }
}
</script>

<style>
/* 加载动画样式*/
.atom-spinner, .atom-spinner * {
  box-sizing: border-box;
}

.atom-spinner {
  height: 3.125rem;
  width: 3.125rem;
  overflow: hidden;
}

.atom-spinner .spinner-inner {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
}

.atom-spinner .spinner-circle {
  display: block;
  position: absolute;
  color: #ff1d5e;
  font-size: calc(3.75rem * 0.24);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.atom-spinner .spinner-line {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border-left-width: calc(3.75rem / 5);
  border-top-width: calc(3.75rem / 25);
  border-left-color: #ff1d5e;
  border-left-style: solid;
  border-top-style: solid;
  border-top-color: transparent;
}

.atom-spinner .spinner-line:nth-child(1) {
  animation: atom-spinner-animation-1 1s linear infinite;
  transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg);
}

.atom-spinner .spinner-line:nth-child(2) {
  animation: atom-spinner-animation-2 1s linear infinite;
  transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg);
}

.atom-spinner .spinner-line:nth-child(3) {
  animation: atom-spinner-animation-3 1s linear infinite;
  transform: rotateZ(360deg) rotateX(66deg) rotateZ(0deg);
}

@keyframes atom-spinner-animation-1 {
  100% {
    transform: rotateZ(120deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes atom-spinner-animation-2 {
  100% {
    transform: rotateZ(240deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes atom-spinner-animation-3 {
  100% {
    transform: rotateZ(360deg) rotateX(66deg) rotateZ(360deg);
  }
}
</style>