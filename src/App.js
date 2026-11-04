import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import contentData from './data/content.json';

// --- 抽取出的子组件：导航栏 ---
const Navbar = ({ lang, setLang, t }) => (
  <nav className="fixed w-full z-[100] bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex justify-between items-center">
    <Link to="/" className="font-bold tracking-tighter text-xl hover:text-blue-600 transition">
      {contentData.profile.name}
    </Link>
    
    <div className="hidden md:flex gap-8 items-center text-sm font-medium text-gray-600">
      <Link to="/" className="hover:text-black transition">{t(contentData.nav.home)}</Link>
      <Link to="/projects" className="hover:text-black transition">{t(contentData.nav.projects)}</Link>
      <Link to="/hobbies" className="hover:text-black transition">{t(contentData.nav.hobbies)}</Link>
      <Link to="/resources" className="hover:text-black transition">{t(contentData.nav.resources)}</Link>
      <Link to="/contact" className="hover:text-black transition">{t(contentData.nav.contact)}</Link>
      <Link to="/resume" className="border border-gray-300 px-3 py-1 rounded-full hover:border-black hover:text-black transition">
        {t(contentData.nav.resume)}
      </Link>
      <button 
        onClick={() => setLang(lang === 'en' ? 'zh' : 'en')} 
        className="bg-gray-100 px-3 py-1 rounded-full text-xs hover:bg-gray-200 transition"
      >
        {lang === 'en' ? '中文' : 'EN'}
      </button>
    </div>
  </nav>
);

// --- 页面 1: 首页 (Home) ---
const Home = ({ t }) => (
  <section className="pt-32 pb-20 px-8 max-w-6xl mx-auto">
    <div className="flex flex-col md:flex-row gap-12 items-center">
      <div className="flex-1">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {t(contentData.profile.title)}
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">
          {t(contentData.profile.intro)}
        </p>
        <div className="flex gap-4">
          <Link to="/projects" className="bg-[#111] text-white px-8 py-3 rounded-sm hover:bg-gray-800 transition">View Projects</Link>
          <Link to={contentData.profile.resumeUrl || "/resume"} className="border border-[#111] px-8 py-3 rounded-sm hover:bg-gray-50 transition text-center">Resume</Link>
        </div>
      </div>
      {/* 可以在这里放你的照片 */}
      <div className="w-64 h-64 bg-gray-200 rounded-full overflow-hidden border-4 border-white shadow-lg">
         <img src="/assets/profile.png" alt="Ingrid" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'}/>
      </div>
    </div>
  </section>
);

