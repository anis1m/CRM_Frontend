import React from "react";
import { useState } from "react";
import "../../css_files/Master/AddPackingMaster.css";
import CloseForm from "./CloseForm";
import axios from "axios";
import { toast } from "react-toastify";
import getCookie from "../../api";
import Swal from "sweetalert2";

function AddPackingMaster({
  setshowaddform,
  reload,
  setReload,
  triggerupdate,
  packingupdatedata,
}) {
  const [packingData, setPackingData] = useState({
    Name: triggerupdate ? packingupdatedata?.name : "",
    UsedFor: triggerupdate ? packingupdatedata?.usedFor : "",
    Description: triggerupdate ? packingupdatedata?.description : "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (triggerupdate) {
      const url = `${process.env.REACT_APP_API_URL}/api/v1/Packing/UpdatePacking`;
      axios
        .post(
          url,
          {
            packingID: packingupdatedata.id,
            name: packingData.Name,
            usedFor: packingData.UsedFor,
            description: packingData.Description,
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
      const URL = `${process.env.REACT_APP_API_URL}/api/v1/packing`;
      axios
        .post(URL, packingData, {
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
          console.error("Error adding packing data:", error);
        });
    }
  }

  return (
    <form className="add-packing-master" onSubmit={handleSubmit}>
      <blockquote>
        <label>Packing Name</label>
        <input
          type="text"
          placeholder="Enter Packing Master Name"
          value={packingData.Name}
          onChange={(e) =>
            setPackingData({ ...packingData, Name: e.target.value })
          }
          onInput={(e) => {
            e.target.value = e.target.value.slice(0, 10);
          }}
          required
        />
      </blockquote>
      <blockquote>
        <label>Used For</label>
        <input
          type="text"
          placeholder="Enter Used For"
          value={packingData.UsedFor}
          onChange={(e) =>
            setPackingData({ ...packingData, UsedFor: e.target.value })
          }
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
          }}
          required
        />
      </blockquote>
      <blockquote>
        <label>Description</label>
        <textarea
          rows={5}
          placeholder="Enter Description (Upto 200 Characters)"
          value={packingData.Description}
          onChange={(e) =>
            setPackingData({ ...packingData, Description: e.target.value })
          }
          onInput={(e) => {
            e.target.value = e.target.value.slice(0, 200);
          }}
          required
        ></textarea>
      </blockquote>
      <button type="submit">{triggerupdate ? "Update" : "Add"} </button>
      <CloseForm close={setshowaddform} />
    </form>
  );
}

export default AddPackingMaster;
