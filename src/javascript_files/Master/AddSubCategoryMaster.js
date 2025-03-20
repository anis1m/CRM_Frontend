import React, { useEffect } from "react";
import { useState } from "react";
import "../../css_files/Master/AddSubCategoryMaster.css";
import CloseForm from "./CloseForm";
import axios from "axios";
import { toast } from "react-toastify";
import getCookie from "../../api";
import Swal from "sweetalert2";

function AddSubCategoryMaster({
  setshowaddform,
  reload,
  setReload,
  triggerupdate,
  subcategorypdatedata,
}) {
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState({
    Name: triggerupdate ? subcategorypdatedata?.name : "",
    Description: triggerupdate ? subcategorypdatedata?.description : "",
    CategoryId: triggerupdate ? subcategorypdatedata?.categoryId : "",
  });

  useEffect(() => {
    const URL = `${process.env.REACT_APP_API_URL}/api/v1/Category`;
    axios
      .get(URL, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (triggerupdate) {
      const url = `${process.env.REACT_APP_API_URL}/api/v1/SubCategory/UpdateSubCategory`;
      axios
        .post(
          url,
          {
            id: subcategorypdatedata.id,
            name: subCategoryData.Name,
            categoryID: subCategoryData.CategoryId,
            description: subCategoryData.Description,
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
      const url = `${process.env.REACT_APP_API_URL}/api/v1/SubCategory`;
      axios
        .post(url, subCategoryData, {
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
    <form className="add-sub-category-master" onSubmit={handleSubmit}>
      <blockquote>
        <label>Category Name</label>
        <select
          onChange={(e) =>
            setSubCategoryData({
              ...subCategoryData,
              CategoryId: e.target.value,
            })
          }
          required
        >
          <option value="">Select Category</option>
          {categoryData.map((category, index) => (
            <option
              key={index}
              value={category.id}
              selected={subCategoryData.CategoryId === category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </blockquote>
      <blockquote>
        <label>Sub-Category Name</label>
        <textarea
          placeholder="Enter Sub-Category Name"
          value={subCategoryData.Name}
          onChange={(e) =>
            setSubCategoryData({
              ...subCategoryData,
              Name: e.target.value,
            })
          }
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
          }}
          required
        ></textarea>
      </blockquote>
      <blockquote>
        <label>Sub-Category Description</label>
        <textarea
          rows={5}
          placeholder="Enter Sub-Category Description (Upto 200 Characters)"
          value={subCategoryData.Description}
          onChange={(e) =>
            setSubCategoryData({
              ...subCategoryData,
              Description: e.target.value,
            })
          }
          required
          onInput={(e) => {
            e.target.value = e.target.value.slice(0, 200);
          }}
        ></textarea>
      </blockquote>

      <button type="submit">{triggerupdate ? "Update" : "Add"} </button>
      <CloseForm close={setshowaddform} />
    </form>
  );
}

export default AddSubCategoryMaster;
