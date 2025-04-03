import React, { createContext, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../../css_files/Homepage/Homepage.css";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import getCookie from "../../api";
import ChangePassword from "../Signin/ChangePassword";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const triggerscroll = createContext();
function Homepage() {
  const insidehomepageref = useRef();
  const [expiredSession, setExpiredSession] = useState(false);
  const nav = useNavigate();
  const [userData, setUserData] = useState(null);
  const [permissionsdata, setpermissionsdata] = useState([]);

  function triggerscrollupwords() {
    if (insidehomepageref.current) {
      insidehomepageref.current.scrollTo({
        top: 0,
        behaviour: "smooth",
      });
    }
  }

  useEffect(() => {
    if (getCookie("token")) {
      const decoded = jwtDecode(getCookie("token"));
      const url = `${process.env.REACT_APP_API_URL}/api/User/GetUserbyUserId?userId=${decoded.sub}`;
      axios
        .get(url)
        .then((res) => {
          setUserData(res.data);
          axios
            .get(
              `${process.env.REACT_APP_API_URL}/api/Permissions/GetPermissionByRole?role=${res.data.role}`
            )
            .then((res) => {
              console.log(res);
              setpermissionsdata(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (getCookie("token") === null) {
      nav("/");
    }
  }, []);

  const [showchangepasswordform, setshowchangepasswordform] = useState(false);
  return (
    <section className="homepage">
      <ToastContainer />

      <Navbar
        expiredSession={expiredSession}
        setshowchangepasswordform={setshowchangepasswordform}
        userData={userData}
      />
      <section className="inside-homepage">
        <Sidebar />
        <triggerscroll.Provider
          value={{
            triggerscrollupwords,
            setExpiredSession,
            permissionsdata,
            userData,
          }}
        >
          <section className="inside-homepage-content" ref={insidehomepageref}>
            <Outlet />
          </section>
        </triggerscroll.Provider>
      </section>
      {showchangepasswordform && (
        <ChangePassword setshowchangepasswordform={setshowchangepasswordform} />
      )}
    </section>
  );
}

export default Homepage;
