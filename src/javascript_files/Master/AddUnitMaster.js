import React from "react";
import { useState } from "react";
import "../../css_files/Master/AddUnitMaster.css";
import CloseForm from "./CloseForm";
import axios from "axios";
import { toast } from "react-toastify";
import getCookie from "../../api";
import Swal from "sweetalert2";

function AddUnitMaster({
  setshowaddform,
  reload,
  setReload,
  triggerupdate,
  unitupdatedata,
}) {
  const [unitData, setUnitData] = useState({
    Name: triggerupdate ? unitupdatedata?.name : "",
    Code: triggerupdate ? unitupdatedata?.code : "",
    Description: triggerupdate ? unitupdatedata?.description : "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (triggerupdate) {
      const url = `${process.env.REACT_APP_API_URL}/api/v1/Unit/UpdateUnit`;
      axios
        .post(
          url,
          {
            unitID: unitupdatedata.id,
            code: unitData.Code,
            name: unitData.Name,
            description: unitData.Description,
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
      const URL = `${process.env.REACT_APP_API_URL}/api/v1/Unit`;
      axios
        .post(URL, unitData, {
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
    <form className="add-unit-master" onSubmit={handleSubmit}>
      <blockquote>
        <label>Unit Name</label>
        <input
          type="text"
          placeholder="Enter Unit Name"
          value={unitData.Name}
          onChange={(e) => setUnitData({ ...unitData, Name: e.target.value })}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
          }}
          required
        />
      </blockquote>
      <blockquote>
        <label>Unit Code</label>
        <input
          type="text"
          value={unitData.Code}
          placeholder="Enter Unit Code"
          onChange={(e) => setUnitData({ ...unitData, Code: e.target.value })}
          onInput={(e) =>
            (e.target.value = e.target.value
              .replace(/[^A-Za-z]/g, "")
              .toUpperCase()
              .slice(0, 3))
          }
          required
        />
      </blockquote>

      <blockquote>
        <label>Description</label>
        <textarea
          rows={5}
          placeholder="Enter Description (Upto 200 Characters)"
          value={unitData.Description}
          onChange={(e) =>
            setUnitData({ ...unitData, Description: e.target.value })
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

export default AddUnitMaster;
