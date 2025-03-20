import React, { useState, useEffect } from "react";
import "../../css_files/Master/AddCurrecyMaster.css";
import CloseForm from "./CloseForm";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import getCookie from "../../api";

function AddCurrencyMaster({
  setshowaddform,
  reload,
  setReload,
  triggerupdate,
  currencyupdatedata,
}) {
  const [currencyData, setCurrencyData] = useState({
    CurrencyName: triggerupdate ? currencyupdatedata?.currencyName : "",
    Code: triggerupdate ? currencyupdatedata?.code : "",
    Rate: triggerupdate ? currencyupdatedata?.rate : "",
    Description: triggerupdate ? currencyupdatedata?.description : "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (triggerupdate) {
      const URL = `${process.env.REACT_APP_API_URL}/api/v1/Currency/UpdateCurrency`;
      axios
        .post(
          URL,
          {
            id: currencyupdatedata.currencyId,
            CurrencyName: currencyData.CurrencyName,
            Code: currencyData.Code,
            Rate: currencyData.Rate,
            Description: currencyData.Description,
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message, {
            position: "bottom-center",
          });
          setshowaddform(false);
          setReload(!reload);
        })
        .catch((error) => {
          if (error.status === 500) {
            Swal.fire({
              title: "Errors Occured",
              text: error.response.data.error,
              icon: "error",
            });
          } else {
            toast.error("Failed to Update Record", {
              position: "bottom-center",
            });
          }
          console.log(error);
        });
    } else {
      const URL = `${process.env.REACT_APP_API_URL}/api/v1/Currency`;
      axios
        .post(URL, currencyData, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        })
        .then((response) => {
          toast.success("Record Added Successfully", {
            position: "bottom-center",
          });
          setshowaddform(false);
          setReload(!reload);
        })
        .catch((error) => {
          if (error.status === 500) {
            Swal.fire({
              title: "Errors Occured",
              text: error.response.data.error,
              icon: "error",
            });
          } else {
            toast.error("Failed to Add Record", {
              position: "bottom-center",
            });
          }
          console.log(error);
        });
    }
  }
  return (
    <form className="add-currency-master" onSubmit={handleSubmit}>
      <blockquote>
        <label>Currency Name</label>
        <input
          type="text"
          placeholder="Enter Currency Name"
          onChange={(e) =>
            setCurrencyData({ ...currencyData, CurrencyName: e.target.value })
          }
          value={currencyData.CurrencyName}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
          }}
          required
        />
      </blockquote>
      <blockquote>
        <label>Currency Code</label>
        <input
          type="text"
          placeholder="Enter Currency Code"
          onChange={(e) =>
            setCurrencyData({ ...currencyData, Code: e.target.value })
          }
          value={currencyData.Code}
          onInput={(e) =>
            (e.target.value = e.target.value
              .replace(/[^A-Za-z]/g, "")
              .toUpperCase()
              .slice(0, 3))
          }
        />
      </blockquote>
      <blockquote>
        <label>Rate</label>
        <input
          type="text"
          placeholder="Enter Currency Rate"
          onChange={(e) =>
            setCurrencyData({ ...currencyData, Rate: e.target.value })
          }
          value={currencyData.Rate}
          onInput={(e) => {
            e.target.value = e.target.value
              .replace(/[^0-9.]/g, "")
              .replace(/(\..*)\./g, "$1")
              .replace(/^(\d*\.\d{2}).*$/, "$1");
          }}
          required
        />
      </blockquote>
      <blockquote>
        <label>Description</label>
        <textarea
          rows={5}
          placeholder="Enter Currency Description"
          onChange={(e) =>
            setCurrencyData({ ...currencyData, Description: e.target.value })
          }
          value={currencyData.Description}
          required
        ></textarea>
      </blockquote>
      <button type="submit">{triggerupdate ? "Update" : "Add"} </button>
      <CloseForm close={setshowaddform} />
    </form>
  );
}

export default AddCurrencyMaster;