// --- 页面 2: 项目经历 (Projects) ---
const Projects = ({ t, setActiveProject }) => (
  <section className="pt-32 px-8 max-w-6xl mx-auto py-20">
    <h2 className="text-4xl font-bold mb-3">Case Studies</h2>
    <p className="text-gray-500 mb-12 max-w-2xl">
      {t({
        zh: '四个社媒聆听项目：从数据拆解、洞察落地到独立研究。',
        en: 'Four social listening projects — from metric decomposition to insight-to-action and independent research.'
      })}
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {contentData.projects.map((project, i) => (
        <div key={project.id} className="group cursor-pointer" onClick={() => setActiveProject(project)}>
          <div className="aspect-video bg-gray-100 mb-4 overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-all relative">
            {project.assets.images && project.assets.images[0] ? (
               <img src={project.assets.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={t(project.title)} />
            ) : (
               <div className="w-full h-full flex flex-col justify-end p-6 bg-gradient-to-br from-gray-100 to-gray-200">
                 <span className="text-6xl font-bold text-gray-300 leading-none mb-3">{String(i + 1).padStart(2, '0')}</span>
                 <span className="text-sm text-gray-500 uppercase tracking-widest">{project.meta.category}</span>
               </div>
            )}
          </div>
          <div className="flex justify-between items-start gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-700 transition">{t(project.title)}</h3>
              <span className="text-sm text-gray-500 uppercase tracking-widest">
                {project.meta.category}{project.meta.year ? ` · ${project.meta.year}` : ''}
              </span>
              {project.tags && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map(tag => (
                    <span key={t(tag)} className="text-xs text-gray-500 border border-gray-300 rounded-full px-2.5 py-0.5">{t(tag)}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="text-right shrink-0">
              {project.metrics.map(m => <div key={m} className="text-sm font-bold text-blue-600">{m}</div>)}
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
    <section className="pt-32 px-8 max-w-6xl mx-auto pb-20">
      <h2 className="text-4xl font-bold mb-10">{t(h.heading)}</h2>
      <div className="space-y-10">
        <div className="bg-white border p-8 rounded-3xl shadow-sm">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">{t(h.photoTitle)}</h3>
              <p className="text-gray-500">{t(h.photoBlurb)}</p>
            </div>
            <a
              href={contentData.settings.social.tuchong}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-bold text-blue-600 hover:text-blue-800 transition flex items-center gap-1 border-b-2 border-blue-100 pb-1"
            >
              {t(h.moreTuchong)}
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {h.photos.map((p) => (
              <figure key={p.src} className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-inner">
                <img src={p.src} alt={t(p.alt)} className="w-full h-full object-cover hover:scale-110 transition duration-700" loading="lazy" />
              </figure>
            ))}
          </div>
        </div>

        <div className="bg-white border p-8 rounded-3xl shadow-sm">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">{t(h.paintingTitle)}</h3>
            <p className="text-gray-500 text-sm">{t(h.paintingBlurb)}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {h.paintings.map((p) => (
              <figure key={p.src} className="aspect-[3/4] bg-[#faf9f7] border border-gray-100 rounded-xl overflow-hidden">
                <img src={p.src} alt={t(p.alt)} className="w-full h-full object-contain hover:scale-105 transition duration-500" loading="lazy" />
              </figure>
            ))}
          </div>
          <p className="text-xs text-gray-400 leading-relaxed mt-5 border-t border-gray-100 pt-4">{t(h.paintingNote)}</p>
        </div>

        <div className="bg-white border p-8 rounded-3xl shadow-sm">
          <h3 className="text-xl font-bold mb-4">{t(h.readingTitle)}</h3>
          <p className="text-gray-500 text-sm">{t(h.readingBlurb)}</p>
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
    <section className="pt-32 px-8 max-w-6xl mx-auto pb-20">
      <h2 className="text-4xl font-bold mb-10">{t(h.resourcesHeading)}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <a
          href={social.xiaohongshu}
          target="_blank"
          rel="noreferrer"
          className="group bg-[#ff2442] text-white p-10 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Social Media</span>
              <span className="text-2xl">➔</span>
            </div>
            <h3 className="text-3xl font-bold mb-3">{h.xhsCardTitle}</h3>
            <p className="text-white/80 leading-relaxed">{t(h.xhsCardBlurb)}</p>
          </div>
          <div className="mt-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#ff2442] font-black text-xs">小红书</div>
            <span className="font-bold border-b border-white/50 group-hover:border-white transition">
              {t(h.followHandle)} {social.xiaohongshuHandle}
            </span>
          </div>
        </a>
        <div className="bg-white border p-10 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase text-gray-500">Photography</span>
            <h3 className="text-3xl font-bold mb-3 mt-6">Tuchong · 图虫</h3>
            <p className="text-gray-500 leading-relaxed">{t(h.photoBlurb)}</p>
          </div>
          <a
            href={social.tuchong}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 font-bold hover:text-blue-800 transition mt-8 border-b-2 border-blue-100 pb-1 self-start"
          >
            {t(h.moreTuchong)}
          </a>
        </div>
      </div>
      <div className="bg-white border p-8 rounded-3xl shadow-sm mt-8">
        <p className="text-gray-500 italic">{t(h.resourcesBlurb)}</p>
      </div>
    </section>
  );
};

// --- 页面 6: 简历 (Resume) ---
const Resume = ({ t }) => {
  const r = contentData.resume;
  return (
    <section className="pt-32 pb-24 px-8 max-w-5xl mx-auto">
      <header className="mb-14 border-b border-gray-300 pb-8">
        <h2 className="text-5xl font-bold tracking-tight mb-4">{contentData.profile.name}</h2>
        <p className="text-xl text-gray-700 mb-4">{t(contentData.profile.title)}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
          <a href={`mailto:${contentData.settings.contact.email}`} className="hover:text-blue-600">{contentData.settings.contact.email}</a>
          {contentData.settings.contact.linkedin && !contentData.settings.contact.linkedin.endsWith('/Ingrid') && (
            <a href={`https://${contentData.settings.contact.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-blue-600">
              {contentData.settings.contact.linkedin}
            </a>
          )}
          <span>{t({ zh: '上海', en: 'Shanghai, China' })}</span>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <p className="text-lg leading-relaxed text-gray-800 mb-12">{t(r.summary)}</p>

          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">{t(r.experienceLabel)}</h3>
          <div className="space-y-10 mb-14">
            {r.experience.map((job, i) => (
              <article key={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h4 className="text-xl font-bold">{t(job.role)}</h4>
                  <span className="text-sm text-gray-500 tabular-nums">{job.period}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {t(job.org)} · {t(job.place)}
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">{t(job.summary)}</p>
                {job.bullets.length > 0 && (
                  <ul className="space-y-2">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="text-gray-700 leading-relaxed text-[15px] pl-5 relative">
                        <span className="absolute left-0 top-[0.55em] w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        {t(b)}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>

          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">{t(r.educationLabel)}</h3>
          <div className="space-y-6 mb-14">
            {r.education.map((e, i) => (
              <div key={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-bold">{t(e.school)}</h4>
                  <span className="text-sm text-gray-500 tabular-nums">{e.period}</span>
                </div>
                <p className="text-gray-700 text-[15px]">{t(e.degree)}</p>
                {e.note && <p className="text-sm text-gray-500 mt-1">{t(e.note)}</p>}
              </div>
            ))}
          </div>

          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">{t(r.researchLabel)}</h3>
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="font-bold">{t(r.research.title)}</h4>
              <span className="text-sm text-gray-500 tabular-nums">{r.research.period}</span>
            </div>
            <p className="text-gray-700 leading-relaxed text-[15px] mt-2">{t(r.research.body)}</p>
          </div>
        </div>

        <aside className="space-y-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{t(r.skillsLabel)}</h4>
            <div className="space-y-5">
              {r.skills.map((group, i) => (
                <div key={i}>
                  <p className="text-sm font-semibold mb-2">{t(group.label)}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((it, j) => (
                      <span key={j} className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-2.5 py-0.5">
                        {t(it)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
            <p className="text-sm text-gray-700 leading-relaxed">{t(r.contactNote)}</p>
            <a href={`mailto:${contentData.settings.contact.email}`} className="text-blue-700 font-semibold text-sm underline mt-3 inline-block">
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
    <section className="pt-32 px-8 max-w-6xl mx-auto pb-20">
      <h2 className="text-4xl font-bold mb-12">{t(h.contactHeading)}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <a
          href={social.xiaohongshu}
          target="_blank"
          rel="noreferrer"
          className="group bg-[#ff2442] text-white p-10 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Social Media</span>
              <span className="text-2xl">➔</span>
            </div>
            <h3 className="text-4xl font-bold mb-4">{h.xhsCardTitle}</h3>
            <p className="text-white/80 leading-relaxed text-lg">{t(h.xhsCardBlurb)}</p>
          </div>
          <div className="mt-12 flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#ff2442] font-black text-xs">小红书</div>
            <span className="font-bold border-b border-white/50 group-hover:border-white transition">
              {t(h.followHandle)} {social.xiaohongshuHandle}
            </span>
          </div>
        </a>

        <div className="bg-white border border-gray-100 p-10 rounded-3xl shadow-sm flex flex-col justify-between">
          <div className="space-y-8 text-left">
            <div>
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Email</h4>
              <a href={`mailto:${contentData.settings.contact.email}`} className="text-2xl font-medium text-gray-800 hover:text-blue-600 transition underline decoration-gray-200 underline-offset-8 break-all">
                {contentData.settings.contact.email}
              </a>
            </div>
            {contentData.settings.contact.linkedin && !contentData.settings.contact.linkedin.endsWith('/Ingrid') && (
              <div className="pt-6 border-t border-gray-50">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">LinkedIn</h4>
                <a href={`https://${contentData.settings.contact.linkedin}`} target="_blank" rel="noreferrer" className="text-lg font-medium text-gray-800 hover:text-blue-600 transition">
                  {contentData.settings.contact.linkedin}
                </a>
              </div>
            )}
            <div className="pt-6 border-t border-gray-50">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Tuchong · 图虫</h4>
              <a href={social.tuchong} target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:text-blue-800 transition">
                {t(h.moreTuchong)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 主组件 App ---
function App() {
  const [lang, setLang] = useState('en');
  const [activeProject, setActiveProject] = useState(null);

  const t = (field) => {
    if (!field) return "";
    return field[lang] || field;
  };

  // 弹窗内的章节按实际字段动态生成，缺字段的 case 自动跳过对应章节
  const displaySections = activeProject ? [
    ...(activeProject.problem ? [{ key: 'problem', label: { zh: '背景', en: 'Context' } }] : []),
    ...(activeProject.challenge ? [{ key: 'challenge', label: { zh: '难点', en: 'The hard part' } }] : []),
    ...(activeProject.approach ? [{ key: 'approach', label: { zh: '我的做法', en: 'What I did' } }] : []),
    ...(activeProject.items ? [{ key: 'items', label: { zh: '落地的建议', en: 'Recommendations shipped' }, type: 'items' }] : []),
    ...(activeProject.insight ? [{ key: 'insight', label: { zh: '核心洞察', en: 'Key insight' }, type: 'insight' }] : []),
    ...(activeProject.impact ? [{ key: 'impact', label: { zh: '成果与影响', en: 'Impact & result' }, type: 'impact' }] : []),
    ...(activeProject.recommendation ? [{ key: 'recommendation', label: { zh: '后续建议', en: 'Recommendation' }, type: 'quote' }] : []),
  ] : [];

  return (
    <Router>
      <div className="min-h-screen bg-[#F5F5F5] text-[#111] font-sans selection:bg-blue-100">
        <Navbar lang={lang} setLang={setLang} t={t} />

        <Routes>
          <Route path="/" element={<Home t={t} />} />
          <Route path="/projects" element={<Projects t={t} setActiveProject={setActiveProject} />} />
          <Route path="/hobbies" element={<Hobbies t={t} />} />
          <Route path="/resources" element={<Resources t={t} />} />
          <Route path="/contact" element={<Contact t={t} />} />
          <Route path="/resume" element={<Resume t={t} />} />
        </Routes>

        {/* 项目详情弹窗 */}
        {activeProject && (
          <div className="fixed inset-0 z-[100] bg-white overflow-y-auto p-8 md:p-20">
            <button onClick={() => setActiveProject(null)} className="fixed top-8 right-8 text-4xl leading-none hover:text-red-500 transition z-[110]">&times;</button>
            <div className="max-w-5xl mx-auto">
              <header className="mb-12">
                <span className="text-blue-600 font-bold uppercase text-sm tracking-widest">
                  {activeProject.meta.category}{activeProject.meta.year ? ` · ${activeProject.meta.year}` : ''}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">{t(activeProject.title)}</h2>
                {activeProject.tags && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {activeProject.tags.map(tag => (
                      <span key={t(tag)} className="text-xs text-gray-600 bg-gray-100 rounded-full px-3 py-1">{t(tag)}</span>
                    ))}
                  </div>
                )}
              </header>
              <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2">
                  {displaySections.map((s, idx) => (
                    <section key={s.key} className="mb-12">
                      <h4 className="font-bold border-b pb-2 mb-4 text-gray-800">
                        {String(idx + 1).padStart(2, '0')}. {t(s.label)}
                      </h4>
                      {s.type === 'items' ? (
                        <div className="grid sm:grid-cols-2 gap-6">
                          {activeProject.items.map((it, i) => (
                            <div key={i} className="border border-gray-200 rounded-lg p-5">
                              <div className="text-blue-600 font-bold text-sm mb-2">{String(i + 1).padStart(2, '0')}</div>
                              <h5 className="font-bold mb-2 leading-snug">{t(it.title)}</h5>
                              <p className="text-gray-700 leading-relaxed text-sm">{t(it.body)}</p>
                            </div>
                          ))}
                        </div>
                      ) : s.type === 'insight' ? (
                        <p className="bg-blue-50 p-6 rounded-r-lg border-l-4 border-blue-600 italic leading-relaxed">{t(activeProject.insight)}</p>
                      ) : s.type === 'impact' ? (
                        <p className="text-2xl font-light leading-relaxed">{t(activeProject.impact)}</p>
                      ) : s.type === 'quote' ? (
                        <p className="bg-blue-50 p-6 rounded-r-lg border-l-4 border-blue-600 italic leading-relaxed">{t(activeProject.recommendation)}</p>
                      ) : (
                        <p className="text-gray-700 leading-relaxed">{t(activeProject[s.key])}</p>
                      )}
                    </section>
                  ))}
                </div>
                <aside className="space-y-8">
                  {activeProject.metrics && activeProject.metrics.length > 0 && (
                    <div className="bg-gray-50 p-6 border rounded-lg">
                      <h4 className="text-xs font-bold uppercase text-gray-400 mb-4">Key Metrics</h4>
                      {activeProject.metrics.map(m => (
                        <div key={m} className="text-lg font-bold text-blue-600 mb-3">{m}</div>
                      ))}
                    </div>
                  )}
                  {activeProject.assets.pdf && (
                    <div className="bg-gray-50 p-6 border rounded-lg">
                      <h4 className="text-xs font-bold uppercase text-gray-400 mb-4">Deliverables</h4>
                      <a href={activeProject.assets.pdf} target="_blank" rel="noreferrer" className="block text-blue-600 font-bold underline mb-2">
                        Download PDF Report
                      </a>
                    </div>
                  )}
                  {activeProject.meta.brand && (
                    <div className="bg-gray-50 p-6 border rounded-lg">
                      <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Client</h4>
                      <p className="text-sm text-gray-600">{activeProject.meta.brand}</p>
                    </div>
                  )}
                </aside>
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;