import React from "react";
import { useState } from "react";
import "../../css_files/Master/AddBoilerMaster.css";
import CloseForm from "./CloseForm";
import axios from "axios";
import { toast } from "react-toastify";
import getCookie from "../../api";
import Swal from "sweetalert2";

function AddBoilerMaster({
  setshowaddform,
  reload,
  setReload,
  triggerupdate,
  boilerupdatedata,
}) {
  const [boilerData, setBoilerData] = useState({
    Head: triggerupdate ? boilerupdatedata?.head : "",
    Description: triggerupdate ? boilerupdatedata?.description : "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (triggerupdate) {
      const url = `${process.env.REACT_APP_API_URL}/api/v1/Boiler/UpdateBoiler`;
      axios
        .post(
          url,
          {
            id: boilerupdatedata.id,
            head: boilerData.Head,
            description: boilerData.Description,
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
      const URL = `${process.env.REACT_APP_API_URL}/api/v1/Boiler`;
      axios
        .post(URL, boilerData, {
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
          console.error("Error adding boiler data:", error);
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
    <form className="add-boiler-master" onSubmit={handleSubmit}>
      <blockquote>
        <label>Head</label>
        <input
          type="text"
          required
          placeholder="Enter Boiler Head"
          value={boilerData.Head}
          onChange={(e) =>
            setBoilerData({ ...boilerData, Head: e.target.value })
          }
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
          }}
        />
      </blockquote>

      <blockquote>
        <label>Description</label>
        <textarea
          rows={5}
          required
          placeholder="Enter Description"
          value={boilerData.Description}
          onChange={(e) =>
            setBoilerData({ ...boilerData, Description: e.target.value })
          }
          onInput={(e) => (e.target.value = e.target.value.slice(0, 200))}
        ></textarea>
      </blockquote>
      <button type="submit">{triggerupdate ? "Update" : "Add"} </button>
      <CloseForm close={setshowaddform} />
    </form>
  );
}

export default AddBoilerMaster;
