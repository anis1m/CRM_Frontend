import React, { useEffect, useState } from "react";
import "../../css_files/Master/AddCustomerAddress.css";

function AddCustomerAddress({
  addressindex,
  manageaddresscount,
  customeraddressdata,
  setcustomeraddressdata,
  setaddresscurrentcount,
}) {
  return (
    <form className="add-customer-address">
      <blockquote style={{ flexDirection: "row", alignItems: "center" }}>
        <p>Customer Address</p>
        <button
          type="button"
          style={{ marginLeft: "auto" }}
          onClick={() => {
            manageaddresscount("minus");
            setaddresscurrentcount(addressindex);
          }}
        >
          <i class="fa-solid fa-circle-minus"></i>
        </button>
        <button
          type="button"
          onClick={() => {
            manageaddresscount("plus");
            setaddresscurrentcount(addressindex);
          }}
        >
          <i class="fa-solid fa-circle-plus"></i>
        </button>
      </blockquote>
      <blockquote>
        <label>Area</label>
        <input
          type="text"
          required
          placeholder="Enter Area"
          onChange={(e) =>
            setcustomeraddressdata((prev) => {
              const arr = [...prev];
              arr.forEach((singleaddress, index) => {
                if (index === addressindex) {
                  singleaddress.area = e.target.value;
                }
              });
              return arr;
            })
          }
          value={(function () {
            if (Array.isArray(customeraddressdata)) {
              for (let i = 0; i < customeraddressdata.length; i++) {
                if (addressindex === i) {
                  return customeraddressdata[i].area;
                }
              }
            }
            return "";
          })()}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
          }}
        />
      </blockquote>
      <aside>
        <blockquote>
          <label>City</label>
          <input
            type="text"
            placeholder="Enter City"
            onChange={(e) =>
              setcustomeraddressdata((prev) => {
                const arr = [...prev];
                arr.forEach((singleaddress, index) => {
                  if (index === addressindex) {
                    singleaddress.city = e.target.value;
                  }
                });
                return arr;
              })
            }
            required
            value={(function () {
              if (Array.isArray(customeraddressdata)) {
                for (let i = 0; i < customeraddressdata.length; i++) {
                  if (addressindex === i) {
                    return customeraddressdata[i].city;
                  }
                }
              }
              return "";
            })()}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
            }}
          />
        </blockquote>
        <blockquote>
          <label>Pincode</label>
          <input
            type="number"
            placeholder="Enter Pin Code"
            onChange={(e) =>
              setcustomeraddressdata((prev) => {
                const arr = [...prev];
                arr.forEach((singleaddress, index) => {
                  if (index === addressindex) {
                    singleaddress.pincode = e.target.value;
                  }
                });
                return arr;
              })
            }
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6);
            }}
            value={(function () {
              if (Array.isArray(customeraddressdata)) {
                for (let i = 0; i < customeraddressdata.length; i++) {
                  if (addressindex === i) {
                    return customeraddressdata[i].pincode;
                  }
                }
              }
              return "";
            })()}
            required
          />
        </blockquote>
      </aside>
      <blockquote>
        <label>State</label>
        <input
          type="text"
          placeholder="Enter State"
          onChange={(e) =>
            setcustomeraddressdata((prev) => {
              const arr = [...prev];
              arr.forEach((singleaddress, index) => {
                if (index === addressindex) {
                  singleaddress.state = e.target.value;
                }
              });
              return arr;
            })
          }
          value={(function () {
            if (Array.isArray(customeraddressdata)) {
              for (let i = 0; i < customeraddressdata.length; i++) {
                if (addressindex === i) {
                  return customeraddressdata[i].state;
                }
              }
            }
            return "";
          })()}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
          }}
          required
        />
      </blockquote>
    </form>
  );
}

export default AddCustomerAddress;
