import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import AdminMenu from "./AdminMenu.jsx";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const { Option } = Select;

function UpdateProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [pid, setPid] = useState("");
  const params = useParams();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API_KEY}/api/v1/product/get-product/${params.id}`
      );
      setName(data.product.name);
      setDescription(data.product.description);
      setQuantity(data.product.quantity);
      setPrice(data.product.price);
      setShipping(data.product.shipping);
      setPhoto(data.product.photo);
      setPid(data.product._id);
      setCategory(data.product.category._id);
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const fetchAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_API_KEY}/api/v1/category/get-all-category`);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (photo) productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const { data } = await axios.put(
        `${import.meta.env.VITE_APP_API_KEY}/api/v1/product/update-product/${pid}`,
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

  const handleDelete = async () => {
    try {
      const ans = prompt("Are you sure to delete this product?");
      if (!ans) return;
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_API_KEY}/api/v1/product/delete-product/${pid}`
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
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 bg-primary text-dark p-6 rounded-lg shadow-md">
            <AdminMenu />
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4 p-6 bg-primary text-dark rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-8 text-center">Update Product</h2>
            <form onSubmit={handleUpdate} className="space-y-6">
              {/* Category */}
              <div>
                <label htmlFor="category" className="block mb-2 font-medium text-dark">
                  Category
                </label>
                <Select
                  bordered={false}
                  placeholder="Select a Category"
                  showSearch
                  className="w-full bg-primary text-dark border border-dark p-3 rounded-md"
                  onChange={(value) => setCategory(value)}
                  value={category}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* Photo Upload */}
              <div className="w-full bg-secondary py-3 px-4">
                <label className="w-full bg-secondary text-dark py-2 rounded-md text-center">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
                {photo && (
                  <div className="mt-4">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      className="max-h-56 mx-auto rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                <input
                  type="text"
                  value={name}
                  placeholder="Product Name"
                  className="w-full bg-primary text-dark border border-dark p-3 rounded-md"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  value={description}
                  placeholder="Product Description"
                  className="w-full bg-primary text-dark border border-dark p-3 rounded-md"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="number"
                  value={price}
                  placeholder="Product Price"
                  className="w-full bg-primary text-dark border border-dark p-3 rounded-md"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  type="number"
                  value={quantity}
                  placeholder="Product Quantity"
                  className="w-full bg-primary text-dark border border-dark p-3 rounded-md"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              {/* Shipping Select */}
              <div>
                <label htmlFor="shipping" className="block mb-2 text-sm font-medium text-primary">
                  Shipping Available
                </label>
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  className="w-full bg-primary text-dark border border-dark p-3 rounded-md"
                  value={shipping === "0" ? "No" : "Yes"}
                  onChange={(value) => setShipping(value)}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              {/* Buttons */}
              <div className="flex justify-between space-x-4">
                <button
                  type="submit"
                  className="btn btn-primary w-full sm:w-auto py-3 px-4 rounded-md bg-dark text-primary"
                >
                  UPDATE PRODUCT
                </button>
                <button
                  type="button"
                  className="btn btn-danger w-full sm:w-auto py-3 px-4 rounded-md bg-dark text-secondary"
                  onClick={handleDelete}
                >
                  DELETE PRODUCT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UpdateProduct;
