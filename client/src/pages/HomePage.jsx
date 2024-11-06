import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import { prices } from "../components/Prices.jsx";
import { Radio } from "antd";
import { TfiReload } from "react-icons/tfi";
import Loading from "../components/Loading.jsx";
import AddToCart from "../components/Buttons/AddToCart.jsx";
import SeeMore from "../components/Buttons/SeeMore.jsx";
import { useGlobalLoading } from "../context/GlobalLoading.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import Banner from "../components/Layout/banner1.png";
import toast from "react-hot-toast";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useGlobalLoading();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (!checked.length || !radio.length) {
      totalProductCount();
    }
    fetchAllCategory();
  }, [checked.length, radio.length]);

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    try {
      setLoading(true);
      setGlobalLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_APP_API_KEY}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setGlobalLoading(false);
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  const fetchAllCategory = async () => {
    try {
      const category = await axios.get(`${import.meta.env.VITE_APP_API_KEY}/api/v1/category/get-all-category`);
      if (category?.data?.success) {
        setCategory(category?.data?.allCategory);
      }
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  const handleCategoryFilter = (value, id) => {
    let allProduct = [...checked];
    if (value) {
      allProduct.push(id);
    } else {
      allProduct = allProduct.filter((p) => p !== id);
    }
    setChecked(allProduct);
  };

  const totalProductCount = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_API_KEY}/api/v1/product/product-count`);
      console.log(data)
      setTotal(data?.total);
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  useEffect(() => {
    if (page > 1) {
      loadMore();
    }
  }, [page]);

  const loadMore = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_API_KEY}/api/v1/product/product-list/${page}`);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio]);

  const filterProducts = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_APP_API_KEY}/api/v1/product/product-filter`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  return (
    <Layout title={"ECommerce - Home"}>
      {globalLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4 py-8">
          {/* Banner Section */}
          <div className="mb-10">
            <img src={Banner} alt="Banner" className="rounded-lg w-full h-64 object-cover" />
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filter */}
            <div className="md:w-1/4 p-6 bg-secondary text-dark rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Filter Products</h2>
              
              {/* Category Filter */}
              <div className="space-y-4">
                {category?.map((c) => (
                  <div key={c._id} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="form-checkbox text-primary"
                      onChange={(e) => handleCategoryFilter(e.target.checked, c._id)}
                    />
                    <label className="text-dark">{c.name}</label>
                  </div>
                ))}
              </div>
              
              {/* Price Filter */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Price Range</h3>
                <Radio.Group onChange={(e) => setRadio(e.target.value)} className="flex flex-col mt-2 space-y-2">
                  {prices.map((p) => (
                    <Radio key={p._id} value={p.array} className="text-dark">
                      {p.name}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
            </div>
            
            {/* Products List */}
            <div className="md:w-3/4">
              <h4 className="text-3xl font-semibold mb-8">All Products</h4>
              {loading ? (
                <Loading />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.length === 0 ? (
                    <h1 className="text-error text-center col-span-full">No Products Found</h1>
                  ) : (
                    products.map((p) => (
                      <Link
                        to={auth?.user?.role === 1 ? `/dashboard/admin/product/${p._id}` : `/product-detail/${p._id}/${p.category}`}
                        className="bg-primary rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 p-6"
                        key={p._id}
                      >
                        <img
                          src={`${import.meta.env.VITE_APP_API_KEY}/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="mt-4">
                          <h5 className="text-lg font-semibold text-dark">{p.name}</h5>
                          <p className="text-secondary mt-1">{p.description.substring(0, 25)}...</p>
                          <div className="text-lg font-bold text-dark mt-2">&#8377;{p.price} | Stock {p.quantity} items</div>
                          <div className="flex justify-between mt-4">
                            <AddToCart product={p} />
                            <SeeMore pId={p._id} cId={p.category} />
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
              {products.length < total && (
                <div className="text-center mt-8">
                  <button
                    className="flex items-center justify-center text-dark bg-transparent hover:bg-dark px-4 py-2 rounded-lg font-semibold"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loading ? <Loading /> : <TfiReload className="mr-2" />} Load More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
