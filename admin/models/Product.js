import mongoose, { model, Schema, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true }, 
  inStock: { type: Boolean, required: true },
  category: { type: mongoose.Types.ObjectId, ref: 'Category' },
  image: { type: String, required: true },
}, {
  timestamps: true, 
});

export const Product = models.Product || model('Product', ProductSchema);
