import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css_files/Homepage/Navbar.css";

function Navbar({ expiredSession }) {
  const navigate = useNavigate();

  return (
    <>
      {expiredSession && (
        <mark style={{ padding: "0.5rem", fontWeight: "bold" }}>
          Your Session Has Expired. Click{" "}
          <a
            href="#"
            onClick={() => {
              document.cookie = "token=; max-age=0; path=/;";
              navigate("/");
            }}
          >
            here
          </a>{" "}
          to Login Again
        </mark>
      )}
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/images/image689.png" alt="Company Logo" id="navbar-logo" />
          <span className="company-name">Ross Boilers</span>
        </div>

        <div className="navbar-right">
          <button
            className="navbar-icon"
            onClick={() => navigate("/dashboard")}
          >
            <i className="fa-solid fa-chart-pie"></i>
            <span>Dashboard</span>
          </button>
          <button
            className="navbar-icon"
            onClick={() => navigate("/inquiries")}
          >
            <i className="fa-solid fa-envelope"></i>
            <span>INQUIRIES</span>
          </button>
          <button
            className="navbar-icon"
            onClick={() => navigate("/companies")}
          >
            <i className="fa-solid fa-building"></i>
            <span>Companies</span>
          </button>
          <button className="navbar-icon" onClick={() => navigate("/products")}>
            <i className="fa-solid fa-box"></i>
            <span>Products</span>
          </button>
          <button className="navbar-icon" onClick={() => navigate("/vendors")}>
            <i className="fa-solid fa-truck"></i>
            <span>Vendors</span>
          </button>
          <button className="navbar-icon" onClick={() => navigate("/users")}>
            <i className="fa-solid fa-user"></i>
            <span>Users</span>
          </button>
          <button className="navbar-icon" onClick={() => navigate("/dealers")}>
            <i className="fa-solid fa-users"></i>
            <span>Dealers</span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
