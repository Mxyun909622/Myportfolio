import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import contentData from './data/content.json';

// --- 组件 1: 导航栏 (Navbar) ---
const Navbar = ({ lang, setLang, t }) => (
  <nav className="fixed w-full top-0 left-0 z-[100] bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex justify-between items-center">
    {/* Logo / Name */}
    <Link to="/" className="font-bold tracking-tighter text-xl hover:text-blue-600 transition-colors">
      {contentData.profile.name}
    </Link>
    
    {/* Navigation Menu */}
    <div className="flex gap-4 md:gap-8 items-center text-sm font-semibold tracking-wide text-gray-600">
      <div className="hidden sm:flex gap-8 uppercase">
        <Link to="/" className="hover:text-black transition">Home</Link>
        <Link to="/projects" className="hover:text-black transition">Projects</Link>
        <Link to="/hobbies" className="hover:text-black transition">Interests</Link>
        <Link to="/resources" className="hover:text-black transition">Resources</Link>
        <Link to="/contact" className="hover:text-black transition">Contact</Link>
      </div>

      {/* Language Switcher */}
      <button 
        onClick={() => setLang(lang === 'en' ? 'zh' : 'en')} 
        className="bg-gray-100 px-4 py-1.5 rounded-full text-[10px] font-black hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100 uppercase"
      >
        {lang === 'en' ? '中文' : 'EN'}
      </button>
    </div>
  </nav>
);

// --- 组件 2: 首页 (Home) ---
const Home = ({ t }) => (
  <section className="pt-32 pb-20 px-8 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 text-left">
    <div className="flex-1">
      <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">{t(contentData.profile.title)}</h2>
      <p className="text-xl text-gray-600 max-w-2xl mb-8">{t(contentData.profile.intro)}</p>
      <div className="flex gap-4">
        <Link to="/projects" className="bg-[#111] text-white px-8 py-3 rounded-sm hover:bg-gray-800 transition">View Projects</Link>
        <a href={contentData.profile.resumeUrl} target="_blank" rel="noreferrer" className="border border-[#111] px-8 py-3 rounded-sm hover:bg-gray-50 transition text-center inline-block">Resume</a>
      </div>
    </div>
    
    {/* 头像区域 - 重点检查这里 */}
    <div className="w-64 h-64 bg-gray-100 rounded-full overflow-hidden border-4 border-white shadow-xl flex items-center justify-center">
      <img 
        src={contentData.profile.avatar} 
        alt="Profile" 
        className="w-full h-full object-cover"
        onError={(e) => {
          console.error("图片加载失败，路径是:", e.target.src);
          // 如果加载失败，可以显示一个占位颜色或者文字
          e.target.style.display = 'none';
        }} 
      />
    </div>
  </section>
);

