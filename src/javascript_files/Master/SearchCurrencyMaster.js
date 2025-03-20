import React, { useEffect, useState } from "react";
import "../../css_files/Master/SearchCurrencyMaster.css";
import CloseForm from "./CloseForm";
import axios from "axios";
import { toast } from "react-toastify";
import getCookie from "../../api";
import Swal from "sweetalert2";

function SearchCurrencyMaster({
  setshowsearchform,
  setsearchedtabledata,
  setfilterbutton,
  setactivatedfilters,
  activatedfilters,
}) {
  const [searchData, setSearchData] = useState({
    Id: 0,
    Name: "",
    Code: "",
  });

  useEffect(() => {
    if (activatedfilters.length >= 0) {
      setSearchData((prev) => ({
        ...prev,
        Id: activatedfilters.includes("Id") ? prev.Id : 0,
        Name: activatedfilters.includes("Name") ? prev.Name : "",
        Code: activatedfilters.includes("Code") ? prev.Code : "",
      }));
    }
  }, [activatedfilters]);
  function handleSearch(e) {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/api/v1/Currency/GetCurrencyByIdOrNameOrCode?id=${searchData.Id}&name=${searchData.Name}&code=${searchData.Code}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setactivatedfilters([]);
        console.log(res);

        setsearchedtabledata(res.data);
        if (searchData.Id === 0) {
          setactivatedfilters((prev) => {
            const arr = [...prev];
            arr.push("Name");
            arr.push("Code");
            return arr;
          });
        } else if (searchData.Name === "") {
          setactivatedfilters((prev) => {
            const arr = [...prev];
            arr.push("Id");
            arr.push("Code");
            return arr;
          });
        } else if (searchData.Code === "") {
          setactivatedfilters((prev) => {
            const arr = [...prev];
            arr.push("Id");
            arr.push("Name");
            return arr;
          });
        } else {
          setactivatedfilters((prev) => {
            const arr = [...prev];
            arr.push("Id");
            arr.push("Name");
            arr.push("Code");
            return arr;
          });
        }

        setfilterbutton(true);
        toast.success("Fetched", {
          position: "bottom-center",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error, {
          position: "bottom-center",
        });
      });
  }
  return (
    <form className="search-currency-master-form" onSubmit={handleSearch}>
      <h3>Search Currency Master By Entering at least One Field</h3>
      <blockquote>
        <label>Id</label>
        <input
          type="number"
          placeholder="Enter Currency Master Id"
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
          placeholder="Enter Currency Name"
          onChange={(e) =>
            setSearchData({ ...searchData, Name: e.target.value })
          }
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
          }}
          value={searchData.Name}
        />
      </blockquote>
      <blockquote>
        <label>Code</label>
        <input
          type="text"
          placeholder="Enter Currency Code"
          onInput={(e) =>
            (e.target.value = e.target.value
              .replace(/[^A-Za-z]/g, "")
              .toUpperCase()
              .slice(0, 3))
          }
          onChange={(e) =>
            setSearchData({ ...searchData, Code: e.target.value })
          }
          value={searchData.Code}
        />
      </blockquote>
      <button type="submit">Search</button>
      <CloseForm close={setshowsearchform} />
    </form>
  );
}

export default SearchCurrencyMaster;
