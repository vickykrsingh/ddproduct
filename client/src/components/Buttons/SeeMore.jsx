import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa"; // Using arrow icon for "See More"

function SeeMore({ pId, cId, width = 4, height = 1 }) {
  const navigate = useNavigate();

  const handleProductDetail = async (e) => {
    e.preventDefault();
    try {
      navigate(`/product-detail/${pId}/${cId}`);
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  return (
    <button
      onClick={(e) => { e.preventDefault(); handleProductDetail(e); }}
      className={`w-${width} h-${height} flex items-center justify-center py-3 px-6 md:px-2 xl:px-6 bg-primary text-dark font-semibold rounded-md transition-all transform hover:scale-105 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark shadow-md ms-2`}
      style={{ border: "2px solid #7f8fa6" }}
    >
      <span className="text-sm mr-2">See More</span>
      <FaArrowRight className="text-sm" />
    </button>
  );
}

export default SeeMore;
