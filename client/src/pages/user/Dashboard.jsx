import React from "react";
import Layout from "../../components/Layout/Layout.jsx";
import UserMenu from "./UserMenu.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

function Dashboard() {
  const [auth] = useAuth();

  return (
    <Layout title="E-Commerce - Dashboard">
      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* User Menu Sidebar */}
          <div className="lg:w-1/4">
            <UserMenu />
          </div>

          {/* Dashboard Content */}
          <div className="lg:w-3/4 bg-dark p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-primary mb-2">{auth?.user?.name}</h2>
            <p className="text-secondary text-lg mb-1">{auth?.user?.email}</p>
            <p className="text-secondary text-lg">{auth?.user?.address}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
