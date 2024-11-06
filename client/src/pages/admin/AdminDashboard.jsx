import React from "react";
import Layout from "../../components/Layout/Layout.jsx";
import AdminMenu from "./AdminMenu.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

function AdminDashboard() {
  const [auth] = useAuth();

  return (
    <Layout title="E-Commerce - Admin Dashboard">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
          {/* Sidebar Menu */}
          <div className="w-full lg:w-1/4 bg-gray-900 p-4">
            <AdminMenu />
          </div>

          {/* Dashboard Content */}
          <div className="w-full lg:w-3/4 p-6">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-semibold mb-4">Admin Dashboard</h2>
              <div className="space-y-4">
                <div>
                  <label className="font-bold">Name:</label>
                  <p className="text-lg">{auth?.user?.name || "N/A"}</p>
                </div>
                <div>
                  <label className="font-bold">Email:</label>
                  <p className="text-lg">{auth?.user?.email || "N/A"}</p>
                </div>
                <div>
                  <label className="font-bold">Phone:</label>
                  <p className="text-lg">{auth?.user?.phone || "N/A"}</p>
                </div>
                <div>
                  <label className="font-bold">Address:</label>
                  <p className="text-lg">{auth?.user?.address || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
