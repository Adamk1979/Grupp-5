import getProductModel from "../models/product.model.js"; // Assuming product.model.js is in the models folder

// Fetches products from multiple collections and combines the results
export const fetchProductsFromCollections = async (collectionNames) => {
  try {
    const products = await Promise.all(
      collectionNames.map((collection) => {
        const Product = getProductModel(collection);
        return Product.find(); // You might add .lean() if not manipulating data for performance
      })
    );
    const flatProducts = products.flat();
    console.log("Fetched products:", flatProducts); // Logging fetched data
    return flatProducts;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};
