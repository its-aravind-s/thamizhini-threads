// Shop settings
window.SHOP = {
  name: "Thamizhini Threads",
  tagline: "Elegance in every thread",
  address: "",   // e.g. "Flat 1, Your Apartment, Area" (shown in the footer)
  phone: "88702 57696",     // e.g. "98765 43210" (shown in the footer; also used for WhatsApp)
  whatsapp: "",  // only if WhatsApp is a different number: "919876543210"
  instagram: ""  // e.g. "thamizhinithreads" (without @)
};

// Order here = order of the tiles and filter buttons.
// print: the pattern used for the tile and for products without photos.
// blurb: the text on the tile at the top of the page (leave out to skip the tile).
window.CATEGORIES = [
  { id: "razai", label: "Razai", print: "lattice", blurb: "Jaipur Premium\nOrganic" },
  { id: "comforter", label: "Comforters", print: "quilted", blurb: "Soft and cosy\nfor every season" },
  { id: "dohar", label: "Dohars", print: "diamonds", blurb: "Fairy Tale\nAnokhi / Aboli" },
  { id: "bedsheet", label: "Bedsheets", print: "flowers", blurb: "AirWays \u00b7 Garden\nKalamkari \u00b7 Leaf" },
  { id: "kids", label: "Kids", print: "night", blurb: "Fun prints for\nlittle ones" },
  { id: "suit", label: "Suit material", print: "butti" }
];

