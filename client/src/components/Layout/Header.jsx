import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Search from "../Search.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { Badge } from "antd";
import { BsCartFill } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: null,
    });
    localStorage.removeItem("auth");
  };

  return (
    <nav className="bg-gray-400 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link className="text-2xl font-semibold text-white" to="/">
          DD Products
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white text-2xl focus:outline-none transition-transform duration-300 transform hover:scale-110"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6 items-center">
          <ul className="flex items-center space-x-4">
            <li>
              <Link className="text-white hover:text-gray-300 transition-colors duration-200" to="/">
                Home
              </Link>
            </li>
            {auth.user ? (
              <li className="relative group px-4">
                <Link className="text-white hover:text-gray-300 cursor-pointer" role="button">
                  {auth?.user.name}
                </Link>
                <ul className="absolute hidden group-hover:block bg-gray-800 text-white rounded shadow-lg transition-opacity duration-200 ease-in-out w-32">
                  <li>
                    <Link
                      className="block px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
                      to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
                      to="/login"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li>
                  <Link className="text-white hover:text-gray-300 transition-colors duration-200" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="text-white hover:text-gray-300 transition-colors duration-200" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
            <li>
              <Search />
            </li>
          </ul>
          <Link className="relative text-white" to="/cart">
            <Badge count={cart?.length} offset={[10, 0]} className="text-white">
              <BsCartFill className="text-warning transition-transform duration-300 transform hover:scale-110" size={30} />
            </Badge>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="lg:hidden bg-gray-800 text-white px-4 py-2 space-y-2 animate-slide-down transition-all duration-300 ease-in-out"
        >
          <ul className="space-y-2">
            <li>
              <Link className="block text-white hover:bg-gray-700 px-3 py-2 rounded transition-colors duration-200" to="/">
                Home
              </Link>
            </li>
            {auth.user ? (
              <>
                <li>
                  <Link
                    className="block text-white hover:bg-gray-700 px-3 py-2 rounded transition-colors duration-200"
                    to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    className="block text-white hover:bg-gray-700 px-3 py-2 rounded transition-colors duration-200"
                    to="/login"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="block text-white hover:bg-gray-700 px-3 py-2 rounded transition-colors duration-200" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="block text-white hover:bg-gray-700 px-3 py-2 rounded transition-colors duration-200" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
            <li>
              <Search />
            </li>
            <li>
              <Link className="block text-white hover:bg-gray-700 px-3 py-2 rounded transition-colors duration-200" to="/cart">
                <Badge count={cart?.length} offset={[10, 0]} className="text-white">
                  <BsCartFill className="text-warning" size={24} />
                </Badge>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
