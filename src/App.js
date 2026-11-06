import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import contentData from './data/content.json';
import ResourceHub from './pages/ResourceHub';

// --- 设计系统：Apple 风格的共用样式 ---
const CARD = 'bg-white rounded-[24px] shadow-card ring-1 ring-black/[0.04]';
const BTN_PRIMARY =
  'inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-[15px] font-medium text-white transition-all duration-200 hover:bg-accent-hover active:scale-[0.97]';
const BTN_SECONDARY =
  'inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-[15px] font-medium text-ink ring-1 ring-hairline transition-all duration-200 hover:ring-ink active:scale-[0.97]';
const SECTION_TITLE =
  'text-[32px] md:text-[40px] font-semibold tracking-[-0.015em] leading-tight text-balance';
const EYEBROW = 'text-xs font-semibold uppercase tracking-[0.18em] text-secondary';

// --- 富文本渲染：支持 **加粗** 与 ==高亮== ---
const renderRich = (text) => {
  if (!text) return text;
  const tokens = String(text).split(/(\*\*[^*]+\*\*|==[^=]+==)/g);
  return tokens.map((tk, i) => {
    if (tk.startsWith('**') && tk.endsWith('**')) {
      return <strong key={i} className="font-semibold text-ink">{tk.slice(2, -2)}</strong>;
    }
    if (tk.startsWith('==') && tk.endsWith('==')) {
      return (
        <mark key={i} className="bg-accent-soft text-accent font-semibold px-1.5 py-0.5 rounded-md box-decoration-clone">
          {tk.slice(2, -2)}
        </mark>
      );
    }
    return tk;
  });
};
const RichText = ({ text, className }) => <p className={className}>{renderRich(text)}</p>;

