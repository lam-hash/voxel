// VOXEL store data — printer capabilities, materials, colors, and products.
// Everything here reflects what a Bambu Lab A1 mini can actually print.

// ▼▼▼ EDIT THESE — your contact details so orders reach you ▼▼▼
const STORE = {
  // WhatsApp number in international format, digits only (no +, spaces or dashes).
  // Example for US: "14155550123". Leave "" to hide the WhatsApp button.
  whatsapp: "",
  // Email address that orders should be sent to.
  email: "canigetyournumber1515@gmail.com",
  // Auto-email orders: paste your free Web3Forms access key here.
  // Get one at https://web3forms.com (enter your email — the key is sent to you).
  // When set, every submitted order is emailed to that address automatically.
  // Leave "" to instead have customers send via the WhatsApp/Email buttons.
  web3formsKey: "ad48b3f2-31b7-4bb3-9ffe-819a6550c965",
  // Auto-filled by the "Start VOXEL Orders" program on your Mac — don't edit by hand.
  // When your Orders program is running, each order is also saved to your hard drive.
  localEndpoint: "",
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

// Filaments currently in stock. Each material lists the colors available IN
// that material — picking a material decides which colors a customer can choose.
const MATERIALS = [
  { id: "pla", name: "PLA", blurb: "Crisp detail, great all-rounder.", priceMult: 1.0, colors: ["white"] },
  { id: "petg", name: "PETG", blurb: "Tougher & heat-resistant. Good for outdoors.", priceMult: 1.2, colors: ["blue", "red", "gray"] },
];

// Color definitions (hex is approximate for on-screen display).
const COLORS = [
  { id: "white", name: "White", hex: "#f5f5f5" },
  { id: "blue", name: "Blue", hex: "#2e6df0" },
  { id: "red", name: "Red", hex: "#e23636" },
  { id: "gray", name: "Gray", hex: "#8a8f98" },
];

// Size options scale the base price (bigger = more filament + time).
const SIZES = [
  { id: "s", name: "Small", scale: 0.7, priceMult: 0.7 },
  { id: "m", name: "Medium", scale: 1.0, priceMult: 1.0 },
  { id: "l", name: "Large", scale: 1.4, priceMult: 1.6 },
];

// Fees added at checkout.
//   type "percent" → rate is a fraction of the subtotal (0.05 = 5%)
//   type "flat"    → rate is a fixed HK$ amount added to every order
// To remove a fee, delete its line. To change a rate, edit `rate`.
const FEES = [
  { id: "service", label: "Service charge", type: "percent", rate: 0.05 },
  { id: "tax", label: "Tax", type: "percent", rate: 0.05 },
];

// How orders are fulfilled (shown in the totals). Free in-store pickup.
const FULFILMENT = { label: "Store pickup", note: "Free" };

// Sample catalog. `icon` is an emoji used as the thumbnail for now —
// swap in real photos later by adding an `image` field.
const PRODUCTS = [
  {
    id: "voxel-planter",
    name: "Geometric Planter",
    category: "Home",
    icon: "🪴",
    basePrice: 360,
    desc: "Faceted low-poly planter with a drainage base. Perfect for succulents.",
    materials: ["pla", "petg"],
    popular: true,
  },
  {
    id: "phone-stand",
    name: "Adjustable Phone Stand",
    category: "Desk",
    icon: "📱",
    basePrice: 260,
    desc: "Angled desk stand that fits any phone. Cable pass-through included.",
    materials: ["pla", "petg"],
    popular: true,
  },
  {
    id: "cable-clips",
    name: "Cable Clips (set of 6)",
    category: "Desk",
    icon: "🔌",
    basePrice: 290,
    desc: "Stick-on desk cable organizers. Keeps your setup tidy.",
    materials: ["pla", "petg"],
  },
  {
    id: "dragon",
    name: "Articulated Dragon",
    category: "Toys",
    icon: "🐉",
    basePrice: 500,
    desc: "Print-in-place flexible dragon. Every segment moves — no assembly.",
    materials: ["pla"],
    popular: true,
  },
  {
    id: "headphone-hook",
    name: "Headphone Hook",
    category: "Desk",
    icon: "🎧",
    basePrice: 270,
    desc: "Under-desk clamp hook for headphones. No screws needed.",
    materials: ["pla", "petg"],
  },
  {
    id: "dice-tower",
    name: "Mini Dice Tower",
    category: "Toys",
    icon: "🎲",
    basePrice: 430,
    desc: "Tabletop dice tower with a built-in tray. Fits the A1 mini bed perfectly.",
    materials: ["pla", "petg"],
  },
  {
    id: "keycap",
    name: "Custom Keycap",
    category: "Desk",
    icon: "⌨️",
    basePrice: 250,
    desc: "MX-compatible artisan keycap. Crisp detail in PLA.",
    materials: ["pla"],
  },
  {
    id: "vase",
    name: "Spiral Vase",
    category: "Home",
    icon: "🏺",
    basePrice: 350,
    desc: "Single-wall spiral vase with a smooth ribbed finish.",
    materials: ["pla", "petg"],
  },

  // ----- More products -----
  {
    id: "pen-cup",
    name: "Pen & Pencil Cup",
    category: "Desk",
    icon: "✏️",
    basePrice: 280,
    desc: "Honeycomb-pattern desk cup for pens, pencils and scissors.",
    materials: ["pla", "petg"],
  },
  {
    id: "desk-tray",
    name: "Desk Organizer Tray",
    category: "Desk",
    icon: "🗂️",
    basePrice: 400,
    desc: "Multi-slot tray for clips, cards, keys and odds and ends.",
    materials: ["pla", "petg"],
  },
  {
    id: "business-card",
    name: "Business Card Holder",
    category: "Desk",
    icon: "💼",
    basePrice: 250,
    desc: "Angled desk holder that displays your cards neatly.",
    materials: ["pla"],
  },
  {
    id: "tablet-stand",
    name: "Tablet Stand",
    category: "Desk",
    icon: "📲",
    basePrice: 360,
    desc: "Sturdy fold-flat stand for tablets up to 11 inches.",
    materials: ["pla", "petg"],
    popular: true,
  },
  {
    id: "earbud-case",
    name: "Earbud Case Holder",
    category: "Accessories",
    icon: "🎵",
    basePrice: 250,
    desc: "Snap holder / keychain for AirPods-style cases.",
    materials: ["pla"],
  },
  {
    id: "keychain",
    name: "Custom Name Keychain",
    category: "Accessories",
    icon: "🔑",
    basePrice: 250,
    desc: "Personalized keychain — tell us the name or text at checkout.",
    materials: ["pla"],
    popular: true,
  },
  {
    id: "sunglasses-stand",
    name: "Sunglasses Stand",
    category: "Accessories",
    icon: "🕶️",
    basePrice: 300,
    desc: "Display stand that holds your shades on the desk.",
    materials: ["pla", "petg"],
  },
  {
    id: "bag-clips",
    name: "Bag / Snack Clips (set of 4)",
    category: "Kitchen",
    icon: "🍪",
    basePrice: 280,
    desc: "Strong snap clips to seal snack and food bags.",
    materials: ["pla", "petg"],
  },
  {
    id: "soap-dish",
    name: "Draining Soap Dish",
    category: "Home",
    icon: "🧼",
    basePrice: 300,
    desc: "Ribbed soap dish that drains water so soap stays dry.",
    materials: ["petg", "pla"],
  },
  {
    id: "toothbrush-holder",
    name: "Toothbrush Holder",
    category: "Home",
    icon: "🪥",
    basePrice: 300,
    desc: "Wall or counter holder for brushes and toothpaste.",
    materials: ["petg", "pla"],
  },
  {
    id: "coaster-set",
    name: "Coaster Set (4 + holder)",
    category: "Home",
    icon: "☕",
    basePrice: 350,
    desc: "Four geometric coasters with a matching holder.",
    materials: ["pla", "petg"],
  },
  {
    id: "key-rack",
    name: "Wall Key Rack",
    category: "Home",
    icon: "🗝️",
    basePrice: 320,
    desc: "Mountable rack with hooks so you never lose your keys.",
    materials: ["pla", "petg"],
  },
  {
    id: "door-stop",
    name: "Door Stopper",
    category: "Home",
    icon: "🚪",
    basePrice: 260,
    desc: "Wedge door stop in tough, grippy PETG.",
    materials: ["petg"],
  },
  {
    id: "plant-globe",
    name: "Plant Watering Globe",
    category: "Home",
    icon: "💧",
    basePrice: 310,
    desc: "Self-watering globe that keeps plants happy while you're away.",
    materials: ["petg"],
  },
  {
    id: "fidget-spinner",
    name: "Fidget Spinner",
    category: "Toys",
    icon: "🌀",
    basePrice: 290,
    desc: "Smooth-spinning fidget toy. Printed in one piece.",
    materials: ["pla"],
    popular: true,
  },
  {
    id: "flexi-octopus",
    name: "Flexi Octopus",
    category: "Toys",
    icon: "🐙",
    basePrice: 480,
    desc: "Articulated print-in-place octopus — every leg wiggles.",
    materials: ["pla"],
    popular: true,
  },
  {
    id: "flexi-axolotl",
    name: "Flexi Axolotl",
    category: "Toys",
    icon: "🦎",
    basePrice: 450,
    desc: "Adorable articulated axolotl that bends and poses.",
    materials: ["pla"],
  },
  {
    id: "maze-cube",
    name: "Maze Puzzle Cube",
    category: "Toys",
    icon: "🧩",
    basePrice: 380,
    desc: "3D rolling-ball maze puzzle. Surprisingly addictive.",
    materials: ["pla", "petg"],
  },
  {
    id: "bottle-opener",
    name: "Bottle Opener",
    category: "Kitchen",
    icon: "🍾",
    basePrice: 270,
    desc: "Sturdy PETG opener with a slot for a fridge magnet.",
    materials: ["petg"],
  },
];
