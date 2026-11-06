/**
 * Podcasts
 * ------------------------------------------------------------------
 * 支持多档播客系列：podcasts 数组里每档播客一个对象。
 * 有剧集清单的（如 Convosphere）维护 episodes 数组；没有固定剧集页的
 * （如 ESOMAR Talking Insights）维护 series 数组（按系列介绍）。
 *
 * 字段：id, title, publisher, host, access, url, cover, category,
 *       description, note, episodes[], series[], lastVerified
 */

export const podcasts = [
  {
    id: 'women-in-social-listening',
    title: 'Women in Social Listening & Insights',
    publisher: 'Convosphere',
    host: 'Jackie Cuyvers',
    access: 'free',
    url: 'https://convosphere.com/podcasts/',
    cover: '/assets/hub/p-women-social-listening.jpg',
    category: [
      { zh: '社媒智能', en: 'Social Intelligence' },
      { zh: '职业发展', en: 'Career Development' },
      { zh: '行业视角', en: 'Industry Perspectives' },
    ],
    description: {
      zh: '由 Convosphere 出品、Jackie Cuyvers 主持的播客系列，对话在社媒聆听、数字研究与洞察领域工作的女性从业者。嘉宾谈自己的职业路径、行业经验，以及对社媒智能演进的判断。',
      en: 'A podcast series from Convosphere, hosted by Jackie Cuyvers, featuring women working in social listening, digital research and insights. Guests share career journeys, industry experience and perspectives on the evolution of social intelligence.',
    },
    note: {
      zh: '剧集列表会持续更新，最新一期请以官方主页为准。',
      en: 'The episode list keeps growing — check the official hub for the latest releases.',
    },
    episodes: [
      {
        id: 'ep-01',
        number: 1,
        guest: 'Natália Leão',
        org: 'Nestlé',
        topic: [
          { zh: '全球社媒智能', en: 'Global Social Intelligence' },
          { zh: '职业发展', en: 'Career Development' },
        ],
        url: 'https://convosphere.com/women-in-social-listening-insights-episode-one/',
        published: null,
        featured: false,
        lastVerified: '2026-11-06',
      },
      {
        id: 'ep-02',
        number: 2,
        guest: 'Emily Podell',
        org: 'Mattel',
        topic: [
          { zh: '全球商业洞察', en: 'Global Business Insights' },
          { zh: '职业发展', en: 'Career Development' },
        ],
        url: 'https://convosphere.com/women-in-social-listening-insights-episode-two/',
        published: null,
        featured: false,
        lastVerified: '2026-11-06',
      },
      {
        id: 'ep-03',
        number: 3,
        guest: 'Wendy Scherer',
        org: 'Social Studies Group',
        topic: [
          { zh: '社媒智能', en: 'Social Intelligence' },
          { zh: '研究咨询', en: 'Research Consulting' },
        ],
        url: 'https://convosphere.com/women-in-social-listening-insights-episode-three/',
        published: null,
        featured: false,
        lastVerified: '2026-11-06',
      },
      {
        id: 'ep-04',
        number: 4,
        guest: 'Kirsten Recknagel',
        org: 'Essential HCP',
        topic: [{ zh: '医疗健康洞察', en: 'Healthcare Insights' }],
        url: 'https://convosphere.com/women-in-social-listening-insights-episode-four/',
        published: null,
        featured: false,
        lastVerified: '2026-11-06',
      },
      {
        id: 'ep-06',
        number: 6,
        guest: 'Melissa Davies',
        org: 'Mondelez International',
        topic: [
          { zh: '快消', en: 'FMCG' },
          { zh: '社媒智能', en: 'Social Intelligence' },
        ],
        url: 'https://convosphere.com/women-in-social-listening-insights-episode-six/',
        published: null,
        featured: false,
        lastVerified: '2026-11-06',
      },
      {
        id: 'ep-10',
        number: 10,
        guest: 'Melissa MacGregor',
        org: 'Microsoft',
        topic: [
          { zh: '科技', en: 'Technology' },
          { zh: '消费者研究', en: 'Consumer Research' },
        ],
        url: 'https://convosphere.com/women-in-social-listening-insights-episode-ten/',
        published: null,
        featured: false,
        lastVerified: '2026-11-06',
      },
      {
        id: 'ep-12',
        number: 12,
        guest: 'Ellen Tseng',
        org: 'Cash App',
        topic: [{ zh: '甲方内部社媒聆听与智能', en: 'In-house Social Listening & Intelligence' }],
        url: 'https://convosphere.com/women-in-social-listening-insights-episode-twelve/',
        published: null,
        featured: false,
        lastVerified: '2026-11-06',
      },
      {
        id: 'ep-18',
        number: 18,
        guest: 'Cara Buscaglia',
        org: 'Talkwalker / Hootsuite',
        topic: [
          { zh: 'AI', en: 'AI' },
          { zh: '实时信号', en: 'Real-time Signals' },
          { zh: '商业价值', en: 'Business Impact' },
        ],
        url: 'https://convosphere.com/women-in-social-listening-insights-episode-eighteen/',
        published: '2026-02-12',
        featured: true,
        lastVerified: '2026-11-06',
      },
    ],
    series: null,
    lastVerified: '2026-11-07',
  },
  {
    id: 'esomar-talking-insights',
    title: 'Talking Insights',
    publisher: 'ESOMAR',
    host: null,
    access: 'free',
    url: 'https://researchworld.com/talking-insights-podcast',
    cover: '/assets/hub/p-esomar-talking-insights.jpg',
    category: [
      { zh: '行业视角', en: 'Industry Perspectives' },
      { zh: 'AI 与洞察', en: 'AI & Insights' },
      { zh: '职业发展', en: 'Career Development' },
    ],
    description: {
      zh: 'ESOMAR 出品的官方播客，常在行业活动现场录制：与洞察行业专家对谈，聊新技术、新想法与行业面临的重大议题，可在 Spotify 或 Apple Podcasts 收听。按主题分为多个系列。',
      en: 'ESOMAR\'s official podcast, often recorded live at industry events: conversations with insights professionals on new technologies, emerging ideas and the big questions facing the sector. Available on Spotify and Apple Podcasts, organised into themed series.',
    },
    note: {
      zh: '按系列持续更新，最新一集请以官方页面为准。',
      en: 'New episodes are added per series — check the official page for the latest releases.',
    },
    episodes: [],
    series: [
      {
        id: 'ti-live-congress-2025',
        title: { zh: 'Talking Insights Live — ESOMAR Congress 2025', en: 'Talking Insights Live — ESOMAR Congress 2025' },
        desc: {
          zh: '直接在 ESOMAR Congress 现场录制的特别系列，捕捉全球洞察行业的现场讨论与思想碰撞。',
          en: 'A special series recorded on-site at the ESOMAR Congress, capturing the conversations and ideas shaping the global insights community.',
        },
      },
      {
        id: 'ti-voices-mr',
        title: { zh: 'Voices of Market Research', en: 'Voices of Market Research' },
        desc: {
          zh: '为国际妇女节推出的系列，对话五位塑造市场研究未来的女性行业领袖。',
          en: 'An International Women\'s Day series celebrating five women leaders shaping the future of market research and insights.',
        },
      },
      {
        id: 'ti-polling-world',
        title: { zh: 'Polling Around the World', en: 'Polling Around the World' },
        desc: {
          zh: '按地区拆解民意调查的历史、趋势与社会影响，以及民调与市场研究的交集。',
          en: 'A special series exploring how public opinion polling shapes societies across the globe, region by region.',
        },
      },
      {
        id: 'ti-ai-series',
        title: { zh: 'AI, an Insights Series（主持：Nikki Lavoie）', en: 'AI, an Insights Series hosted by Nikki Lavoie' },
        desc: {
          zh: '聚焦 AI 对市场研究的影响：最新进展、最佳实践与伦理议题。',
          en: 'Explores AI\'s impact on market research: latest advancements, best practices and ethical considerations.',
        },
      },
      {
        id: 'ti-hack-leadership',
        title: { zh: 'Hack Your Leadership（主持：Liubov Ruchinskaya）', en: 'Hack Your Leadership hosted by Liubov Ruchinskaya' },
        desc: {
          zh: '聊市场研究行业的职业进阶与领导力发展。',
          en: 'Focused on career progression, navigation and leadership within the insights industry.',
        },
      },
    ],
    lastVerified: '2026-11-07',
  },
];

export const totalEpisodes = podcasts.reduce((n, p) => n + p.episodes.length, 0);
