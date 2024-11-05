import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import AdminMenu from "./AdminMenu.jsx";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState([]);
  const fetchAllUsers = async () => {
    console.log('first')
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_KEY}/api/v1/user/all-users`);
      console.log(response.data)
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <Layout>
      <div className="text-white container-fluid">
        <div className="row pt-5">
          <div className="col-lg-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9">
            <h2 className="text white">All Users</h2>
            <div className="flex flex-column gap-2 rounded-1 bg-primary">
              {JSON.stringify(user)}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
