import React, { useState } from "react";
import axios from "axios";
import { useSearch } from "../context/SearchContext.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Search() {
  const [values, setValues] = useState("");
  const [searchProduct, setSearchProduct] = useSearch([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.get(`${import.meta.env.VITE_APP_API_KEY}/api/v1/product/search/${values}`);
      if (data?.success) {
        setSearchProduct(data?.products);
        navigate("/search");
      }
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        className="flex flex-col sm:flex-row sm:items-center bg-secondary shadow-md"
        onSubmit={handleSearch}
      >
        <input
          className="w-full sm:w-3/4 px-4 py-2 mb-4 sm:mb-0 focus:outline-none text-gray-700 bg-secondary"
          type="search"
          placeholder="Search for products..."
          onChange={(e) => setValues(e.target.value)}
          value={values}
        />
        <button
          className="w-full sm:w-1/4 px-4 py-2 bg-primary text-dark hover:bg-secondary"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
