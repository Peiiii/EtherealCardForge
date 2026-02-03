
import React, { useState, useEffect, useMemo } from 'react';
import { CardData } from './types';
import CardFrame from './components/CardFrame';
import { CARD_LIBRARY } from './constants';

const App: React.FC = () => {
  const [filter, setFilter] = useState<string>('全部');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const categories = useMemo(() => {
    const types = CARD_LIBRARY.map(c => c.type);
    return ['全部', ...Array.from(new Set(types))];
  }, []);

  const filteredCards = useMemo(() => {
    if (filter === '全部') return CARD_LIBRARY;
    return CARD_LIBRARY.filter(c => c.type === filter);
  }, [filter]);

  return (
    <div className="min-h-screen selection:bg-[#E63946]/20">
      {/* 动态艺术光标：增大尺寸与对比度 */}
      <div 
        className="cursor-dot hidden md:block"
        style={{ 
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          width: '16px',
          height: '16px',
          backgroundColor: '#E63946',
          boxShadow: '0 0 15px rgba(230, 57, 70, 0.4)'
        }}
      />

      {/* 极简艺术馆导航：强化文字清晰度 */}
      <header className="sticky top-0 z-[100] px-8 md:px-20 py-10 flex flex-col md:flex-row justify-between items-end bg-white/95 backdrop-blur-xl border-b-2 border-[#E63946]/10 shadow-sm">
        <div className="space-y-1 mb-8 md:mb-0">
          <p className="text-[11px] tracking-[0.6em] text-[#E63946] uppercase font-black">ETHEREAL ARCHIVE</p>
          <h1 className="text-6xl font-calligraphy font-bold text-[#121212] leading-none">
            幻世<span className="text-[#E63946]">珍藏</span>
          </h1>
        </div>

        <nav className="flex gap-4 md:gap-8 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-[13px] font-black tracking-[0.2em] uppercase transition-all duration-300 relative px-4 py-2 rounded-lg ${
                filter === cat 
                ? 'text-white bg-[#E63946] shadow-lg shadow-[#E63946]/30' 
                : 'text-[#1A1A1A] hover:text-[#E63946] hover:bg-[#E63946]/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </header>

      {/* 展馆开幕标题 */}
      <section className="px-8 md:px-20 py-32 flex flex-col items-center text-center">
        <div className="max-w-4xl animate-reveal">
           <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[#D4AF37]" />
              <span className="text-[#D4AF37] font-black text-[12px] tracking-[0.8em] uppercase">贰零贰伍 · 秋季特展</span>
              <div className="w-12 h-[2px] bg-[#D4AF37]" />
           </div>
           <h2 className="text-8xl md:text-[11rem] font-calligraphy font-bold text-[#1A1A1A] leading-[0.85] tracking-tighter mb-16">
            神思<br/><span className="text-[#E63946] italic opacity-100">之外</span>
          </h2>
          <div className="w-24 h-[1px] bg-black/10 mx-auto mb-16" />
          <p className="text-[#333] text-2xl md:text-3xl font-serif font-medium leading-relaxed max-w-3xl mx-auto italic">
            “穿透现实的迷雾，在虚无与造物的交汇处，<br/>捕捉那些曾被诸神遗忘的永恒光影。”
          </p>
        </div>
      </section>

      {/* 展览网格 */}
      <main className="px-8 md:px-20 pb-64">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-16 gap-y-32">
            {filteredCards.map((card, idx) => (
              <div 
                key={card.id} 
                className={`animate-reveal flex justify-center ${idx % 2 !== 0 ? 'md:mt-32' : ''}`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <CardFrame card={card} />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 沉浸式页脚 */}
      <footer className="bg-[#121212] text-[#FCFAF7] py-40 px-8 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-24">
          <div className="md:col-span-6 space-y-10">
            <h3 className="font-calligraphy text-6xl font-bold">幻世档案.</h3>
            <p className="text-slate-300 text-xl font-serif font-light leading-relaxed max-w-md">
              我们不仅是数字化资产的保存者，更是艺术灵魂的引渡人。在这个被算法统治的时代，我们依然坚守对“美”的极致追求。
            </p>
          </div>
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-[11px] font-black tracking-[0.6em] uppercase text-[#E63946]">导览 / NAVIGATION</h4>
            <ul className="space-y-5 text-sm font-bold tracking-[0.2em]">
              <li className="hover:text-[#E63946] transition-colors cursor-pointer">策展人语 Curator's Note</li>
              <li className="hover:text-[#E63946] transition-colors cursor-pointer">创世协议 Genesis Protocol</li>
              <li className="hover:text-[#E63946] transition-colors cursor-pointer">私人秘藏 Collections</li>
            </ul>
          </div>
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-[11px] font-black tracking-[0.6em] uppercase text-[#E63946]">联络 / CONTACT</h4>
            <p className="text-sm font-bold tracking-widest border-b border-white/10 pb-2">vision@ethereal-museum.art</p>
            <div className="pt-10">
               <div className="w-16 h-16 border-2 border-[#E63946] flex items-center justify-center group cursor-pointer hover:bg-[#E63946] transition-all duration-500">
                  <div className="w-2 h-2 bg-[#E63946] rounded-full group-hover:bg-white group-hover:scale-150 transition-transform" />
               </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-48 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="text-[10px] tracking-[0.5em] text-slate-500 font-black uppercase">© MMXV-MMXXV 幻世珍藏艺术馆 联合呈现</p>
           <p className="text-[10px] tracking-[0.5em] text-[#E63946] font-black uppercase">设于巴黎 · 铸于云端 · 存于人心</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
