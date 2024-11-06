import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import AdminMenu from "./AdminMenu.jsx";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

const { Option } = Select;

function CreateProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  const fetchAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API_KEY}/api/v1/category/get-all-category`
      );
      if (data?.success) {
        setCategories(data?.allCategory);
      }
    } catch (error) {
      toast.error("Something Went Wrong while Fetching All Category");
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API_KEY}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 lg:p-8 text-gray-800 bg-secondary">
        <div className="lg:flex gap-6">
          <div className="lg:w-1/4">
            <AdminMenu />
          </div>
          <div className="lg:w-3/4">
            <h2 className="text-2xl font-semibold text-dark mb-4">Create Product</h2>
            <div className="bg-secondary rounded-lg space-y-4">
              <Select
                placeholder="Select a Category"
                showSearch
                className="w-full mb-3"
                onChange={(value) => setCategory(value)}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              
              <div className="mb-3">
                <label className="block w-full border-2 border-dashed border-gray-300 py-4 rounded-lg text-center cursor-pointer">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>
              
              {photo && (
                <div className="text-center mb-3">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    className="w-48 h-48 object-cover mx-auto"
                  />
                </div>
              )}
              
              <input
                type="text"
                value={name}
                placeholder="Write a name"
                className="w-full border border-gray-300 p-2 rounded-lg"
                onChange={(e) => setName(e.target.value)}
              />
              
              <input
                type="text"
                value={description}
                placeholder="Write Description"
                className="w-full border border-gray-300 p-2 rounded-lg"
                onChange={(e) => setDescription(e.target.value)}
              />
              
              <input
                type="number"
                value={price}
                placeholder="Enter Product Price"
                className="w-full border border-gray-300 p-2 rounded-lg"
                onChange={(e) => setPrice(e.target.value)}
              />
              
              <input
                type="text"
                value={quantity}
                placeholder="Enter Product Quantity"
                className="w-full border border-gray-300 p-2 rounded-lg"
                onChange={(e) => setQuantity(e.target.value)}
              />
              
              <Select
                placeholder="Select Shipping"
                size="large"
                showSearch
                className="w-full mb-3"
                onChange={(value) => setShipping(value)}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
              
              <button
                className="w-full bg-dark text-white p-3 rounded-lg font-semibold hover:bg-primary-dark transition duration-200"
                onClick={handleCreate}
              >
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProduct;
