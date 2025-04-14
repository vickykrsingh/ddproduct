import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout.jsx";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { prices } from "../components/Prices.jsx";
import { Radio } from "antd";
import Loading from "../components/Loading.jsx";
import AddToCart from "../components/Buttons/AddToCart.jsx";
import SeeMore from "../components/Buttons/SeeMore.jsx";
import { useGlobalLoading } from "../context/GlobalLoading.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import Banner from "../components/Layout/banner1.png";
import toast from "react-hot-toast";
import { GrPowerReset } from "react-icons/gr";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [category, setCategory] = useState([]);
  const [categoryChange, setCategoryChange] = useState([]);
  const [priceChange, setPriceChange] = useState([]);
  const { page } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useGlobalLoading();
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    getAllProduct();
  }, [categoryChange, priceChange]);

  const handlePageChange = (newPage) => {
    setCurPage(newPage);
    navigate(`/${newPage}`);
  };

  useEffect(() => {
    fetchAllCategory();
    getAllProduct();
  }, [curPage]);

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API_KEY}/api/v1/product/product-filter/${
          page ? page : 1
        }`,
        {
          checked: categoryChange,
          radio: priceChange,
        }
      );
      if (data?.success) {
        setProducts(data?.products);
        setPageCount(data.pageCount);
      }
    } catch (error) {
      toast.error("Request Timeout");
    } finally {
      setLoading(false);
    }
  };
  // Get All Category
  const fetchAllCategory = async () => {
    try {
      const category = await axios.get(
        `${import.meta.env.VITE_APP_API_KEY}/api/v1/category/get-all-category`
      );
      if (category?.data?.success) {
        setCategory(category?.data?.allCategory);
      }
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
            <img
              src={Banner}
              alt="Banner"
              className="rounded-lg w-full h-64 object-cover"
            />
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
                      value={c._id}
                      className="form-checkbox text-primary"
                      onChange={(e) => {
                        if (categoryChange.includes(e.target.value)) {
                          const curCategory = categoryChange.filter(
                            (item) => item != e.target.value
                          );
                          setCategoryChange((prev) => (prev = curCategory));
                        } else {
                          setCategoryChange(
                            (prev) =>
                              (prev = [...categoryChange, e.target.value])
                          );
                        }
                      }}
                    />
                    <label className="text-dark">{c.name}</label>
                  </div>
                ))}
                <button
                  className="bg-grey-500 flex text-lg items-center justify-center gap-4 bg-gray-300 px-4 py-2"
                  onClick={() => setCategoryChange((prev) => (prev = []))}
                >
                  Reset Category <GrPowerReset size={20} />
                </button>
              </div>

              {/* Price Filter */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Price Range</h3>
                <Radio.Group className="flex flex-col mt-2 space-y-2">
                  {prices.map((p) => (
                    <Radio
                      key={p._id}
                      value={p.array}
                      onChange={() =>
                        setPriceChange(
                          (prev) => (prev = [p.array[0], p.array[1]])
                        )
                      }
                      className="text-dark"
                    >
                      {p.name}
                    </Radio>
                  ))}
                </Radio.Group>
                <button
                  className="bg-grey-500 flex text-lg items-center justify-center gap-4 bg-gray-300 px-4 py-2 my-4"
                  onClick={() => setPriceChange((prev) => (prev = []))}
                >
                  Reset Price
                  <GrPowerReset size={20} />
                </button>
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
                    <h1 className="text-error text-center col-span-full">
                      No Products Found
                    </h1>
                  ) : (
                    products.map((p) => (
                      <Link
                        to={
                          auth?.user?.role === 1
                            ? `/dashboard/admin/product/${p._id}`
                            : `/product-detail/${p._id}/${p.category}`
                        }
                        className="bg-primary rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 p-6"
                        key={p._id}
                      >
                        <img
                          src={`${
                            import.meta.env.VITE_APP_API_KEY
                          }/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="mt-4">
                          <h5 className="text-lg font-semibold text-dark">
                            {p.name}
                          </h5>
                          <p className="text-gray-500 mt-1">
                            {p.description.substring(0, 25)}...
                          </p>
                          <div className="text-lg font-bold text-dark mt-2">
                            &#8377;{p.price} | Stock {p.quantity} items
                          </div>
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
              <div className="my-4 py-4 flex items-center justify-center w-full h-20 bg-secondary gap-4 shadow-md">
                {curPage > 1 && (
                  <button
                    className="px-4 py-2 bg-gray-400 rounded-md font-semibold text-gray-800 shadow-md"
                    onClick={() => handlePageChange(curPage - 1)}
                  >
                    Prev
                  </button>
                )}
                {Array.from({ length: pageCount }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 ${curPage==index+1 ? 'bg-dark text-secondary' : 'bg-gray-400'} rounded-md font-semibold text-gray-800 shadow-md `}
                  >
                    {index + 1}
                  </button>
                ))}
                {curPage < pageCount && (
                  <button
                    className="px-4 py-2 bg-gray-400 rounded-md font-semibold text-gray-800 shadow-md"
                    onClick={() => handlePageChange(curPage + 1)}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
