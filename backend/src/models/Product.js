import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, lowercase: true },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    sizes: [{ type: String, required: true, trim: true, lowercase: true }],
    colors: [{ type: String, required: true, trim: true, lowercase: true }],
    images: {
      type: Map,
      of: String,
      required: true
    },
    stock: { type: Number, default: 50, min: 0 },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

productSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    ret.images =
      ret.images instanceof Map ? Object.fromEntries(ret.images) : ret.images || {};
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model("Product", productSchema);
