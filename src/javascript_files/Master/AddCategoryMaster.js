import React from "react";
import { useState } from "react";
import "../../css_files/Master/AddCategoryMaster.css";
import CloseForm from "./CloseForm";
import axios from "axios";
import { toast } from "react-toastify";
import getCookie from "../../api";
import Swal from "sweetalert2";

function AddCategoryMaster({
  setshowaddform,
  reload,
  setReload,
  triggerupdate,
  categoryupdatedata,
}) {
  const [categoryData, setCategoryData] = useState({
    Name: triggerupdate ? categoryupdatedata?.name : "",
    Description: triggerupdate ? categoryupdatedata?.description : "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (triggerupdate) {
      const url = `${process.env.REACT_APP_API_URL}/api/v1/Category/UpdateCategory`;
      axios
        .post(
          url,
          {
            id: categoryupdatedata.id,
            name: categoryData.Name,
            description: categoryData.Description,
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
      const url = `${process.env.REACT_APP_API_URL}/api/v1/Category`;
      axios
        .post(url, categoryData, {
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

  return (
    <form className="add-category-master" onSubmit={handleSubmit}>
      <blockquote>
        <label>Category Name</label>
        <input
          type="text"
          placeholder="Enter Category Master Name"
          value={categoryData.Name}
          onChange={(e) =>
            setCategoryData({ ...categoryData, Name: e.target.value })
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
          required
          placeholder="Enter Description (Maximum 200 Characters)"
          value={categoryData.Description}
          onChange={(e) =>
            setCategoryData({ ...categoryData, Description: e.target.value })
          }
          onInput={(e) => (e.target.value = e.target.value.slice(0, 200))}
        ></textarea>
      </blockquote>
      <button type="submit">{triggerupdate ? "Update" : "Add"}</button>
      <CloseForm close={setshowaddform} />
    </form>
  );
}

export default AddCategoryMaster;