// --- 组件 3: 项目列表 (Projects) ---
const ProjectsPage = ({ t, setActiveProject }) => (
  <section className="pt-32 px-8 max-w-6xl mx-auto py-20">
    <h2 className="text-4xl font-bold mb-12">Selected Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {contentData.projects.map((project) => (
        <div key={project.id} className="group cursor-pointer" onClick={() => setActiveProject(project)}>
          <div className="aspect-video bg-gray-100 mb-4 overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-all">
            {project.assets.images && project.assets.images[0] ? (
              <img src={project.assets.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" alt="Project" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 italic">Project Preview</div>
            )}
          </div>
          <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-700 transition">{t(project.title)}</h3>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500 uppercase tracking-widest">{project.meta.category}</span>
            <div className="flex gap-2">
               {project.metrics.map(m => <span key={m} className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded">{m}</span>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// --- 组件 4: 兴趣与资源 (Hobbies & Resources) ---
const CardSection = ({ title, children }) => (
  <section className="pt-32 px-8 max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold mb-8">{title}</h2>
    {children}
  </section>
);

// --- 主应用组件 (App) ---
function App() {
  const [lang, setLang] = useState('en');
  const [activeProject, setActiveProject] = useState(null);
  const t = (field) => field ? (field[lang] || field) : "";

  return (
    <Router>
      <div className="min-h-screen bg-[#F8F9FA] text-[#111] font-sans selection:bg-blue-100">
        <Navbar lang={lang} setLang={setLang} t={t} />

        <Routes>
          <Route path="/" element={<Home t={t} />} />
          <Route path="/projects" element={<ProjectsPage t={t} setActiveProject={setActiveProject} />} />
<Route path="/hobbies" element={
  <CardSection title="Interests & Aesthetic">
    <div className="space-y-12">
      {/* 摄影模块 */}
      <div className="bg-white border p-8 rounded-3xl shadow-sm">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">📷 Photography</h3>
            <p className="text-gray-500">捕捉光影与城市的叙事，记录社交媒体之外的真实瞬间。</p>
          </div>
          {/* More 按钮链接到图虫 */}
          <a 
            href="https://tuchong.com/3771178" 
            target="_blank" 
            rel="noreferrer"
            className="text-sm font-bold text-blue-600 hover:text-blue-800 transition flex items-center gap-1 border-b-2 border-blue-100 pb-1"
          >
            More on Tuchong ➔
          </a>
        </div>

        {/* 三张图片预览网格 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-inner">
            <img src="/assets/photo1.jpg" className="w-full h-full object-cover hover:scale-110 transition duration-700" alt="work1" />
          </div>
          <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-inner">
            <img src="/assets/photo2.jpg" className="w-full h-full object-cover hover:scale-110 transition duration-700" alt="work2" />
          </div>
          <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-inner">
            <img src="/assets/photo3.jpg" className="w-full h-full object-cover hover:scale-110 transition duration-700" alt="work3" />
          </div>
        </div>
      </div>

      {/* 底部可以并排两个小模块：绘画和书籍 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border p-8 rounded-3xl shadow-sm">
          <h3 className="text-xl font-bold mb-4">🎨 Digital Painting</h3>
          <p className="text-gray-500 text-sm">通过 Procreate 探索色彩与构图，平衡逻辑分析与感性表达。</p>
        </div>
        <div className="bg-white border p-8 rounded-3xl shadow-sm">
          <h3 className="text-xl font-bold mb-4">📚 Reading List</h3>
          <p className="text-gray-500 text-sm">关注社会学、传播学与消费者心理相关的经典著作。</p>
        </div>
      </div>
    </div>
  </CardSection>
} />
          <Route path="/resources" element={
            <CardSection title="Resources">
              <div className="bg-white border p-12 rounded-2xl text-center">
                <p className="text-gray-500 mb-6 italic">Coming soon: My curated list of books and tools.</p>
                <a href="https://www.xiaohongshu.com" target="_blank" rel="noreferrer" className="text-red-500 font-bold hover:underline">Follow my Xiaohongshu ➔</a>
              </div>
            </CardSection>
          } />
<Route path="/contact" element={
  <section className="pt-32 px-8 max-w-6xl mx-auto pb-20">
    <h2 className="text-4xl font-bold mb-12 text-left">Get in Touch</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
      
      {/* 1. 小红书模块：品牌色卡片 */}
      <a 
        href="https://xhslink.com/m/8ez2dN942gq" 
        target="_blank" 
        rel="noreferrer"
        className="group bg-[#ff2442] text-white p-10 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          <div className="flex justify-between items-start mb-6">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Social Media</span>
            <span className="text-2xl">➔</span>
          </div>
          <h3 className="text-4xl font-bold mb-4">Xiaohongshu</h3>
          <p className="text-white/80 leading-relaxed text-lg">
            分享关于 Social Listening、数据洞察及职场养成的笔记与思考。
          </p>
        </div>
        <div className="mt-12 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#ff2442] font-black">小红书</div>
          <span className="font-bold border-b border-white/50 group-hover:border-white transition">Follow @小由的Insight笔记</span>
        </div>
      </a>

      {/* 2. 传统联系方式：邮箱与微信 */}
      <div className="bg-white border border-gray-100 p-10 rounded-3xl shadow-sm flex flex-col justify-between">
        <div className="space-y-8 text-left">
          <div>
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Email</h4>
            <a href="mailto:your-email@example.com" className="text-2xl font-medium text-gray-800 hover:text-blue-600 transition underline decoration-gray-200 underline-offset-8">
              ingridma9096@outlook.com
            </a>
          </div>
          
          <div className="pt-6 border-t border-gray-50">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">WeChat Account</h4>
            <div className="flex items-center gap-6">
              {/* 微信二维码 */}
              <div className="w-32 h-32 bg-gray-50 rounded-xl border border-gray-100 p-2 shadow-inner">
                <img src="/assets/wechat-qr.png" alt="WeChat" className="w-full h-full object-contain" onError={(e) => e.target.style.opacity='0.2'} />
              </div>
              <p className="text-sm text-gray-500 italic">Scan to connect professionally.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
} />
        </Routes>

        {/* 项目详情弹窗 */}
        {activeProject && (
          <div className="fixed inset-0 z-[200] bg-white overflow-y-auto p-8 md:p-20">
            <button onClick={() => setActiveProject(null)} className="fixed top-8 right-8 text-4xl hover:text-red-500 transition">&times;</button>
            <div className="max-w-4xl mx-auto">
              <span className="text-blue-600 font-bold uppercase">{activeProject.meta.brand}</span>
              <h2 className="text-4xl font-bold mt-2 mb-12">{t(activeProject.title)}</h2>
              <div className="grid md:grid-cols-3 gap-12 text-gray-700">
                <div className="md:col-span-2 space-y-8">
                  <p><strong>Context:</strong> {t(activeProject.problem)}</p>
                  <p className="bg-blue-50 p-6 border-l-4 border-blue-600"><strong>Insight:</strong> {t(activeProject.insight)}</p>
                  <p><strong>Result:</strong> {t(activeProject.impact)}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl h-fit">
                  <h4 className="text-xs font-bold text-gray-400 mb-4 uppercase">Deliverables</h4>
                  {activeProject.assets.pdf && <a href={activeProject.assets.pdf} target="_blank" rel="noreferrer" className="text-blue-600 font-bold underline">PDF Report</a>}
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