// --- 导航栏 ---
const Navbar = ({ lang, setLang, t }) => {
  const [open, setOpen] = useState(false);
  const navItems = [
    ['/', t(contentData.nav.home)],
    ['/projects', t(contentData.nav.projects)],
    ['/hobbies', t(contentData.nav.hobbies)],
    ['/social-listening', t(contentData.nav.hub)],
    ['/resources', t(contentData.nav.resources)],
    ['/contact', t(contentData.nav.contact)],
  ];
  const linkCls = ({ isActive }) =>
    `uppercase tracking-[0.09em] transition-colors duration-200 ${
      isActive ? 'text-ink font-semibold' : 'text-secondary hover:text-ink font-medium'
    }`;

  return (
    <nav className="fixed w-full z-[100] bg-surface/70 backdrop-blur-xl ring-1 ring-black/[0.05]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex justify-between items-center">
        <Link to="/" className="text-[17px] font-semibold tracking-tight text-ink" onClick={() => setOpen(false)}>
          {contentData.profile.name}
        </Link>

        <div className="hidden lg:flex items-center gap-4 lg:gap-5 xl:gap-7 text-[11.5px] xl:text-[12px]">
          {navItems.map(([to, label]) => (
            <NavLink key={to} to={to} className={linkCls}>{label}</NavLink>
          ))}
          <NavLink to="/resume" className={linkCls}>{t(contentData.nav.resume)}</NavLink>
          <button
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className="rounded-full bg-ink text-white text-xs px-3.5 py-1.5 font-medium transition-all duration-200 hover:bg-black active:scale-[0.97]"
          >
            {lang === 'en' ? '中文' : 'EN'}
          </button>
        </div>

        <button
          className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`w-5 h-[1.5px] bg-ink transition-all duration-300 ${open ? 'rotate-45 translate-y-[3.25px]' : ''}`} />
          <span className={`w-5 h-[1.5px] bg-ink transition-all duration-300 ${open ? '-rotate-45 -translate-y-[3.25px]' : ''}`} />
        </button>
      </div>

      {/* 移动端菜单 */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-out bg-surface/95 backdrop-blur-xl ${
          open ? 'max-h-96 border-b border-black/[0.06]' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-1 text-[15px]">
          {[...navItems, ['/resume', t(contentData.nav.resume)]].map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `py-2.5 uppercase tracking-[0.09em] ${isActive ? 'text-ink font-semibold' : 'text-secondary'}`} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
          <button
            onClick={() => { setLang(lang === 'en' ? 'zh' : 'en'); setOpen(false); }}
            className="mt-2 self-start rounded-full bg-ink text-white text-xs px-3.5 py-1.5 font-medium"
          >
            {lang === 'en' ? '中文' : 'EN'}
          </button>
        </div>
      </div>
    </nav>
  );
};

// --- 页面 1: 首页 (Home) ---
const Home = ({ t, setActiveProject }) => {
  const h = contentData.home;
  const featured = contentData.projects.slice(0, 2);

  return (
    <div className="fade-up">
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-14 items-center">
          <div className="flex-1">
            <p className={EYEBROW + ' mb-5'}>{t({ zh: '社交媒体洞察', en: 'Social Listening & Insight' })}</p>
            <h1 className="text-[38px] md:text-[56px] font-semibold tracking-[-0.02em] leading-[1.12] text-balance mb-6">
              {t(contentData.profile.title)}
            </h1>
            <p className="text-[17px] md:text-[19px] leading-relaxed text-secondary max-w-xl mb-10 text-balance">
              {t(contentData.profile.intro)}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/projects" className={BTN_PRIMARY}>{t({ zh: '查看案例', en: 'View Projects' })}</Link>
              <Link to={contentData.profile.resumeUrl || '/resume'} className={BTN_SECONDARY}>{t(contentData.nav.resume)}</Link>
            </div>
            <p className="mt-7 flex items-center gap-2.5 text-[13px] text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {t(h.currently)}
            </p>
          </div>
          <div className="shrink-0 w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-card ring-1 ring-black/[0.06]">
            <img src="/assets/profile.png" alt="Ingrid Ma" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
          </div>
        </div>
      </section>

      {/* 数字凭证条 */}
      <section className="px-6 max-w-6xl mx-auto pb-16 md:pb-20">
        <div className="grid grid-cols-3 gap-x-4 md:gap-x-0 border-t border-black/[0.08] pt-8">
          {h.stats.map((s, i) => (
            <div key={i} className={`pr-3 md:pr-6 ${i === 0 ? '' : 'md:border-l md:border-black/[0.07] md:pl-8'}`}>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[28px] md:text-[40px] font-semibold tracking-[-0.025em] tabular-nums leading-none">{s.value}</span>
                {s.unit && <span className="text-[14px] text-secondary">{t(s.unit)}</span>}
              </div>
              <p className="text-[12px] md:text-[13px] text-secondary mt-2.5 leading-snug">{t(s.label)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 精选案例 */}
      <section className="px-6 max-w-6xl mx-auto py-16 md:py-20 border-t border-black/[0.06]">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-10">
          <div>
            <p className={EYEBROW + ' mb-3'}>{t(h.workLabel)}</p>
            <h2 className="text-[24px] md:text-[30px] font-semibold tracking-[-0.015em] text-balance max-w-2xl">{t(h.workHint)}</h2>
          </div>
          <Link to="/projects" className="text-[14px] font-medium text-accent hover:underline underline-offset-4 shrink-0">
            {t(h.allCases)} →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {featured.map((p, i) => (
            <div key={p.id} className="group cursor-pointer" onClick={() => setActiveProject(p)}>
              <div className="aspect-[16/10] overflow-hidden rounded-[20px] shadow-card ring-1 ring-black/[0.04] bg-white">
                <img
                  src={p.assets.images[0]}
                  alt={t(p.title)}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
              </div>
              <div className="mt-5 flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-5 px-1">
                <div>
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-secondary mb-2">
                    <span className="text-accent font-semibold tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <span className="w-4 h-px bg-black/20" />
                    <span>{p.meta.category}</span>
                  </div>
                  <h3 className="text-[20px] font-semibold leading-snug text-balance transition-colors duration-300 group-hover:text-accent">
                    {t(p.title)}
                  </h3>
                </div>
                <span className="text-[13px] font-semibold text-accent text-right shrink-0 pt-1">{p.metrics[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 我做什么 */}
      <section className="px-6 max-w-6xl mx-auto py-16 md:py-20 border-t border-black/[0.06]">
        <p className={EYEBROW + ' mb-10'}>{t(h.capLabel)}</p>
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-10">
          {h.capabilities.map((c) => (
            <div key={c.num}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[12px] font-semibold text-accent tabular-nums">{c.num}</span>
                <span className="flex-1 h-px bg-black/[0.08]" />
              </div>
              <h3 className="text-[19px] font-semibold mb-2.5 tracking-[-0.01em]">{t(c.title)}</h3>
              <p className="text-secondary text-[15px] leading-[1.75]">{t(c.body)}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center gap-2.5">
          <span className="text-[11px] uppercase tracking-[0.14em] text-black/35 mr-2">{t(h.sectorsLabel)}</span>
          {h.sectors.map((s, i) => (
            <span key={i} className="text-[13px] text-secondary bg-white ring-1 ring-black/[0.06] rounded-full px-3.5 py-1.5">{t(s)}</span>
          ))}
        </div>
      </section>

      {/* 联系 CTA */}
      <section className="px-6 max-w-6xl mx-auto pb-24">
        <div className="rounded-[28px] bg-white shadow-card ring-1 ring-black/[0.04] p-9 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-[26px] md:text-[32px] font-semibold tracking-[-0.02em] mb-3 text-balance">{t(h.ctaTitle)}</h2>
            <p className="text-secondary text-[15px] leading-[1.75]">{t(h.ctaBody)}</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a href={`mailto:${contentData.settings.contact.email}`} className={BTN_PRIMARY}>{t(h.ctaButton)}</a>
            <Link to="/resume" className={BTN_SECONDARY}>{t(h.ctaResume)}</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- 页面 2: 项目经历 (Projects) ---
const Projects = ({ t, setActiveProject }) => (
  <section className="pt-36 pb-24 px-6 max-w-6xl mx-auto fade-up">
    <h2 className={SECTION_TITLE + ' mb-4'}>{t({ zh: '案例展示', en: 'Case Studies' })}</h2>
    <p className="text-secondary mb-14 max-w-2xl leading-relaxed">
      {t({
        zh: '四个社媒聆听项目：从数据拆解、洞察落地到独立研究。',
        en: 'Four social listening projects — from metric decomposition to insight-to-action and independent research.'
      })}
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
      {contentData.projects.map((project, i) => (
        <div key={project.id} className="group cursor-pointer" onClick={() => setActiveProject(project)}>
          <div className="aspect-[16/10] bg-white mb-6 overflow-hidden rounded-[20px] shadow-card ring-1 ring-black/[0.04] transition-all duration-500 group-hover:shadow-card-hover">
            {project.assets.images && project.assets.images[0] ? (
              <img src={project.assets.images[0]} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" alt={t(project.title)} />
            ) : (
              <div className="w-full h-full flex flex-col justify-end p-7 bg-gradient-to-br from-[#fafafc] to-[#ececf0]">
                <span className="text-6xl font-semibold text-black/[0.12] leading-none mb-3">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-xs text-secondary uppercase tracking-[0.18em]">{project.meta.category}</span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-start gap-6 px-1">
            <div>
              <h3 className="text-[21px] font-semibold mb-2 tracking-[-0.01em] text-balance group-hover:text-accent transition-colors duration-300">
                {t(project.title)}
              </h3>
              <span className="text-[13px] text-secondary">
                {project.meta.category}{project.meta.year ? ` · ${project.meta.year}` : ''}
              </span>
              {project.tags && (
                <div className="flex flex-wrap gap-2 mt-3.5">
                  {project.tags.map(tag => (
                    <span key={t(tag)} className="text-xs text-secondary bg-black/[0.04] rounded-full px-3 py-1">{t(tag)}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="text-right shrink-0">
              {project.metrics.map(m => <div key={m} className="text-[13px] font-semibold text-accent">{m}</div>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// --- 页面 3: 兴趣爱好 (Hobbies) ---
const Hobbies = ({ t }) => {
  const h = contentData.hobbies;
  return (
    <section className="pt-36 pb-24 px-6 max-w-6xl mx-auto fade-up">
      <h2 className={SECTION_TITLE + ' mb-12'}>{t(h.heading)}</h2>
      <div className="space-y-8">
        <div className={CARD + ' p-7 md:p-10'}>
          <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
            <div>
              <h3 className="text-[21px] font-semibold mb-1.5">{t(h.photoTitle)}</h3>
              <p className="text-secondary text-[15px]">{t(h.photoBlurb)}</p>
            </div>
            <a
              href={contentData.settings.social.tuchong}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-accent hover:underline underline-offset-4"
            >
              {t(h.moreTuchong)}
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {h.photos.map((p) => (
              <figure key={p.src} className="aspect-[3/4] bg-[#ececf0] rounded-[16px] overflow-hidden">
                <img src={p.src} alt={t(p.alt)} className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-700 ease-out" loading="lazy" />
              </figure>
            ))}
          </div>
        </div>

        <div className={CARD + ' p-7 md:p-10'}>
          <div className="mb-7">
            <h3 className="text-[21px] font-semibold mb-1.5">{t(h.paintingTitle)}</h3>
            <p className="text-secondary text-[15px]">{t(h.paintingBlurb)}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {h.paintings.map((p) => (
              <figure key={p.src} className="aspect-[3/4] bg-[#fafafa] ring-1 ring-black/[0.04] rounded-[16px] overflow-hidden">
                <img src={p.src} alt={t(p.alt)} className="w-full h-full object-contain hover:scale-[1.04] transition-transform duration-500 ease-out" loading="lazy" />
              </figure>
            ))}
          </div>
          <p className="text-xs text-black/[0.35] leading-relaxed mt-6 pt-5 border-t border-black/[0.05]">{t(h.paintingNote)}</p>
        </div>

        <div className={CARD + ' p-7 md:p-10'}>
          <h3 className="text-[21px] font-semibold mb-1.5">{t(h.readingTitle)}</h3>
          <p className="text-secondary text-[15px]">{t(h.readingBlurb)}</p>
        </div>
      </div>
    </section>
  );
};

// --- 页面 4: 资源 (Resources) ---
const Resources = ({ t }) => {
  const h = contentData.hobbies;
  const social = contentData.settings.social;
  return (
    <section className="pt-36 pb-24 px-6 max-w-6xl mx-auto fade-up">
      <h2 className={SECTION_TITLE + ' mb-12'}>{t(h.resourcesHeading)}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a
          href={social.xiaohongshu}
          target="_blank"
          rel="noreferrer"
          className="group bg-[#ff2442] text-white p-9 md:p-10 rounded-[24px] shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-8">
              <span className="bg-white/15 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase">Social Media</span>
              <span className="text-xl opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
            </div>
            <h3 className="text-[26px] font-semibold mb-2.5">{h.xhsCardTitle}</h3>
            <p className="text-white/80 leading-relaxed text-[15px]">{t(h.xhsCardBlurb)}</p>
          </div>
          <div className="mt-12 flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#ff2442] font-bold text-[11px]">小红书</div>
            <span className="font-medium text-[15px]">{t(h.followHandle)} {social.xiaohongshuHandle}</span>
          </div>
        </a>
        <div className={CARD + ' p-9 md:p-10 flex flex-col justify-between'}>
          <div>
            <span className="bg-black/[0.04] px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase text-secondary">Photography</span>
            <h3 className="text-[26px] font-semibold mb-2.5 mt-7">Tuchong · 图虫</h3>
            <p className="text-secondary leading-relaxed text-[15px]">{t(h.photoBlurb)}</p>
          </div>
          <a
            href={social.tuchong}
            target="_blank"
            rel="noreferrer"
            className="text-accent font-medium mt-10 hover:underline underline-offset-4 self-start"
          >
            {t(h.moreTuchong)}
          </a>
        </div>
      </div>
      <div className={CARD + ' p-7 md:p-9 mt-6'}>
        <p className="text-secondary">{t(h.resourcesBlurb)}</p>
      </div>
    </section>
  );
};

// --- 页面 6: 简历 (Resume) ---
const Resume = ({ t }) => {
  const r = contentData.resume;
  return (
    <section className="pt-36 pb-24 px-6 max-w-5xl mx-auto fade-up">
      <header className="mb-16 border-b border-black/[0.08] pb-10">
        <h2 className="text-[40px] md:text-[48px] font-semibold tracking-[-0.02em] mb-3">{contentData.profile.name}</h2>
        <p className="text-xl text-secondary mb-5">{t(contentData.profile.title)}</p>
        <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-secondary">
          <a href={`mailto:${contentData.settings.contact.email}`} className="hover:text-accent transition-colors">{contentData.settings.contact.email}</a>
          {contentData.settings.contact.linkedin && !contentData.settings.contact.linkedin.endsWith('/Ingrid') && (
            <a href={`https://${contentData.settings.contact.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
              {contentData.settings.contact.linkedin}
            </a>
          )}
          <span>{t({ zh: '上海', en: 'Shanghai, China' })}</span>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-12 md:gap-16">
        <div className="md:col-span-2">
          <p className="text-[17px] leading-relaxed text-ink mb-14 text-balance">{t(r.summary)}</p>

          <h3 className={EYEBROW + ' mb-7'}>{t(r.experienceLabel)}</h3>
          <div className="space-y-11 mb-16">
            {r.experience.map((job, i) => (
              <article key={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                  <h4 className="text-lg font-semibold">{t(job.role)}</h4>
                  <span className="text-[13px] text-secondary tabular-nums">{job.period}</span>
                </div>
                <p className="text-sm text-secondary mb-3.5">{t(job.org)} · {t(job.place)}</p>
                <p className="text-[15px] text-ink/90 leading-relaxed mb-3.5">{t(job.summary)}</p>
                {job.bullets.length > 0 && (
                  <ul className="space-y-2.5">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="text-[15px] text-ink/80 leading-relaxed pl-5 relative">
                        <span className="absolute left-0 top-[0.62em] w-[5px] h-[5px] bg-accent rounded-full" />
                        {renderRich(t(b))}
                      </li>
                    ))}
                  </ul>
                )}
                {job.subsections && job.subsections.map((sub, k) => (
                  <div key={k} className="mt-5 pl-5 border-l border-black/[0.12]">
                    <h5 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-secondary mb-2.5">{t(sub.title)}</h5>
                    <ul className="space-y-2.5">
                      {sub.bullets.map((b, j) => (
                        <li key={j} className="text-[15px] text-ink/80 leading-relaxed pl-4 relative">
                          <span className="absolute left-0 top-[0.62em] w-[4px] h-[4px] bg-black/25 rounded-full" />
                          {renderRich(t(b))}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </article>
            ))}
          </div>

          <h3 className={EYEBROW + ' mb-7'}>{t(r.educationLabel)}</h3>
          <div className="space-y-7 mb-16">
            {r.education.map((e, i) => (
              <div key={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-semibold">{t(e.school)}</h4>
                  <span className="text-[13px] text-secondary tabular-nums">{e.period}</span>
                </div>
                <p className="text-[15px] text-ink/80">{t(e.degree)}</p>
                {e.note && <p className="text-[13px] text-secondary mt-1">{t(e.note)}</p>}
              </div>
            ))}
          </div>

          <h3 className={EYEBROW + ' mb-7'}>{t(r.aiLabel)}</h3>
          <div className="space-y-7">
            {r.aiCapabilities.map((c, i) => (
              <div key={i} className="grid sm:grid-cols-[168px_1fr] gap-x-6 gap-y-2">
                <h4 className="font-semibold text-[15px] leading-relaxed">{t(c.title)}</h4>
                <ul className="space-y-2">
                  {c.items.map((it, j) => (
                    <li key={j} className="text-[15px] text-ink/80 leading-relaxed pl-4 relative">
                      <span className="absolute left-0 top-[0.62em] w-[4px] h-[4px] bg-black/25 rounded-full" />
                      {renderRich(t(it))}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 className={EYEBROW + ' mt-16 mb-6'}>{t(r.coreLabel)}</h3>
          <div className="flex flex-wrap gap-2">
            {r.core.map((c, i) => (
              <span key={i} className="text-[13px] text-ink/75 border border-black/[0.12] rounded-full px-3.5 py-1.5">
                {t(c)}
              </span>
            ))}
          </div>
        </div>

        <aside className="space-y-7">
          <div className={CARD + ' p-7'}>
            <h4 className={EYEBROW + ' mb-5'}>{t(r.skillsLabel)}</h4>
            <div className="space-y-5">
              {r.skills.map((group, i) => (
                <div key={i}>
                  <p className="text-sm font-semibold mb-2">{t(group.label)}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((it, j) => (
                      <span key={j} className="text-xs text-ink/70 bg-black/[0.04] rounded-full px-3 py-1">
                        {t(it)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] bg-accent/[0.06] ring-1 ring-accent/20 p-7">
            <p className="text-sm text-ink/80 leading-relaxed">{t(r.contactNote)}</p>
            <a href={`mailto:${contentData.settings.contact.email}`} className="text-accent font-medium text-sm mt-3.5 inline-block hover:underline underline-offset-4">
              {contentData.settings.contact.email}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
};

// --- 页面 5: 联系方式 (Contact) ---
const Contact = ({ t }) => {
  const h = contentData.hobbies;
  const social = contentData.settings.social;
  return (
    <section className="pt-36 pb-24 px-6 max-w-6xl mx-auto fade-up">
      <h2 className={SECTION_TITLE + ' mb-12'}>{t(h.contactHeading)}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <a
          href={social.xiaohongshu}
          target="_blank"
          rel="noreferrer"
          className="group bg-[#ff2442] text-white p-9 md:p-10 rounded-[24px] shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-8">
              <span className="bg-white/15 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase">Social Media</span>
              <span className="text-xl opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
            </div>
            <h3 className="text-[30px] font-semibold mb-3">{h.xhsCardTitle}</h3>
            <p className="text-white/80 leading-relaxed text-lg">{t(h.xhsCardBlurb)}</p>
          </div>
          <div className="mt-12 flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#ff2442] font-bold text-[11px]">小红书</div>
            <span className="font-medium">{t(h.followHandle)} {social.xiaohongshuHandle}</span>
          </div>
        </a>

        <div className={CARD + ' p-9 md:p-10 flex flex-col justify-between'}>
          <div className="space-y-8 text-left">
            <div>
              <h4 className={EYEBROW + ' mb-2.5'}>Email</h4>
              <a href={`mailto:${contentData.settings.contact.email}`} className="text-[21px] font-medium text-ink hover:text-accent transition-colors underline decoration-black/10 underline-offset-8 break-all">
                {contentData.settings.contact.email}
              </a>
            </div>
            {contentData.settings.contact.linkedin && !contentData.settings.contact.linkedin.endsWith('/Ingrid') && (
              <div className="pt-7 border-t border-black/[0.06]">
                <h4 className={EYEBROW + ' mb-2.5'}>LinkedIn</h4>
                <a href={`https://${contentData.settings.contact.linkedin}`} target="_blank" rel="noreferrer" className="text-lg font-medium text-ink hover:text-accent transition-colors">
                  {contentData.settings.contact.linkedin}
                </a>
              </div>
            )}
            <div className="pt-7 border-t border-black/[0.06]">
              <h4 className={EYEBROW + ' mb-2.5'}>Tuchong · 图虫</h4>
              <a href={social.tuchong} target="_blank" rel="noreferrer" className="text-accent font-medium hover:underline underline-offset-4">
                {t(h.moreTuchong)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 页脚 ---
const Footer = ({ t }) => (
  <footer className="border-t border-black/[0.06] py-10 px-6">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-[13px] text-black/[0.4]">
      <span>© 2026 {contentData.profile.name}</span>
      <span className="flex gap-5">
        <Link to="/projects" className="hover:text-secondary transition-colors">{t(contentData.nav.projects)}</Link>
        <Link to="/resume" className="hover:text-secondary transition-colors">{t(contentData.nav.resume)}</Link>
        <Link to="/contact" className="hover:text-secondary transition-colors">{t(contentData.nav.contact)}</Link>
      </span>
    </div>
  </footer>
);

// --- 项目详情弹窗 ---
const ProjectModal = ({ project, t, onClose }) => {
  const displaySections = [
    ...(project.problem ? [{ key: 'problem', label: { zh: '背景', en: 'Context' } }] : []),
    ...(project.challenge ? [{ key: 'challenge', label: { zh: '难点', en: 'The hard part' } }] : []),
    ...(project.approach ? [{ key: 'approach', label: { zh: '我的做法', en: 'What I did' } }] : []),
    ...(project.items ? [{ key: 'items', label: { zh: '落地的建议', en: 'Recommendations shipped' }, type: 'items' }] : []),
    ...(project.insight ? [{ key: 'insight', label: { zh: '核心洞察', en: 'Key insight' }, type: 'insight' }] : []),
    ...(project.impact ? [{ key: 'impact', label: { zh: '成果与影响', en: 'Impact & result' }, type: 'impact' }] : []),
    ...(project.recommendation ? [{ key: 'recommendation', label: { zh: '后续建议', en: 'Recommendation' }, type: 'quote' }] : []),
  ];

  return (
    <div className="fixed inset-0 z-[110] bg-surface overflow-y-auto animate-[fadeUp_.4s_cubic-bezier(.16,1,.3,1)_both]">
      <div className="sticky top-0 bg-surface/80 backdrop-blur-xl h-14 flex items-center justify-end px-6 z-[120]">
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-black/[0.06] text-black/50 hover:bg-black/[0.12] hover:text-black transition-all duration-200 text-xl leading-none flex items-center justify-center"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className="max-w-5xl mx-auto px-6 pb-24 -mt-14">
        <header className="mb-14 pt-14">
          <span className="text-accent font-semibold text-[13px] tracking-[0.1em] uppercase">
            {project.meta.category}{project.meta.year ? ` · ${project.meta.year}` : ''}
          </span>
          <h2 className="text-[32px] md:text-[44px] font-semibold tracking-[-0.02em] leading-tight mt-3 text-balance">{t(project.title)}</h2>
          {project.tags && (
            <div className="flex flex-wrap gap-2 mt-6">
              {project.tags.map(tag => (
                <span key={t(tag)} className="text-xs text-secondary bg-black/[0.05] rounded-full px-3.5 py-1.5">{t(tag)}</span>
              ))}
            </div>
          )}
        </header>
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          <div className="md:col-span-2">
            {displaySections.map((s, idx) => (
              <section key={s.key} className="mb-14">
                <h4 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-black/[0.45] pb-3 mb-5 border-b border-black/[0.08]">
                  {String(idx + 1).padStart(2, '0')} · {t(s.label)}
                </h4>
                {s.type === 'items' ? (
                  <div className="grid sm:grid-cols-2 gap-5">
                    {project.items.map((it, i) => (
                      <div key={i} className="rounded-[18px] ring-1 ring-black/[0.06] bg-white p-6 flex flex-col">
                        <div className="flex items-center gap-2.5 mb-3">
                          <span className="text-accent font-semibold text-sm tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                          <span className="flex-1 h-px bg-black/[0.06]" />
                        </div>
                        <h5 className="font-semibold mb-2.5 leading-snug text-balance">{t(it.title)}</h5>
                        <RichText text={t(it.body)} className="text-secondary leading-[1.75] text-[14.5px]" />
                      </div>
                    ))}
                  </div>
                ) : s.type === 'insight' || s.type === 'quote' ? (
                  <blockquote className="bg-accent-soft/70 border-l-[3px] border-accent p-7 md:p-8 rounded-r-[18px] leading-[1.8] text-[16.5px] md:text-[17.5px] text-ink">
                    {renderRich(t(s.type === 'insight' ? project.insight : project.recommendation))}
                  </blockquote>
                ) : s.type === 'impact' ? (
                  <RichText
                    text={t(project.impact)}
                    className="text-[22px] md:text-[26px] font-medium leading-[1.6] tracking-[-0.01em] text-balance"
                  />
                ) : (
                  <RichText text={t(project[s.key])} className="text-ink/85 leading-[1.85] text-[15.5px]" />
                )}
              </section>
            ))}
          </div>
          <aside className="space-y-7 md:sticky md:top-20 self-start">
            {project.metrics && project.metrics.length > 0 && (
              <div className={CARD + ' p-7'}>
                <h4 className={EYEBROW + ' mb-4'}>{t({ zh: '关键指标', en: 'Key Metrics' })}</h4>
                {project.metrics.map(m => (
                  <div key={m} className="text-lg font-semibold text-accent mb-3 last:mb-0">{m}</div>
                ))}
              </div>
            )}
            {project.assets.pdf && (
              <div className={CARD + ' p-7'}>
                <h4 className={EYEBROW + ' mb-4'}>{t({ zh: '交付物', en: 'Deliverables' })}</h4>
                <a href={project.assets.pdf} target="_blank" rel="noreferrer" className="text-accent font-medium hover:underline underline-offset-4">
                  {t({ zh: '下载 PDF 报告', en: 'Download PDF Report' })}
                </a>
              </div>
            )}
            {project.meta.brand && (
              <div className={CARD + ' p-7'}>
                <h4 className={EYEBROW + ' mb-2'}>{t({ zh: '客户', en: 'Client' })}</h4>
                <p className="text-sm text-secondary">{project.meta.brand}</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

// --- 主组件 App ---
function Site() {
  const [lang, setLang] = useState('en');
  const [activeProject, setActiveProject] = useState(null);
  const location = useLocation();

  const t = (field) => {
    if (!field) return "";
    return field[lang] || field;
  };

  // 支持 ?open=<case-id> 深链直接打开某个案例（可分享具体案例链接）
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('open');
    if (id) {
      const p = contentData.projects.find((x) => x.id === id);
      if (p) setActiveProject(p);
    }
  }, []);

  const closeProject = () => {
    setActiveProject(null);
    window.history.replaceState({}, '', window.location.pathname);
  };

  return (
    <div className="min-h-screen bg-surface text-ink font-sans flex flex-col">
      <Navbar lang={lang} setLang={setLang} t={t} />

      <main className="flex-1" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home t={t} setActiveProject={setActiveProject} />} />
          <Route path="/projects" element={<Projects t={t} setActiveProject={setActiveProject} />} />
          <Route path="/hobbies" element={<Hobbies t={t} />} />
          <Route path="/resources" element={<Resources t={t} />} />
          <Route path="/social-listening" element={<ResourceHub t={t} />} />
          <Route path="/contact" element={<Contact t={t} />} />
          <Route path="/resume" element={<Resume t={t} />} />
        </Routes>
      </main>

      <Footer t={t} />

      {activeProject && (
        <ProjectModal project={activeProject} t={t} onClose={closeProject} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Site />
    </Router>
  );
}

