import React, { useContext, useEffect, useState } from "react";
import "../../css_files/Admin/Users.css";
import axios from "axios";
import Register from "../Signin/Register";
import { triggerscroll } from "../Homepage/Homepage";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

function Users() {
  const [usersdata, setusersdata] = useState([]);
  const [showcreateuser, setshowcreateuser] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const { triggerscrollupwords } = useContext(triggerscroll);
  const [triggerupdate, settriggerupdate] = useState(false);
  const [fetchuserdata, setfetcheduserdata] = useState(null);

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

  function fetchSingleUserData(userid) {
    setfetcheduserdata(null);
    const url = `${process.env.REACT_APP_API_URL}/api/User/GetUserbyUserId?userId=${userid}`;
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setfetcheduserdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <ToastContainer />
      {showcreateuser && (
        <Register
          setshowcreateuser={setshowcreateuser}
          refresh={refresh}
          setrefresh={setrefresh}
          fetchuserdata={fetchuserdata}
          triggerupdate={triggerupdate}
          key={fetchuserdata?.userID}
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
              onClick={() => {
                setshowcreateuser(true);
                triggerscrollupwords();
                settriggerupdate(false);
              }}
              style={{ padding: "0.7rem" }}
            >
              Create User{" "}
            </button>
            <input
              type="search"
              placeholder="Enter Username to Search"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setusersdata([]);
                  axios
                    .get(
                      `${process.env.REACT_APP_API_URL}/api/User/GetUserbyUserId?userId=${e.target.value}`
                    )
                    .then((res) => {
                      console.log(res.data);
                      setusersdata([{ ...res.data }]);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              }}
              onInput={(e) => {
                if (e.target.value === "") {
                  setrefresh(!refresh);
                }
              }}
            />
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
              <th colSpan={2}>Actions</th>
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
                    <td>
                      <i
                        className="fa-solid fa-pen-to-square"
                        title="Edit"
                        onClick={() => {
                          setshowcreateuser(true);
                          triggerscrollupwords();
                          fetchSingleUserData(user.userID);
                          settriggerupdate(true);
                        }}
                      ></i>
                    </td>
                    <td>
                      <i
                        className="fa-solid fa-trash"
                        title="Delete"
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              axios
                                .delete(
                                  `${process.env.REACT_APP_API_URL}/api/User?username=${user.userID}`
                                )
                                .then((res) => {
                                  console.log(res.data);
                                  toast.success("User Deleted Successfully", {
                                    position: "bottom-center",
                                  });
                                  setrefresh(!refresh);
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }
                          });
                        }}
                      ></i>
                    </td>
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
