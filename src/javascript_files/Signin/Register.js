import React, { useRef, useState } from "react";
import "../../css_files/Signin/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CloseForm from "../Master/CloseForm";

function Register({ setshowcreateuser }) {
  const passwordconfirmref = useRef();
  const [data, setData] = useState({
    UserID: "",
    HashPassword: "",
    Email: "",
    MobileNumber: "",
    TokenCode: "",
    Role: "",
  });
  const [loading, setloading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setloading(true);
    const url = `${process.env.REACT_APP_API_URL}/api/User`;
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        setloading(false);
        toast.success("Registered Successfully. Redirecting to Login page", {
          position: "bottom-center",
        });
        setTimeout(() => {
          nav("/login");
        }, 2500);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        toast.error("Failed to Register", {
          position: "bottom-center",
        });
      });
  }
  return (
    <section className="register">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <blockquote>
          <label>Username</label>
          <input
            required
            type="text"
            placeholder="Enter Username (e.g user123)"
            onChange={(e) => setData({ ...data, UserID: e.target.value })}
          />
        </blockquote>
        <blockquote>
          <label>Email</label>
          <input
            required
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setData({ ...data, Email: e.target.value })}
          />
        </blockquote>
        <blockquote>
          <label>Phone Number</label>
          <input
            type="number"
            placeholder="Enter Phone Number with country code without +"
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 10);
            }}
            onChange={(e) => setData({ ...data, MobileNumber: e.target.value })}
            required
          />
        </blockquote>
        <blockquote>
          <label>Role</label>
          <select
            onChange={(e) => setData({ ...data, Role: e.target.value })}
            required
          >
            <option value="">Select Role Name</option>
            <option value="Service-Co-Ordinator">Service-Co-Ordinator</option>
            <option value="Store Manager">Store Manager</option>
            <option value="Purchase Manager">Purchase Manager</option>
            <option value="Technician">Technician</option>
          </select>
        </blockquote>
        <blockquote>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setData({ ...data, HashPassword: e.target.value })}
            onInput={(e) => {
              if (confirmPassword === e.target.value) {
                passwordconfirmref.current.textContent = "";
              } else {
                passwordconfirmref.current.textContent =
                  "Password is not matched";
              }
            }}
            required
          />
        </blockquote>

        <blockquote>
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Enter Password Again"
            onInput={(e) => {
              if (data.HashPassword === e.target.value) {
                passwordconfirmref.current.textContent = "";
              } else {
                passwordconfirmref.current.textContent =
                  "Password is not matched";
              }
            }}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </blockquote>
        <span ref={passwordconfirmref} style={{ color: "red" }}></span>
        <blockquote>
          <label>Token Code</label>
          <input
            type="text"
            placeholder="Enter Token Code (Used to Change Password)"
            onChange={(e) => setData({ ...data, TokenCode: e.target.value })}
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 10);
            }}
            required
          />
        </blockquote>
        <button
          onClick={(e) => {
            if (passwordconfirmref.current.textContent === "") {
              e.target.type = "submit";
            } else {
              e.target.type = "button";
            }
          }}
        >
          Create
        </button>
      </form>

      {loading && (
        <div className="loading-screen-login-signup">
          <i class="fa-solid fa-spinner fa-3x fa-spin"></i>
        </div>
      )}
      <CloseForm close={setshowcreateuser} />
    </section>
  );
}

export default Register;
