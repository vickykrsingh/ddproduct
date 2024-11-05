import { Routes, Route } from "react-router-dom";
import About from "./pages/About.jsx";
import Home from "./pages/HomePage.jsx";
import Contact from "./pages/Contact.jsx";
import Privacy from "./pages/Privacy.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/user/Dashboard.jsx";
import PrivateRoute from "./components/Routes/Private.jsx";
import ForgetPassword from "./pages/Auth/ForgetPassword.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminRoute from "./components/Routes/AdminRoute.jsx";
import CreateProduct from "./pages/admin/CreateProduct.jsx";
import CreateCategory from "./pages/admin/CreateCategory.jsx";
import DashboardAnalyzer from "./pages/admin/Dashboard.jsx";
import Profile from "./pages/user/Profile.jsx";
import Orders from "./pages/user/Orders.jsx";
import Products from "./pages/admin/Products.jsx";
import UpdateProduct from "./pages/admin/UpdateProduct.jsx";
import Search from "./pages/SearchPage.jsx";
import SingleProductDetail from "./pages/SingleProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import AllOrders from "./pages/admin/AllOrders.jsx";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/product-detail/:pId/:cId"
          element={<SingleProductDetail />}
        />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:id" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin-dashboard" element={<DashboardAnalyzer />} />
          <Route path="admin/all-orders" element={<AllOrders />} />
        </Route>
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
