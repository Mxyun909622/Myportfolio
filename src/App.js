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
      <Link to="/" className="hover:text-black transition">首页</Link>
      <Link to="/projects" className="hover:text-black transition">项目经历</Link>
      <Link to="/hobbies" className="hover:text-black transition">兴趣爱好</Link>
      <Link to="/resources" className="hover:text-black transition">资源</Link>
      <Link to="/contact" className="hover:text-black transition">联系方式</Link>
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
          <a 
  href={contentData.profile.resumeUrl} 
  target="_blank" 
  rel="noreferrer"
  className="border border-[#111] px-8 py-3 rounded-sm hover:bg-gray-50 transition text-center inline-block"
>
  {lang === 'en' ? 'Resume' : '阅读简历'}
</a>
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
    <h2 className="text-4xl font-bold mb-12">Case Studies</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {contentData.projects.map((project) => (
        <div key={project.id} className="group cursor-pointer" onClick={() => setActiveProject(project)}>
          <div className="aspect-video bg-gray-100 mb-4 overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-all relative">
            {project.assets.images && project.assets.images[0] ? (
               <img src={project.assets.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={t(project.title)} />
            ) : (
               <div className="w-full h-full flex items-center justify-center text-gray-400 italic">Project Preview</div>
            )}
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
);

// --- 页面 3: 兴趣爱好 (Hobbies) ---
const Hobbies = ({ t }) => (
  <section className="pt-32 px-8 max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold mb-8">Interests & Hobbies</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* 这里的图片路径需要你在 content.json 中补充 hobby 字段 */}
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">📷 Photography</div>
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">🎨 Painting</div>
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">📚 Reading</div>
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">🎙️ Podcast</div>
    </div>
  </section>
);

// --- 页面 4: 资源 (Resources) ---
const Resources = ({ t }) => (
  <section className="pt-32 px-8 max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold mb-8">Digital Shelf</h2>
    <div className="bg-white border p-8 rounded-lg">
      <p className="text-gray-500 italic mb-6">推荐的书籍、播客与摄影师清单将持续更新...</p>
      <a href="https://www.xiaohongshu.com" target="_blank" rel="noreferrer" className="text-red-500 font-bold underline">
        Visit my Xiaohongshu ➔
      </a>
    </div>
  </section>
);

// --- 页面 5: 联系方式 (Contact) ---
const Contact = ({ t }) => (
  <section className="pt-32 px-8 max-w-4xl mx-auto text-center">
    <h2 className="text-4xl font-bold mb-12">Get in Touch</h2>
    <div className="space-y-6 text-xl">
      <p>📧 Email: <span className="font-medium text-blue-600">ingrid_analyst@example.com</span></p>
      <div className="py-8">
        <p className="text-sm text-gray-400 mb-4 uppercase tracking-widest">WeChat QR Code</p>
        <div className="w-48 h-48 bg-gray-200 mx-auto rounded-lg flex items-center justify-center">二维码图片</div>
      </div>
    </div>
  </section>
);

// --- 主组件 App ---
function App() {
  const [lang, setLang] = useState('en');
  const [activeProject, setActiveProject] = useState(null);

  const t = (field) => {
    if (!field) return "";
    return field[lang] || field;
  };

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
        </Routes>

        {/* 项目详情弹窗 (保持你原来的代码逻辑) */}
        {activeProject && (
          <div className="fixed inset-0 z-[100] bg-white overflow-y-auto p-8 md:p-20 animate-in fade-in slide-in-from-bottom-4">
            <button onClick={() => setActiveProject(null)} className="fixed top-8 right-8 text-4xl leading-none hover:text-red-500 transition">&times;</button>
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
                    <p className="bg-blue-50 p-6 rounded-r-lg border-l-4 border-blue-600 italic">{t(activeProject.insight)}</p>
                  </section>
                  <section>
                    <h4 className="font-bold border-b pb-2 mb-4">03. Impact & Result</h4>
                    <p className="text-2xl font-light">{t(activeProject.impact)}</p>
                  </section>
                </div>
                <div className="space-y-8">
                  <div className="bg-gray-50 p-6 border rounded-lg">
                    <h4 className="text-xs font-bold uppercase text-gray-400 mb-4">Deliverables</h4>
                    {activeProject.assets.pdf && (
                      <a href={activeProject.assets.pdf} target="_blank" rel="noreferrer" className="block text-blue-600 font-bold underline mb-2">
                        Download PDF Report
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
