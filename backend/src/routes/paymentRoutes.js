import express from "express";
import Razorpay from "razorpay";
import Stripe from "stripe";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/stripe/create-checkout-session", protect, async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(501).json({ message: "Stripe is not configured yet." });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { items = [] } = req.body;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(Number(item.price) * 100)
      },
      quantity: item.quantity || 1
    })),
    success_url: `${process.env.CLIENT_URL}/cart?checkout=success`,
    cancel_url: `${process.env.CLIENT_URL}/cart?checkout=cancelled`
  });

  res.json({ url: session.url });
});

router.post("/razorpay/order", protect, async (req, res) => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return res.status(501).json({ message: "Razorpay is not configured yet." });
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });

  const amount = Math.round(Number(req.body.amount || 0) * 100);
  const order = await razorpay.orders.create({ amount, currency: "USD" });
  res.json(order);
});

export default router;
