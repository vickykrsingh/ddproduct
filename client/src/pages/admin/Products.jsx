import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import AdminMenu from "./AdminMenu.jsx";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading.jsx";
import AddToCart from "../../components/Buttons/AddToCart.jsx";
import SeeMore from "../../components/Buttons/SeeMore.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [auth, setAuth] = useAuth();
  const [curPage, setCurPage] = useState(1);
  const { page } = useParams();
  const navigate = useNavigate();

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_APP_API_KEY
        }/api/v1/product/product-filter/${page}`
      );
      if (data?.success) {
        setProducts(data?.products);
        setPageCount(data.pageCount);
      }
      setLoading(false);
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  const handlePageChange = (newPage) => {
    setCurPage(newPage);
    navigate(`/dashboard/admin/products/${newPage}`);
  };

  useEffect(() => {
    getAllProduct();
  }, [curPage]);

  return (
    <>
      <Layout title={"E-Commerce All Products"}>
        <div className="container mx-auto py-10 text-[yourTextColorVariable]">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-8 md:mb-0">
              <AdminMenu />
            </div>
            <div className="md:w-3/4">
              <h2 className="text-3xl font-semibold mb-6">All Products</h2>
              {loading ? (
                <Loading />
              ) : (
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
                    className={`px-4 py-2 ${
                      curPage == index + 1
                        ? "bg-dark text-secondary"
                        : "bg-gray-400"
                    } rounded-md font-semibold text-gray-800 shadow-md `}
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
      </Layout>
    </>
  );
}

export default Products;
