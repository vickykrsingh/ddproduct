import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import AdminMenu from "./AdminMenu.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading.jsx";
import { TfiReload } from "react-icons/tfi";
import AddToCart from "../../components/Buttons/AddToCart.jsx";
import SeeMore from "../../components/Buttons/SeeMore.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [auth, setAuth] = useAuth();

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_API_KEY
        }/api/v1/product/product-list/${page}`
      );
      if (data?.success) {
        setProducts(data?.products);
      }
      setLoading(false);
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  useEffect(() => {
    getAllProduct();
    // eslint-disable-next-line
  }, []);

  const totalProductCount = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API_KEY}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  useEffect(() => {
    if (page > 1) {
      loadMore();
    }
    // eslint-disable-next-line
  }, [page]);

  const loadMore = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_API_KEY
        }/api/v1/product/product-list/${page}`
      );
      setProducts([...products, ...data?.products]);
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  useEffect(() => {
    totalProductCount();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout title={"E-Commerce All Products"}>
          <div className="container mx-auto py-10 text-[yourTextColorVariable]">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 mb-8 md:mb-0">
                <AdminMenu />
              </div>
              <div className="md:w-3/4">
                <h2 className="text-3xl font-semibold mb-6">All Products</h2>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((p) => (
                    <Link
                      to={
                        auth?.user?.role === 1
                          ? `/dashboard/admin/product/${p._id}`
                          : `/product-detail/${p._id}/${p.category}`
                      }
                      key={p._id}
                      className="p-4 bg-primary rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 text-dark"
                    >
                      <img
                        className="w-full h-48 object-cover rounded-md mb-4"
                        src={`${
                          import.meta.env.VITE_APP_API_KEY
                        }/api/v1/product/product-photo/${p._id}`}
                        alt="Product"
                      />
                      <div className="flex flex-col gap-2">
                        <h5 className="text-lg font-bold mb-2">{p.name}</h5>
                        <p className="text-sm">
                          {p.description.substring(0, 50)}...
                        </p>
                        <div className="bg-primary rounded text-base font-semibold">
                          ₹{p.price} | Stock: {p.quantity}
                        </div>
                        <div className="flex">
                          <AddToCart pId={p._id} cId={p.category} />
                          <SeeMore pId={p._id} cId={p.category} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {products && products.length < total && (
                  <div className="text-center mt-8">
                    <button
                      className="flex items-center justify-center bg-[yourButtonColor] text-white px-4 py-2 rounded-full font-semibold hover:bg-[yourHoverColor] transition"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page + 1);
                      }}
                    >
                      {loading ? <Loading /> : <TfiReload />}
                      <span className="ml-2">Load More</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}

export default Products;
