import React, { useEffect } from "react";
import { useState } from "react";
import "../../css_files/Master/AddCustomerMaster.css";
import CloseForm from "./CloseForm";
import axios from "axios";
import AddCustomerAddress from "./AddCustomerAddress";
import AddCustomerBoiler from "./AddCustomerBoiler";
import { toast } from "react-toastify";
import getCookie from "../../api";
import Swal from "sweetalert2";

function AddCustomerMaster({
  setshowaddform,
  reload,
  setReload,
  triggerupdate,
  customerupdatedata,
  customeraddressupdatedata,
  customerboilerupdatedata,
  customercontactupdatedata,
}) {
  const [customerData, setCustomerData] = useState({
    OrgName: triggerupdate ? customerupdatedata?.orgName : "",
    Description: triggerupdate ? customerupdatedata?.description : "",
  });

  const [customerContact, setCustomerContact] = useState({
    POC: triggerupdate ? customercontactupdatedata[0]?.poc : "",
  });

  const [addresscurrentcount, setaddresscurrentcount] = useState(0);
  const [customerboilercurrentcount, setcustomerboilercurrentcount] =
    useState(0);
  const [customerphonenumbercurrentcount, setcustomerphonenumbercurrentcount] =
    useState(0);
  const [customeraddressdata, setcustomeraddressdata] = useState(
    triggerupdate ? customeraddressupdatedata : []
  );

  const [customerboilerdata, setcustomerboilerdata] = useState(
    triggerupdate ? customerboilerupdatedata : []
  );

  const [customerphonenumberdata, setcustomerphonenumberdata] = useState(
    triggerupdate
      ? customercontactupdatedata[0]?.phoneNumbers.split(",") || []
      : []
  );

  function manageaddresscount(status) {
    if (customeraddressdata.length > 0) {
      if (status === "minus") {
        setcustomeraddressdata((prev) => {
          const arr = [...prev];
          const filteredarray = arr.filter(
            (_, index) => index != addresscurrentcount
          );
          return filteredarray;
        });
      } else if (status === "plus") {
        setcustomeraddressdata((prev) => {
          const arr = [...prev];
          arr.push({
            area: "",
            city: "",
            pincode: "",
            state: "",
          });
          return arr;
        });
      }
    }
  }

  function managecustomerboilercount(status) {
    if (customerboilerdata.length > 0) {
      if (status === "minus") {
        setcustomerboilerdata((prev) => {
          const arr = [...prev];
          const filteredarray = arr.filter(
            (_, index) => index != customerboilercurrentcount
          );
          return filteredarray;
        });
      } else if (status === "plus") {
        setcustomerboilerdata((prev) => {
          const arr = [...prev];
          arr.push({
            boilerHead: "",
            boilerSeries: "",
          });
          return arr;
        });
      }
    }
  }

  function managecustomerphonenumbercount(status) {
    if (customerphonenumberdata.length > 0) {
      if (status === "minus") {
        setcustomerphonenumberdata((prev) => {
          const arr = [...prev];
          const filteredarray = arr.filter(
            (_, index) => index != customerphonenumbercurrentcount
          );
          return filteredarray;
        });
      } else if (status === "plus") {
        setcustomerphonenumberdata((prev) => {
          const arr = [...prev];
          arr.push("");
          return arr;
        });
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (triggerupdate) {
      const URL = `${process.env.REACT_APP_API_URL}/api/v1/Customer/UpdateCustomerCommand`;
      axios
        .post(
          URL,
          {
            customerID: customerupdatedata.id,
            orgName: customerData.OrgName,
            description: customerData.Description,
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        )
        .then((response) => {
          toast.success(response.data.message, {
            position: "bottom-center",
          });
          const contacturl = `${process.env.REACT_APP_API_URL}/api/v1/ContactCentres/UpdateContactCentre`;
          axios
            .post(
              contacturl,
              {
                id: customercontactupdatedata[0].id,
                CustomerId: response.data.id,
                POC: customerContact.POC,
                PhoneNumbers: customerphonenumberdata
                  .map((item) => item)
                  .join(","),
              },
              {
                headers: {
                  Authorization: `Bearer ${getCookie("token")}`,
                },
              }
            )
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
          for (let i = 0; i < customeraddressdata.length; i++) {
            const addressurl = `${process.env.REACT_APP_API_URL}/api/v1/Addresses/UpdateAddress`;
            axios
              .post(
                addressurl,
                {
                  id: customeraddressupdatedata[i].id,
                  CustomerId: response.data.id,
                  Area: customeraddressdata[i].area,
                  City: customeraddressdata[i].city,
                  Pincode: customeraddressdata[i].pincode,
                  State: customeraddressdata[i].state,
                },
                {
                  headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                  },
                }
              )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }

          for (let i = 0; i < customerboilerdata.length; i++) {
            const boilerurl = `${process.env.REACT_APP_API_URL}/api/v1/CustomerBoilers/UpdateCustomerBoiler`;
            axios
              .post(
                boilerurl,
                {
                  id: customerboilerupdatedata[i].id,
                  CustomerId: response.data.id,
                  BoilerHead: customerboilerdata[i].boilerHead,
                  BoilerSeries: customerboilerdata[i].boilerSeries,
                },
                {
                  headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                  },
                }
              )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }

          setshowaddform(false);
          setReload(!reload);
        })
        .catch((err) => {
          console.log(err);
          if (err.status === 500) {
            Swal.fire({
              title: "Errors Occured",
              text: err.response.data.error,
              icon: "error",
            });
          } else {
            toast.error("Failed to Add Record", {
              position: "bottom-center",
            });
          }
        });
    } else {
      const URL = `${process.env.REACT_APP_API_URL}/api/v1/Customer`;
      axios
        .post(URL, customerData, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data.id);
          const contacturl = `${process.env.REACT_APP_API_URL}/api/v1/ContactCentres`;
          axios
            .post(
              contacturl,
              {
                CustomerId: response.data.id,
                POC: customerContact.POC,
                PhoneNumbers: customerphonenumberdata
                  .map((item) => item)
                  .join(","),
              },
              {
                headers: {
                  Authorization: `Bearer ${getCookie("token")}`,
                },
              }
            )
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
          for (let i = 0; i < customeraddressdata.length; i++) {
            const addressurl = `${process.env.REACT_APP_API_URL}/api/v1/Addresses`;
            axios
              .post(
                addressurl,
                {
                  CustomerId: response.data.id,
                  Area: customeraddressdata[i].area,
                  City: customeraddressdata[i].city,
                  Pincode: customeraddressdata[i].pincode,
                  State: customeraddressdata[i].state,
                },
                {
                  headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                  },
                }
              )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }

          for (let i = 0; i < customerboilerdata.length; i++) {
            const boilerurl = `${process.env.REACT_APP_API_URL}/api/v1/CustomerBoilers`;
            axios
              .post(
                boilerurl,
                {
                  CustomerId: response.data.id,
                  BoilerHead: customerboilerdata[i].boilerHead,
                  BoilerSeries: customerboilerdata[i].boilerSeries,
                },
                {
                  headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                  },
                }
              )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }

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
        });
    }
  }
  return (
    <form className="add-customer-master" onSubmit={handleSubmit}>
      <blockquote>
        <label>Organization/Company Name</label>
        <input
          type="text"
          placeholder="Enter Organization/Company Name"
          onChange={(e) =>
            setCustomerData({ ...customerData, OrgName: e.target.value })
          }
          value={customerData.OrgName}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
          }}
          required
        />
      </blockquote>
      <blockquote>
        <label>Description</label>
        <textarea
          placeholder="Description (Maximum 200 Characters)"
          rows={5}
          onChange={(e) =>
            setCustomerData({ ...customerData, Description: e.target.value })
          }
          value={customerData.Description}
          onInput={(e) => (e.target.value = e.target.value.slice(0, 200))}
          required
        ></textarea>
      </blockquote>
      {customeraddressdata.length === 0 && (
        <blockquote>
          <label>
            Add Address{" "}
            <i
              class="fa-solid fa-circle-plus"
              style={{ fontSize: "1.5rem", cursor: "pointer" }}
              onClick={() =>
                setcustomeraddressdata((prev) => {
                  const arr = [...prev];
                  arr.push({
                    area: "",
                    city: "",
                    pincode: "",
                    state: "",
                  });
                  return arr;
                })
              }
            ></i>
          </label>
        </blockquote>
      )}
      {customeraddressdata.map((address, dataindex) => (
        <AddCustomerAddress
          addressindex={dataindex}
          manageaddresscount={manageaddresscount}
          customeraddressdata={customeraddressdata}
          setcustomeraddressdata={setcustomeraddressdata}
          setaddresscurrentcount={setaddresscurrentcount}
        />
      ))}

      <p style={{ textAlign: "left" }}>Customer Contact</p>
      <blockquote>
        <label>POC</label>
        <textarea
          rows={5}
          placeholder="Enter POC"
          onChange={(e) =>
            setCustomerContact({ ...customerContact, POC: e.target.value })
          }
          value={customerContact.POC}
          required
        ></textarea>
      </blockquote>
      {customerphonenumberdata.length === 0 && (
        <blockquote>
          <label>
            Add Customer Phone Number{" "}
            <i
              class="fa-solid fa-circle-plus"
              style={{ fontSize: "1.5rem", cursor: "pointer" }}
              onClick={() =>
                setcustomerphonenumberdata((prev) => {
                  const arr = [...prev];
                  arr.push("");
                  return arr;
                })
              }
            ></i>
          </label>
        </blockquote>
      )}

      {customerphonenumberdata.length > 0 && (
        <label style={{ textAlign: "start" }}>Phone Numbers</label>
      )}
      {customerphonenumberdata.map((phonenumber, dataindex) => (
        <blockquote style={{ flexDirection: "row", alignItems: "center" }}>
          <input
            type="number"
            placeholder="Enter Customer Phone Number"
            onChange={(e) =>
              setcustomerphonenumberdata((prev) =>
                prev.map((phno, index) =>
                  index === dataindex ? e.target.value : phno
                )
              )
            }
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 10);
            }}
            value={phonenumber || ""}
          />

          <i
            class="fa-solid fa-circle-minus"
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
            onClick={() => {
              managecustomerphonenumbercount("minus");
              setcustomerphonenumbercurrentcount(dataindex);
            }}
          ></i>
          <i
            class="fa-solid fa-circle-plus"
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
            onClick={() => {
              managecustomerphonenumbercount("plus");
              setcustomerphonenumbercurrentcount(dataindex);
            }}
          ></i>
        </blockquote>
      ))}

      {customerboilerdata.length === 0 && (
        <blockquote>
          <label>
            Add Customer Boiler{" "}
            <i
              class="fa-solid fa-circle-plus"
              style={{ fontSize: "1.5rem", cursor: "pointer" }}
              onClick={() =>
                setcustomerboilerdata((prev) => {
                  const arr = [...prev];
                  arr.push({
                    boilerHead: "",
                    boilerSeries: "",
                  });
                  return arr;
                })
              }
            ></i>
          </label>
        </blockquote>
      )}
      {customerboilerdata.map((customerboiler, dataindex) => (
        <AddCustomerBoiler
          boilerindex={dataindex}
          managecustomerboilercount={managecustomerboilercount}
          customerboilerdata={customerboilerdata}
          setcustomerboilerdata={setcustomerboilerdata}
          setcustomerboilercurrentcount={setcustomerboilercurrentcount}
        />
      ))}
      <button type="submit">{triggerupdate ? "Update" : "Add"} </button>
      <CloseForm close={setshowaddform} />
    </form>
  );
}

export default AddCustomerMaster;
