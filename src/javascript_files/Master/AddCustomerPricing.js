import React, { useEffect, useRef } from "react";
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
            Code: customerPricingData.Code,
            Percentage: customerPricingData.Percentage,
            Description: customerPricingData.Description,
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
          setshowaddform(false);
          setReload(!reload);
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
  const [showextratextbox, setshowextratextbox] = useState(false);

  return (
    <form className="add-customer-pricing-master" onSubmit={handleSubmit}>
      <aside>
        <blockquote>
          <label>Discount Code</label>
          <select
            onChange={(e) => {
              setCustomerPricingData({
                ...customerPricingData,
                Code: e.target.value,
              });
            }}
            onInput={(e) => {
              if (e.target.value === "C") {
                setshowextratextbox(true);
              } else {
                setshowextratextbox(false);
              }
              if (e.target.value === "A") {
                setCustomerPricingData({
                  ...customerPricingData,
                  Percentage: 0,
                });
              } else if (e.target.value === "") {
                setCustomerPricingData({
                  ...customerPricingData,
                  Percentage: "",
                });
              }
            }}
            required
          >
            <option value="">Select Discount Code</option>
            <option value="A" selected={customerPricingData.Code === "A"}>
              A
            </option>
            <option value="B" selected={customerPricingData.Code === "B"}>
              B
            </option>
            <option value="C" selected={customerPricingData.Code === "C"}>
              C
            </option>
          </select>
        </blockquote>
        <blockquote>
          <label>Rate (Percentage)</label>
          <input
            type="text"
            placeholder="Enter Rate"
            readOnly={customerPricingData.Code === "B" ? false : true}
            value={customerPricingData.Percentage}
            onChange={(e) => {
              setCustomerPricingData({
                ...customerPricingData,
                Percentage: e.target.value > 100.0 ? 100.0 : e.target.value,
              });
            }}
            required
            onInput={(e) => {
              e.target.value = e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/^(\d{3,})\d/g, "$1")
                .replace(/(\..*?)\./g, "$1")
                .replace(/^(\d{0,3})(\.\d{0,2})?.*$/, "$1$2");
            }}
          />
        </blockquote>
        {showextratextbox && (
          <blockquote>
            <label>Rate (Percentage)</label>
            <input
              type="text"
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
              readOnly={customerPricingData.Percentage === "" ? true : false}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setCustomerPricingData({
                    ...customerPricingData,
                    Percentage:
                      parseFloat(customerPricingData.Percentage) +
                        parseFloat(e.target.value) >
                      100.0
                        ? 100.0
                        : parseFloat(customerPricingData.Percentage) +
                          parseFloat(e.target.value),
                  });
                }
              }}
              onClick={() => {
                axios
                  .get(
                    `${process.env.REACT_APP_API_URL}/api/v1/CustomerPricing/GetCustomerPricingByIdOrCodeOrPercentage?code=B`,
                    {
                      headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                      },
                    }
                  )
                  .then((res) => {
                    setCustomerPricingData({
                      ...customerPricingData,
                      Percentage: res.data[0].percentage,
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              required
            />
          </blockquote>
        )}
      </aside>
      <blockquote>
        <label>Description </label>
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
      <button type="submit">{triggerupdate ? "Update" : "Add"}</button>
      <CloseForm close={setshowaddform} />
    </form>
  );
}

export default AddCustomerPricingMaster;
