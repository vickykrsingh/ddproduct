import React, { useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_API_KEY}/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layout title="ECommerce - Login">
      <div className="bg-dark min-h-screen flex flex-col items-center justify-center px-4">
        <form
          onSubmit={login}
          className="w-full max-w-lg bg-secondary p-8 rounded-lg shadow-lg space-y-6"
        >
          {/* Title */}
          <h2 className="text-2xl font-bold text-dark text-center">Login</h2>
          
          {/* Email Input */}
          <div>
            <label className="block text-dark font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-dark font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <div className="text-right mt-2">
              <Link to="/forgetpassword" className="text-sm text-dark hover:underline">
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-dark py-2 rounded-lg hover:bg-dark hover:text-secondary transition duration-200"
          >
            Login
          </button>

          {/* Signup Link */}
          <div className="text-center mt-4">
            <p className="text-dark">
              Not a member?{" "}
              <Link to="/register" className="font-semibold text-dark hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Layout>
  );
}
