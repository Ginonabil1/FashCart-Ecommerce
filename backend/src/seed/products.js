import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

dotenv.config();

const products = [
  {
    name: "Adidas CoreFit T-Shirt",
    category: "t-shirts",
    shortDescription: "A breathable training tee made for all-day comfort.",
    description: "A lightweight Adidas training tee with a soft feel, relaxed fit, and enough stretch for gym sessions or everyday wear.",
    price: 39.9,
    sizes: ["s", "m", "l", "xl", "xxl"],
    colors: ["gray", "purple", "green"],
    images: { gray: "/products/1g.png", purple: "/products/1p.png", green: "/products/1gr.png" },
    featured: true
  },
  {
    name: "Puma Ultra Warm Zip",
    category: "jackets",
    shortDescription: "A warm zip-up layer built for cool weather.",
    description: "This Puma zip jacket balances warmth and movement, making it a solid option for outdoor walks, commuting, or casual layering.",
    price: 59.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["gray", "green"],
    images: { gray: "/products/2g.png", green: "/products/2gr.png" },
    featured: true
  },
  {
    name: "Nike Air Essentials Pullover",
    category: "jackets",
    shortDescription: "A classic pullover with soft fleece comfort.",
    description: "Nike's everyday pullover delivers a cozy brushed interior, simple styling, and an easy fit that works with both activewear and streetwear.",
    price: 69.9,
    sizes: ["s", "m", "l"],
    colors: ["green", "blue", "black"],
    images: { green: "/products/3gr.png", blue: "/products/3b.png", black: "/products/3bl.png" }
  },
  {
    name: "Nike Dri Flex T-Shirt",
    category: "t-shirts",
    shortDescription: "A quick-dry performance tee for training days.",
    description: "Designed with moisture-wicking fabric and a flexible fit, this Nike tee keeps you comfortable through workouts and daily wear.",
    price: 29.9,
    sizes: ["s", "m", "l"],
    colors: ["white", "pink"],
    images: { white: "/products/4w.png", pink: "/products/4p.png" }
  },
  {
    name: "Under Armour StormFleece",
    category: "jackets",
    shortDescription: "A weather-ready fleece with a sporty finish.",
    description: "Under Armour's StormFleece offers soft insulation with light weather resistance, making it a reliable outer layer in shifting conditions.",
    price: 49.9,
    sizes: ["s", "m", "l"],
    colors: ["red", "orange", "black"],
    images: { red: "/products/5r.png", orange: "/products/5o.png", black: "/products/5bl.png" }
  },
  {
    name: "Nike Air Max 270",
    category: "shoes",
    shortDescription: "A cushioned sneaker with standout everyday style.",
    description: "The Air Max 270 combines visible cushioning, bold shape, and lightweight comfort for all-day wear.",
    price: 59.9,
    sizes: ["40", "42", "43", "44"],
    colors: ["gray", "white"],
    images: { gray: "/products/6g.png", white: "/products/6w.png" },
    featured: true
  },
  {
    name: "Nike Ultraboost Pulse",
    category: "shoes",
    shortDescription: "A sleek running-inspired sneaker with plush comfort.",
    description: "Built with a responsive feel and a streamlined profile, the Ultraboost Pulse transitions easily from active hours to casual outfits.",
    price: 69.9,
    sizes: ["40", "42", "43"],
    colors: ["gray", "pink"],
    images: { gray: "/products/7g.png", pink: "/products/7p.png" }
  },
  {
    name: "Levi's Classic Denim",
    category: "jackets",
    shortDescription: "A timeless denim layer with a structured fit.",
    description: "This Levi's denim essential brings a classic silhouette, durable feel, and easy styling across seasons.",
    price: 59.9,
    sizes: ["s", "m", "l"],
    colors: ["blue", "green"],
    images: { blue: "/products/8b.png", green: "/products/8gr.png" }
  },
  {
    name: "Adidas Studio Training Tee",
    category: "t-shirts",
    shortDescription: "A soft training tee for warmups, lifting, and everyday wear.",
    description: "A clean Adidas tee with breathable fabric, easy movement, and simple styling for gym sessions or casual outfits.",
    price: 34.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["gray", "green"],
    images: { gray: "/products/1g.png", green: "/products/1gr.png" },
    stock: 65
  },
  {
    name: "Nike Tempo Street Jacket",
    category: "jackets",
    shortDescription: "A lightweight layer with a sporty streetwear shape.",
    description: "Nike Tempo Street Jacket keeps the look sharp while adding a comfortable layer for cool evenings and travel days.",
    price: 79.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["black", "green", "blue"],
    images: { black: "/products/3bl.png", green: "/products/3gr.png", blue: "/products/3b.png" },
    stock: 42,
    featured: true
  },
  {
    name: "Puma Flex Runner",
    category: "shoes",
    shortDescription: "A flexible sneaker built for comfort and daily movement.",
    description: "Puma Flex Runner combines a cushioned sole, breathable upper, and easy everyday profile for active routines.",
    price: 64.9,
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["gray", "white"],
    images: { gray: "/products/6g.png", white: "/products/6w.png" },
    stock: 58
  },
  {
    name: "Under Armour HeatGear Tee",
    category: "t-shirts",
    shortDescription: "A fitted performance tee with a smooth athletic feel.",
    description: "This HeatGear tee is made for intense training days, with a light feel and a close fit that stays comfortable.",
    price: 31.9,
    sizes: ["s", "m", "l", "xl", "xxl"],
    colors: ["white", "pink"],
    images: { white: "/products/4w.png", pink: "/products/4p.png" },
    stock: 72
  },
  {
    name: "Levi's Utility Denim Jacket",
    category: "jackets",
    shortDescription: "A rugged denim jacket with simple all-season styling.",
    description: "Levi's Utility Denim Jacket has a structured fit, durable cotton feel, and versatile styling for everyday outfits.",
    price: 84.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["blue", "green"],
    images: { blue: "/products/8b.png", green: "/products/8gr.png" },
    stock: 36
  },
  {
    name: "Nike Rose Court Sneaker",
    category: "shoes",
    shortDescription: "A clean sneaker with a soft pink colorway option.",
    description: "Nike Rose Court Sneaker brings cushioned comfort and a low-profile court-inspired shape for everyday styling.",
    price: 74.9,
    sizes: ["40", "41", "42", "43"],
    colors: ["gray", "pink"],
    images: { gray: "/products/7g.png", pink: "/products/7p.png" },
    stock: 44
  },
  {
    name: "Puma Motion Zip Hoodie",
    category: "jackets",
    shortDescription: "A cozy zip hoodie for travel, workouts, and relaxed days.",
    description: "Puma Motion Zip Hoodie offers a soft interior, easy zip-front design, and useful warmth without feeling bulky.",
    price: 54.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["gray", "green"],
    images: { gray: "/products/2g.png", green: "/products/2gr.png" },
    stock: 53
  },
  {
    name: "Adidas Purple Core Tee",
    category: "t-shirts",
    shortDescription: "A bright everyday tee with a comfortable athletic cut.",
    description: "Adidas Purple Core Tee keeps the silhouette simple and adds a stronger color option for easy casual looks.",
    price: 36.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["purple", "gray", "green"],
    images: { purple: "/products/1p.png", gray: "/products/1g.png", green: "/products/1gr.png" },
    stock: 60
  },
  {
    name: "Nike Flex Training Shorts",
    category: "shorts",
    shortDescription: "Lightweight training shorts with an easy athletic fit.",
    description: "Nike Flex Training Shorts are made for gym days, runs, and relaxed casual wear with a smooth waistband and flexible fabric.",
    price: 42.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["black", "gray"],
    images: { black: "/products/3bl.png", gray: "/products/6g.png" },
    stock: 70,
    featured: true
  },
  {
    name: "Adidas Core Woven Shorts",
    category: "shorts",
    shortDescription: "Breathable woven shorts for warm weather and workouts.",
    description: "Adidas Core Woven Shorts keep the fit clean and comfortable with a lightweight feel that works for training or weekend errands.",
    price: 38.9,
    sizes: ["s", "m", "l", "xl", "xxl"],
    colors: ["green", "gray"],
    images: { green: "/products/1gr.png", gray: "/products/1g.png" },
    stock: 62
  },
  {
    name: "Puma Everyday Fleece Shorts",
    category: "shorts",
    shortDescription: "Soft fleece shorts for off-duty comfort.",
    description: "Puma Everyday Fleece Shorts offer a relaxed fit, soft interior, and simple styling for casual days.",
    price: 44.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["gray", "green"],
    images: { gray: "/products/2g.png", green: "/products/2gr.png" },
    stock: 48
  },
  {
    name: "Under Armour Sprint Shorts",
    category: "shorts",
    shortDescription: "Quick-dry shorts built for fast training sessions.",
    description: "Under Armour Sprint Shorts use a light performance feel and secure fit for running, conditioning, and warm-weather movement.",
    price: 46.9,
    sizes: ["s", "m", "l"],
    colors: ["red", "black"],
    images: { red: "/products/5r.png", black: "/products/5bl.png" },
    stock: 41
  }
];

const seed = async () => {
  await connectDB();
  await Product.deleteMany();
  await Product.insertMany(products);

  const adminEmail = process.env.ADMIN_EMAIL || "admin@fashcart.com";
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      fullName: process.env.ADMIN_NAME || "Store Admin",
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || "admin12345",
      role: "admin"
    });
  }

  console.log(`Seeded ${products.length} products.`);
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
