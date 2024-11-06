import React, { useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const forgetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_API_KEY}/api/v1/auth/forgetpassword`, {
        email,
        answer,
        newPassword,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layout title="ECommerce - Forget Password">
      <div className="bg-dark min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={forgetPassword}
          className="w-full max-w-md bg-secondary p-6 rounded-lg shadow-lg space-y-6"
        >
          <h2 className="text-2xl font-bold text-dark text-center">Forget Password</h2>
          
          {/* Email Input */}
          <div>
            <label className="block text-dark font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              className="w-full p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Answer Input */}
          <div>
            <label className="block text-dark font-medium mb-2">Security Answer</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Answer"
              className="w-full p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* New Password Input */}
          <div>
            <label className="block text-dark font-medium mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="********"
              className="w-full p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-dark py-2 rounded-lg hover:bg-dark hover:text-primary transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default ForgetPassword;
