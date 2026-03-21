import React, { useState, useEffect } from 'react';
import contentData from './data/content.json';

function App() {
  const [lang, setLang] = useState('en'); // 默认英文
  const [activeProject, setActiveProject] = useState(null);

  const t = (field) => field[lang] || field; // 翻译辅助函数

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#111] font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <h1 className="font-bold tracking-tighter text-xl">{contentData.profile.name}</h1>
        <div className="flex gap-8 items-center">
          <button onClick={() => setLang(lang === 'en' ? 'zh' : 'en')} className="font-medium hover:text-blue-600 transition">
            {lang === 'en' ? '中文' : 'EN'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {t(contentData.profile.title)}
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">
          {t(contentData.profile.intro)}
        </p>
        <div className="flex gap-4">
          <button className="bg-[#111] text-white px-8 py-3 rounded-sm hover:bg-gray-800 transition">View Projects</button>
          <button className="border border-[#111] px-8 py-3 rounded-sm hover:bg-gray-50 transition">Resume</button>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-8 max-w-6xl mx-auto py-20 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {contentData.projects.map((project) => (
            <div key={project.id} className="group cursor-pointer" onClick={() => setActiveProject(project)}>
              <div className="aspect-video bg-gray-200 mb-4 overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-all">
                {/* 这里放缩略图 */}
                <div className="w-full h-full flex items-center justify-center text-gray-400 italic">Project Preview</div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-700 transition">{t(project.title)}</h3>
                  <span className="text-sm text-gray-500 uppercase tracking-widest">{project.meta.category}</span>
                </div>
                <div className="text-right">
                  {project.metrics.map(m => <div key={m} className="text-sm font-bold text-blue-600">{m}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Detail Modal (Simplified) */}
      {activeProject && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto p-8 md:p-20 animate-in fade-in slide-in-from-bottom-4">
          <button onClick={() => setActiveProject(null)} className="fixed top-8 right-8 text-4xl leading-none">&times;</button>
          
          <div className="max-w-4xl mx-auto">
            <header className="mb-12">
              <span className="text-blue-600 font-bold uppercase">{activeProject.meta.brand}</span>
              <h2 className="text-4xl font-bold mt-2">{t(activeProject.title)}</h2>
            </header>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-12">
                <section>
                  <h4 className="font-bold border-b pb-2 mb-4">01. Context & Problem</h4>
                  <p className="text-gray-700 leading-relaxed">{t(activeProject.problem)}</p>
                </section>
                <section>
                  <h4 className="font-bold border-b pb-2 mb-4">02. Key Insights</h4>
                  <p className="bg-blue-50 p-6 rounded-r-lg border-l-4 border-blue-600 italic">
                    {t(activeProject.insight)}
                  </p>
                </section>
                <section>
                  <h4 className="font-bold border-b pb-2 mb-4">03. Impact & Result</h4>
                  <p className="text-2xl font-light">{t(activeProject.impact)}</p>
                </section>
              </div>

              <div className="space-y-8">
                <div className="bg-gray-50 p-6">
                  <h4 className="text-xs font-bold uppercase text-gray-400 mb-4">Deliverables</h4>
                  {activeProject.assets.pdf && (
                    <a href={activeProject.assets.pdf} className="block text-blue-600 underline mb-2">Download PDF Report</a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;