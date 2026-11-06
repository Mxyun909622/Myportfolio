/**
 * Industry Experts
 * ------------------------------------------------------------------
 * 新增专家：在 experts 数组里追加一条即可。
 *
 * 字段说明
 *  id        唯一标识（书签用）
 *  name      姓名
 *  initials  头像占位字母
 *  role      { zh, en }
 *  org       { zh, en } 机构名
 *  orgNote   机构备注（如更名），可为 null
 *  expertise 筛选标签 [{ zh, en }]
 *  why       { zh, en } 为什么值得关注
 *  links     [{ label: { zh, en }, url }]
 *  related   { label: { zh, en }, url } 关联资源
 *  lastVerified
 */

export const experts = [
  {
    id: 'jeremy-hollow',
    name: 'Jeremy Hollow',
    initials: 'JH',
    role: { zh: '创始人 & CEO', en: 'Founder & CEO' },
    org: { zh: 'Unwritten', en: 'Unwritten' },
    orgNote: { zh: '原 Listen + Learn Research', en: 'formerly Listen + Learn Research' },
    expertise: [
      { zh: '消费者洞察', en: 'Consumer Insight' },
      { zh: '社媒定性研究', en: 'Social Qualitative Research' },
      { zh: '洞察叙事', en: 'Insight Storytelling' },
    ],
    why: {
      zh: '擅长把社媒数据变成关于「人」的洞察：不只回答人们在说什么，还解释为什么这么说、对品牌意味着什么。他的分享常把研究方法与商业机会放在一起讲，很适合用来校准自己的分析框架。',
      en: 'Focuses on transforming social data into meaningful human insights — not just what people say, but why it matters for brands. His talks pair research method with commercial opportunity, which makes them a useful benchmark for your own analytical framing.',
    },
    links: [
      { label: { zh: '官方网站', en: 'Website' }, url: 'https://www.listenandlearnresearch.com/' },
      { label: { zh: 'LinkedIn', en: 'LinkedIn' }, url: 'https://www.linkedin.com/in/jeremyhollow/' },
    ],
    related: {
      label: { zh: '看他的方法课：Spotting the Signals', en: 'Watch: Spotting the Signals' },
      url: 'https://vimeo.com/757326632',
    },
    lastVerified: '2026-11-06',
  },
  {
    id: 'brandon-boatwright',
    name: 'Brandon Boatwright, Ph.D.',
    initials: 'BB',
    role: { zh: '副教授', en: 'Associate Professor' },
    org: { zh: '克莱姆森大学', en: 'Clemson University' },
    orgNote: null,
    expertise: [
      { zh: '社媒分析', en: 'Social Media Analytics' },
      { zh: '研究方法', en: 'Research Methods' },
      { zh: '网络分析', en: 'Network Analysis' },
    ],
    why: {
      zh: '克莱姆森大学 Social Media Listening Center 负责人，研究方向是社媒、意见领袖与数字传播。适合用来补方法论底子：当你需要为「为什么这样取样、这样判断意见领袖」找到学术依据时，他的研究是最靠得住的参考。',
      en: 'Director of Clemson University\'s Social Media Listening Center; his research covers social media, opinion leadership and digital communication. The most reliable reference when you need academic grounding for sampling decisions and opinion-leader identification.',
    },
    links: [
      { label: { zh: '教师主页', en: 'Faculty profile' }, url: 'https://www.clemson.edu/cbshs/about/profiles/boatwr5' },
      { label: { zh: '社媒聆听中心', en: 'Listening Center' }, url: 'https://www.clemson.edu/centers-institutes/smlc/' },
      { label: { zh: '学生机会', en: 'Student opportunities' }, url: 'https://www.clemson.edu/centers-institutes/smlc/students.html' },
    ],
    related: {
      label: { zh: '社媒聆听中心主页', en: 'Social Media Listening Center' },
      url: 'https://www.clemson.edu/centers-institutes/smlc/',
    },
    lastVerified: '2026-11-06',
  },
  {
    id: 'brittany-hennessy',
    name: 'Brittany Hennessy',
    initials: 'BH',
    role: { zh: 'VP of Social Intelligence Evangelism', en: 'VP of Social Intelligence Evangelism' },
    org: { zh: 'Sprout Social', en: 'Sprout Social' },
    orgNote: null,
    expertise: [
      { zh: '管理层社媒智能', en: 'Executive-level Social Intelligence' },
      { zh: '商业价值', en: 'Business Impact' },
      { zh: '达人策略', en: 'Influencer Strategy' },
    ],
    why: {
      zh: '她的工作是把社媒信号接到商业结果上：品牌声誉、收入、客户留存。当你要向管理层解释「社媒洞察到底值多少钱」时，她的框架和表达方式尤其值得借鉴。',
      en: 'Her work connects social signals to business performance — reputation, revenue and customer retention. Particularly useful when you have to explain to leadership what social intelligence is actually worth.',
    },
    links: [
      { label: { zh: 'LinkedIn', en: 'LinkedIn' }, url: 'https://www.linkedin.com/in/brittanyhennessy/' },
    ],
    related: {
      label: { zh: '看她的 Masterclass', en: 'Watch her masterclass' },
      url: 'https://sproutsocial.com/insights/webinars/social-media-intelligence-masterclass-webinar/',
    },
    lastVerified: '2026-11-06',
  },
];

export default experts;
