'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Landmark, Water, Food, Beach, Tree, Compass } from '@/components/Icons';

interface LayerPoint {
  name: string;
  x: string;
  y: string;
  desc: string;
}

interface MapLayer {
  id: string;
  labelAr: string;
  labelEn: string;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
  points: LayerPoint[];
}

const layers: MapLayer[] = [
  {
    id: 'hidden-gems',
    labelAr: 'جواهر مخفية',
    labelEn: 'Hidden Gems',
    icon: Sparkles,
    color: '#A78BFA',
    points: [
      { name: 'وادي الحيتان', x: '37%', y: '33%', desc: 'Wadi El-Hitan — Fossils' },
      { name: 'الداخلة', x: '32%', y: '45%', desc: 'Dakhla Oasis' },
      { name: 'الفرافرة', x: '33%', y: '40%', desc: 'Farafra Oasis' },
      { name: 'رأس محمد', x: '67%', y: '58%', desc: 'Ras Mohamed Reserve' },
      { name: 'سانت كاترين', x: '68%', y: '42%', desc: 'St. Catherine Monastery' },
      { name: 'وادي النطرون', x: '40%', y: '22%', desc: 'Wadi El-Natrun' },
    ],
  },
  {
    id: 'historical',
    labelAr: 'تاريخي',
    labelEn: 'Historical',
    icon: Landmark,
    color: '#D4A24C',
    points: [
      { name: 'الأهرامات', x: '50%', y: '27%', desc: 'Pyramids of Giza' },
      { name: 'المتحف المصري', x: '52%', y: '26%', desc: 'Egyptian Museum' },
      { name: 'وادي الملوك', x: '47%', y: '49%', desc: 'Valley of the Kings' },
      { name: 'معبد الكرنك', x: '48%', y: '48%', desc: 'Karnak Temple' },
      { name: 'معبد فيلة', x: '44%', y: '67%', desc: 'Philae Temple' },
      { name: 'أبو سمبل', x: '42%', y: '80%', desc: 'Abu Simbel Temples' },
      { name: 'قلعة قايتباي', x: '41%', y: '13%', desc: 'Qaitbay Citadel' },
      { name: 'مكتبة الإسكندرية', x: '41%', y: '15%', desc: 'Alexandria Library' },
    ],
  },
  {
    id: 'nightlife',
    labelAr: 'حياة ليلية',
    labelEn: 'Nightlife',
    icon: Water,
    color: '#EC4899',
    points: [
      { name: 'وسط البلد', x: '53%', y: '24%', desc: 'Downtown Cairo' },
      { name: 'زمالك', x: '52%', y: '23%', desc: 'Zamalek' },
      { name: 'التجمع الخامس', x: '55%', y: '25%', desc: 'New Cairo' },
      { name: 'شرم الشيخ', x: '66%', y: '55%', desc: 'SOHO Square' },
      { name: 'الغردقة', x: '58%', y: '50%', desc: 'Hurghada Marina' },
    ],
  },
  {
    id: 'food',
    labelAr: 'طعام',
    labelEn: 'Food',
    icon: Food,
    color: '#F97316',
    points: [
      { name: 'الحسين', x: '53%', y: '26%', desc: 'El-Hussein — Koshary' },
      { name: 'الأسكندرية', x: '41%', y: '14%', desc: 'Alexandria Seafood' },
      { name: 'الأقصر', x: '48%', y: '48%', desc: 'Luxor Street Food' },
      { name: 'أسوان', x: '45%', y: '68%', desc: 'Nubian Cuisine' },
      { name: 'الغردقة', x: '58%', y: '50%', desc: 'Red Sea Grill' },
      { name: 'دهب', x: '68%', y: '48%', desc: 'Dahab Beach Cafes' },
      { name: 'سيوة', x: '28%', y: '28%', desc: 'Siwa Dates & Olives' },
      { name: 'الفيوم', x: '40%', y: '32%', desc: 'Fayoum Duck' },
    ],
  },
  {
    id: 'beach',
    labelAr: 'شواطئ',
    labelEn: 'Beach',
    icon: Beach,
    color: '#0E8F94',
    points: [
      { name: 'شرم الشيخ', x: '66%', y: '55%', desc: 'Naama Bay' },
      { name: 'الغردقة', x: '58%', y: '50%', desc: 'Makadi Bay' },
      { name: 'دهب', x: '68%', y: '48%', desc: 'Laguna Beach' },
      { name: 'مرسى علم', x: '58%', y: '62%', desc: 'Abu Dabbab' },
      { name: 'العلمين', x: '37%', y: '12%', desc: 'El-Alamein Coast' },
      { name: 'طابا', x: '72%', y: '38%', desc: 'Taba Heights' },
    ],
  },
  {
    id: 'desert',
    labelAr: 'صحراء',
    labelEn: 'Desert',
    icon: Tree,
    color: '#D97706',
    points: [
      { name: 'سيوة', x: '28%', y: '28%', desc: 'Siwa Oasis' },
      { name: 'الفيوم', x: '40%', y: '32%', desc: 'Fayoum Desert' },
      { name: 'البحر الأبيض', x: '34%', y: '38%', desc: 'White Desert' },
      { name: 'واحة باريس', x: '33%', y: '44%', desc: 'Bahariya Oasis' },
      { name: 'الصحراء السوداء', x: '34%', y: '40%', desc: 'Black Desert' },
    ],
  },
  {
    id: 'nile-journey',
    labelAr: 'رحلة النيل',
    labelEn: 'Nile Journey',
    icon: Compass,
    color: '#3B82F6',
    points: [
      { name: 'القاهرة', x: '52%', y: '25%', desc: 'Cairo — Start' },
      { name: 'الفيوم', x: '40%', y: '32%', desc: 'Fayoum' },
      { name: 'الأقصر', x: '48%', y: '48%', desc: 'Luxor — Valley of Kings' },
      { name: 'إسنا', x: '46%', y: '56%', desc: 'Esna Lock' },
      { name: 'إدفو', x: '45%', y: '62%', desc: 'Edfu Temple' },
      { name: 'كوم أمبو', x: '44%', y: '65%', desc: 'Kom Ombo' },
      { name: 'أسوان', x: '45%', y: '68%', desc: 'Aswan — End' },
    ],
  },
];

