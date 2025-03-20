import React from "react";
import { useState } from "react";
import "../../css_files/Master/AddCourierMaster.css";
import CloseForm from "./CloseForm";
import axios from "axios";
import { toast } from "react-toastify";
import getCookie from "../../api";
import Swal from "sweetalert2";

function AddCourierMaster({
  setshowaddform,
  reload,
  setReload,
  triggerupdate,
  courierupdatedata,
}) {
  const [courierData, setCourierData] = useState({
    BasicDetails: triggerupdate ? courierupdatedata?.basicDetails : "",
    Contacts: triggerupdate ? courierupdatedata?.contacts : "",
    Address: triggerupdate ? courierupdatedata?.address : "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (triggerupdate) {
      const URL = `${process.env.REACT_APP_API_URL}/api/v1/Courier/UpdateCourier`;
      axios
        .post(
          URL,
          {
            id: courierupdatedata.id,
            basicDetails: courierData.BasicDetails,
            contacts: courierData.Contacts,
            address: courierData.Address,
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
      const URL = `${process.env.REACT_APP_API_URL}/api/v1/Courier`;
      axios
        .post(URL, courierData, {
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
    <form className="add-courier-master" onSubmit={handleSubmit}>
      <blockquote>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter Courier Name"
          value={courierData.BasicDetails}
          onChange={(e) =>
            setCourierData({ ...courierData, BasicDetails: e.target.value })
          }
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
          }}
          required
        />
      </blockquote>

      <blockquote>
        <label>Phone Number</label>
        <input
          type="number"
          placeholder="Enter Courier Phone Number"
          value={courierData.Contacts}
          onChange={(e) =>
            setCourierData({ ...courierData, Contacts: e.target.value })
          }
          onInput={(e) => {
            e.target.value = e.target.value.slice(0, 10);
          }}
          required
        />
      </blockquote>
      <blockquote>
        <label>Address</label>
        <textarea
          rows={5}
          placeholder="Enter Address of Courier (Upto 200 Characters)"
          value={courierData.Address}
          onChange={(e) =>
            setCourierData({ ...courierData, Address: e.target.value })
          }
          onInput={(e) => {
            e.target.value = e.target.value.slice(0, 200);
          }}
          required
        />
      </blockquote>
      <button type="submit">{triggerupdate ? "Update" : "Add"} </button>
      <CloseForm close={setshowaddform} />
    </form>
  );
}

export default AddCourierMaster;
