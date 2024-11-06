import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GetUserLocationForm from "../components/GetUserLocationForm.jsx";
import { useAddress } from "../context/SetCurrentAddress.jsx";

function Cart() {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [tot, setTot] = useState(0);
  const navigate = useNavigate();
  const { currentAddress, setCurrentAddress } = useAddress({});
  
  const getAllCart = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_API_KEY}/api/v1/cart/get-all-cart`);
      setCart(data?.cartItem);
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  const fetchTotPrice = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_API_KEY}/api/v1/cart/get-all-cart`);
      if (data?.cartItem.length > 0) {
        const tot = data?.cartItem.map((t) => t.pPrice);
        const total = tot.reduce((a, b) => a + b);
        setTot(total);
      }
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  const handleRemoveCart = async (event, id) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_APP_API_KEY}/api/v1/cart/delete-single-cart`, { id });
      if (data?.success) {
        toast.success("Removed From Cart Successfully");
        getAllCart();
        fetchTotPrice();
      }
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  const handleCheckout = async () => {
    try {
      const { data: { key } } = await axios.get(`${import.meta.env.VITE_APP_API_KEY}/api/v1/payment/get-key`);
      const { data: { order } } = await axios.post(`${import.meta.env.VITE_APP_API_KEY}/api/v1/payment/checkout`, { amount: Number(tot) });
      
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "DD Product",
        description: "Test Transaction",
        order_id: order.id,
        handler: async (response) => {
          const { data } = await axios.post(`${import.meta.env.VITE_APP_API_KEY}/api/v1/payment/payment-verification`, {
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
            cart,
            tot,
            address: currentAddress,
          });
          if (data?.success) {
            setCart([]);
            navigate("/dashboard/user/orders");
          }
        },
        prefill: {
          name: "Vicky Kumar",
          email: "vickykrsingh27@gmail.com",
          contact: "9508896862",
        },
        theme: {
          color: "#3399cc",
        },
      };
      
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  useEffect(() => {
    getAllCart();
    fetchTotPrice();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4">
        {cart.length === 0 ? (
          <div className="flex items-center justify-center h-screen text-center">
            <h3 className="text-gray-700">No item in Your Cart</h3>
          </div>
        ) : (
          <div className="pt-8">
            <h4 className="text-teal-700 font-semibold mb-4">
              You have {cart?.length || "0"} items in your cart, please check it out
            </h4>
            <div className="space-y-4">
              {cart.map((p) => (
                <div className="flex items-center bg-white shadow rounded-lg p-4" key={p._id}>
                  <img
                    src={`${import.meta.env.VITE_APP_API_KEY}/api/v1/product/product-photo/${p.productId}`}
                    alt="Product"
                    className="w-24 h-24 rounded-md mr-4 object-cover"
                  />
                  <div className="flex-grow">
                    <h5 className="font-bold text-gray-800">{p.pName}</h5>
                    <p className="text-sm text-gray-600">{p.pDescription.substring(0, 30)}...</p>
                    <p className="text-gray-700 font-semibold">Price: &#8377;{p.pPrice}</p>
                    <button
                      onClick={(event) => handleRemoveCart(event, p._id)}
                      className="text-red-600 hover:text-red-800 font-semibold mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {cart.length > 0 && (
          <div className="mt-8">
            <GetUserLocationForm />
            <div className="flex flex-col items-end mt-4">
              <h3 className="text-xl font-bold text-gray-800">Total: &#8377;{tot}</h3>
              {auth?.user ? (
                <button
                  onClick={handleCheckout}
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-teal-600"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <div className="text-center mt-4">
                  <h3 className="text-red-500 font-semibold">Oops! You are not logged in</h3>
                  <p className="text-gray-600">Please login to proceed with checkout</p>
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-red-600"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Cart;
