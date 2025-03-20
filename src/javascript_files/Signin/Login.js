import React, { useEffect, useState } from "react";
import "../../css_files/Signin/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import getCookie from "../../api";

function Login() {
  const [logindata, setlogindata] = useState({
    Username: "",
    Password: "",
  });
  const [loading, setloading] = useState(false);
  const nav = useNavigate();

  function handlesubmit(e) {
    e.preventDefault();
    setloading(true);
    const url = `${process.env.REACT_APP_API_URL}/api/auth/login`;
    axios
      .post(url, logindata)
      .then((res) => {
        document.cookie = "token=" + res.data.token;
        toast.success("Logged in Successfully", {
          position: "bottom-center",
        });
        setTimeout(() => {
          nav("/dashboard");
          setloading(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to Login", {
          position: "bottom-center",
        });
        setloading(false);
      });
  }

  return (
    <section className="login">
      <form onSubmit={handlesubmit}>
        <h1>Login</h1>
        <blockquote>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(e) =>
              setlogindata({ ...logindata, Username: e.target.value })
            }
          />
        </blockquote>
        <blockquote>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) =>
              setlogindata({ ...logindata, Password: e.target.value })
            }
          />
        </blockquote>
        <button type="submit">Login</button>
      </form>
      <p>
        Not a Member Yet. Click{" "}
        <Link to={"/register"}>
          <a>Here </a>
        </Link>
        to Register
      </p>
      {loading && (
        <div className="loading-screen-login-signup">
          <i class="fa-solid fa-spinner fa-3x fa-spin"></i>
        </div>
      )}
    </section>
  );
}

export default Login;
