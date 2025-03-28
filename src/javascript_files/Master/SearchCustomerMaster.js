import React, { useEffect, useState } from "react";
import "../../css_files/Master/SearchCustomerMaster.css";
import CloseForm from "./CloseForm";
import axios from "axios";
import { toast } from "react-toastify";
import getCookie from "../../api";

function SearchCustomerMaster({
  setshowsearchform,
  setsearchedtabledata,
  setfilterbutton,
  setactivatedfilters,
  activatedfilters,
}) {
  const [searchData, setSearchData] = useState({
    Id: 0,
    Name: "",
  });

  useEffect(() => {
    if (activatedfilters.length >= 0) {
      setSearchData((prev) => ({
        ...prev,
        Id: activatedfilters.includes("Id") ? prev.Id : 0,
        Name: activatedfilters.includes("Name") ? prev.Name : "",
      }));
    }
  }, [activatedfilters]);

  function handleSearch(e) {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/api/v1/Customer/GetCustomerByIdOrName?id=${searchData.Id}&name=${searchData.Name}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setactivatedfilters([]);
        console.log(res);
        toast.success("Fetched", {
          position: "bottom-center",
        });

        setsearchedtabledata(res.data);
        if (searchData.Id === 0) {
          setactivatedfilters((prev) => {
            const arr = [...prev];
            arr.push("Name");
            return arr;
          });
        } else if (searchData.Name === "") {
          setactivatedfilters((prev) => {
            const arr = [...prev];
            arr.push("Id");
            return arr;
          });
        } else {
          setactivatedfilters((prev) => {
            const arr = [...prev];
            arr.push("Id");
            arr.push("Name");
            return arr;
          });
        }

        setfilterbutton(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error, {
          position: "bottom-center",
        });
      });
  }
  return (
    <form className="search-customer-master-form" onSubmit={handleSearch}>
      <h3>Search Customer Master by Entering at least One Field</h3>
      <blockquote>
        <label>Id</label>
        <input
          type="number"
          placeholder="Enter Customer Master Id"
          onChange={(e) => setSearchData({ ...searchData, Id: e.target.value })}
          onInput={(e) => {
            e.target.value = e.target.value.slice(0, 10);
          }}
          value={searchData.Id}
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
          onChange={(e) =>
            setSearchData({ ...searchData, Name: e.target.value })
          }
          value={searchData.Name}
        />
      </blockquote>

      <button type="submit">Search</button>
      <CloseForm close={setshowsearchform} />
    </form>
  );
}

export default SearchCustomerMaster;
