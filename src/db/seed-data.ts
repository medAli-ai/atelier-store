// Starting catalogue loaded by `db:seed`.
// Photography is from Unsplash (https://unsplash.com/license).

import type { ProductImage } from "./schema";

function unsplash(id: string) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;
}

export const seedCategories = [
  { slug: "outerwear", name: "Outerwear" },
  { slug: "knitwear", name: "Knitwear" },
  { slug: "bags", name: "Bags" },
  { slug: "shoes", name: "Shoes" },
  { slug: "eyewear", name: "Eyewear" },
] as const;

export type SeedProduct = {
  slug: string;
  name: string;
  category: (typeof seedCategories)[number]["slug"];
  /** Price in US cents. */
  priceCents: number;
  isNew?: boolean;
  description: string;
  color: string;
  material: string;
  reference: string;
  stock: number;
  details: string[];
  /** Primary image first. */
  images: ProductImage[];
};

const outerwearCare = [
  "Dry clean only",
  "Store on a shaped hanger",
  "Made in Italy",
];
const knitwearCare = [
  "Hand wash cold, dry flat",
  "Fold to store, never hang",
  "Made in Scotland",
];
const leatherCare = [
  "Wipe with a soft dry cloth",
  "Keep away from rain and direct heat",
  "Supplied with a cotton dust bag",
];
const eyewearCare = [
  "Category 3 lenses with full UV protection",
  "Supplied with a hard case and cloth",
  "Made in Italy",
];

const coatDetail: ProductImage = {
  src: unsplash("1608635680046-aebf91c1a9c8"),
  alt: "Close view of a camel wool coat with horn buttons",
};
const coatStyled: ProductImage = {
  src: unsplash("1550872199-63f4382fe925"),
  alt: "Woman in a beige wrap coat against a white wall",
};
const coatPortrait: ProductImage = {
  src: unsplash("1645561305502-63a9ba09ab09"),
  alt: "Black and white portrait of a woman in sunglasses wearing a heavy wool coat",
};
const leatherDetail: ProductImage = {
  src: unsplash("1637759292654-a12cb2be085e"),
  alt: "Close view of cognac leather with a stitched seam",
};
const knitStack: ProductImage = {
  src: unsplash("1641642231157-0849081598a2"),
  alt: "Stack of folded sweaters on a wooden chair",
};
const knitDetail: ProductImage = {
  src: unsplash("1536992266094-82847e1fd431"),
  alt: "Close view of a green open-stitch knit",
};
const eyewearStyled: ProductImage = {
  src: unsplash("1577803645773-f96470509666"),
  alt: "Pale-framed sunglasses resting on sand by the sea",
};

