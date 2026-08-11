import express from "express";
import Product from "../models/Product.js";
import { adminOnly, protect } from "../middleware/auth.js";

const router = express.Router();

const buildProductQuery = (query) => {
  const filter = {};
  if (query.category && query.category !== "all") filter.category = query.category;
  if (query.size) filter.sizes = query.size.toLowerCase();
  if (query.color) filter.colors = query.color.toLowerCase();
  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }
  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { shortDescription: { $regex: query.search, $options: "i" } },
      { description: { $regex: query.search, $options: "i" } }
    ];
  }
  return filter;
};

const buildSort = (sort) => {
  if (sort === "asc") return { price: 1 };
  if (sort === "desc") return { price: -1 };
  if (sort === "oldest") return { createdAt: 1 };
  return { createdAt: -1 };
};

router.get("/", async (req, res) => {
  const products = await Product.find(buildProductQuery(req.query)).sort(buildSort(req.query.sort));
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found." });
  res.json(product);
});

router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", protect, adminOnly, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!product) return res.status(404).json({ message: "Product not found." });
  res.json(product);
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found." });
  res.json({ message: "Product deleted." });
});

export default router;
