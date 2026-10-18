export default function PaperBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* Бумага: базовый цвет + шум + пятна */}
      <div className="absolute inset-0 bg-[#ECE9DA]" />
      <div className="absolute inset-0 paper-grain" />
      <div className="absolute inset-0 paper-stains" />

      {/* Абстрактная карта: пунктир + крестики + пометки */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.18]"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <defs>
          <pattern id="map-grid" width="240" height="240" patternUnits="userSpaceOnUse">
            {/* пунктирные «дороги» */}
            <path d="M0 60 H240" stroke="#6B5E3E" strokeWidth="1.2" strokeDasharray="6 8" fill="none" />
            <path d="M60 0 V240" stroke="#6B5E3E" strokeWidth="1.2" strokeDasharray="6 8" fill="none" />
            <path d="M0 180 C60 150, 120 210, 240 170" stroke="#6B5E3E" strokeWidth="1.2" strokeDasharray="2 6" fill="none" />
            {/* крестики */}
            <g stroke="#6B5E3E" strokeWidth="1.4" fill="none">
              <path d="M150 40 l6 6 M156 40 l-6 6" />
              <path d="M190 140 l6 6 M196 140 l-6 6" />
              <path d="M30 120 l6 6 M36 120 l-6 6" />
            </g>
            {/* кружок-пометка */}
            <circle cx="120" cy="90" r="10" stroke="#6B5E3E" strokeWidth="1.2" fill="none" strokeDasharray="2 3" />
            {/* каракули-подписи */}
            <path d="M100 200 q10 -6 20 0 q10 6 20 0" stroke="#6B5E3E" strokeWidth="1" fill="none" />
            <path d="M170 210 q8 -4 16 0" stroke="#6B5E3E" strokeWidth="1" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#map-grid)" />
      </svg>
    </div>
  );
}