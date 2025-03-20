import React, { useEffect, useState } from "react";
import "../../css_files/Master/SearchSubCategoryMaster.css";
import CloseForm from "./CloseForm";
import axios from "axios";
import getCookie from "../../api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function SearchSubCategoryMaster({
  setshowsearchform,
  setsearchedtabledata,
  setfilterbutton,
  activatedfilters,
  setactivatedfilters,
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
    const url = `${process.env.REACT_APP_API_URL}/api/v1/SubCategory/GetSubCategoryByIdOrName?id=${searchData.Id}&name=${searchData.Name}`;
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
    <form className="search-sub-category-master-form" onSubmit={handleSearch}>
      <h3>
        Search Sub-Category Master By <br />
        Entering at least One Field
      </h3>
      <blockquote>
        <label>Id</label>
        <input
          type="number"
          placeholder="Enter Sub-Category Master Id"
          onChange={(e) => setSearchData({ ...searchData, Id: e.target.value })}
          value={searchData.Id}
          onInput={(e) => {
            e.target.value = e.target.value.slice(0, 9);
          }}
        />
      </blockquote>
      <blockquote>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter Sub-Category Name"
          onChange={(e) =>
            setSearchData({ ...searchData, Name: e.target.value })
          }
          value={searchData.Name}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
          }}
        />
      </blockquote>
      <button type="submit">Search</button>
      <CloseForm close={setshowsearchform} />
    </form>
  );
}

export default SearchSubCategoryMaster;