// inStock: true = available now, false = we can order it for you (5–7 days).
// Photos are in images/<id>/ and listed in photos.js.
window.PRODUCTS = [
  // Razai — hand quilts
  {
    id: "premium-block-razai-double",
    name: "Premium Jaipuri Block Razai",
    category: "razai",
    size: "Double / King",
    dimensions: "90 × 108 in",
    fabric: "Pure mulmul cotton",
    filling: "Pure cotton, about 1.5 kg",
    weight: "About 2.6 kg",
    features: ["Hand quilted (tagai) all over", "Reversible", "Hand block print"],
    packing: "Premium bag",
    inStock: true
  },
  {
    id: "block-razai-single",
    name: "Jaipuri Block Razai",
    category: "razai",
    size: "Single",
    dimensions: "60 × 90 in",
    fabric: "Pure mulmul cotton",
    filling: "Pure cotton, 1 kg",
    weight: "About 1.8 kg",
    features: ["Hand quilted (tagai) all over", "Reversible", "Hand block print"],
    packing: "Premium bag",
    inStock: true
  },
  {
    id: "organic-razai-double",
    name: "Organic Natural Razai",
    category: "razai",
    size: "Double / King",
    dimensions: "90 × 108 in (7.5 × 9 ft)",
    fabric: "100% cotton mulmul (muslin)",
    filling: "100% natural cotton",
    weight: "About 2.6 kg",
    features: ["Jointless", "Reversible", "Warm for winter, breathable"],
    inStock: true
  },
  {
    id: "organic-razai-single",
    name: "Organic Natural Razai",
    category: "razai",
    size: "Single",
    dimensions: "60 × 90 in (5 × 7.5 ft)",
    fabric: "100% cotton mulmul (muslin)",
    filling: "100% natural cotton",
    weight: "About 1.3 kg",
    features: ["Jointless", "Reversible", "Warm for winter, breathable"],
    inStock: true
  },

  // Comforters
  {
    id: "comforter-single",
    name: "Jaipuri Quilted Comforter",
    category: "comforter",
    size: "Single",
    dimensions: "60 × 90 in (5 × 7 ft)",
    fabric: "Cotton",
    weight: "About 1.15 kg",
    features: ["Quilted", "Reversible", "Washable"],
    packing: "PVC zip bag",
    inStock: true
  },
  {
    id: "comforter-double",
    name: "Jaipuri Quilted Comforter",
    category: "comforter",
    size: "Double",
    dimensions: "90 × 100 in (7 × 8 ft)",
    fabric: "Cotton",
    weight: "About 1.75 kg",
    features: ["Quilted", "Reversible", "Washable"],
    packing: "PVC zip bag",
    inStock: true
  },

  // Dohars — light AC quilts
  {
    id: "hawamahal-dohar-single",
    name: "Hawamahal Dohar, pair",
    category: "dohar",
    size: "Single, set of 2",
    dimensions: "55 × 85 in each",
    fabric: "Soft cotton",
    filling: "Falalen, 200 GSM",
    weight: "About 1.7 kg for the pair",
    features: ["3 layers", "Printed on both sides", "Reversible", "Machine washable", "Good for gifting"],
    packing: "Zip bag",
    inStock: true
  },
  {
    id: "fairy-tale-dohar-single",
    name: "Fairy Tale Dohar, pair",
    category: "dohar",
    size: "Single, set of 2",
    dimensions: "58 × 86 in each",
    fabric: "Heavy dull cotton, soft feel",
    filling: "Falalen",
    weight: "About 1.6 kg for the pair",
    features: ["3 layers", "Printed on both sides", "Reversible"],
    packing: "Gift bag",
    inStock: true
  },
  {
    id: "anokhi-dohar-single",
    name: "Anokhi / Aboli Mulmul Dohar, pair",
    category: "dohar",
    size: "Single, set of 2",
    dimensions: "60 × 90 in each",
    fabric: "Pure cotton voile (mulmul)",
    filling: "Falalen, 200 GSM",
    weight: "About 1.6 kg for the pair",
    features: ["3 layers", "Piping on all 4 sides", "Printed on both sides", "Super soft", "Machine washable"],
    packing: "Premium bag",
    inStock: true
  },
  {
    id: "anokhi-dohar-double",
    name: "Anokhi / Aboli Mulmul Dohar",
    category: "dohar",
    size: "Double",
    dimensions: "90 × 100 in",
    fabric: "Pure soft cotton voile (mulmul)",
    filling: "Falalen, 200 GSM",
    weight: "About 1.4 kg",
    features: ["3 layers", "Piping on all 4 sides", "100% fast colours", "Machine washable"],
    packing: "PVC bag",
    inStock: true
  },

  // Bedsheets — king and double
  {
    id: "alankar-bedsheet",
    name: "Alankar Bedsheet Set",
    category: "bedsheet",
    size: "King, with 2 pillow covers",
    dimensions: "88 × 104 in (7.5 × 8.75 ft)",
    fabric: "Cotton",
    pillow: "17 × 27 in, zip closure",
    weight: "About 1.1 kg",
    features: ["Sides stitched"],
    packing: "Poster pack",
    inStock: true
  },
  {
    id: "hastkala-bedsheet",
    name: "Hastkala Handlook Bedsheet Set",
    category: "bedsheet",
    size: "King, with 2 pillow covers",
    dimensions: "100 × 108 in",
    fabric: "100% cotton",
    pillow: "18 × 27 in",
    weight: "About 1.3 kg",
    features: ["Sides stitched", "100% fast colours", "Machine washable"],
    inStock: true
  },
  {
    id: "dark-hastkala-bedsheet",
    name: "Dark Hastkala Handlook Bedsheet Set",
    category: "bedsheet",
    size: "King, with 2 pillow covers",
    dimensions: "100 × 108 in",
    fabric: "100% cotton",
    pillow: "18 × 27 in",
    weight: "About 1.3 kg",
    features: ["Deeper colours", "Sides stitched", "100% fast colours", "Machine washable"],
    inStock: false
  },
  {
    id: "hastkala-jumbo-bedsheet",
    name: "Hastkala Jumbo Bedsheet Set",
    category: "bedsheet",
    size: "Jumbo king, with 2 pillow covers",
    dimensions: "110 × 110 in",
    fabric: "100% cotton",
    pillow: "18 × 27 in",
    weight: "About 1.4 kg",
    features: ["Extra large", "Sides stitched", "100% fast colours", "Machine washable"],
    inStock: false
  },
  {
    id: "jaipuri-airways-bedsheet",
    name: "Jaipuri AirWays Bedsheet Set",
    category: "bedsheet",
    size: "Super king, with 2 pillow covers",
    dimensions: "100 × 108 in (8 × 9 ft)",
    fabric: "100% premium cotton",
    pillow: "19 × 29 in, zip closure",
    weight: "About 1.3 kg",
    features: ["The Cotton Series"],
    inStock: true
  },
  {
    id: "jaipuri-garden-bedsheet",
    name: "Jaipuri Garden Bedsheet Set",
    category: "bedsheet",
    size: "Super king, with 2 pillow covers",
    dimensions: "100 × 108 in (8 × 9 ft)",
    fabric: "100% premium cotton",
    pillow: "19 × 29 in, zip closure",
    weight: "About 1.3 kg",
    features: ["The Cotton Series", "Floral prints"],
    inStock: true
  },
  {
    id: "kalamkari-bedsheet",
    name: "Kalamkari / Royal Ikkat Bedsheet Set",
    category: "bedsheet",
    size: "King, with 2 pillow covers",
    dimensions: "100 × 108 in",
    fabric: "Cotton",
    features: ["Kalamkari and ikkat style prints", "Several designs; ask to see them all"],
    inStock: true
  },
  {
    id: "kaarigari-bedsheet",
    name: "Kaarigari Barmeri Bedsheet Set",
    category: "bedsheet",
    size: "Jumbo king, with 2 pillow covers",
    dimensions: "108 × 108 in",
    fabric: "100% premium soft cotton",
    pillow: "18 × 28 in",
    weight: "About 1.4 kg",
    features: ["Barmer style prints", "100% fast colours", "Machine washable"],
    packing: "Zip bag with poster",
    inStock: true
  },
  {
    id: "pratham-bedsheet",
    name: "Pratham Bedsheet Set",
    category: "bedsheet",
    size: "King, with 2 pillow covers",
    dimensions: "94 × 104 in (8 × 9 ft)",
    fabric: "100% premium cotton",
    pillow: "18 × 28 in, flap closure",
    weight: "About 1.2 kg",
    features: ["Sides stitched"],
    inStock: false
  },

  // Bedsheets — single
  {
    id: "alexa-bedsheet-single",
    name: "Alexa Bedsheet Set",
    category: "bedsheet",
    size: "Single, with 1 pillow cover",
    dimensions: "60 × 90 in (5 × 7.5 ft)",
    fabric: "100% premium cotton, autoloom",
    pillow: "18 × 28 in, double stitched",
    weight: "About 650 g",
    features: ["Sides stitched"],
    inStock: false
  },
  {
    id: "urbana-bedsheet-single",
    name: "Urbana Bedsheet Set",
    category: "bedsheet",
    size: "Single, with 1 pillow cover",
    dimensions: "60 × 90 in (5 × 7.5 ft)",
    fabric: "Cotton",
    pillow: "18 × 28 in",
    weight: "About 650 g",
    features: ["Sides stitched"],
    inStock: false
  },
  {
    id: "jaipuri-leaf-bedsheet-single",
    name: "Jaipuri Leaf Bedsheet Set",
    category: "bedsheet",
    size: "Single, with 1 pillow cover",
    dimensions: "63 × 90 in (5 × 7.5 ft)",
    fabric: "Cotton",
    pillow: "18 × 28 in",
    weight: "About 600 g",
    features: ["Leaf prints"],
    inStock: true
  },
  {
    id: "anokhi-bedsheet-single",
    name: "Anokhi / Aboli Bedsheet Set",
    category: "bedsheet",
    size: "Single, with 1 pillow cover",
    dimensions: "60 × 90 in (5 × 7.5 ft)",
    fabric: "100% pure cotton, autoloom",
    pillow: "18 × 27 in, zip closure",
    weight: "About 650 g",
    features: ["Sides stitched", "100% fast colours", "Machine washable"],
    inStock: false
  },
  {
    id: "azrakh-bedsheet-single",
    name: "Azrakh Procion Bedsheet Set",
    category: "bedsheet",
    size: "Single, with 1 pillow cover",
    dimensions: "60 × 90 in (5 × 7.5 ft)",
    fabric: "100% pure soft cotton, procion print",
    pillow: "18 × 27 in, flap closure",
    weight: "About 680 g",
    features: ["Ajrakh style prints", "Colour guarantee", "Machine washable"],
    inStock: false
  },

  // Kids
  {
    id: "kids-block-dohar",
    name: "Hand Block Kids Dohar",
    category: "kids",
    size: "Single",
    dimensions: "60 × 90 in",
    fabric: "Pure voile mulmul",
    filling: "Falalen, 150 GSM",
    weight: "About 860 g",
    features: ["Authentic hand block print", "Reversible", "Export quality", "Machine washable"],
    packing: "PVC zip bag",
    inStock: true
  },
  {
    id: "kids-block-razai",
    name: "Hand Block Kids Razai",
    category: "kids",
    size: "Single",
    dimensions: "60 × 90 in",
    fabric: "Pure mulmul cotton",
    filling: "Pure cotton, 1 kg",
    weight: "About 1.7 kg",
    features: ["Hand block print", "Reversible", "Export quality"],
    packing: "Bag",
    inStock: true
  },
  {
    id: "masti-pathshala-dohar",
    name: "Masti ki Pathshala Dohar",
    category: "kids",
    size: "Double",
    dimensions: "91 × 102 in",
    fabric: "100% cotton mulmul, jointless",
    weight: "About 1.45 kg",
    features: ["Fun kids prints", "Big enough for a double bed"],
    inStock: false
  },
  {
    id: "kuchu-puchu-razai",
    name: "Kuchu-Puchu Kids Razai",
    category: "kids",
    size: "Single",
    dimensions: "Finished 55 × 85 in",
    fabric: "100% mulmul cotton",
    filling: "Pure cotton",
    weight: "About 1.1 kg",
    features: ["Hand magzi stitching", "Soft mulmul"],
    packing: "Gift bag",
    inStock: false
  },
  {
    id: "tiny-tot-dohar",
    name: "Tiny-Tot Kids Dohar",
    category: "kids",
    size: "Single",
    dimensions: "Finished 57 × 87 in",
    fabric: "Mulmul cotton",
    weight: "About 900 g",
    features: ["Hand piping", "Luxury soft feel"],
    inStock: false
  },

  // Suit material
  {
    id: "block-print-suit",
    name: "Hand Block 3-piece Suit Material",
    category: "suit",
    size: "Unstitched, 2.5 m each piece",
    fabric: "100% cotton, with cotton mulmul dupatta",
    weight: "About 600 g",
    features: ["Hand block printed", "Multi colour", "100% fast colours", "Washable"],
    inStock: false
  }
];
