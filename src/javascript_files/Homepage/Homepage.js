import React, { createContext, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../../css_files/Homepage/Homepage.css";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import getCookie from "../../api";

export const triggerscroll = createContext();
function Homepage() {
  const insidehomepageref = useRef();
  const [expiredSession, setExpiredSession] = useState(false);
  const nav = useNavigate();

  function triggerscrollupwords() {
    if (insidehomepageref.current) {
      insidehomepageref.current.scrollTo({
        top: 0,
        behaviour: "smooth",
      });
    }
  }

  useEffect(() => {
    if (getCookie("token") === null) {
      nav("/");
    }
  }, []);
  return (
    <section className="homepage">
      <ToastContainer />

      <Navbar expiredSession={expiredSession} />
      <section className="inside-homepage">
        <Sidebar />
        <triggerscroll.Provider
          value={{ triggerscrollupwords, setExpiredSession }}
        >
          <section className="inside-homepage-content" ref={insidehomepageref}>
            <Outlet />
          </section>
        </triggerscroll.Provider>
      </section>
    </section>
  );
}

export default Homepage;
