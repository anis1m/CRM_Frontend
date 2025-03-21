import React, { useEffect } from "react";
import { useState } from "react";
import "../../css_files/Master/AddCustomerPricingMaster.css";
import CloseForm from "./CloseForm";
import axios from "axios";
import { toast } from "react-toastify";
import getCookie from "../../api";
import Swal from "sweetalert2";

function AddCustomerPricingMaster({
  setshowaddform,
  reload,
  setReload,
  triggerupdate,
  customerpricingupdatedata,
}) {
  const [customerPricingData, setCustomerPricingData] = useState({
    Code: triggerupdate ? customerpricingupdatedata?.code : "",
    Percentage: triggerupdate ? customerpricingupdatedata?.percentage : "",
    Description: triggerupdate ? customerpricingupdatedata?.description : "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (triggerupdate) {
      const url = `${process.env.REACT_APP_API_URL}/api/v1/CustomerPricing/UpdateCustomerPricing`;
      axios
        .post(
          url,
          {
            id: customerpricingupdatedata.id,
            code: customerPricingData.Code,
            percentage: customerPricingData.Percentage,
            description: customerPricingData.Description,
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
        .catch((err) => {
          if (err.status === 500) {
            Swal.fire({
              title: "Errors Occured",
              text: err.response.data.error,
              icon: "error",
            });
          } else {
            toast.error("Failed to Update", {
              position: "bottom-center",
            });
          }
          console.log(err);
        });
    } else {
      const URL = `${process.env.REACT_APP_API_URL}/api/v1/CustomerPricing`;
      axios
        .post(URL, customerPricingData, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        })
        .then((response) => {
          toast.success("Record Added Successfully", {
            position: "bottom-center",
          });

          const url = `${process.env.REACT_APP_API_URL}/api/v1/CustomerPricing/GetCustomerPricingByIdOrCodeOrPercentage?id=${response.data.id}`;
          axios
            .get(url, {
              headers: {
                Authorization: `Bearer ${getCookie("token")}`,
              },
            })
            .then((res) => {
              console.log(res.data);
              setCustomerPricingDropdowns((prev) => {
                const arr = [...prev];
                arr.push(res.data[0]);
                return arr;
              });
              setshowaddform(false);
              setReload(!reload);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => {
          console.error(error);
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
        });
    }
  }
  return (
    <form className="add-customer-pricing-master" onSubmit={handleSubmit}>
      <blockquote>
        <label>Customer Code</label>
        <input
          type="number"
          placeholder="Enter Customer Code"
          value={customerPricingData.Code}
          onChange={(e) =>
            setCustomerPricingData({
              ...customerPricingData,
              Code: e.target.value,
            })
          }
          onInput={(e) => {
            e.target.value = e.target.value.slice(0, 9);
          }}
        />
      </blockquote>
      <aside>
        <blockquote>
          <label>Rate</label>
          <input
            type="text"
            placeholder="Enter Rate"
            value={customerPricingData.Percentage}
            onChange={(e) =>
              setCustomerPricingData({
                ...customerPricingData,
                Percentage: e.target.value,
              })
            }
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
          />
        </blockquote>
        <blockquote>
          <label>Customer Pricing Discount</label>
          <select>
            <option value="">Select Customer Pricing Discount</option>
            <option>A (50%)</option>
            <option>B (25%)</option>
            <option>C (10%)</option>
          </select>
        </blockquote>
      </aside>
      <blockquote>
        <label>Description (Upto 200 Characters)</label>
        <textarea
          rows={4}
          placeholder="Description"
          value={customerPricingData.Description}
          onChange={(e) =>
            setCustomerPricingData({
              ...customerPricingData,
              Description: e.target.value,
            })
          }
          onInput={(e) => {
            e.target.value = e.target.value.slice(0, 200);
          }}
          required
        />
      </blockquote>
      <button type="submit">Add </button>
      <CloseForm close={setshowaddform} />
    </form>
  );
}

export default AddCustomerPricingMaster;