const layerRoutePoints: Record<string, [number, number][]> = {
  'nile-journey': [
    [52, 25], [40, 32], [48, 48], [46, 56], [45, 62], [44, 65], [45, 68],
  ],
};

interface MapLayersProps {
  parentRef?: React.RefObject<HTMLDivElement>;
}

export default function MapLayers({ parentRef }: MapLayersProps) {
  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set());
  const [hoveredPoint, setHoveredPoint] = useState<{ layerId: string; point: LayerPoint } | null>(null);

  const toggleLayer = (id: string) => {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const activeLayerData = layers.filter((l) => activeLayers.has(l.id));

  return (
    <>
      {activeLayerData.map((layer) => {
        const routeCoords = layerRoutePoints[layer.id];
        return (
          <div key={layer.id} className="pointer-events-none">
            {routeCoords && routeCoords.length > 1 && (
              <svg className="absolute inset-0 w-full h-full z-[3]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline
                  points={routeCoords.map(([x, y]) => `${x},${y}`).join(' ')}
                  fill="none"
                  stroke={layer.color}
                  strokeWidth="0.4"
                  strokeDasharray="1.5 2"
                  strokeOpacity="0.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {routeCoords.map(([x, y], i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={i === 0 || i === routeCoords.length - 1 ? 1.2 : 0.6}
                    fill={layer.color}
                    fillOpacity="0.8"
                  />
                ))}
              </svg>
            )}
          </div>
        );
      })}

      {activeLayerData.map((layer) =>
        layer.points.map((point) => {
          const isHovered = hoveredPoint?.layerId === layer.id && hoveredPoint?.point.name === point.name;
          return (
            <div
              key={`${layer.id}-${point.name}`}
              className="absolute z-[5] pointer-events-auto"
              style={{ left: point.x, top: point.y, transform: 'translate(-50%, -50%)' }}
              onMouseEnter={() => setHoveredPoint({ layerId: layer.id, point })}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative cursor-pointer"
              >
                <div
                  className="w-3 h-3 rounded-full border-2 shadow-lg"
                  style={{
                    backgroundColor: isHovered ? layer.color : `${layer.color}60`,
                    borderColor: layer.color,
                    boxShadow: isHovered ? `0 0 12px ${layer.color}80` : 'none',
                  }}
                />
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="absolute left-1/2 -translate-x-1/2 top-4 whitespace-nowrap z-10"
                    >
                      <div className="bg-[#0F1525]/95 backdrop-blur-xl rounded-lg border px-2.5 py-1.5 shadow-xl" style={{ borderColor: `${layer.color}40` }}>
                        <p className="text-[10px] font-bold text-white font-cairo leading-tight">{point.name}</p>
                        <p className="text-[8px] text-white/50 font-english leading-tight mt-0.5">{point.desc}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })
      )}

      <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#080C18]/90 backdrop-blur-lg border-t border-theme-gold/[0.06] px-3 py-2">
        <div className="flex flex-wrap gap-1.5 justify-center">
          {layers.map((layer) => {
            const isActive = activeLayers.has(layer.id);
            const LayerIcon = layer.icon;
            return (
              <motion.button
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-cairo font-bold transition-all border ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'text-white/40 border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] hover:text-white/60'
                }`}
                style={{
                  backgroundColor: isActive ? `${layer.color}20` : undefined,
                  borderColor: isActive ? layer.color : undefined,
                  boxShadow: isActive ? `0 0 12px ${layer.color}30` : undefined,
                }}
              >
                <LayerIcon size={12} />
                <span>{layer.labelAr}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </>
  );
}
