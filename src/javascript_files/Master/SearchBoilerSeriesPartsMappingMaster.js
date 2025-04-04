import React, { useEffect, useState } from "react";
import "../../css_files/Master/SearchBoilerSeriesPartsMappingMaster.css";
import CloseForm from "./CloseForm";
import axios from "axios";
import { toast } from "react-toastify";
import getCookie from "../../api";

function SearchBoilerSeriesPartsMappingMaster({
  setshowsearchform,
  setsearchedtabledata,
  setfilterbutton,
  activatedfilters,
  setactivatedfilters,
}) {
  const [searchData, setSearchData] = useState({
    Id: 0,
    SeriesCode: "",
  });

  useEffect(() => {
    if (activatedfilters.length >= 0) {
      setSearchData((prev) => ({
        ...prev,
        Id: activatedfilters.includes("Id") ? prev.Id : 0,
        SeriesCode: activatedfilters.includes("SeriesCode")
          ? prev.SeriesCode
          : "",
      }));
    }
  }, [activatedfilters]);

  function handleSearch(e) {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/api/v1/BoilerPartsMapper/GetBoilerPartsMapperByIdOrSeriesCode?id=${searchData.Id}&SeriesCode=${searchData.SeriesCode}`;
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
            arr.push("SeriesCode");
            return arr;
          });
        } else if (searchData.SeriesCode === "") {
          setactivatedfilters((prev) => {
            const arr = [...prev];
            arr.push("Id");
            return arr;
          });
        } else {
          setactivatedfilters((prev) => {
            const arr = [...prev];
            arr.push("Id");
            arr.push("SeriesCode");
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
      className="search-boiler-series-parts-mapping-master-form"
      onSubmit={handleSearch}
    >
      <h3>
        Search Boiler-Series Parts Mapping Master By <br />
        Entering at least One Field
      </h3>
      <blockquote>
        <label>Id</label>
        <input
          type="number"
          placeholder="Enter Boiler-Series Parts Mapping Master Id"
          onChange={(e) => setSearchData({ ...searchData, Id: e.target.value })}
          value={searchData.Id}
        />
      </blockquote>
      <blockquote>
        <label>Series Code</label>
        <input
          type="text"
          placeholder="Enter Series Code"
          onChange={(e) =>
            setSearchData({ ...searchData, SeriesCode: e.target.value })
          }
          value={searchData.Id}
        />
      </blockquote>
      <button type="submit">Search</button>
      <CloseForm close={setshowsearchform} />
    </form>
  );
}

export default SearchBoilerSeriesPartsMappingMaster;