/** Newest first: the seed spaces `created_at` out in this order. */
export const seedProducts: SeedProduct[] = [
  {
    slug: "belted-wool-coat",
    name: "Belted Wool Coat",
    category: "outerwear",
    priceCents: 189000,
    isNew: true,
    description:
      "A long-line coat in double-faced wool with a notched lapel, dropped shoulder and a self-tie belt. Unlined, so it drapes rather than sits.",
    color: "Camel",
    material: "100% virgin wool",
    reference: "AT-OW-1042",
    stock: 12,
    details: ["Relaxed fit, true to size", "Side slip pockets", ...outerwearCare],
    images: [
      {
        src: unsplash("1539533113208-f6df8cc8b543"),
        alt: "Camel belted wool coat worn against a stone wall",
      },
      coatDetail,
      coatStyled,
    ],
  },
  {
    slug: "top-handle-bag",
    name: "Top Handle Bag",
    category: "bags",
    priceCents: 245000,
    isNew: true,
    description:
      "A structured day bag in vegetable-tanned calfskin with twin rolled handles, buckled front pockets and a detachable shoulder strap.",
    color: "Cognac",
    material: "Calfskin, brass hardware",
    reference: "AT-BG-2210",
    stock: 6,
    details: ["32 × 24 × 14 cm", "Suede lining, one zip pocket", ...leatherCare],
    images: [
      {
        src: unsplash("1691480250099-a63081ecfcb8"),
        alt: "Cognac leather top handle bag with buckled pockets",
      },
      leatherDetail,
    ],
  },
  {
    slug: "ribbed-wool-sweater",
    name: "Ribbed Wool Sweater",
    category: "knitwear",
    priceCents: 69000,
    description:
      "An oversized sweater in a deep fisherman rib, knitted from undyed wool with a high funnel neck and long cuffs made to be turned back.",
    color: "Ivory",
    material: "90% wool, 10% cashmere",
    reference: "AT-KN-3105",
    stock: 9,
    details: ["Oversized fit, take your usual size", ...knitwearCare],
    images: [
      {
        src: unsplash("1574201635302-388dd92a4c3f"),
        alt: "Oversized ivory ribbed knit sweater",
      },
      knitStack,
      knitDetail,
    ],
  },
  {
    slug: "patent-slingback",
    name: "Patent Slingback",
    category: "shoes",
    priceCents: 98000,
    isNew: true,
    description:
      "A pointed slingback in patent calfskin on a low sculpted heel, with an elasticated strap and a leather sole.",
    color: "Black",
    material: "Patent calfskin, leather sole",
    reference: "AT-SH-4018",
    stock: 2,
    details: ["35 mm heel", "Fits small, take a half size up", ...leatherCare],
    images: [
      {
        src: unsplash("1789110519431-0a9bf0af5074"),
        alt: "Black patent leather slingback with a sculpted heel",
      },
    ],
  },
  {
    slug: "double-breasted-coat",
    name: "Double-Breasted Coat",
    category: "outerwear",
    priceCents: 215000,
    description:
      "A tailored double-breasted coat in a dense wool melton with peak lapels, a half belt at the back and horn buttons.",
    color: "Black",
    material: "85% wool, 15% cashmere",
    reference: "AT-OW-1057",
    stock: 5,
    details: ["Tailored fit, true to size", "Fully lined", ...outerwearCare],
    images: [
      {
        src: unsplash("1637499948395-9b4bb51c76a2"),
        alt: "Woman in a black double-breasted coat and sunglasses",
      },
      coatPortrait,
    ],
  },
  {
    slug: "square-sunglasses",
    name: "Square Sunglasses",
    category: "eyewear",
    priceCents: 42000,
    description:
      "A square half-rim frame in polished acetate and metal with gradient smoke lenses and adjustable nose pads.",
    color: "Black",
    material: "Acetate and metal",
    reference: "AT-EY-5003",
    stock: 14,
    details: ["Lens width 52 mm", ...eyewearCare],
    images: [
      {
        src: unsplash("1584036553516-bf83210aa16c"),
        alt: "Black square-frame sunglasses on a white surface",
      },
      eyewearStyled,
    ],
  },
  {
    slug: "lambswool-crewneck",
    name: "Lambswool Crewneck",
    category: "knitwear",
    priceCents: 54000,
    description:
      "A boxy crewneck in a chunky lambswool stitch with a ribbed collar, cuffs and hem. Washed for a soft, lived-in hand.",
    color: "Oatmeal",
    material: "100% lambswool",
    reference: "AT-KN-3121",
    stock: 0,
    details: ["Boxy fit, true to size", ...knitwearCare],
    images: [
      {
        src: unsplash("1631541909061-71e349d1f203"),
        alt: "Oatmeal knitted crewneck on a wooden hanger",
      },
      knitStack,
    ],
  },
  {
    slug: "cashmere-roll-neck",
    name: "Cashmere Roll-Neck",
    category: "knitwear",
    priceCents: 76000,
    description:
      "A fine-gauge roll-neck in two-ply cashmere with a close fit through the body and a neck that folds once.",
    color: "Stone",
    material: "100% cashmere",
    reference: "AT-KN-3140",
    stock: 7,
    details: ["Slim fit, true to size", ...knitwearCare],
    images: [
      {
        src: unsplash("1633008004535-b255bab275cc"),
        alt: "Stack of folded knitwear in ivory and stone",
      },
      knitDetail,
    ],
  },
  {
    slug: "structured-carryall",
    name: "Structured Carryall",
    category: "bags",
    priceCents: 289000,
    description:
      "A wide carryall in polished calfskin with a framed opening, twin handles and a detachable strap. Sized for a laptop and a day's papers.",
    color: "Cognac",
    material: "Calfskin, brass hardware",
    reference: "AT-BG-2234",
    stock: 3,
    details: ["38 × 26 × 16 cm", "Leather lining, two slip pockets", ...leatherCare],
    images: [
      {
        src: unsplash("1691480150204-66dd1eb77391"),
        alt: "Structured cognac leather carryall with twin handles",
      },
      leatherDetail,
    ],
  },
  {
    slug: "cat-eye-sunglasses",
    name: "Cat-Eye Sunglasses",
    category: "eyewear",
    priceCents: 46000,
    description:
      "An upswept cat-eye frame in cream acetate with slim metal temples and brown gradient lenses.",
    color: "Cream",
    material: "Acetate and metal",
    reference: "AT-EY-5011",
    stock: 11,
    details: ["Lens width 54 mm", ...eyewearCare],
    images: [
      {
        src: unsplash("1508296695146-257a814070b4"),
        alt: "Cream cat-eye sunglasses with gradient lenses",
      },
      eyewearStyled,
    ],
  },
  {
    slug: "mini-satchel",
    name: "Mini Satchel",
    category: "bags",
    priceCents: 165000,
    description:
      "A small satchel in grained calfskin with a top handle, two buckled straps and a long strap for wearing across the body.",
    color: "Dove grey",
    material: "Grained calfskin, gilt hardware",
    reference: "AT-BG-2251",
    stock: 8,
    details: ["22 × 16 × 8 cm", "Suede lining", ...leatherCare],
    images: [
      {
        src: unsplash("1605733513597-a8f8341084e6"),
        alt: "Grey leather satchel with gold buckles",
      },
    ],
  },
  {
    slug: "leather-court-sneaker",
    name: "Leather Court Sneaker",
    category: "shoes",
    priceCents: 62000,
    description:
      "A low court sneaker in smooth calfskin with perforated side panels, a padded collar and a stitched rubber cup sole.",
    color: "White",
    material: "Calfskin, rubber sole",
    reference: "AT-SH-4032",
    stock: 0,
    details: ["True to size", "Removable leather insole", ...leatherCare],
    images: [
      {
        src: unsplash("1608231387042-66d1773070a5"),
        alt: "White leather sneaker against a dark background",
      },
    ],
  },
  {
    slug: "round-wire-sunglasses",
    name: "Round Wire Sunglasses",
    category: "eyewear",
    priceCents: 39000,
    description:
      "A round wire frame with a double bridge, flat smoke lenses and fine curled temples.",
    color: "Gunmetal",
    material: "Stainless steel",
    reference: "AT-EY-5020",
    stock: 4,
    details: ["Lens width 48 mm", ...eyewearCare],
    images: [
      {
        src: unsplash("1618677366787-9727aacca7ea"),
        alt: "Round wire-frame sunglasses on a pink surface",
      },
      eyewearStyled,
    ],
  },
  {
    slug: "leather-belt-bag",
    name: "Leather Belt Bag",
    category: "bags",
    priceCents: 128000,
    description:
      "A belt bag in full-grain leather with a zipped main compartment, a flap pocket and an adjustable strap to wear at the waist or across the body.",
    color: "Tan",
    material: "Full-grain leather",
    reference: "AT-BG-2267",
    stock: 10,
    details: ["24 × 14 × 6 cm", "Adjustable strap, 80 to 120 cm", ...leatherCare],
    images: [
      {
        src: unsplash("1657603738389-951c374b740c"),
        alt: "Tan leather belt bag with a front pocket",
      },
      leatherDetail,
    ],
  },
];
