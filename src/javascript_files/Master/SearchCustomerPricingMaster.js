import React, { useEffect, useState } from "react";
import "../../css_files/Master/SearchCustomerPricingMaster.css";
import CloseForm from "./CloseForm";
import axios from "axios";
import { toast } from "react-toastify";
import getCookie from "../../api";

function SearchCustomerPricingMaster({
  setshowsearchform,
  setsearchedtabledata,
  setfilterbutton,
  activatedfilters,
  setactivatedfilters,
}) {
  const [searchData, setSearchData] = useState({
    Id: 0,
    Code: 0,
    Rate: 0,
  });

  useEffect(() => {
    if (activatedfilters.length >= 0) {
      setSearchData((prev) => ({
        ...prev,
        Id: activatedfilters.includes("Id") ? prev.Id : 0,
        Code: activatedfilters.includes("Code") ? prev.Code : 0,
        Rate: activatedfilters.includes("Rate") ? prev.Rate : 0,
      }));
    }
  }, [activatedfilters]);

  function handleSearch(e) {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/api/v1/CustomerPricing/GetCustomerPricingByIdOrCodeOrPercentage?id=${searchData.Id}&code=${searchData.Code}&Percentage=${searchData.Rate}`;
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
            arr.push("Code");
            arr.push("Rate");
            return arr;
          });
        } else if (searchData.Code === 0) {
          setactivatedfilters((prev) => {
            const arr = [...prev];
            arr.push("Id");
            arr.push("Rate");
            return arr;
          });
        } else if (searchData.Rate === 0) {
          setactivatedfilters((prev) => {
            const arr = [...prev];
            arr.push("Id");
            arr.push("Code");
            return arr;
          });
        } else {
          setactivatedfilters((prev) => {
            const arr = [...prev];
            arr.push("Id");
            arr.push("Code");
            arr.push("Rate");
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
    <form
      className="search-customer-pricing-master-form"
      onSubmit={handleSearch}
    >
      <h3>Search Customer Pricing Master by Entering at least One Field</h3>
      <blockquote>
        <label>Id</label>
        <input
          type="number"
          placeholder="Enter Customer Id"
          onChange={(e) => setSearchData({ ...searchData, Id: e.target.value })}
          onInput={(e) => {
            e.target.value = e.target.value.slice(0, 9);
          }}
          value={searchData.Id}
        />
      </blockquote>
      <blockquote>
        <label>Code</label>
        <input
          type="number"
          placeholder="Enter Customer Code"
          onChange={(e) =>
            setSearchData({ ...searchData, Code: e.target.value })
          }
          value={searchData.Code}
        />
      </blockquote>
      <blockquote>
        <label>Rate</label>
        <input
          type="email"
          placeholder="Enter Rate"
          onInput={(e) => {
            e.target.value = e.target.value
              .replace(/[^0-9.]/g, "")
              .replace(/^(\d{3,})\d/g, "$1")
              .replace(/(\..*?)\./g, "$1")
              .replace(/^(\d{0,3})(\.\d{0,2})?.*$/, "$1$2");

            if (parseFloat(e.target.value) > 100) {
              e.target.value = "100.00";
            }
          }}
          onChange={(e) =>
            setSearchData({ ...searchData, Rate: e.target.value })
          }
          value={searchData.Rate}
        />
      </blockquote>
      <button type="submit">Search</button>
      <CloseForm close={setshowsearchform} />
    </form>
  );
}

export default SearchCustomerPricingMaster;
