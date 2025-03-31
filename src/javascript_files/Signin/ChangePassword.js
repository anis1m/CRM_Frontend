import React, { useReducer, useState } from "react";
import "../../css_files/Signin/ChangePassword.css";
import CloseForm from "../Master/CloseForm";
import axios from "axios";
import getCookie from "../../api";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function ChangePassword({ setshowchangepasswordform }) {
  const [passwordData, setPasswordData] = useState({
    TokenCode: "",
    OldPassword: "",
    NewPassword: "",
    ConfirmNewPassword: "",
  });

  function handlesubmit(e) {
    e.preventDefault();
    if (getCookie("token")) {
      const decoded = jwtDecode(getCookie("token"));

      axios
        .put(`${process.env.REACT_APP_API_URL}/api/User/ChangePassword`, {
          UserID: decoded.sub,
          OldHashPassword: passwordData.OldPassword,
          NewHashPassword: passwordData.NewPassword,
          ConfirmPassword: passwordData.ConfirmNewPassword,
          TokenCode: passwordData.TokenCode,
        })
        .then((res) => {
          console.log(res);
          toast.success("Password Changed Successfully", {
            position: "bottom-center",
          });
          setshowchangepasswordform(false);
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Error Occured",
            text: JSON.stringify(err.response.data).replaceAll('"', ""),
          });
        });
    }
  }

  return (
    <section className="change-password">
      <div>
        <form onSubmit={handlesubmit}>
          <h1>Change Password</h1>
          <blockquote>
            <label>Token Code</label>
            <input
              type="text"
              placeholder="Enter Token Code"
              required
              onChange={(e) =>
                setPasswordData({ ...passwordData, TokenCode: e.target.value })
              }
            />
          </blockquote>
          <blockquote>
            <label>Old Password</label>
            <input
              type="password"
              placeholder="Enter Old Password"
              required
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  OldPassword: e.target.value,
                })
              }
            />
          </blockquote>
          <blockquote>
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter New Password"
              required
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  NewPassword: e.target.value,
                })
              }
            />
          </blockquote>

          <blockquote>
            <label>Confirm New Password</label>
            <input
              type="password"
              placeholder="Enter New Password Again"
              required
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  ConfirmNewPassword: e.target.value,
                })
              }
            />
          </blockquote>
          <button type="submit">Save</button>
        </form>
        <CloseForm close={setshowchangepasswordform} />
      </div>
    </section>
  );
}

export default ChangePassword;
