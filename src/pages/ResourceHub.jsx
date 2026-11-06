import React, { useEffect, useMemo, useState } from 'react';
import { videos, accessLabels, accessFilters } from '../data/resources';
import { experts } from '../data/experts';
import { podcast, episodes } from '../data/podcasts';

/* ---------- 设计常量（沿用全站设计系统） ---------- */
const CARD = 'bg-white rounded-[20px] ring-1 ring-black/[0.06]';
const EYEBROW = 'text-xs font-semibold uppercase tracking-[0.18em] text-secondary';
const STORAGE_KEY = 'slHubBookmarks';

const PROVIDER_TINT = {
  'Sprout Social': '#eef2ee',
  Ipsos: '#f3efe9',
  YouScan: '#eef0f5',
  Unwritten: '#f2eef3',
  ESOMAR: '#f0f0ee',
  Convosphere: '#eaf1f5',
};

/* ---------- 小工具 ---------- */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmtDate = (iso, t) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return t({ zh: `${y} 年 ${m} 月 ${d} 日`, en: `${d} ${MONTHS[m - 1]} ${y}` });
};

const Bookmark = ({ saved }) => (
  <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M6.5 4.5h11v15l-5.5-3.6-5.5 3.6z" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4 4" strokeLinecap="round" />
  </svg>
);

const BookmarkBtn = ({ id, saved, onToggle, t }) => {
  const active = saved.includes(id);
  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      aria-pressed={active}
      aria-label={active ? t({ zh: '取消收藏', en: 'Remove bookmark' }) : t({ zh: '收藏', en: 'Bookmark' })}
      title={active ? t({ zh: '取消收藏', en: 'Remove bookmark' }) : t({ zh: '收藏', en: 'Bookmark' })}
      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
        active ? 'bg-accent text-white' : 'text-secondary/60 hover:text-ink hover:bg-black/[0.05]'
      }`}
    >
      <Bookmark saved={active} />
    </button>
  );
};

const AccessBadge = ({ access }) => {
  const label = accessLabels[access] || accessLabels.unconfirmed;
  const styles = {
    free: 'text-accent ring-accent/25 bg-white',
    reg: 'text-ink ring-black/20 bg-white',
    paid: 'text-ink ring-black/25 bg-white',
    unconfirmed: 'text-secondary ring-black/15 bg-white/60',
  }[access] || 'text-secondary ring-black/15 bg-white/60';
  return (
    <span className={`shrink-0 whitespace-nowrap rounded-full px-2 sm:px-2.5 py-1 text-[8px] sm:text-[9.5px] font-semibold tracking-[0.09em] ring-1 ${styles}`}>
      {label}
    </span>
  );
};

const Chip = ({ active, children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-full px-3.5 py-1.5 text-[12.5px] transition-all duration-200 ${
      active ? 'bg-ink text-white font-medium' : 'bg-white text-secondary ring-1 ring-black/[0.08] hover:ring-black/25 hover:text-ink'
    }`}
  >
    {children}
  </button>
);

