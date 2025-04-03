import React, { useEffect, useRef, useState } from "react";
import "../../css_files/Signin/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CloseForm from "../Master/CloseForm";
import Swal from "sweetalert2";

function Register({
  setshowcreateuser,
  refresh,
  setrefresh,
  fetchuserdata,
  triggerupdate,
}) {
  const [data, setData] = useState({
    UserID: triggerupdate ? fetchuserdata?.userID : "",
    HashPassword: "",
    ConfirmHashPassword: "",
    Email: triggerupdate ? fetchuserdata?.email : "",
    MobileNumber: triggerupdate ? fetchuserdata?.mobileNumber : "",
    TokenCode: "",
    Role: triggerupdate ? fetchuserdata?.role : "",
  });
  const [loading, setloading] = useState(false);
  const [roles, setroles] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setloading(true);
    if (triggerupdate) {
      const url = `${process.env.REACT_APP_API_URL}/api/User`;
      axios
        .put(url, {
          userID: data.UserID,
          Email: data.Email,
          MobileNumber: data.MobileNumber,
        })
        .then((res) => {
          console.log(res.data);
          setloading(false);
          toast.success("User Updated Successfully", {
            position: "bottom-center",
          });
          setshowcreateuser(false);
          setrefresh(!refresh);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    } else {
      const url = `${process.env.REACT_APP_API_URL}/api/User`;
      axios
        .post(url, data)
        .then((res) => {
          console.log(res.data);
          setloading(false);
          toast.success("User Created Successfully", {
            position: "bottom-center",
          });
          setshowcreateuser(false);
          setrefresh(!refresh);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
          Swal.fire({
            icon: "error",
            title: "Error Occured",
            text: JSON.stringify(err.response.data).replaceAll('"', ""),
          });
        });
    }
  }

  useEffect(() => {
    setroles([]);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/Permissions`)
      .then((res) => {
        console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          setroles((prev) => [...prev, res.data[i].role]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <section className="register">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <blockquote>
          <label>Username</label>
          <input
            required
            type="text"
            readOnly={triggerupdate}
            placeholder="Enter Username (e.g user123)"
            onChange={(e) => setData({ ...data, UserID: e.target.value })}
            value={data.UserID}
          />
        </blockquote>
        <blockquote>
          <label>Email</label>
          <input
            required
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setData({ ...data, Email: e.target.value })}
            value={data.Email}
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
            value={data.MobileNumber}
            required
          />
        </blockquote>
        <blockquote>
          <label>Role</label>
          <select
            onChange={(e) => setData({ ...data, Role: e.target.value })}
            required
            disabled={triggerupdate}
          >
            <option value="">Select Role Name</option>
            {roles.map((role, index) => (
              <option key={index} selected={data.Role === role}>
                {role}
              </option>
            ))}
          </select>
        </blockquote>

        {triggerupdate === false && (
          <blockquote>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) =>
                setData({ ...data, HashPassword: e.target.value })
              }
              required
            />
          </blockquote>
        )}
        {triggerupdate === false && (
          <blockquote>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Enter Password Again"
              onChange={(e) =>
                setData({ ...data, ConfirmHashPassword: e.target.value })
              }
              required
            />
          </blockquote>
        )}
        {triggerupdate === false && (
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
        )}
        <button type="submit">{triggerupdate ? "Edit" : "Create"}</button>
      </form>
      {loading && (
        <div
          className="loading-screen-login-signup"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i class="fa-solid fa-spinner fa-3x fa-spin"></i>
        </div>
      )}
      <CloseForm close={setshowcreateuser} />
    </section>
  );
}

export default Register;
