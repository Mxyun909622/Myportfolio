import React, { useState } from 'react';
import contentData from './data/content.json';

function App() {
  const [lang, setLang] = useState('en');
  // 用来存储当前点击的是哪个项目，如果是 null 则关闭弹窗
const [selectedProject, setSelectedProject] = useState(null);

  // 翻译辅助函数
  const t = (field) => (field && field[lang] ? field[lang] : field);

  const { profile } = contentData;

  return (
    <div className="min-h-screen bg-light-gray transition-colors duration-500">
      {/* 1. 导航栏 */}
      <nav className="p-6 md:px-12 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="font-bold tracking-tighter text-xl text-brand uppercase">
          {profile.name}
        </div>
        <button 
          onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
          className="border border-brand px-4 py-1 text-sm font-medium hover:bg-brand hover:text-white transition-all rounded-full"
        >
          {lang === 'en' ? '中文' : 'EN'}
        </button>
      </nav>

      {/* 2. Hero Section */}
      <header className="max-w-6xl mx-auto px-6 py-24 md:py-40">
        <div className="max-w-3xl">
          <span className="text-accent font-semibold tracking-widest uppercase text-sm mb-4 block animate-fade-in">
            Social Listening Analyst
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold text-brand leading-tight mb-8">
            {t(profile.title)}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            {t(profile.intro)}
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button className="bg-brand text-white px-10 py-4 font-medium hover:bg-gray-800 transition shadow-lg hover:shadow-xl">
              {lang === 'en' ? 'View Projects' : '查看项目'}
            </button>
            <button className="border-b-2 border-brand py-4 font-bold hover:text-accent hover:border-accent transition-all">
              {lang === 'en' ? 'Download CV' : '下载简历'}
            </button>
          </div>
        </div>
      </header>

      {/* 3. 项目展示区域 */}
      <section className="bg-white py-20 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-16 font-bold">
            {lang === 'en' ? 'Featured Case Studies' : '精选咨询案例'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
           {contentData.projects.map((project) => (
  <div 
    key={project.id} 
    className="group cursor-pointer" 
    onClick={() => setSelectedProject(project)}
  >
                {/* 项目封面图 */}
                <div className="relative aspect-[16/9] bg-light-gray mb-8 overflow-hidden rounded-sm">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-serif italic text-lg group-hover:scale-110 transition-transform duration-700">
                    {project.meta.brand} Analysis Visual
                  </div>
                  {/* 悬浮时的遮罩 */}
                  <div className="absolute inset-0 bg-brand/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-white text-center">
                     <p className="text-sm mb-2 uppercase tracking-widest">{lang === 'en' ? 'Key Results' : '核心成果'}</p>
                     {project.metrics.map(m => <span key={m} className="text-2xl font-bold">{m}</span>)}
                  </div>
                </div>

                {/* 项目文字信息 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-accent font-bold text-xs uppercase tracking-wider">
                      {project.meta.category}
                    </span>
                    <span className="text-gray-400 text-xs">{project.meta.year}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                    {t(project.title)}
                  </h3>
                  
                  <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                    {t(project.problem)}
                  </p>
                  
                  <button className="text-brand font-bold text-sm border-b-2 border-transparent group-hover:border-accent transition-all pt-2">
                    {lang === 'en' ? 'View Full Analysis →' : '查看深度分析 →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* 4. About / Skills Section */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-left">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold">{lang === 'en' ? 'Expertise' : '核心专长'}</h2>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold mb-4">Methodologies</h4>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>Sentiment & Semantics Analysis</li>
                <li>Competitive Benchmarking</li>
                <li>KOL/KOC Mapping</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Tech Stack</h4>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>Brandwatch / Meltwater</li>
                <li>Python (NLP / Scraper)</li>
                <li>Power BI / Tableau</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 页脚 */}
      <footer className="py-12 px-6 text-center text-gray-400 text-xs tracking-widest uppercase bg-white">
        © {new Date().getFullYear()} {profile.name} • Designed for Social Intelligence
      </footer>

      {/* 6. 项目详情弹窗 (Modal) */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
          {/* 关闭按钮 */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProject(null);
            }}
            className="fixed top-8 right-8 z-[110] text-3xl hover:rotate-90 transition-transform p-4 text-brand"
          >
            ✕
          </button>

          <article className="max-w-4xl mx-auto px-6 py-20 text-left">
            <header className="mb-16 border-b pb-8">
              <div className="text-accent font-bold uppercase tracking-widest mb-4">
                {selectedProject.meta.brand} · {selectedProject.meta.year}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand">
                {t(selectedProject.title)}
              </h2>
            </header>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-12">
                <section>
                  <h4 className="text-sm font-black uppercase mb-4 text-gray-400">01. Context & Problem</h4>
                  <p className="text-xl text-gray-800 leading-relaxed font-light">
                    {t(selectedProject.problem)}
                  </p>
                </section>

                <section className="bg-brand text-white p-8 md:p-12 rounded-sm italic">
                  <h4 className="text-xs font-bold uppercase mb-6 opacity-60">02. Key Insight</h4>
                  <p className="text-2xl md:text-3xl leading-snug font-serif">
                    "{t(selectedProject.insight)}"
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="border-l-2 border-gray-100 pl-6">
                    <h4 className="text-xs font-bold uppercase mb-3 text-gray-400">Methodology</h4>
                    <p className="text-sm text-gray-600">{t(selectedProject.approach)}</p>
                  </div>
                  <div className="border-l-2 border-accent pl-6">
                    <h4 className="text-xs font-bold uppercase mb-3 text-accent">Recommendation</h4>
                    <p className="text-sm text-gray-900 font-medium">{t(selectedProject.recommendation)}</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1 space-y-8">
                <div className="bg-light-gray p-6 rounded-sm">
                  <h4 className="text-xs font-black uppercase mb-4">Deliverables</h4>
                  <p className="text-xs text-gray-500 mb-4 italic">Internal Analysis Report</p>
                  {selectedProject.assets.pdf && (
                    <a 
                      href={selectedProject.assets.pdf} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-2 text-sm font-bold text-accent hover:underline"
                    >
                      📄 Full Analysis (PDF)
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  );
}

export default App;