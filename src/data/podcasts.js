/**
 * Podcasts
 * ------------------------------------------------------------------
 * 剧集列表可能持续增加：以官方 podcast 主页为准更新 episodes 数组。
 * 字段：id, number, guest, org, topic[{zh,en}], url, published, featured, lastVerified
 */

export const podcast = {
  id: 'women-in-social-listening',
  title: 'Women in Social Listening & Insights',
  publisher: 'Convosphere',
  host: 'Jackie Cuyvers',
  access: 'free',
  url: 'https://convosphere.com/podcasts/',
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
  lastVerified: '2026-11-06',
};

export const episodes = [
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
];
