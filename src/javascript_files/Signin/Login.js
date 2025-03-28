import React, { useEffect, useState } from "react";
import "../../css_files/Signin/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import getCookie from "../../api";
import Swal from "sweetalert2";

function Login() {
  const [logindata, setlogindata] = useState({
    Username: "",
    Password: "",
  });

  const [failedloginattempts, setfailedloginattempts] = useState(0);

  const [loading, setloading] = useState(false);
  const nav = useNavigate();

  function handlesubmit(e) {
    e.preventDefault();
    setloading(true);
    const url = `${process.env.REACT_APP_API_URL}/api/auth/login`;
    axios
      .post(url, logindata)
      .then((res) => {
        console.log(res);
        document.cookie = "token=" + res.data.token;
        toast.success("Logged in Successfully", {
          position: "bottom-center",
        });

        axios
          .put(`${process.env.REACT_APP_API_URL}/api/User`, {
            UserID: logindata.Username,
            FailedLoginAttempts: failedloginattempts,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });

        setTimeout(() => {
          nav("/dashboard");
          setloading(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        console.log(logindata.FailedLoginAttempts);
        setfailedloginattempts(failedloginattempts + 1);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data,
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
            required
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
            required
          />
        </blockquote>
        <button type="submit">Login</button>
      </form>
      <p>
        Not a Member Yet. Click{" "}
        <a
          href="#"
          onClick={() => {
            Swal.fire({
              icon: "warning",
              title: "Register User",
              text: "Please Contact Administrator directly or mail to admin123@gmail.com",
            });
          }}
        >
          Here{" "}
        </a>
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
