import React from "react";
import { useState } from "react";
import "../../css_files/Master/AddGSTMaster.css";
import CloseForm from "./CloseForm";
import axios from "axios";
import { toast } from "react-toastify";
import getCookie from "../../api";
import Swal from "sweetalert2";

function AddGSTMaster({
  setshowaddform,
  reload,
  setReload,
  triggerupdate,
  gstupdatedata,
}) {
  const [gstData, setGstData] = useState({
    Rate: triggerupdate ? gstupdatedata?.rate : "",
    Description: triggerupdate ? gstupdatedata?.description : "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (triggerupdate) {
      const url = `${process.env.REACT_APP_API_URL}/api/v1/GST/UpdateGST`;
      axios
        .post(
          url,
          {
            id: gstupdatedata.id,
            rate: gstData.Rate,
            description: gstData.Description,
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
      const URL = `${process.env.REACT_APP_API_URL}/api/v1/gst`;
      axios
        .post(URL, gstData, {
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
          console.error("Error adding packing data:", error);
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
    <form className="add-gst-master" onSubmit={handleSubmit}>
      <blockquote>
        <label>Rate</label>
        <input
          type="text"
          placeholder="Enter GST Rate (in percentage)"
          value={gstData.Rate}
          onChange={(e) => setGstData({ ...gstData, Rate: e.target.value })}
          onInput={(e) => {
            e.target.value = e.target.value
              .replace(/[^0-9.]/g, "")
              .replace(/^(\d{2})\d*/, "$1")
              .replace(/(\.\d{2}).*/, "$1")
              .replace(/(\..*)\./g, "$1");
          }}
        />
      </blockquote>
      <blockquote>
        <label>Description</label>
        <textarea
          rows={5}
          placeholder="Enter Description (Maximum 200 Characters)"
          value={gstData.Description}
          onChange={(e) =>
            setGstData({ ...gstData, Description: e.target.value })
          }
          onInput={(e) => (e.target.value = e.target.value.slice(0, 200))}
          required
        ></textarea>
      </blockquote>
      <button type="submit">{triggerupdate ? "Update" : "Add"} </button>
      <CloseForm close={setshowaddform} />
    </form>
  );
}

export default AddGSTMaster;
