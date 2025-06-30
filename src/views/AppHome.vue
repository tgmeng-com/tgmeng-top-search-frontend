<template>
  <div class="min-h-screen flex flex-col">
    <main class="container mx-auto px-4 py-6 flex-grow">
      <!-- 分类导航 -->
      <div class="mb-6 overflow-x-auto scrollbar-hide">
        <div class="flex space-x-2 py-2 min-w-max">
          <button class="px-4 py-2 bg-primary text-white rounded-full">全部</button>
          <button class="px-4 py-2 bg-white dark:bg-dark-card rounded-full shadow-sm hover:shadow-md transition-shadow">综合</button>
          <button class="px-4 py-2 bg-white dark:bg-dark-card rounded-full shadow-sm hover:shadow-md transition-shadow">科技</button>
          <button class="px-4 py-2 bg-white dark:bg-dark-card rounded-full shadow-sm hover:shadow-md transition-shadow">娱乐</button>
          <button class="px-4 py-2 bg-white dark:bg-dark-card rounded-full shadow-sm hover:shadow-md transition-shadow">体育</button>
          <button class="px-4 py-2 bg-white dark:bg-dark-card rounded-full shadow-sm hover:shadow-md transition-shadow">财经</button>
          <button class="px-4 py-2 bg-white dark:bg-dark-card rounded-full shadow-sm hover:shadow-md transition-shadow">游戏</button>
          <button class="px-4 py-2 bg-white dark:bg-dark-card rounded-full shadow-sm hover:shadow-md transition-shadow">教育</button>
          <button class="px-4 py-2 bg-white dark:bg-dark-card rounded-full shadow-sm hover:shadow-md transition-shadow">更多</button>
        </div>
      </div>

      <!-- 热门社区区域 -->
      <section class="mb-10">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold flex items-center">
            <i class="fa fa-fire text-red-500 mr-2"></i> 热门社区
          </h2>
          <a href="#" class="text-primary text-sm hover:underline flex items-center">
            查看更多 <i class="fa fa-angle-right ml-1"></i>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CommunityCard
              title="知乎热榜"
              logo="https://picsum.photos/seed/zhihu/40/40"
              updateTime="更新于 10分钟前"
              :list="zhihuList"
          />

          <CommunityCard
              title="豆瓣热榜"
              logo="https://picsum.photos/seed/douban/40/40"
              updateTime="更新于 30分钟前"
              :list="doubanList"
          />

          <CommunityCard
              title="微博热榜"
              logo="https://picsum.photos/seed/weibo/40/40"
              updateTime="更新于 5分钟前"
              :list="weiboList"
          />

          <CommunityCard
              title="虎扑步行街"
              logo="https://picsum.photos/seed/hupu/40/40"
              updateTime="更新于 20分钟前"
              :list="hupuList"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import CommunityCard from '@/components/Card/CommunityCard.vue'

export default {
  components: {
    CommunityCard,
  },
  data() {
    return {
      // 知乎热榜数据
      zhihuList: [
        {title: '电影《盗钥匙的方法》票房口碑双爆，创下国产翻拍新纪录，你如何看待这部电影？'},
        {title: '多名中国游客称冰岛租车遇天价索赔，针对该事件中涉及的法律问题，你怎么看？'},
        {title: '男子被树杈刺伤无伤口仍然要截肢，为什么会出现这种情况？如何预防类似伤害？'},
        {title: '为什么有人认为元朝和清朝不是中国的朝代？这种观点正确吗？'},
        {title: '为什么说“程序员过了35岁就难找工作”？如何应对这种职业危机？'}
      ],

      // 豆瓣热榜数据
      doubanList: [
        {title: '锦绣芳华追剧手记：这部剧的服化道太绝了，每一帧都像画卷'},
        {title: '哪些时刻让你终于感受到“我的青春是对的”？一起来分享青春回忆'},
        {title: '记录是普通人对这空虚的最小单位：你有坚持记录生活的习惯吗？'},
        {title: '书单分享：那些改变你思维方式的经典书籍'},
        {title: '电影《奥本海默》观影讨论：如何评价这部诺兰新片？'}
      ],

      // 微博热榜数据
      weiboList: [
        {title: '韩国首尔爆发山洪 至少9人死亡'},
        {title: '收到不理解的过去15万才想起没给的过：这是什么神奇的经历？'},
        {title: '暴雨台风防御参考手册：遇到极端天气应该如何应对？'},
        {title: '最新考古发现改写人类进化史'},
        {title: '明星A和明星B疑似恋情曝光，网友：这对CP我磕了'}
      ],

      // 虎扑步行街数据
      hupuList: [
        {title: '上海一老头给女子开黄腔，被教科书级制服！网友：干得漂亮'},
        {title: '女生21岁谈过6个男朋友什么水平？评论区炸锅了'},
        {title: '这种儿童车害人不浅，为啥还有人买？家长们一定要注意'},
        {title: '30岁存款50万，算是什么水平？来看看网友怎么说'},
        {title: '男生会在意女生的家境吗？这个回答很现实'}
      ],

      // IT之家数据
      ithomeList: [
        {title: '李学凌谈当年拒绝做雷军手机原因：作为四川人，我不能跟四川人竞争'},
        {title: '中移动全球通85%的份额却无话语权，格力手机董明珠的失败案例'},
        {title: '零跑B01纯电轿车预售10.58万元起：可选激光雷达，续航超500km'},
        {title: '苹果iPhone 15系列将全系标配灵动岛，Pro版独享A17芯片'},
        {title: '微软官宣Windows 11 2024更新：带来全新Copilot AI助手体验'}
      ],

      // 中关村在线数据
      zolList: [
        {title: '民航新航线：6月28日起暑运无3C标识充电宝禁机，这些新规你需要了解'},
        {title: 'iPad Pro边框再升级，设计再进化：窄边框+M3芯片，性能提升超40%'},
        {title: '《健康与美容11》将让布莱恩·奥康纳回归：保罗·沃克女儿将出演'},
        {title: '华为Mate 60系列最新爆料：麒麟9000S+5G，影像系统再升级'},
        {title: '三星Galaxy Z Fold5/Flip5官宣：8月10日发布，铰链升级更耐用'}
      ],

      // 爱范儿数据
      ifanrList: [
        {title: '早报 | 苹果或出售智能戒指；马斯克脑机计划曝人体实验细节'},
        {title: '一个被AI硬件伤害了十年的创业者，又做了一款AI硬件产品'},
        {title: '以技术驾驭技术：华为Pura 80系列预购解析，影像实力再突破'},
        {title: 'Meta开源AI代码生成模型CodeLlama，性能超越GPT-4'},
        {title: '国产大模型评测：谁能真正替代GPT？这份报告给出了答案'}
      ]
    }
  },
  mounted() {
    // 模拟数据加载延迟，演示加载效果
    this.$nextTick(() => {
      // 实际项目中这里可以调用API获取数据
      console.log('页面数据加载完成');
    });
  }
}
</script>