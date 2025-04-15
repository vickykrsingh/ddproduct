import React, { useState } from "react";
import axios from "axios";
import { useSearch } from "../context/SearchContext.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Search() {
  // const [values, setValues] = useState("");
  const [searchProduct, setSearchProduct] = useSearch([]);
  const navigate = useNavigate();

  const handleSearch = async (value) => {
    if(value.length>0){
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_APP_API_KEY}/api/v1/product/search/${value}`);
        if (data?.success) {
          setSearchProduct(data?.products);
          navigate("/search");
        }
      } catch (error) {
        toast.error("Request Timeout");
      }
    }else{
      setSearchProduct([])
    }
  };

  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args); // pass arguments here
      }, delay);
    };
  }
  

  const debouncedSearch = debounce(handleSearch, 500);

  return (
    <div className="w-full mx-auto rounded-md">
      <div
        className="flex flex-col sm:flex-row sm:items-center bg-gray-300 rounded-md"
      >
        <input
          className="w-full px-4 py-2 mb-4 sm:mb-0 focus:outline-none text-gray-700 bg-gray-300 rounded-md"
          type="search"
          placeholder="Search for products..."
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Search;
