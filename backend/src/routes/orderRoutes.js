import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { adminOnly, protect } from "../middleware/auth.js";

const router = express.Router();
const DISCOUNT_RATE = 0.1;
const SHIPPING_FEE = 10;

router.post("/", protect, async (req, res) => {
  try {
    const { items, shippingDetails, paymentMethod = "cod", paymentReference = "" } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order items are required." });
    }

    const productIds = items.map((item) => item.product || item.id);
    const products = await Product.find({ _id: { $in: productIds } });

    const orderItems = items.map((item) => {
      const product = products.find((entry) => entry._id.toString() === (item.product || item.id));
      if (!product) throw new Error("One or more products no longer exist.");

      const selectedColor = item.selectedColor || product.colors[0];
      return {
        product: product._id,
        name: product.name,
        image: product.images.get(selectedColor) || [...product.images.values()][0],
        price: product.price,
        quantity: Number(item.quantity || 1),
        selectedSize: item.selectedSize || product.sizes[0],
        selectedColor
      };
    });

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = subtotal * DISCOUNT_RATE;
    const shippingFee = subtotal > 0 ? SHIPPING_FEE : 0;
    const total = subtotal - discount + shippingFee;

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingDetails,
      subtotal,
      discount,
      shippingFee,
      total,
      paymentMethod,
      paymentReference,
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid"
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/mine", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

router.get("/", protect, adminOnly, async (_req, res) => {
  const orders = await Order.find().populate("user", "fullName email").sort({ createdAt: -1 });
  res.json(orders);
});

router.put("/:id/status", protect, adminOnly, async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { orderStatus: req.body.orderStatus },
    { new: true, runValidators: true }
  );

  if (!order) return res.status(404).json({ message: "Order not found." });
  res.json(order);
});

export default router;
