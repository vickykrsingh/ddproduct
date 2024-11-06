import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa"; // Importing Add to Cart icon

function AddToCart({ product, width = 3, height = 1 }) {
  const [fire, setFire] = useState(false);

  const getAllCart = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_APP_API_KEY}/api/v1/cart/get-all-cart`);
      return;
    } catch (error) {
      toast.error("Request timeout while getting all products");
    }
  };

  const handleCart = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_APP_API_KEY}/api/v1/cart/add-to-cart`, {
        _id: product._id,
        category: product.category,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        shipping: product.shipping,
        slug: product.slug,
      });

      if (data?.success) {
        getAllCart();
        toast.success("Added to cart successfully!");
      }
    } catch (error) {
      toast.error("Timeout while adding product to your cart");
    }
  };

  return (
    <button
      onClick={(e) => { handleCart(e); setFire(true); }}
      className={`w-${width} h-${height} flex items-center justify-center py-3 px-6 bg-primary text-dark font-semibold rounded-md transition-all transform hover:scale-105 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark shadow-md ${fire ? 'bg-opacity-75' : ''}`}
      style={{ border: "2px solid #7f8fa6" }}
    >
      <FaShoppingCart className="text-2xl" />
    </button>
  );
}

export default AddToCart;
