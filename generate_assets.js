// Generates clean SVG product illustrations into assets/.
// Run with: node generate_assets.js   (then you can delete this file)
const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "assets");
fs.mkdirSync(dir, { recursive: true });

// Each product: gradient stops + inner vector art (uses currentColor `var(--ink)`).
const items = {
  "voxel-planter": {
    g: ["#6c5ce7", "#00d2ff"],
    art: `
      <path d="M150 175 L250 175 L235 250 L165 250 Z" fill="#fff" opacity=".92"/>
      <path d="M150 175 L250 175 L246 195 L154 195 Z" fill="#fff"/>
      <path d="M200 175 C190 130 160 120 150 110 C185 115 200 140 200 175Z" fill="#bdf5d6"/>
      <path d="M200 175 C210 125 245 118 255 108 C220 116 205 142 200 175Z" fill="#9fe9c3"/>
      <path d="M200 175 C200 120 200 100 200 92 C212 110 210 150 200 175Z" fill="#d6fbe8"/>
    `,
  },
  "phone-stand": {
    g: ["#2e6df0", "#33c4d8"],
    art: `
      <rect x="150" y="235" width="120" height="16" rx="6" fill="#fff"/>
      <g transform="rotate(-18 210 200)">
        <rect x="175" y="120" width="80" height="130" rx="10" fill="#fff" opacity=".95"/>
        <rect x="186" y="132" width="58" height="96" rx="5" fill="#2e6df0" opacity=".5"/>
      </g>
      <rect x="150" y="248" width="120" height="8" rx="4" fill="#fff" opacity=".55"/>
    `,
  },
  "cable-clips": {
    g: ["#f08c2e", "#f3c623"],
    art: `
      ${[0, 1, 2].map((i) => `
        <g transform="translate(${130 + i * 50} 150)">
          <path d="M0 60 L0 20 Q0 0 20 0 Q40 0 40 20 L40 35 Q40 48 28 48 L18 48"
            fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"/>
        </g>`).join("")}
    `,
  },
  "dragon": {
    g: ["#3aa856", "#33c4d8"],
    art: `
      <path d="M120 200 Q150 160 180 195 Q210 160 240 195 Q270 160 290 190"
        fill="none" stroke="#fff" stroke-width="16" stroke-linecap="round"/>
      <circle cx="296" cy="180" r="16" fill="#fff"/>
      <circle cx="300" cy="176" r="4" fill="#0b0d12"/>
      <path d="M300 168 L320 150 L312 172 Z" fill="#fff"/>
      <path d="M120 200 L104 212 L122 214 Z" fill="#fff"/>
    `,
  },
  "headphone-hook": {
    g: ["#8a4fd1", "#6c5ce7"],
    art: `
      <rect x="150" y="110" width="22" height="60" rx="6" fill="#fff"/>
      <path d="M172 130 Q210 130 210 168 L210 200" fill="none" stroke="#fff" stroke-width="16" stroke-linecap="round"/>
      <path d="M188 205 a40 44 0 1 0 60 0" fill="none" stroke="#fff" stroke-width="14"/>
      <rect x="180" y="200" width="18" height="34" rx="8" fill="#fff"/>
      <rect x="238" y="200" width="18" height="34" rx="8" fill="#fff"/>
    `,
  },
  "dice-tower": {
    g: ["#e23636", "#f08c2e"],
    art: `
      <path d="M165 110 L255 110 L255 230 L165 230 Z" fill="#fff" opacity=".95"/>
      <path d="M180 175 L240 175 L240 200 L180 200 Z" fill="#e23636" opacity=".55"/>
      <rect x="158" y="225" width="104" height="26" rx="6" fill="#fff"/>
      <g transform="rotate(15 210 145)">
        <rect x="194" y="128" width="34" height="34" rx="6" fill="#fff"/>
        <circle cx="205" cy="139" r="3.5" fill="#e23636"/><circle cx="217" cy="151" r="3.5" fill="#e23636"/>
      </g>
    `,
  },
  "keycap": {
    g: ["#f06fb0", "#8a4fd1"],
    art: `
      <path d="M150 200 L250 200 L235 150 L165 150 Z" fill="#fff"/>
      <path d="M165 150 L235 150 L222 128 L178 128 Z" fill="#fff" opacity=".85"/>
      <path d="M150 200 L165 150 L165 150 L150 200 Z" fill="#fff"/>
      <text x="200" y="180" font-family="Inter,sans-serif" font-size="34" font-weight="800" fill="#8a4fd1" text-anchor="middle">A</text>
    `,
  },
  "phone-case": {
    g: ["#33c4d8", "#2e6df0"],
    art: `
      <rect x="160" y="105" width="80" height="150" rx="18" fill="#fff" opacity=".95"/>
      <rect x="172" y="118" width="20" height="34" rx="8" fill="#33c4d8" opacity=".6"/>
      <circle cx="180" cy="128" r="5" fill="#fff"/><circle cx="180" cy="142" r="5" fill="#fff"/>
    `,
  },
  "vase": {
    g: ["#d4af37", "#f3c623"],
    art: `
      <path d="M178 110 Q170 150 200 175 Q230 150 222 110 Z" fill="#fff" opacity=".5"/>
      <path d="M185 110 Q150 160 185 210 Q165 235 200 252 Q235 235 215 210 Q250 160 215 110 Z" fill="#fff"/>
      ${[140, 160, 180, 200, 220].map((y) => `<path d="M165 ${y} Q200 ${y + 8} 235 ${y}" stroke="#d4af37" stroke-width="2" fill="none" opacity=".4"/>`).join("")}
    `,
  },
};

const layerLines = Array.from({ length: 30 }, (_, i) =>
  `<line x1="0" y1="${i * 10}" x2="400" y2="${i * 10}" stroke="#fff" stroke-width="1" opacity="0.04"/>`
).join("");

for (const [id, { g, art }] of Object.entries(items)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${g[0]}"/>
      <stop offset="1" stop-color="${g[1]}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <g>${layerLines}</g>
  ${art}
</svg>`;
  fs.writeFileSync(path.join(dir, `${id}.svg`), svg.trim());
  console.log("wrote", id + ".svg");
}
