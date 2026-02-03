
import React, { useState, useRef } from 'react';
import { CardData } from '../types';

interface CardFrameProps {
  card: CardData;
  size?: 'sm' | 'lg';
}

const CardFrame: React.FC<CardFrameProps> = ({ card, size = 'lg' }) => {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const px = (x / rect.width);
    const py = (y / rect.height);
    
    setRot({ 
      x: (py - 0.5) * 10, 
      y: (px - 0.5) * -10 
    });
    setShine({ x: px * 100, y: py * 100 });
  };

  const handleLeave = () => {
    setRot({ x: 0, y: 0 });
    setShine({ x: 50, y: 50 });
  };

  const isSmall = size === 'sm';
  
  // 稀有度专属色彩方案：提升明度与对比
  const rarityTheme = {
    Divine: { accent: 'text-[#B8860B]', bg: 'bg-[#B8860B]', tag: 'bg-[#B8860B]/10' },
    Legendary: { accent: 'text-[#E63946]', bg: 'bg-[#E63946]', tag: 'bg-[#E63946]/10' },
    Epic: { accent: 'text-[#248277]', bg: 'bg-[#248277]', tag: 'bg-[#248277]/10' },
    Rare: { accent: 'text-[#1D3557]', bg: 'bg-[#1D3557]', tag: 'bg-[#1D3557]/10' },
    Common: { accent: 'text-[#455A64]', bg: 'bg-[#455A64]', tag: 'bg-[#455A64]/10' }
  }[card.rarity];

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative group transition-all duration-700 ease-out ${isSmall ? 'w-64 h-96' : 'w-80 h-[32rem]'}`}
      style={{
        transform: `perspective(2000px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) scale(${rot.x === 0 ? 1 : 1.03})`,
      }}
    >
      {/* 极简发光背景 */}
      <div className={`absolute -inset-2 rounded-3xl blur-2xl opacity-0 transition-opacity duration-1000 group-hover:opacity-20 ${rarityTheme.bg}`} />
      
      {/* 卡片主体：宣纸质感 */}
      <div className="relative h-full w-full bg-white overflow-hidden flex flex-col border-2 border-black/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] transition-all group-hover:border-[#E63946]/30">
        
        {/* 丝绒反光层 */}
        <div 
          className="absolute inset-0 pointer-events-none z-30 opacity-30 mix-blend-soft-light"
          style={{
            background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.9) 0%, transparent 60%)`,
          }}
        />

        {/* 画面区域 */}
        <div className="relative h-[62%] w-full overflow-hidden bg-[#f0f0f0]">
          <img 
            src={card.imageUrl} 
            alt={card.name} 
            className="w-full h-full object-cover transition-transform duration-1000 ease-out saturate-[1.2] contrast-[1.1]"
            style={{
              transform: `scale(1.15) translate(${(shine.x - 50) / 30}px, ${(shine.y - 50) / 30}px)`
            }}
          />
          {/* 暗色渐变压底 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          
          {/* 编号标签 */}
          <div className="absolute top-5 left-5">
             <div className="px-3 py-1 border-2 border-white/60 bg-black/30 backdrop-blur-md rounded-md">
               <span className="text-[10px] font-black tracking-widest text-white">
                 ID: {card.id.split('-')[1]}
               </span>
             </div>
          </div>
        </div>

        {/* 内容排版：提升对比度 */}
        <div className="flex-grow p-7 flex flex-col bg-white border-t-2 border-black/5">
          <div className="flex justify-between items-start mb-4">
             <div className="space-y-1">
                <div className={`inline-block px-2 py-0.5 rounded ${rarityTheme.tag}`}>
                   <span className={`text-[10px] font-black tracking-widest uppercase ${rarityTheme.accent}`}>
                     {card.rarity}
                   </span>
                </div>
                <h3 className="font-calligraphy text-4xl font-bold text-[#000] leading-tight">
                  {card.name}
                </h3>
             </div>
             <div className="flex flex-col items-end">
                <span className="text-[9px] font-black tracking-widest uppercase text-[#E63946]">ELEMENT</span>
                <span className="text-sm font-serif font-black text-[#1A1A1A]">{card.type}</span>
             </div>
          </div>

          <p className="text-[#444] text-[13px] font-medium leading-relaxed tracking-wide italic mb-auto line-clamp-2">
            “{card.description}”
          </p>

          <div className="flex justify-between items-center mt-6 pt-5 border-t-2 border-slate-100">
             <div className="flex gap-8">
                <div className="text-center">
                  <span className="block text-[10px] uppercase tracking-widest text-slate-500 font-black mb-1">灵力 / POW</span>
                  <span className="text-lg font-black text-[#E63946] font-serif">{card.stats.power}</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] uppercase tracking-widest text-slate-500 font-black mb-1">神格 / RK</span>
                  <span className="text-lg font-black text-[#1A1A1A] font-serif">{Math.floor(card.stats.spirit / 10)}.0</span>
                </div>
             </div>
             <div className="w-10 h-10 rounded-full border-2 border-[#E63946]/20 flex items-center justify-center text-[12px] font-black text-[#E63946]">
               印
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFrame;
