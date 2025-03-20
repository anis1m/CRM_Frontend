import React, { useState } from "react";
import "../../css_files/Homepage/Sidebar.css";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const nav = useNavigate();
  const [isMasterOpen, setIsMasterOpen] = useState(false);

  const toggleMasterDropdown = () => setIsMasterOpen(!isMasterOpen);

  const masterItems = [
    {
      path: "master/category-master",
      icon: "fa-solid fa-tags",
      label: "Category",
    },
    {
      path: "master/sub-category-master",
      icon: "fa-solid fa-sitemap",
      label: "Sub-Category",
    },
    {
      path: "master/hsn-master",
      icon: "fa-solid fa-code",
      label: "HSN",
    },
    {
      path: "master/unit-master",
      icon: "fa-solid fa-ruler",
      label: "Unit",
    },
    {
      path: "master/packing-master",
      icon: "fa-solid fa-box",
      label: "Packing",
    },
    {
      path: "master/currency-master",
      icon: "fa-solid fa-dollar-sign",
      label: "Currency",
    },
    {
      path: "master/gst-master",
      icon: "fa-solid fa-file-invoice",
      label: "GST",
    },
    {
      path: "master/parts-master",
      icon: "fa-solid fa-cogs",
      label: "Parts",
    },
    {
      path: "master/boiler-master",
      icon: "fa-solid fa-fire",
      label: "Boiler",
    },
    {
      path: "master/boiler-series-master",
      icon: "fa-solid fa-file-invoice",
      label: "Boiler Series",
    },
    {
      path: "master/boiler-series-parts-mapping-master",
      icon: "fa-solid fa-map",
      label: "Boiler Series Mapping",
    },
    {
      path: "master/courier-master",
      icon: "fa-solid fa-truck",
      label: "Courier",
    },
    {
      path: "master/customer-master",
      icon: "fa-solid fa-users",
      label: "Customer",
    },
    {
      path: "master/customer-pricing-master",
      icon: "fa-solid fa-money-bill",
      label: "Customer Pricing",
    },
    {
      path: "master/technician-master",
      icon: "fa-solid fa-tools",
      label: "Technician",
    },
    {
      path: "master/quotation-master",
      icon: "fa-solid fa-file-invoice-dollar",
      label: "Quotation",
    },
  ];

  return (
    <section className="sidebar">
      <div>
        <aside
          className="sidebar-item"
          onClick={() => nav("/dashboard")}
          title="Dashboard"
        >
          <i className="fa-solid fa-chart-pie"></i>
          <span className="sidebar-text">Dashboard</span>
        </aside>

        {/* Master Dropdown */}
        <aside
          className="sidebar-item"
          onClick={toggleMasterDropdown}
          title="Master"
        >
          <i
            className={`fa-solid ${
              isMasterOpen ? "fa-folder-open" : "fa-folder"
            }`}
          ></i>
          <span className="sidebar-text">Master</span>
        </aside>

        {isMasterOpen && (
          <div className="dropdown-menu">
            {masterItems.map((item, index) => (
              <aside
                key={index}
                className="dropdown-item"
                onClick={() => nav(item.path)}
                title={item.label}
              >
                <i className={item.icon}></i>
                <span className="dropdown-text">{item.label}</span>
              </aside>
            ))}
          </div>
        )}

        {/* Settings Button */}
        <aside
          className="sidebar-item"
          onClick={() => nav("/settings")}
          title="Settings"
        >
          <i className="fa-solid fa-cog"></i>
          <span className="sidebar-text">Settings</span>
        </aside>
      </div>
    </section>
  );
}

export default Sidebar;
