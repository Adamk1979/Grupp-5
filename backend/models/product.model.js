import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  inStock: Boolean,
  category: String,
  image: String,
});

// Function to get the model for a given collection
const getProductModel = (collectionName) => {
  // This will create or return an existing model for the specified collection
  return mongoose.model(collectionName, productSchema, collectionName);
};

export default getProductModel;
