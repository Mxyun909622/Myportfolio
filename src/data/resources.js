/**
 * Videos & Webinars
 * ------------------------------------------------------------------
 * 新增资源：在 videos 数组里追加一条即可，页面组件无需改动。
 *
 * 字段说明
 *  id          唯一标识（用于书签 localStorage）
 *  title       资源原始标题（保留英文原题，便于检索）
 *  provider    提供方
 *  providerNote 提供方备注（如更名、隶属关系），可为 null
 *  description { zh, en }
 *  cat         主分类 { zh, en } —— 用于筛选
 *  tags        附加标签 [{ zh, en }] —— 仅用于展示
 *  format      { zh, en }
 *  duration    时长字符串或 null
 *  access      'free' | 'reg' | 'unconfirmed' | 'paid'
 *  speaker     讲者/讲师，可为 null
 *  url         主链接
 *  thumbnail   本地缩略图路径 /assets/hub/...，拿不到真图时为 null（卡片用版式兜底）
 *  extraUrl    补充链接 { label, url }，可为 null
 *  note        特别提示（例如存档页），可为 null
 *  featured    是否进入「精选」区
 *  lastVerified 最后核对链接可达性的日期 YYYY-MM-DD
 */

export const accessLabels = {
  free: 'FREE',
  reg: 'FREE — REGISTRATION REQUIRED',
  paid: 'PAID',
  unconfirmed: 'ACCESS UNCONFIRMED',
};

export const accessFilters = [
  { key: 'all', label: { zh: '全部', en: 'All' } },
  { key: 'free', label: { zh: '免费', en: 'Free' } },
  { key: 'reg', label: { zh: '需注册', en: 'Registration' } },
  { key: 'unconfirmed', label: { zh: '未确认', en: 'Unconfirmed' } },
];

