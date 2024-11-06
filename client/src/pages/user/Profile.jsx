import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import UserMenu from "./UserMenu.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";

function Profile() {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { name, email, phone, address } = auth.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth.user]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_APP_API_KEY}/api/v1/auth/update-profile`, {
        name,
        password,
        phone,
        address,
      });
      
      if (data.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updateUser });
        localStorage.setItem("auth", JSON.stringify({ ...auth, user: data.updateUser }));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      toast.error("Request Timeout. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="col-span-1">
            <UserMenu />
          </div>
          
          {/* Profile Update Form */}
          <div className="col-span-1 lg:col-span-3 bg-dark p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-primary mb-6 text-center">
              Update Profile
            </h2>
            <form onSubmit={updateProfile} className="space-y-4">
              {/* Name Field */}
              <div>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              {/* Email Field (disabled) */}
              <div>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  placeholder="Enter Email"
                  value={email}
                  disabled
                />
              </div>
              
              {/* Password Field */}
              <div>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              {/* Phone Field */}
              <div>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              
              {/* Address Field */}
              <div>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-3 mt-4 bg-primary text-dark font-semibold rounded-md hover:bg-dark hover:bg-primary transition-colors"
              >
                Update Your Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
