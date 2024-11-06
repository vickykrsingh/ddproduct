import React, { useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API_KEY}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  return (
    <Layout title="ECommerce - Register">
      <div className="bg-primary-dark min-h-screen flex justify-center items-center px-4">
        <form
          onSubmit={register}
          className="w-full max-w-lg bg-primary-light p-8 rounded-lg shadow-lg flex flex-col gap-6"
        >
          <h2 className="text-3xl font-bold text-primary-dark text-center mb-4">
            Register
          </h2>
          {[
            { label: "Name", type: "text", value: name, onChange: setName },
            { label: "Email", type: "email", value: email, onChange: setEmail },
            { label: "Password", type: "password", value: password, onChange: setPassword },
            { label: "Phone", type: "text", value: phone, onChange: setPhone },
            { label: "Address", type: "text", value: address, onChange: setAddress },
            { label: "Favorite IPL Team", type: "text", value: answer, onChange: setAnswer },
          ].map(({ label, type, value, onChange }, index) => (
            <div key={index} className="flex flex-col gap-2">
              <label className="text-primary font-medium" htmlFor={label.toLowerCase().replace(/\s/g, "-")}>
                {label}
              </label>
              <input
                type={type}
                id={label.toLowerCase().replace(/\s/g, "-")}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={`Enter your ${label.toLowerCase()}`}
                className="input-field rounded-md p-2 border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-primary text-secondary-dark font-semibold rounded-md py-2 mt-4 hover:bg-secondary transition-colors"
          >
            Register
          </button>
          <div className="text-center mt-4">
            <p className="text-secondary-dark">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-semibold underline hover:text-secondary"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Layout>
  );
}
