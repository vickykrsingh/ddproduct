import React from "react";
import { NavLink } from "react-router-dom";

function UserMenu() {
  return (
    <div className="flex flex-col bg-dark rounded-lg p-4 space-y-2 w-full max-w-xs">
      <NavLink
        to="/dashboard/user/profile"
        className={({ isActive }) =>
          `px-4 py-2 text-center rounded-md transition-colors duration-200 ${
            isActive ? "bg-primary text-dark" : "bg-secondary text-dark"
          } hover:bg-primary hover:text-dark`
        }
      >
        Profile
      </NavLink>
      <NavLink
        to="/dashboard/user/orders"
        className={({ isActive }) =>
          `px-4 py-2 text-center rounded-md transition-colors duration-200 ${
            isActive ? "bg-primary text-dark" : "bg-secondary text-dark"
          } hover:bg-primary hover:text-dark`
        }
      >
        Orders
      </NavLink>
    </div>
  );
}

export default UserMenu;
