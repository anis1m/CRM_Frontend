import React, { useState } from "react";
import "../../css_files/Master/SearchCustomerMaster.css";
import CloseForm from "./CloseForm";
import axios from "axios";
import { toast } from "react-toastify";
import getCookie from "../../api";

function SearchCustomerMaster({
  setshowsearchform,
  setsearchedtabledata,
  setfilterbutton,
}) {
  const [Id, setId] = useState(0);

  function handleSearch(e, id) {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/api/v1/Customer/GetCustomerById?id=${id}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        toast.success("Fetched", {
          position: "bottom-center",
        });
        setsearchedtabledata(res.data);
        setfilterbutton(true);
      })
      .catch((err) => {
        toast.error("Failed to Search. Please Check Id", {
          position: "bottom-center",
        });
      });
  }
  return (
    <form
      className="search-customer-master-form"
      onSubmit={(e) => handleSearch(e, Id)}
    >
      <h3>Search Customer Master by Entering at least One Field</h3>
      <blockquote>
        <label>Id</label>
        <input
          type="number"
          placeholder="Enter Customer Master Id"
          onChange={(e) => setId(e.target.value)}
          onInput={(e) => {
            e.target.value = e.target.value.slice(0, 10);
          }}
        />
      </blockquote>
      <blockquote>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter Customer Name"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
          }}
        />
      </blockquote>
      <blockquote>
        <label>Email</label>
        <input type="email" placeholder="Enter Customer Email" />
      </blockquote>
      <button type="submit">Search</button>
      <CloseForm close={setshowsearchform} />
    </form>
  );
}

export default SearchCustomerMaster;
