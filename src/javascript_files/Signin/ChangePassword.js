import React, { useReducer, useState } from "react";
import "../../css_files/Signin/ChangePassword.css";
import CloseForm from "../Master/CloseForm";

function ChangePassword({ setshowchangepasswordform }) {
  const [passwordData, setPasswordData] = useState({
    TokenCode: "",
    OldPassword: "",
    NewPassword: "",
    ConfirmNewPassword: "",
  });

  return (
    <section className="change-password">
      <div>
        <form>
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
