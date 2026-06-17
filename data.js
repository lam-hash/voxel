// VOXEL store data — printer capabilities, materials, colors, and products.
// Everything here reflects what a Bambu Lab A1 mini can actually print.

// ▼▼▼ EDIT THESE — your contact details so orders reach you ▼▼▼
const STORE = {
  // WhatsApp number in international format, digits only (no +, spaces or dashes).
  // Example for US: "14155550123". Leave "" to hide the WhatsApp button.
  whatsapp: "",
  // Email address that orders should be sent to.
  email: "orders@voxel.example",
  // Shown to customers at checkout.
  paymentNote: "💵 Cash on pickup / delivery — no online payment needed.",
};
// ▲▲▲ EDIT THESE ▲▲▲

const PRINTER = {
  model: "Bambu Lab A1 mini",
  buildVolume: { x: 180, y: 180, z: 180 }, // mm
  nozzle: 0.4, // mm
  multicolor: "AMS lite (up to 4 colors)",
};

// Materials the A1 mini handles well (open-frame, no enclosure).
const MATERIALS = [
  { id: "pla", name: "PLA", blurb: "Best all-rounder. Crisp detail, many colors.", priceMult: 1.0 },
  { id: "pla-silk", name: "Silk PLA", blurb: "Glossy, premium sheen.", priceMult: 1.25 },
  { id: "petg", name: "PETG", blurb: "Tougher & heat-resistant. Good for outdoors.", priceMult: 1.2 },
  { id: "tpu", name: "TPU (Flexible)", blurb: "Rubbery & bendable. Phone cases, grips.", priceMult: 1.4 },
];

// Common Bambu filament colors (hex is approximate for display).
const COLORS = [
  { id: "black", name: "Black", hex: "#1a1a1a" },
  { id: "white", name: "White", hex: "#f5f5f5" },
  { id: "gray", name: "Gray", hex: "#8a8f98" },
  { id: "red", name: "Red", hex: "#e23636" },
  { id: "orange", name: "Orange", hex: "#f08c2e" },
  { id: "yellow", name: "Yellow", hex: "#f3c623" },
  { id: "green", name: "Green", hex: "#3aa856" },
  { id: "blue", name: "Blue", hex: "#2e6df0" },
  { id: "cyan", name: "Cyan", hex: "#33c4d8" },
  { id: "purple", name: "Purple", hex: "#8a4fd1" },
  { id: "pink", name: "Pink", hex: "#f06fb0" },
  { id: "gold-silk", name: "Silk Gold", hex: "#d4af37" },
];

// Size options scale the base price (bigger = more filament + time).
const SIZES = [
  { id: "s", name: "Small", scale: 0.7, priceMult: 0.7 },
  { id: "m", name: "Medium", scale: 1.0, priceMult: 1.0 },
  { id: "l", name: "Large", scale: 1.4, priceMult: 1.6 },
];

// Sample catalog. `icon` is an emoji used as the thumbnail for now —
// swap in real photos later by adding an `image` field.
const PRODUCTS = [
  {
    id: "voxel-planter",
    name: "Geometric Planter",
    category: "Home",
    icon: "🪴",
    basePrice: 14,
    desc: "Faceted low-poly planter with a drainage base. Perfect for succulents.",
    materials: ["pla", "pla-silk", "petg"],
    popular: true,
  },
  {
    id: "phone-stand",
    name: "Adjustable Phone Stand",
    category: "Desk",
    icon: "📱",
    basePrice: 9,
    desc: "Angled desk stand that fits any phone. Cable pass-through included.",
    materials: ["pla", "petg"],
    popular: true,
  },
  {
    id: "cable-clips",
    name: "Cable Clips (set of 6)",
    category: "Desk",
    icon: "🔌",
    basePrice: 7,
    desc: "Stick-on desk cable organizers. Keeps your setup tidy.",
    materials: ["pla", "petg", "tpu"],
  },
  {
    id: "dragon",
    name: "Articulated Dragon",
    category: "Toys",
    icon: "🐉",
    basePrice: 22,
    desc: "Print-in-place flexible dragon. Every segment moves — no assembly.",
    materials: ["pla", "pla-silk"],
    popular: true,
  },
  {
    id: "headphone-hook",
    name: "Headphone Hook",
    category: "Desk",
    icon: "🎧",
    basePrice: 8,
    desc: "Under-desk clamp hook for headphones. No screws needed.",
    materials: ["pla", "petg"],
  },
  {
    id: "dice-tower",
    name: "Mini Dice Tower",
    category: "Toys",
    icon: "🎲",
    basePrice: 18,
    desc: "Tabletop dice tower with a built-in tray. Fits the A1 mini bed perfectly.",
    materials: ["pla", "pla-silk", "petg"],
  },
  {
    id: "keycap",
    name: "Custom Keycap",
    category: "Desk",
    icon: "⌨️",
    basePrice: 6,
    desc: "MX-compatible artisan keycap. Great in Silk PLA.",
    materials: ["pla", "pla-silk"],
  },
  {
    id: "phone-case",
    name: "Flexible Phone Case",
    category: "Accessories",
    icon: "🛡️",
    basePrice: 16,
    desc: "Shock-absorbing TPU case. Tell us your phone model at checkout.",
    materials: ["tpu"],
  },
  {
    id: "vase",
    name: "Spiral Vase",
    category: "Home",
    icon: "🏺",
    basePrice: 15,
    desc: "Single-wall spiral vase with a smooth ribbed finish. Stunning in Silk.",
    materials: ["pla", "pla-silk", "petg"],
  },
];
