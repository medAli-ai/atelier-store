// Static editorial content for the storefront. The catalogue itself lives in
// the database; see src/lib/catalog.ts.
// Photography is from Unsplash (https://unsplash.com/license).

function unsplash(id: string) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;
}

export type SampleImage = {
  src: string;
  alt: string;
};

export type SampleCategory = {
  name: string;
  href: string;
  image: SampleImage;
};

export const navigation = [
  { name: "Women", href: "/shop/women" },
  { name: "Men", href: "/shop/men" },
  { name: "Bags", href: "/shop/bags" },
  { name: "Shoes", href: "/shop/shoes" },
  { name: "Accessories", href: "/shop/accessories" },
  { name: "Stories", href: "/stories" },
];

export const heroImage: SampleImage = {
  src: unsplash("1645561305502-63a9ba09ab09"),
  alt: "Black and white portrait of a woman in sunglasses wearing a heavy wool coat",
};

export const campaignImage: SampleImage = {
  src: unsplash("1613915617430-8ab0fd7c6baf"),
  alt: "Model in a grey tailored blazer and black trousers against a pale backdrop",
};

export const craftImage: SampleImage = {
  src: unsplash("1603189343302-e603f7add05a"),
  alt: "Silhouette of a figure in a wide-sleeved black jacket against a white background",
};

export const categories: SampleCategory[] = [
  {
    name: "Women",
    href: "/shop/women",
    image: {
      src: unsplash("1781454230007-7c4beb40d34b"),
      alt: "Woman in a beige wool coat standing by the water",
    },
  },
  {
    name: "Men",
    href: "/shop/men",
    image: {
      src: unsplash("1619603364937-8d7af41ef206"),
      alt: "Man in a camel overcoat and roll-neck",
    },
  },
  {
    name: "Bags",
    href: "/shop/bags",
    image: {
      src: unsplash("1624687943971-e86af76d57de"),
      alt: "Tan leather tote bag hanging against a white door",
    },
  },
  {
    name: "Accessories",
    href: "/shop/accessories",
    image: {
      src: unsplash("1601281866896-1576541e77a1"),
      alt: "Pale leather wrap bracelet with gold buckles on marble",
    },
  },
];

export const services = [
  {
    title: "Complimentary delivery",
    body: "Express shipping on every order, delivered in signature packaging.",
  },
  {
    title: "Returns within 30 days",
    body: "Change of heart? Send it back free of charge, no questions asked.",
  },
  {
    title: "Private appointments",
    body: "Book time with a client advisor, in store or from home.",
  },
];

export const footerColumns = [
  {
    title: "Shop",
    links: [
      { name: "Women", href: "/shop/women" },
      { name: "Men", href: "/shop/men" },
      { name: "Bags", href: "/shop/bags" },
      { name: "Shoes", href: "/shop/shoes" },
      { name: "Accessories", href: "/shop/accessories" },
    ],
  },
  {
    title: "Client services",
    links: [
      { name: "Contact us", href: "/contact" },
      { name: "Delivery", href: "/help/delivery" },
      { name: "Returns", href: "/help/returns" },
      { name: "Book an appointment", href: "/appointments" },
    ],
  },
  {
    title: "The house",
    links: [
      { name: "Stories", href: "/stories" },
      { name: "Craft", href: "/craft" },
      { name: "Sustainability", href: "/sustainability" },
      { name: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms", href: "/legal/terms" },
      { name: "Privacy", href: "/legal/privacy" },
      { name: "Cookies", href: "/legal/cookies" },
    ],
  },
];
