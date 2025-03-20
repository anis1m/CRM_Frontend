import React from "react";
import { useState } from "react";
import "../../css_files/Master/AddHSNMaster.css";
import CloseForm from "./CloseForm";
import axios from "axios";
import { toast } from "react-toastify";
import getCookie from "../../api";
import Swal from "sweetalert2";

function AddHSNMaster({
  setshowaddform,
  reload,
  setReload,
  triggerupdate,
  hsnupdatedata,
}) {
  const [hsnData, setHsnData] = useState({
    HsnCode: triggerupdate ? hsnupdatedata?.hsnCode : "",
    Description: triggerupdate ? hsnupdatedata?.description : "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (triggerupdate) {
      const url = `${process.env.REACT_APP_API_URL}/api/v1/HSN/UpdateHSN`;
      axios
        .post(
          url,
          {
            hsnID: hsnupdatedata.id,
            hsnCode: hsnData.HsnCode,
            description: hsnData.Description,
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
      const url = `${process.env.REACT_APP_API_URL}/api/v1/HSN`;
      axios
        .post(url, hsnData, {
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
          console.error("Error adding hsn data:", error);
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
    <form className="add-hsn-master" onSubmit={handleSubmit}>
      <blockquote>
        <label>HSN Code</label>
        <input
          type="number"
          placeholder="Enter HSN Code (minimum 4 to maximum 8 digits)"
          value={hsnData.HsnCode}
          onChange={(e) => setHsnData({ ...hsnData, HsnCode: e.target.value })}
          onInput={(e) => (e.target.value = e.target.value.slice(0, 8))}
          required
        />
      </blockquote>

      <blockquote>
        <label>HSN Description</label>
        <textarea
          rows={5}
          placeholder="Enter HSN Description (Maximum 200 Characters)"
          value={hsnData.Description}
          onChange={(e) =>
            setHsnData({ ...hsnData, Description: e.target.value })
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

export default AddHSNMaster;
