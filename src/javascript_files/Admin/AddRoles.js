import React, { useEffect, useState } from "react";
import "../../css_files/Admin/AddRoles.css";
import CloseForm from "../Master/CloseForm";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function AddRoles({ setshowaddroleform, refresh, setrefresh }) {
  const [rolesdata, setrolesdata] = useState({
    role: "",
    head: "",
    subhead: {},
  });

  const [selectedsubhead, setselectedsubhead] = useState("");

  const handleCheckboxChange = (subheadKey, permissionType, isChecked) => {
    setrolesdata((prev) => {
      const updatedSubhead = { ...prev.subhead };

      if (isChecked) {
        if (!updatedSubhead[subheadKey]) {
          updatedSubhead[subheadKey] = {};
        }
        if (permissionType) {
          updatedSubhead[subheadKey][permissionType] = true;
        }
      } else {
        if (permissionType) {
          delete updatedSubhead[subheadKey][permissionType];
          if (Object.keys(updatedSubhead[subheadKey]).length === 0) {
            delete updatedSubhead[subheadKey];
          }
        } else {
          delete updatedSubhead[subheadKey];
        }
      }

      return {
        ...prev,
        subhead: updatedSubhead,
      };
    });

    if (!permissionType) {
      setselectedsubhead(isChecked ? subheadKey : "");
    }
  };

  function handlesubmit(e) {
    e.preventDefault();

    const url = `${process.env.REACT_APP_API_URL}/api/Permissions`;
    const subheads = Object.keys(rolesdata.subhead);

    const requests = subheads.map((subheadKey) => {
      return axios.post(url, {
        ID: 0,
        Role: rolesdata.role,
        Head: rolesdata.head,
        SubHead: subheadKey,
        IsWrite: rolesdata.subhead[subheadKey]?.write || false,
        IsRead: rolesdata.subhead[subheadKey]?.read || false,
        IsUpdate: rolesdata.subhead[subheadKey]?.update || false,
        IsDelete: rolesdata.subhead[subheadKey]?.delete || false,
      });
    });

    Promise.all(requests)
      .then(() => {
        toast.success(
          "All Permissions saved Successfully along with Roles and Head",
          {
            position: "bottom-center",
          }
        );
        setshowaddroleform(false);
        setrefresh(!refresh);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            err.response?.data?.error ??
            JSON.stringify(err.response?.data?.errors),
        });
      });
  }

  return (
    <div className="add-roles">
      <form onSubmit={handlesubmit}>
        <h1>Create Role</h1>

        <blockquote>
          <label>Role Name</label>
          <select
            required
            value={rolesdata.role}
            onChange={(e) =>
              setrolesdata((prev) => ({ ...prev, role: e.target.value }))
            }
          >
            <option value="">Select Role Name</option>
            <option value="Service-Co-Ordinator">Service-Co-Ordinator</option>
            <option value="Store Manager">Store Manager</option>
            <option value="Purchase Manager">Purchase Manager</option>
            <option value="Technician">Technician</option>
          </select>
        </blockquote>

        <blockquote>
          <label>Select Head</label>
          <select
            required
            value={rolesdata.head}
            onChange={(e) =>
              setrolesdata((prev) => ({ ...prev, head: e.target.value }))
            }
          >
            <option value="">Select Head</option>
            <option value="Master">Master</option>
          </select>
        </blockquote>

        {rolesdata.head === "Master" && (
          <blockquote>
            <label>Select Sub Head</label>
            <aside>
              {[
                "Category",
                "Sub-Category",
                "HSN",
                "Unit",
                "Packing",
                "Currency",
                "GST",
                "Parts",
                "Boiler",
                "Boiler Series",
                "Boiler Series Parts Mapping",
                "Courier",
                "Customer",
                "Customer Pricing",
                "Technician",
              ].map((subheadKey) => (
                <mark key={subheadKey}>
                  {subheadKey}{" "}
                  <input
                    type="checkbox"
                    checked={!!rolesdata.subhead[subheadKey]}
                    onChange={(e) =>
                      handleCheckboxChange(subheadKey, null, e.target.checked)
                    }
                  />
                </mark>
              ))}
            </aside>
          </blockquote>
        )}

        {selectedsubhead && (
          <blockquote>
            <label>Select Actions for {selectedsubhead}</label>
            <aside>
              {["read", "write", "update", "delete"].map((action) => (
                <mark key={action}>
                  {action.charAt(0).toUpperCase() + action.slice(1)}{" "}
                  <input
                    type="checkbox"
                    checked={!!rolesdata.subhead[selectedsubhead]?.[action]}
                    onChange={(e) =>
                      handleCheckboxChange(
                        selectedsubhead,
                        action,
                        e.target.checked
                      )
                    }
                  />
                </mark>
              ))}
            </aside>
          </blockquote>
        )}

        <button type="submit">Submit</button>
      </form>
      <CloseForm close={setshowaddroleform} />
    </div>
  );
}

export default AddRoles;
