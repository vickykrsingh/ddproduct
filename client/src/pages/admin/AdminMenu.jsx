import React from "react";
import { NavLink } from "react-router-dom";

function AdminMenu() {
  return (
    <div className="w-full sm:w-64 p-4">
      <div className="flex flex-col space-y-2">
        <NavLink
          to="/dashboard/admin/create-category"
          className="py-3 px-4 bg-primary text-dark rounded-lg shadow-md hover:bg-primary-dark transition duration-200 text-center"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="py-3 px-4 bg-primary text-dark rounded-lg shadow-md hover:bg-primary-dark transition duration-200 text-center"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="py-3 px-4 bg-primary text-dark rounded-lg shadow-md hover:bg-primary-dark transition duration-200 text-center"
        >
          All Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/all-orders"
          className="py-3 px-4 bg-primary text-dark rounded-lg shadow-md hover:bg-primary-dark transition duration-200 text-center"
        >
          All Orders
        </NavLink>
        <NavLink
          to="/dashboard/admin-dashboard"
          className="py-3 px-4 bg-primary text-dark rounded-lg shadow-md hover:bg-primary-dark transition duration-200 text-center"
        >
          Dashboard
        </NavLink>
      </div>
    </div>
  );
}

export default AdminMenu;
