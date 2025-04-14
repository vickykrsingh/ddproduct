import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-primary py-5">
      <div className="text-center">
        <h3 className="font-semibold mb-2 text-sm">
          All Rights Reserved &copy; vickykrsingh27@gmail.com
        </h3>
        <div className="space-x-4">
          <Link to="/about" className="hover:text-accent transition duration-200">
            About
          </Link>
          <span>|</span>
          <Link to="/privacy" className="hover:text-accent transition duration-200">
            Privacy
          </Link>
          <span>|</span>
          <Link to="/contact" className="hover:text-accent transition duration-200">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
