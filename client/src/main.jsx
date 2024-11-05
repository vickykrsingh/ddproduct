import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import { DetailProvider } from "./context/ProductDetail.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { GlobalLoadingProvider } from "./context/GlobalLoading.jsx";
import { AddressProvider } from "./context/SetCurrentAddress.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <GlobalLoadingProvider>
      <AddressProvider>
        <CartProvider>
          <SearchProvider>
            <DetailProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </DetailProvider>
          </SearchProvider>
        </CartProvider>
      </AddressProvider>
    </GlobalLoadingProvider>
  </AuthProvider>
);
