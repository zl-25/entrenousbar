import React from 'react';
import OptimizedImage from '../common/OptimizedImage';

const SPACES = [
  {
    id: 'vip',
    name: 'ESPACE VIP',
    neonClass: 'text-purple-400',
    desc: 'Accès premium avec vue sur la scène, service VIP dédié et cocktails offerts.',
    price: '25 000 FCFA',
    priceDetail: '/pers',
    image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'premium',
    name: 'ESPACE PREMIUM',
    neonClass: 'text-green-400',
    desc: 'Vue imprenable sur la scène, ambiance exclusive et service de qualité.',
    price: '15 000 FCFA',
    priceDetail: '/pers',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'standard',
    name: 'ESPACE STANDARD',
    neonClass: 'text-yellow-400',
    desc: 'Ambiance festive, accès au dancefloor et bar direct.',
    price: '10 000 FCFA',
    priceDetail: '/pers',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=400'
  }
];

const SpaceSelector = ({ selectedSpace, onSelectSpace }) => {
  return (
    <div className="space-y-4">
      <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-4 block">Sélectionnez votre espace</label>
      {SPACES.map(space => (
        <label key={space.id} className="block cursor-pointer group">
          <input 
            type="radio" 
            name="space" 
            className="hidden peer"
            checked={selectedSpace === space.id}
            onChange={() => onSelectSpace(space.id)}
          />
          <div className="border border-white/10 peer-checked:border-green-600 peer-checked:bg-green-600/10 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-white/20 hover:border-white/20">
            <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5">
              <OptimizedImage
                src={space.image}
                alt={space.name}
                className="w-full sm:w-24 h-24 rounded-lg"
                objectFit="cover"
                sizes="(max-width: 640px) 100vw, 96px"
                width={96}
                height={96}
              />
              <div className="flex-1">
                <h4 className={`font-bold text-sm sm:text-base uppercase mb-1 ${space.neonClass}`}>
                  {space.name}
                </h4>
                <p className="text-gray-400 text-xs mb-3 leading-relaxed">{space.desc}</p>
                <div className="flex items-end justify-between">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">{space.priceDetail}</span>
                  <span className="text-lg font-bold text-green-500">{space.price}</span>
                </div>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-white/20 mt-auto sm:mt-4 flex items-center justify-center shrink-0">
                <div className={`w-2.5 h-2.5 rounded-full bg-green-500 transition-transform ${selectedSpace === space.id ? 'scale-100' : 'scale-0'}`}></div>
              </div>
            </div>
          </div>
        </label>
      ))}
    </div>
  );
};

export default SpaceSelector;
