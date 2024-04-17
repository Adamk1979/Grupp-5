import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  name: existingName, // Updated from existingTitle
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties, // Consider if this is still needed based on your schema updates
}) {
  const [name, setName] = useState(existingName || ''); // Updated from title to name
  const [description, setDescription] = useState(existingDescription || '');
  const [category, setCategory] = useState(assignedCategory || '');
  const [price, setPrice] = useState(existingPrice || '');
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    });
  }, []);

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      name, // Updated field key
      description,
      price,
      inStock: true, // Assuming always true when creating/updating, adjust as needed
      category,
      image: images.length > 0 ? images[0] : '', // Assuming the first image in the array
    };

    try {
      if (_id) {
        // Update existing product
        await axios.put(`/api/products/${_id}`, data); // Adjust if necessary to match your API route
      } else {
        // Create new product
        await axios.post('/api/products', data);
      }
      setGoToProducts(true);
    } catch (error) {
      console.error('Failed to save product:', error);
      // Handle error appropriately
    }
  }

  if (goToProducts) {
    router.push('/products');
  }

  async function uploadImages(ev) {
    const files = ev.target.files;
    if (files.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const response = await axios.post('/api/upload', data);
      setImages(oldImages => [...oldImages, ...response.data.links]);
      setIsUploading(false);
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={ev => setName(ev.target.value)}
      />
      <label>Description</label>
      <textarea
        placeholder="Description"
        value={description}
        onChange={ev => setDescription(ev.target.value)}
      />
      <label>Price (in USD)</label>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={ev => setPrice(ev.target.value)}
      />
      <label>Category</label>
      <select
        value={category}
        onChange={ev => setCategory(ev.target.value)}
      >
        <option value="">No parent category</option>
        {categories.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          list={images}
          setList={updateImagesOrder}
          className="flex flex-wrap gap-1"
        >
          {images.map((link, index) => (
            <div key={index} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
              <img src={link} alt="" className="rounded-lg"/>
            </div>
          ))}
        </ReactSortable>
        {isUploading && <Spinner />}
        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          Add image
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
      </div>
      <button type="submit" className="btn-primary">Save</button>
    </form>
  );
}