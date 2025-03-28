import React, { useEffect, useState } from "react";
import "../../css_files/Admin/Users.css";
import axios from "axios";
import Register from "../Signin/Register";

function Users() {
  const [usersdata, setusersdata] = useState([]);
  const [showcreateuser, setshowcreateuser] = useState(false);
  const [refresh, setrefresh] = useState(false);
  useEffect(() => {
    setusersdata([]);
    const url = `${process.env.REACT_APP_API_URL}/api/User`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setusersdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  return (
    <>
      {showcreateuser && (
        <Register
          setshowcreateuser={setshowcreateuser}
          refresh={refresh}
          setrefresh={setrefresh}
        />
      )}
      <section className="table">
        <h1
          style={{ fontSize: "2.5rem", margin: "1rem 0", textAlign: "center" }}
        >
          User Management
        </h1>
        {showcreateuser === false && (
          <blockquote className="table-reset">
            <button
              onClick={() => setshowcreateuser(true)}
              style={{ padding: "0.7rem" }}
            >
              Create User{" "}
            </button>
          </blockquote>
        )}
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Username</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Role</th>
              <th>Failed Login Attempts</th>
              <th>Status</th>
              <th>Lockout End</th>
            </tr>
          </thead>
          <tbody>
            {usersdata.map((user, index) => {
              if (user.role === "Administrator") {
                return <></>;
              } else {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.userID}</td>
                    <td>{user.email}</td>
                    <td>{user.mobileNumber}</td>
                    <td>{user.role}</td>
                    <td>{user.failedLoginAttempts}</td>
                    <td>{user.isLocked ? "Inactive" : "Active"}</td>
                    <td>{user.lockoutEnd}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Users;
