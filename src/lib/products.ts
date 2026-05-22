import { ProductsType } from "@/types";

export const products: ProductsType = [
  {
    id: 1,
    name: "Adidas CoreFit T-Shirt",
    category: "t-shirts",
    shortDescription: "A breathable training tee made for all-day comfort.",
    description:
      "A lightweight Adidas training tee with a soft feel, relaxed fit, and enough stretch for gym sessions or everyday wear.",
    price: 39.9,
    sizes: ["s", "m", "l", "xl", "xxl"],
    colors: ["gray", "purple", "green"],
    images: {
      gray: "/products/1g.png",
      purple: "/products/1p.png",
      green: "/products/1gr.png",
    },
  },
  {
    id: 2,
    name: "Puma Ultra Warm Zip",
    category: "jackets",
    shortDescription: "A warm zip-up layer built for cool weather.",
    description:
      "This Puma zip jacket balances warmth and movement, making it a solid option for outdoor walks, commuting, or casual layering.",
    price: 59.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["gray", "green"],
    images: { gray: "/products/2g.png", green: "/products/2gr.png" },
  },
  {
    id: 3,
    name: "Nike Air Essentials Pullover",
    category: "jackets",
    shortDescription: "A classic pullover with soft fleece comfort.",
    description:
      "Nike's everyday pullover delivers a cozy brushed interior, simple styling, and an easy fit that works with both activewear and streetwear.",
    price: 69.9,
    sizes: ["s", "m", "l"],
    colors: ["green", "blue", "black"],
    images: {
      green: "/products/3gr.png",
      blue: "/products/3b.png",
      black: "/products/3bl.png",
    },
  },
  {
    id: 4,
    name: "Nike Dri Flex T-Shirt",
    category: "t-shirts",
    shortDescription: "A quick-dry performance tee for training days.",
    description:
      "Designed with moisture-wicking fabric and a flexible fit, this Nike tee keeps you comfortable through workouts and daily wear.",
    price: 29.9,
    sizes: ["s", "m", "l"],
    colors: ["white", "pink"],
    images: { white: "/products/4w.png", pink: "/products/4p.png" },
  },
  {
    id: 5,
    name: "Under Armour StormFleece",
    category: "jackets",
    shortDescription: "A weather-ready fleece with a sporty finish.",
    description:
      "Under Armour's StormFleece offers soft insulation with light weather resistance, making it a reliable outer layer in shifting conditions.",
    price: 49.9,
    sizes: ["s", "m", "l"],
    colors: ["red", "orange", "black"],
    images: {
      red: "/products/5r.png",
      orange: "/products/5o.png",
      black: "/products/5bl.png",
    },
  },
  {
    id: 6,
    name: "Nike Air Max 270",
    category: "shoes",
    shortDescription: "A cushioned sneaker with standout everyday style.",
    description:
      "The Air Max 270 combines visible cushioning, bold shape, and lightweight comfort for all-day wear.",
    price: 59.9,
    sizes: ["40", "42", "43", "44"],
    colors: ["gray", "white"],
    images: { gray: "/products/6g.png", white: "/products/6w.png" },
  },
  {
    id: 7,
    name: "Nike Ultraboost Pulse",
    category: "shoes",
    shortDescription: "A sleek running-inspired sneaker with plush comfort.",
    description:
      "Built with a responsive feel and a streamlined profile, the Ultraboost Pulse transitions easily from active hours to casual outfits.",
    price: 69.9,
    sizes: ["40", "42", "43"],
    colors: ["gray", "pink"],
    images: { gray: "/products/7g.png", pink: "/products/7p.png" },
  },
  {
    id: 8,
    name: "Levi's Classic Denim",
    category: "jackets",
    shortDescription: "A timeless denim layer with a structured fit.",
    description:
      "This Levi's denim essential brings a classic silhouette, durable feel, and easy styling across seasons.",
    price: 59.9,
    sizes: ["s", "m", "l"],
    colors: ["blue", "green"],
    images: { blue: "/products/8b.png", green: "/products/8gr.png" },
  },
  {
    id: 9,
    name: "Puma Motion Training Tee",
    category: "t-shirts",
    shortDescription: "A lightweight tee built for high-movement sessions.",
    description:
      "The Motion Training Tee combines breathable fabric with a streamlined athletic fit for daily workouts and casual wear.",
    price: 34.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["gray", "green"],
    images: { gray: "/products/2g.png", green: "/products/2gr.png" },
  },
  {
    id: 10,
    name: "Nike Street Flex Runner",
    category: "shoes",
    shortDescription: "A versatile sneaker with an easy everyday feel.",
    description:
      "This Nike runner delivers lightweight comfort, a flexible sole, and simple styling that works from morning errands to evening walks.",
    price: 74.9,
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["gray", "white"],
    images: { gray: "/products/6g.png", white: "/products/6w.png" },
  },
  {
    id: 11,
    name: "AeroFit Performance Jacket",
    category: "jackets",
    shortDescription: "A sleek zip jacket designed for layering and motion.",
    description:
      "AeroFit's performance jacket pairs a clean profile with comfortable warmth, making it a practical layer for cool weather.",
    price: 64.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["green", "black"],
    images: { green: "/products/3gr.png", black: "/products/3bl.png" },
  },
  {
    id: 12,
    name: "Nike Everyday Motion Tee",
    category: "t-shirts",
    shortDescription: "A clean everyday tee with a soft athletic feel.",
    description:
      "Nike Everyday Motion Tee is made for simple styling, light activity, and comfortable all-day wear.",
    price: 32.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["white", "pink"],
    images: { white: "/products/4w.png", pink: "/products/4p.png" },
  },
];

export const getProductById = (id: string) =>
  products.find((product) => product.id.toString() === id);
