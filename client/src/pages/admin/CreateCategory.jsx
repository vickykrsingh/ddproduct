import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout.jsx";
import AdminMenu from "./AdminMenu.jsx";
import { ImBin } from "react-icons/im";
import { FiEdit } from "react-icons/fi";
import CategoryInput from "../../components/CategoryInput.jsx";
import { Modal } from "antd";

function CreateCategory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [categories, setCategory] = useState([]);
  const [updated, setUpdated] = useState("");
  const [selected, setSelected] = useState(null);

  const fetchAllCategory = async () => {
    try {
      const category = await axios.get(`${import.meta.env.VITE_APP_API_KEY}/api/v1/category/get-all-category`);
      if (category.data.success) {
        setCategory(category.data.allCategory);
      }
    } catch (error) {
      toast.error("Something Went Wrong while Fetching All Category");
    }
  };

  const createCategoryHandler = async (e) => {
    e.preventDefault();
    try {
      const newCategory = await axios.post(`${import.meta.env.VITE_APP_API_KEY}/api/v1/category/create-category`, {
        name,
      });
      if (newCategory?.data?.success) {
        toast.success("Category created successfully");
        fetchAllCategory();
        setName("");
      }
    } catch (error) {
      toast.error("Error while Creating Category");
    }
  };

  const deleteCategoryHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_API_KEY}/api/v1/category/delete-category/${id}`
      );
      if (data?.success) {
        toast.success("Successfully Deleted");
        setSelected(null);
        fetchAllCategory();
      }
    } catch (error) {
      toast.error("Error While Deleting Category");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_APP_API_KEY}/api/v1/category/update-category/${selected._id}`,
        { name: updated }
      );
      if (data?.success) {
        toast.success(`${selected.name} is updated`);
        setSelected(null);
        setUpdated("");
        setIsModalOpen(false);
        setName("");
        fetchAllCategory();
      }
    } catch (error) {
      toast.error("Error While Updating Category");
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-secondary rounded-lg shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="col-span-1">
            <AdminMenu />
          </div>
          <div className="col-span-3">
            <Modal
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
              className="bg-secondary p-4"
            >
              <CategoryInput
                createCategoryHandler={handleUpdate}
                name={updated}
                setName={setUpdated}
              />
            </Modal>

            <h2 className="text-2xl font-semibold text-dark mb-5">Create Category</h2>
            <CategoryInput
              createCategoryHandler={createCategoryHandler}
              name={name}
              setName={setName}
            />

            <div className="mt-6">
              <h4 className="text-xl text-dark mb-4">All Categories</h4>
              <div className="overflow-x-auto bg-secondary rounded-lg shadow-lg">
                <table className="table-auto w-full text-dark border-collapse">
                  <thead className="bg-secondary text-lg">
                    <tr className="text-dark">
                      <th className="px-4 py-2 text-center">S.No</th>
                      <th className="px-4 py-2">Category Name</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-dark text-secondary">
                    {categories.map((c, index) => (
                      <tr key={c._id}>
                        <td className="px-4 py-2 text-center">{index + 1}</td>
                        <td className="px-4 py-2">{c.name}</td>
                        <td className="px-4 py-2 flex justify-center items-center gap-4">
                          <FiEdit
                            className="cursor-pointer text-secondary hover:text-primary"
                            onClick={() => {
                              showModal();
                              setUpdated(c.name);
                              setSelected(c);
                            }}
                          />
                          <ImBin
                            className="cursor-pointer text-red-500 hover:text-red-700"
                            onClick={() => {
                              deleteCategoryHandler(c._id);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;