export const videos = [
  {
    id: 'sprout-social-intelligence-masterclass',
    title: 'Turning Social Data into Actionable Insights: A Masterclass on Social Intelligence',
    provider: 'Sprout Social',
    providerNote: null,
    description: {
      zh: '从社媒聆听走向社媒智能：如何识别预测性信号、在组织内部分享洞察，并把社媒对话真正转化为商业决策。',
      en: 'Explores how to move beyond social listening to social intelligence, identify predictive signals, share insights across organizations and translate social conversations into business decisions.',
    },
    cat: { zh: '社媒智能', en: 'Social Intelligence' },
    tags: [{ zh: '策略洞察', en: 'Strategic Insights' }],
    format: { zh: '网络研讨会', en: 'Webinar' },
    duration: '45 min',
    access: 'reg',
    speaker: 'Brittany Hennessy, Ben Nicholson, Curtis Midkiff',
    url: 'https://sproutsocial.com/insights/webinars/social-media-intelligence-masterclass-webinar/',
    extraUrl: null,
    note: null,
    featured: true,
    thumbnail: '/assets/hub/t-sprout-social-intelligence-masterclass.jpg',
    lastVerified: '2026-11-06',
  },
  {
    id: 'sprout-social-listening-analytics',
    title: 'Master Class: Listening and Analytics',
    provider: 'Sprout Social',
    providerNote: null,
    description: {
      zh: '介绍迭代式的社媒聆听流程、Listening and Analytics 的产品能力，以及从社媒数据中提取洞察的实操方法。',
      en: 'An overview of the iterative social listening process, Listening and Analytics features, and practical approaches to extracting insights from social data.',
    },
    cat: { zh: '社媒聆听', en: 'Social Listening' },
    tags: [{ zh: '工具演示', en: 'Tool Demonstration' }],
    format: { zh: '网络研讨会', en: 'Webinar' },
    duration: '30 min',
    access: 'reg',
    speaker: null,
    url: 'https://sproutsocial.com/insights/webinars/listening-analytics-demo/',
    extraUrl: null,
    note: null,
    featured: false,
    thumbnail: '/assets/hub/t-sprout-social-listening-analytics.jpg',
    lastVerified: '2026-11-06',
  },
  {
    id: 'ipsos-genai-social-listening',
    title: '60 Seconds to Insights: When Generative AI Meets Social Listening',
    provider: 'Ipsos',
    providerNote: null,
    description: {
      zh: '以植物基零食为案例，演示生成式 AI 如何分析数百万条社媒对话，找出尚未被满足的消费者需求。',
      en: 'Demonstrates how generative AI can analyze millions of social media conversations to uncover unmet consumer needs, using plant-based snacks as a case study.',
    },
    cat: { zh: 'AI 与洞察', en: 'AI & Insights' },
    tags: [
      { zh: '消费者洞察', en: 'Consumer Insights' },
      { zh: '产品创新', en: 'Product Innovation' },
    ],
    format: { zh: '视频 / 案例', en: 'Video / Case Study' },
    duration: null,
    access: 'free',
    speaker: null,
    url: 'https://www.youtube.com/watch?v=i4tNWvEQANg',
    extraUrl: {
      label: { zh: 'Ipsos 官方页面', en: 'Official page' },
      url: 'https://www.ipsos.com/en-ch/60-seconds-insights-when-generative-ai-meets-social-listening',
    },
    note: null,
    featured: true,
    thumbnail: '/assets/hub/t-ipsos-genai-social-listening.jpg',
    lastVerified: '2026-11-06',
  },
  {
    id: 'ipsos-five-steps',
    title: '5 Steps to Social Listening Success',
    provider: 'Ipsos',
    providerNote: null,
    description: {
      zh: '拆解一套可落地的社媒聆听策略的五个步骤：从设定商业目标、搭建项目，到快速见效与 KPI 衡量。',
      en: 'Five steps to developing a successful social listening strategy, from business objectives and program setup to quick wins and KPI measurement.',
    },
    cat: { zh: '策略与 KPI', en: 'Strategy & KPIs' },
    tags: [{ zh: '研究设计', en: 'Research Design' }],
    format: { zh: '网络研讨会', en: 'Webinar' },
    duration: null,
    access: 'free',
    speaker: null,
    url: 'https://www.ipsos.com/en/webinar-5-steps-social-listening-success',
    extraUrl: null,
    note: null,
    featured: false,
    thumbnail: '/assets/hub/t-ipsos-five-steps.jpg',
    lastVerified: '2026-11-06',
  },
  {
    id: 'youscan-cx',
    title: 'Enhance Your CX with Social Media Listening',
    provider: 'YouScan',
    providerNote: null,
    description: {
      zh: '用真实品牌案例说明，社媒聆听如何挖出被忽略的消费者反馈，并据此改善客户体验。',
      en: 'Shows how social media listening can uncover hidden consumer feedback and improve customer experience through real-world brand examples.',
    },
    cat: { zh: '客户体验', en: 'Customer Experience' },
    tags: [{ zh: '消费者反馈', en: 'Consumer Feedback' }],
    format: { zh: '网络研讨会', en: 'Webinar' },
    duration: null,
    access: 'free',
    speaker: 'Alex Orap',
    url: 'https://youscan.io/webinars/enhance-your-cx/',
    extraUrl: null,
    note: null,
    featured: false,
    thumbnail: '/assets/hub/t-youscan-cx.jpg',
    lastVerified: '2026-11-06',
  },
  {
    id: 'youscan-academy',
    title: 'YouScan Academy — Social Listening & Analytics',
    provider: 'YouScan',
    providerNote: null,
    description: {
      zh: '交互式培训课程，覆盖话题设置、数据分层、社媒数据分析、看板搭建与 AI 驱动的洞察发现。',
      en: 'Interactive training covering topic setup, data segmentation, social data analysis, dashboard creation and AI-powered insights.',
    },
    cat: { zh: '工具培训', en: 'Tool Training' },
    tags: [{ zh: '社媒聆听', en: 'Social Listening' }],
    format: { zh: '在线课程', en: 'Online Course' },
    duration: null,
    access: 'free',
    speaker: null,
    url: 'https://academy.youscan.io/',
    extraUrl: {
      label: { zh: '课程说明', en: 'Course information' },
      url: 'https://youscan.io/blog/social-intelligence-and-social-listening-courses/',
    },
    note: null,
    featured: false,
    thumbnail: null,
    lastVerified: '2026-11-06',
  },
  {
    id: 'unwritten-tiktok-business-insight',
    title: 'How to Use TikTok for Business Insight',
    provider: 'Unwritten',
    providerNote: { zh: '原 Listen + Learn Research', en: 'formerly Listen + Learn Research' },
    description: {
      zh: '用定性方法理解 TikTok 视频内容本身，并从中识别创意机会与商业机会。',
      en: 'Explores qualitative approaches to understanding TikTok video content and identifying creative and commercial opportunities.',
    },
    cat: { zh: '平台研究', en: 'Platform Research' },
    tags: [{ zh: '定性洞察', en: 'Qualitative Insights' }],
    format: { zh: '研讨会 / 视频', en: 'Webinar / Video' },
    duration: null,
    access: 'free',
    speaker: 'Jeremy Hollow',
    url: 'https://vimeo.com/703696978',
    extraUrl: null,
    note: null,
    featured: true,
    thumbnail: '/assets/hub/t-unwritten-tiktok-business-insight.jpg',
    lastVerified: '2026-11-06',
  },
  {
    id: 'esomar-social-listening-for-insights',
    title: 'Social Listening for Insights',
    provider: 'ESOMAR',
    providerNote: null,
    description: {
      zh: '覆盖社媒聆听的研究设计、数据采集、定性分析与洞察叙事的完整训练课程。',
      en: 'Historical training covering social listening research design, data collection, qualitative analysis and insight storytelling.',
    },
    cat: { zh: '研究方法', en: 'Research Methods' },
    tags: [{ zh: '社媒定性研究', en: 'Social Qualitative Research' }],
    format: { zh: '历史课程存档', en: 'Historical Training' },
    duration: null,
    access: 'unconfirmed',
    speaker: 'Jeremy Hollow',
    url: 'https://events.esomar.org/events/2020/virtual-academy-2020/knowledge-center/global-training/55/141/training/Social-Listening-for-Insights_',
    extraUrl: null,
    note: {
      zh: '归档课程页面：未核实当前是否仍开放或是否免费，请以官方页面为准。',
      en: 'Archived course page. Not verified as currently available or free — check the official page before relying on it.',
    },
    featured: false,
    thumbnail: null,
    lastVerified: '2026-11-06',
  },
];
