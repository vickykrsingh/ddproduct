import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import { useSearch } from "../context/SearchContext.jsx";
import { Link } from "react-router-dom";
import SeeMore from "../components/Buttons/SeeMore.jsx";
import AddToCart from "../components/Buttons/AddToCart.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function SearchPage() {
  const [searchProduct, setSearchProduct] = useSearch([]);
  const [auth, setAuth] = useAuth();

  return (
    <Layout>
      <div className="container mx-auto pt-8 px-4">
        <h4 className="text-3xl font-semibold text-dark mb-8">All Products</h4>
        {searchProduct.length <= 0 ? (
          <h2 className="text-2xl font-bold text-danger">No Product Found</h2>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchProduct.map((p) => (
              <Link
                to={
                  auth?.user?.role === 1
                    ? `/dashboard/admin/product/${p._id}`
                    : `/product-detail/${p._id}/${p.category}`
                }
                className="bg-secondary-800 text-dark rounded-lg overflow-hidden shadow-lg"
                key={p._id}
              >
                <img
                  className="w-full h-56 object-cover"
                  src={`${import.meta.env.VITE_APP_API_KEY}/api/v1/product/product-photo/${p._id}`}
                  alt="Product Image"
                />
                <div className="px-4 pt-4 text-dark">
                  <h5 className="text-xl font-semibold">{p.name}</h5>
                  <p className="text-sm text-dark">{p.description.substring(0, 25)}...</p>
                </div>
                <ul className="list-group list-group-flush px-2">
                  <li className="bg-secondary-900 text-dark p-2 font-semibold">
                    &#8377;{p.price} | Stock: {p.quantity} items
                  </li>
                  <div className="flex justify-between items-center pb-4">
                    <SeeMore pId={p._id} cId={p.category} />
                    <AddToCart product={p} width={2} height={1} />
                  </div>
                </ul>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default SearchPage;