/* ---------- 视频 / 网络研讨会卡片 ---------- */
const VideoCard = ({ r, t, saved, onToggle }) => {
  const tint = PROVIDER_TINT[r.provider] || '#f2f2f4';
  return (
    <article className={`${CARD} group overflow-hidden flex flex-col transition-all duration-300 hover:shadow-card hover:ring-black/[0.11]`}>
      {r.thumbnail ? (
        <a href={r.url} target="_blank" rel="noreferrer" className="relative block aspect-video overflow-hidden bg-black/[0.04]" aria-label={r.title}>
          <img
            src={r.thumbnail}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          <span className="absolute top-3 right-3">
            <AccessBadge access={r.access} />
          </span>
        </a>
      ) : (
        <div className="relative aspect-video overflow-hidden flex flex-col justify-between p-4" style={{ backgroundColor: tint }}>
          <div className="flex items-start justify-between gap-3">
            <span className="text-[12.5px] font-semibold text-ink/70">{r.provider}</span>
            <AccessBadge access={r.access} />
          </div>
          <span className="text-[clamp(20px,2.2vw,30px)] font-semibold tracking-[-0.02em] leading-[1.05] text-ink/25">
            {r.provider}
          </span>
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {r.thumbnail && (
          <div className="mb-2">
            <p className="text-[12.5px] font-semibold text-secondary">
              {r.provider}
              {r.providerNote && <span className="font-normal text-secondary/70"> · {t(r.providerNote)}</span>}
            </p>
          </div>
        )}

        <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.11em] text-secondary mb-2.5">
          <span>{t(r.format)}</span>
          {r.duration && (
            <>
              <span className="w-[3px] h-[3px] rounded-full bg-hairline" />
              <span className="tabular-nums">{r.duration}</span>
            </>
          )}
        </div>

        <h3 className="text-[16px] font-semibold leading-[1.4] tracking-[-0.005em] text-balance">{r.title}</h3>
        <p className="mt-2.5 text-[13.5px] leading-[1.7] text-secondary">{t(r.description)}</p>

        {r.speaker && (
          <p className="mt-3 text-[12px] text-secondary">
            <span className="text-ink/35">{t({ zh: '讲者', en: 'With' })}</span> {r.speaker}
          </p>
        )}
        {r.note && (
          <p className="mt-2.5 text-[11.5px] leading-[1.6] text-secondary/80 border-l-2 border-black/[0.08] pl-2.5">{t(r.note)}</p>
        )}

        <div className="flex flex-wrap gap-1.5 mt-4">
          <span className="text-[11px] text-accent bg-accent-soft rounded-full px-2.5 py-1">{t(r.cat)}</span>
          {r.tags.map((tg) => (
            <span key={tg.en} className="text-[11px] text-secondary bg-black/[0.045] rounded-full px-2.5 py-1">{t(tg)}</span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-black/[0.06] flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <a
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[13px] font-medium text-accent hover:gap-1.5 transition-all"
            >
              {r.access === 'unconfirmed'
                ? t({ zh: '查看原始页面', en: 'View original page' })
                : t({ zh: '观看资源', en: 'Watch resource' })}
              <span aria-hidden="true">↗</span>
            </a>
            {r.extraUrl && (
              <a href={r.extraUrl.url} target="_blank" rel="noreferrer" className="text-[12.5px] text-secondary hover:text-ink truncate">
                {t(r.extraUrl.label)}
              </a>
            )}
          </div>
          <BookmarkBtn id={r.id} saved={saved} onToggle={onToggle} t={t} />
        </div>
      </div>
    </article>
  );
};

/* ---------- 专家卡片 ---------- */
const ExpertCard = ({ e, t, saved, onToggle }) => (
  <article className={`${CARD} p-6 flex flex-col transition-all duration-300 hover:shadow-card hover:ring-black/[0.11]`}>
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 shrink-0 rounded-full bg-accent-soft text-accent flex items-center justify-center text-[14px] font-semibold tracking-[0.02em]">
        {e.initials}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-[16.5px] font-semibold leading-snug text-balance">{e.name}</h3>
        <p className="text-[12.5px] text-secondary mt-1 leading-relaxed">{t(e.role)} · {t(e.org)}</p>
        {e.orgNote && <p className="text-[11px] text-secondary/70 mt-0.5">{t(e.orgNote)}</p>}
      </div>
      <BookmarkBtn id={e.id} saved={saved} onToggle={onToggle} t={t} />
    </div>

    <p className="mt-4 text-[13.5px] leading-[1.75] text-secondary flex-1">{t(e.why)}</p>

    <div className="flex flex-wrap gap-1.5 mt-4">
      {e.expertise.map((x) => (
        <span key={x.en} className="text-[11px] text-secondary bg-black/[0.045] rounded-full px-2.5 py-1">{t(x)}</span>
      ))}
    </div>

    <div className="mt-4 pt-3.5 border-t border-black/[0.06] flex flex-wrap gap-x-4 gap-y-1.5 text-[12.5px]">
      {e.links.map((l) => (
        <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="text-accent font-medium hover:underline underline-offset-4">
          {t(l.label)} ↗
        </a>
      ))}
      <a href={e.related.url} target="_blank" rel="noreferrer" className="text-secondary hover:text-ink">
        {t(e.related.label)}
      </a>
    </div>
  </article>
);

/* ---------- 播客剧集行 ---------- */
const EpisodeRow = ({ ep, t, saved, onToggle }) => (
  <div className="group flex items-start gap-4 py-4 border-b border-black/[0.06] last:border-b-0">
    <span className="w-7 shrink-0 pt-0.5 text-[12px] tabular-nums text-secondary/60">
      {String(ep.number).padStart(2, '0')}
    </span>
    <div className="min-w-0 flex-1">
      <p className="text-[14.5px] leading-snug">
        <span className="font-medium">{ep.guest}</span>
        <span className="text-secondary"> · {ep.org}</span>
        {ep.featured && (
          <span className="ml-2 align-middle text-[9.5px] font-semibold uppercase tracking-[0.1em] text-accent bg-accent-soft rounded-full px-2 py-0.5">
            {t({ zh: '最新', en: 'Latest' })}
          </span>
        )}
      </p>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5 text-[11.5px] text-secondary">
        {ep.topic.map((x, i) => (
          <React.Fragment key={x.en}>
            {i > 0 && <span className="w-[3px] h-[3px] rounded-full bg-hairline" />}
            <span>{t(x)}</span>
          </React.Fragment>
        ))}
        {ep.published && (
          <>
            <span className="w-[3px] h-[3px] rounded-full bg-hairline" />
            <span className="tabular-nums">{fmtDate(ep.published, t)}</span>
          </>
        )}
      </div>
    </div>
    <div className="flex items-center gap-2 shrink-0">
      <a
        href={ep.url}
        target="_blank"
        rel="noreferrer"
        className="text-[12.5px] font-medium text-accent whitespace-nowrap hover:underline underline-offset-4"
      >
        {t({ zh: '收听', en: 'Listen' })} ↗
      </a>
      <BookmarkBtn id={ep.id} saved={saved} onToggle={onToggle} t={t} />
    </div>
  </div>
);

/* ---------- 区块标题 ---------- */
const SectionHead = ({ num, title, blurb, count, t }) => (
  <div className="mb-7">
    <div className="flex items-baseline gap-3">
      <span className="text-[12px] tabular-nums text-accent font-semibold">{num}</span>
      <h2 className="text-[26px] md:text-[32px] font-semibold tracking-[-0.015em] text-balance">{title}</h2>
      <span className="text-[12.5px] text-secondary tabular-nums ml-1">
        {t({ zh: `${count} 条`, en: `${count}` })}
      </span>
    </div>
    {blurb && <p className="mt-2 text-[14.5px] leading-relaxed text-secondary max-w-2xl">{blurb}</p>}
  </div>
);

/* ---------- 页面 ---------- */
const ResourceHub = ({ t }) => {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');
  const [access, setAccess] = useState('all');
  const [expFilter, setExpFilter] = useState('all');
  const [epQuery, setEpQuery] = useState('');
  const [savedOnly, setSavedOnly] = useState(false);

  // 书签：localStorage，无需账号或后端
  const [saved, setSaved] = useState(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch (e) {
      /* 隐私模式下写入失败时静默忽略 */
    }
  }, [saved]);

  const toggle = (id) => setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const categories = useMemo(() => {
    const seen = [];
    videos.forEach((v) => {
      if (!seen.some((s) => s.en === v.cat.en)) seen.push(v.cat);
    });
    return seen;
  }, []);

  const expertiseAll = useMemo(() => {
    const seen = [];
    experts.forEach((e) => e.expertise.forEach((x) => { if (!seen.some((s) => s.en === x.en)) seen.push(x); }));
    return seen;
  }, []);

  const filteredVideos = videos.filter((v) => {
    if (savedOnly && !saved.includes(v.id)) return false;
    if (cat !== 'all' && v.cat.en !== cat) return false;
    if (access !== 'all' && v.access !== access) return false;
    if (query.trim()) {
      const hay = `${v.title} ${v.provider} ${t(v.description)} ${v.speaker || ''}`.toLowerCase();
      if (!hay.includes(query.trim().toLowerCase())) return false;
    }
    return true;
  });

  const filteredExperts = experts.filter((e) => {
    if (savedOnly && !saved.includes(e.id)) return false;
    if (expFilter !== 'all' && !e.expertise.some((x) => x.en === expFilter)) return false;
    return true;
  });

  const filteredEpisodes = episodes.filter((ep) => {
    if (savedOnly && !saved.includes(ep.id)) return false;
    if (epQuery.trim()) {
      const hay = `${ep.guest} ${ep.org} ${ep.topic.map((x) => t(x)).join(' ')}`.toLowerCase();
      if (!hay.includes(epQuery.trim().toLowerCase())) return false;
    }
    return true;
  });

  const featured = videos.filter((v) => v.featured).slice(0, 3);
  const total = videos.length + experts.length + episodes.length;
  const latestVerified = '2026-11-06';

  const jump = (id) => (ev) => {
    ev.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const resetAll = () => {
    setQuery('');
    setCat('all');
    setAccess('all');
    setExpFilter('all');
    setEpQuery('');
    setSavedOnly(false);
  };

  const inputCls =
    'w-full rounded-full bg-white ring-1 ring-black/[0.08] pl-9 pr-4 py-2 text-[13.5px] text-ink placeholder:text-secondary/60 outline-none focus:ring-accent/40 transition-all';

  return (
    <div className="fade-up">
      {/* 页头 */}
      <header className="pt-28 md:pt-32 pb-10 px-6 max-w-6xl mx-auto">
        <p className={EYEBROW + ' mb-4'}>{t({ zh: '资源库', en: 'Resource Hub' })}</p>
        <h1 className="text-[34px] md:text-[50px] font-semibold tracking-[-0.02em] leading-[1.08] text-balance max-w-4xl">
          {t({ zh: 'Social Listening & Insights 资源库', en: 'Social Listening & Insights Resource Hub' })}
        </h1>
        <p className="mt-5 text-[16px] md:text-[17.5px] leading-relaxed text-secondary max-w-2xl text-balance">
          {t({
            zh: '一份由我独立整理的资源清单：社媒聆听、社媒智能与消费者洞察领域的视频、网络研讨会、行业专家与播客，供学习与日常查阅。',
            en: 'A curated collection of videos, webinars, industry experts and podcasts for professionals interested in social listening, social intelligence and consumer insights.',
          })}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px] text-secondary">
          <span className="tabular-nums">
            {videos.length} {t({ zh: '条视频 / 研讨会', en: 'videos & webinars' })}
          </span>
          <span className="w-[3px] h-[3px] rounded-full bg-hairline" />
          <span className="tabular-nums">
            {experts.length} {t({ zh: '位专家', en: 'experts' })}
          </span>
          <span className="w-[3px] h-[3px] rounded-full bg-hairline" />
          <span className="tabular-nums">
            {episodes.length} {t({ zh: '期播客', en: 'episodes' })}
          </span>
          <span className="w-[3px] h-[3px] rounded-full bg-hairline" />
          <span>
            {t({ zh: '最近核对', en: 'Last verified' })} {fmtDate(latestVerified, t)}
          </span>
        </div>
      </header>

      {/* 编辑精选 */}
      <section className="px-6 max-w-6xl mx-auto pb-14">
        <div className="rounded-[20px] bg-white ring-1 ring-black/[0.06] overflow-hidden">
          <div className="px-6 pt-5 pb-1 flex items-center justify-between">
            <p className={EYEBROW}>{t({ zh: '编辑精选 · 从这里开始', en: 'Featured · start here' })}</p>
            <span className="text-[11.5px] text-secondary tabular-nums">{featured.length}</span>
          </div>
          <div className="divide-y divide-black/[0.06]">
            {featured.map((v, i) => (
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4 px-6 py-4 hover:bg-black/[0.02] transition-colors"
              >
                <span className="text-[12px] tabular-nums text-accent font-semibold pt-1">{String(i + 1).padStart(2, '0')}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-medium leading-snug group-hover:text-accent transition-colors text-balance">{v.title}</p>
                  <p className="mt-1 text-[12px] text-secondary">
                    {v.provider} · {t(v.format)}
                    {v.duration ? ` · ${v.duration}` : ''}
                  </p>
                </div>
                <span className="text-secondary/50 group-hover:text-accent group-hover:translate-x-0.5 transition-all pt-0.5">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 锚点条 */}
      <div className="sticky top-14 z-40 bg-surface/85 backdrop-blur-xl border-y border-black/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <nav className="flex items-center gap-5 md:gap-8 overflow-x-auto no-scrollbar">
            {[
              ['sec-videos', { zh: '视频与研讨会', en: 'Videos & Webinars' }],
              ['sec-experts', { zh: '行业专家', en: 'Industry Experts' }],
              ['sec-podcasts', { zh: '播客', en: 'Podcasts' }],
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={jump(id)}
                className="whitespace-nowrap text-[11.5px] uppercase tracking-[0.09em] font-medium text-secondary hover:text-ink transition-colors"
              >
                {t(label)}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setSavedOnly((s) => !s)}
            className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] transition-all ${
              savedOnly ? 'bg-ink text-white' : 'bg-white text-secondary ring-1 ring-black/[0.08] hover:text-ink'
            }`}
          >
            <Bookmark saved={savedOnly} />
            <span className="tabular-nums">
              {t({ zh: '已收藏', en: 'Saved' })} {saved.length}
            </span>
          </button>
        </div>
      </div>

      {/* 01 视频与研讨会 */}
      <section id="sec-videos" className="scroll-mt-32 px-6 max-w-6xl mx-auto pt-14 pb-20">
        <SectionHead
          num="01"
          title={t({ zh: '视频与网络研讨会', en: 'Videos & Webinars' })}
          blurb={t({
            zh: '按提供方与主题整理的公开课程与回放。标注「需注册」的需要填写表单才能观看。',
            en: 'Public sessions and replays grouped by provider and theme. Anything marked registration required needs a form before you can watch.',
          })}
          count={filteredVideos.length}
          t={t}
        />

        <div className="mb-7 space-y-3.5">
          <div className="relative max-w-sm">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary/60">
              <SearchIcon />
            </span>
            <input
              type="search"
              value={query}
              onChange={(ev) => setQuery(ev.target.value)}
              placeholder={t({ zh: '搜索标题、提供方或讲者', en: 'Search title, provider or speaker' })}
              className={inputCls}
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            <Chip active={cat === 'all'} onClick={() => setCat('all')}>
              {t({ zh: '全部主题', en: 'All topics' })}
            </Chip>
            {categories.map((c) => (
              <Chip key={c.en} active={cat === c.en} onClick={() => setCat(c.en)}>
                {t(c)}
              </Chip>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {accessFilters.map((a) => (
              <Chip key={a.key} active={access === a.key} onClick={() => setAccess(a.key)}>
                {t(a.label)}
              </Chip>
            ))}
          </div>
        </div>

        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVideos.map((v) => (
              <VideoCard key={v.id} r={v} t={t} saved={saved} onToggle={toggle} />
            ))}
          </div>
        ) : (
          <div className={`${CARD} px-6 py-12 text-center`}>
            <p className="text-[14px] text-secondary">
              {savedOnly
                ? t({ zh: '还没有收藏的视频资源。', en: 'No bookmarked videos yet.' })
                : t({ zh: '没有符合当前筛选条件的资源。', en: 'No resources match these filters.' })}
            </p>
            <button type="button" onClick={resetAll} className="mt-3 text-[13px] font-medium text-accent hover:underline underline-offset-4">
              {t({ zh: '清除筛选', en: 'Clear filters' })}
            </button>
          </div>
        )}
      </section>

      {/* 02 行业专家 */}
      <section id="sec-experts" className="scroll-mt-32 px-6 max-w-6xl mx-auto pb-20">
        <SectionHead
          num="02"
          title={t({ zh: '行业专家', en: 'Industry Experts' })}
          blurb={t({
            zh: '值得长期关注的从业者与研究者：他们要么在推动方法论，要么在定义这个岗位的专业标准。',
            en: 'Practitioners and researchers worth following over time — people who either shape the method or define what good looks like in this role.',
          })}
          count={filteredExperts.length}
          t={t}
        />

        <div className="mb-7 flex flex-wrap gap-1.5">
          <Chip active={expFilter === 'all'} onClick={() => setExpFilter('all')}>
            {t({ zh: '全部专长', en: 'All expertise' })}
          </Chip>
          {expertiseAll.map((x) => (
            <Chip key={x.en} active={expFilter === x.en} onClick={() => setExpFilter(x.en)}>
              {t(x)}
            </Chip>
          ))}
        </div>

        {filteredExperts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredExperts.map((e) => (
              <ExpertCard key={e.id} e={e} t={t} saved={saved} onToggle={toggle} />
            ))}
          </div>
        ) : (
          <div className={`${CARD} px-6 py-12 text-center`}>
            <p className="text-[14px] text-secondary">
              {savedOnly
                ? t({ zh: '还没有收藏的专家。', en: 'No bookmarked experts yet.' })
                : t({ zh: '没有符合该专长的专家。', en: 'No experts match this filter.' })}
            </p>
            <button type="button" onClick={resetAll} className="mt-3 text-[13px] font-medium text-accent hover:underline underline-offset-4">
              {t({ zh: '清除筛选', en: 'Clear filters' })}
            </button>
          </div>
        )}
      </section>

      {/* 03 播客 */}
      <section id="sec-podcasts" className="scroll-mt-32 px-6 max-w-6xl mx-auto pb-16">
        <SectionHead
          num="03"
          title={t({ zh: '播客', en: 'Podcasts' })}
          blurb={t({
            zh: '一档聚焦女性从业者的播客系列，适合通勤时听的行业视角与职业路径。',
            en: 'One series, focused on women in the field — good for industry perspective and career paths on a commute.',
          })}
          count={filteredEpisodes.length}
          t={t}
        />

        <div className="grid lg:grid-cols-[300px_1fr] gap-6 items-start">
          {/* 封面 */}
          <div className={`${CARD} p-5 lg:sticky lg:top-32`}>
            <div className="rounded-[14px] bg-[#1d1d1f] aspect-square p-5 flex flex-col justify-between">
              <span className="text-[9.5px] uppercase tracking-[0.22em] text-white/45">
                {t({ zh: '播客系列', en: 'Podcast series' })}
              </span>
              <div>
                <p className="text-white text-[17px] font-semibold leading-[1.3] tracking-[-0.01em]">
                  Women in
                  <br />
                  Social Listening
                  <br />
                  &amp; Insights
                </p>
                <p className="text-white/45 text-[10.5px] mt-3">{podcast.publisher} · {podcast.host}</p>
              </div>
            </div>

            <p className="mt-4 text-[13px] leading-[1.7] text-secondary">{t(podcast.description)}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              <AccessBadge access={podcast.access} />
              {podcast.category.map((c) => (
                <span key={c.en} className="text-[11px] text-secondary bg-black/[0.045] rounded-full px-2.5 py-1">{t(c)}</span>
              ))}
            </div>

            <a
              href={podcast.url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center w-full rounded-full bg-ink text-white text-[13px] font-medium py-2.5 hover:bg-black transition-colors"
            >
              {t({ zh: '打开播客主页', en: 'Open podcast hub' })} ↗
            </a>
            <p className="mt-3 text-[11px] text-secondary/80 leading-relaxed">{t(podcast.note)}</p>
          </div>

          {/* 剧集列表 */}
          <div className={`${CARD} px-6 py-5`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/[0.06]">
              <p className={EYEBROW}>{t({ zh: '精选剧集', en: 'Selected episodes' })}</p>
              <div className="relative w-full sm:w-64">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60">
                  <SearchIcon />
                </span>
                <input
                  type="search"
                  value={epQuery}
                  onChange={(ev) => setEpQuery(ev.target.value)}
                  placeholder={t({ zh: '按嘉宾、公司或话题筛选', en: 'Filter by guest, company or topic' })}
                  className={inputCls.replace('py-2', 'py-1.5')}
                />
              </div>
            </div>

            {filteredEpisodes.length > 0 ? (
              filteredEpisodes.map((ep) => <EpisodeRow key={ep.id} ep={ep} t={t} saved={saved} onToggle={toggle} />)
            ) : (
              <p className="py-12 text-center text-[14px] text-secondary">
                {savedOnly
                  ? t({ zh: '还没有收藏的剧集。', en: 'No bookmarked episodes yet.' })
                  : t({ zh: '没有符合条件的剧集。', en: 'No episodes match this filter.' })}
              </p>
            )}

            <p className="pt-4 text-[11.5px] text-secondary/80">
              {t({ zh: '共收录', en: 'Showing' })} {filteredEpisodes.length} / {episodes.length}
            </p>
          </div>
        </div>
      </section>

      {/* 免责声明 */}
      <section className="px-6 max-w-6xl mx-auto pb-24">
        <div className="border-t border-black/[0.08] pt-8 grid md:grid-cols-[1fr_auto] gap-6 items-start">
          <div className="max-w-3xl">
            <p className="text-[12.5px] leading-[1.8] text-secondary">
              {t({
                zh: '本页资源由我独立筛选整理，仅用于学习与职业发展。课程的可获取性、注册要求与价格可能发生变化，请以提供方官方页面为准。',
                en: 'Resources are independently curated for learning and professional development. Course availability, access requirements and pricing may change. Please refer to the original provider for the latest information.',
              })}
            </p>
            <p className="mt-2 text-[11.5px] text-secondary/70">
              {t({
                zh: `共 ${total} 条资源 · 最近核对 ${fmtDate(latestVerified, t)}`,
                en: `${total} resources · last verified ${fmtDate(latestVerified, t)}`,
              })}
            </p>
          </div>
          <a
            href="mailto:Ingrid9096@outlook.com?subject=Resource%20suggestion%20for%20your%20hub"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent hover:underline underline-offset-4 whitespace-nowrap"
          >
            {t({ zh: '推荐一条资源', en: 'Suggest a resource' })} ↗
          </a>
        </div>
      </section>
    </div>
  );
};

export default ResourceHub;
