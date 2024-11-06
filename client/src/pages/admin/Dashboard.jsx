import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import AdminMenu from "./AdminMenu.jsx";
import axios from "axios";

function Dashboard() {
  const [users, setUsers] = useState([]);
  
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_KEY}/api/v1/user/all-users`);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Analysis Data
  const totalUsers = users.length;
  const admins = users.filter(user => user.role === 1).length;
  const regularUsers = totalUsers - admins;
  const recentUsers = users.slice(0, 3);

  return (
    <Layout>
      <div className="container mx-auto py-8 text-dark">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4 bg-primary text-dark rounded-lg p-4">
            <AdminMenu />
          </div>

          <div className="lg:w-3/4">
            <h2 className="text-2xl font-semibold mb-4 text-dark">All Users</h2>
            
            {/* Analysis Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-secondary text-dark p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Total Users</h3>
                <p className="text-2xl">{totalUsers}</p>
              </div>
              <div className="bg-secondary text-dark p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Admins</h3>
                <p className="text-2xl">{admins}</p>
              </div>
              <div className="bg-secondary text-dark p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Regular Users</h3>
                <p className="text-2xl">{regularUsers}</p>
              </div>
            </div>

            {/* Recent Users Section */}
            <div className="bg-dark text-dark p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-4 text-primary">Recently Registered Users</h3>
              <ul className="space-y-2">
                {recentUsers.map(user => (
                  <li key={user._id} className="flex justify-between items-center p-2 rounded-lg bg-secondary">
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                    <span className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* User Table */}
            <div className="overflow-auto rounded-lg shadow-md bg-white">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="w-full bg-primary text-dark">
                    <th className="text-left p-4 font-semibold">Name</th>
                    <th className="text-left p-4 font-semibold">Email</th>
                    <th className="text-left p-4 font-semibold">Phone</th>
                    <th className="text-left p-4 font-semibold">Address</th>
                    <th className="text-left p-4 font-semibold">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id} className="border-t hover:bg-gray-100">
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">{user.phone}</td>
                      <td className="p-4">{user.address}</td>
                      <td className="p-4">{user.role === 1 ? "Admin" : "User"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
