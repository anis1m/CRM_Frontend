import React, { useState, useEffect } from "react";
import axios from "axios";
import getCookie from "../../api";

function AddCustomerBoiler({
  boilerindex,
  managecustomerboilercount,
  customerboilerdata,
  setcustomerboilerdata,
  setcustomerboilercurrentcount,
}) {
  const [boilerData, setBoilerData] = useState([]);
  const [boilerSeriesData, setBoilerSeriesData] = useState([]);
  useEffect(() => {
    const URL = `${process.env.REACT_APP_API_URL}/api/v1/Boiler`;
    axios
      .get(URL, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setBoilerData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function fetchboilerseries(boilerhead) {
    const URL = `${process.env.REACT_APP_API_URL}/api/v1/BoilerSeries/GetBoilerSeriesByIdOrheadOrSeriesCode?Head=${boilerhead}`;
    axios
      .get(URL, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setBoilerSeriesData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchboilerseries(customerboilerdata[boilerindex]?.boilerHead);
  }, [customerboilerdata]);

  return (
    <form className="add-customer-address">
      <blockquote style={{ flexDirection: "row", alignItems: "center" }}>
        <p>Customer Boiler</p>
        <button
          type="button"
          style={{ marginLeft: "auto" }}
          onClick={() => {
            managecustomerboilercount("minus");
            setcustomerboilercurrentcount(boilerindex);
          }}
        >
          <i class="fa-solid fa-circle-minus"></i>
        </button>
        <button
          type="button"
          onClick={() => {
            managecustomerboilercount("plus");
            setcustomerboilercurrentcount(boilerindex);
          }}
        >
          <i class="fa-solid fa-circle-plus"></i>
        </button>
      </blockquote>
      <blockquote>
        <label>Boiler Head</label>
        <select
          onChange={(e) => {
            fetchboilerseries(e.target.value);
            setcustomerboilerdata((prev) => {
              const arr = [...prev];
              arr.forEach((singleboiler, index) => {
                if (index === boilerindex) {
                  singleboiler.boilerHead = e.target.value;
                }
              });
              return arr;
            });
          }}
          required
        >
          <option value="">Select Boiler Head</option>
          {boilerData.map((boiler, index) => (
            <option
              key={index}
              value={boiler.head}
              selected={
                boiler.head === customerboilerdata[boilerindex]?.boilerHead
              }
            >
              {boiler.head}
            </option>
          ))}
        </select>
      </blockquote>
      <blockquote>
        <label>Boiler Series</label>
        <select
          onChange={(e) => {
            setcustomerboilerdata((prev) => {
              const arr = [...prev];
              arr.forEach((singleboiler, index) => {
                if (index === boilerindex) {
                  singleboiler.boilerSeries = e.target.value;
                }
              });
              return arr;
            });
          }}
          required
        >
          <option value="">Select Boiler Series</option>
          {boilerSeriesData.map((boilerSeries, index) => (
            <option
              key={index}
              value={boilerSeries.head}
              selected={
                boilerSeries.head ===
                customerboilerdata[boilerindex]?.boilerSeries
              }
            >
              {`${boilerSeries.head} (${boilerSeries.seriesCode})`}
            </option>
          ))}
        </select>
      </blockquote>
    </form>
  );
}

export default AddCustomerBoiler;
