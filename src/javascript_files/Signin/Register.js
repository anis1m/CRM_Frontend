import React from "react";
import "../../css_files/Signin/Register.css";
import { Link } from "react-router-dom";

function Register() {
  return (
    <section className="register">
      <form>
        <h1>Register</h1>
        <blockquote>
          <label>Username</label>
          <input type="text" placeholder="Enter Username" />
        </blockquote>
        <blockquote>
          <label>Full Name</label>
          <input type="text" placeholder="Enter Full Name" />
        </blockquote>
        <blockquote>
          <label>Email</label>
          <input type="email" placeholder="Enter Email" />
        </blockquote>
        <blockquote>
          <label>Phone Number</label>
          <input
            type="number"
            placeholder="Enter Phone Number with country code without +"
          />
        </blockquote>
        <blockquote>
          <label>Password</label>
          <input type="password" placeholder="Enter Password" />
        </blockquote>
        <blockquote>
          <label>Confirm Password</label>
          <input type="password" placeholder="Enter Password Again" />
        </blockquote>
        <button type="submit">Register</button>
      </form>

      <p>
        By clicking register, you agree to our terms of service and privacy
        policy
      </p>
      <p>
        Already Registered. Click{" "}
        <Link to={"/login"}>
          <a>Here</a>
        </Link>{" "}
        to Login
      </p>
    </section>
  );
}

export default Register;
