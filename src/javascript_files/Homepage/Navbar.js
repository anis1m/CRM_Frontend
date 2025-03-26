import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css_files/Homepage/Navbar.css";
import { jwtDecode } from "jwt-decode";
import getCookie from "../../api";
import axios from "axios";

function Navbar({ expiredSession, setshowchangepasswordform }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const detailref = useRef();

  useEffect(() => {
    if (getCookie("token")) {
      const decoded = jwtDecode(getCookie("token"));
      const url = `${process.env.REACT_APP_API_URL}/api/User/GetUserbyUserId?userId=${decoded.sub}`;
      axios
        .get(url)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

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
      <nav
        className="navbar"
        onMouseLeave={() => {
          if (detailref.current) {
            detailref.current.style.display = "none";
          }
        }}
      >
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
          {userData && userData.role === "Administrator" && (
            <>
              <button
                className="navbar-icon"
                onClick={() => navigate("/companies")}
              >
                <i className="fa-solid fa-building"></i>
                <span>Companies</span>
              </button>
              <button
                className="navbar-icon"
                onClick={() => navigate("/products")}
              >
                <i className="fa-solid fa-box"></i>
                <span>Products</span>
              </button>
              <button
                className="navbar-icon"
                onClick={() => navigate("/vendors")}
              >
                <i className="fa-solid fa-truck"></i>
                <span>Vendors</span>
              </button>
              <button
                className="navbar-icon"
                onClick={() => navigate("admin/users")}
              >
                <i class="fa-solid fa-users"></i>
                <span>Users</span>
              </button>
              <button
                className="navbar-icon"
                onClick={() => navigate("admin/roles")}
              >
                <i class="fa-solid fa-user-tie"></i>
                <span>Roles</span>
              </button>
            </>
          )}

          <button
            className="navbar-icon"
            style={{ position: "relative" }}
            onMouseEnter={() => {
              detailref.current.style.display = "block";
            }}
          >
            {userData && (
              <>
                <i className="fa-solid fa-user"></i>
                <span>{userData.userID}</span>

                <aside
                  ref={detailref}
                  onMouseLeave={() => {
                    detailref.current.style.display = "none";
                  }}
                >
                  <h2>Welcome, {userData.userID}</h2>
                  <blockquote style={{ marginTop: "1rem" }}>
                    <p>
                      <b>Email:</b> {userData.email}
                    </p>
                  </blockquote>
                  <blockquote>
                    <p>
                      <b>Mobile No.:</b> {userData.mobileNumber}
                    </p>
                  </blockquote>
                  <blockquote>
                    <p>
                      <b>Role :</b> {userData.role}
                    </p>
                  </blockquote>
                  {userData.role !== "Administrator" && (
                    <>
                      <blockquote>
                        <p>
                          <b>Account Status:</b>{" "}
                          {userData.isLocked === false ? "Active" : "Inactive"}
                        </p>
                      </blockquote>
                      <blockquote>
                        <p>
                          <b>Lockout End:</b> {userData.lockoutEnd}
                        </p>
                      </blockquote>
                    </>
                  )}

                  <button
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "2px solid black",
                    }}
                    onClick={() => setshowchangepasswordform(true)}
                  >
                    Change Password
                  </button>

                  <button
                    onClick={() => {
                      document.cookie = "token=; max-age=0; path=/;";
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </aside>
              </>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
