import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Helmet } from "react-helmet";

export default function Layout({
  children,
  title="ECommerce",
  keywords="html,css,javascript,react.js,node.js,full stack ecommerce , shoping website , mern project",
  author="Vicky Kumar Singh",
  description="ECommerce website which is used to shop various type of product at maximum discount.",
}) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="bg-purple-900 main">{children}</main>
      <Footer />
    </>
  );
}

