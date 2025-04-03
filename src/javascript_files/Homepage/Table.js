import React, { useContext, useEffect, useState } from "react";
import "../../css_files/Homepage/Table.css";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import { triggerscroll } from "./Homepage";
import getCookie from "../../api";

function Table({
  tablehead,
  tabledata,
  setshowaddform,
  settriggerupdate,
  fetchdata,
  url,
  reload,
  setReload,
  setdatareload,
  datareload,
  loading,
  filterbutton,
  setfilterbutton,
  activatedfilters,
  setactivatedfilters,
  setshowsearchform,
  setshowmorecustomerdata,
  readPermission,
  updatePermission,
  deletePermission,
}) {
  const { triggerscrollupwords } = useContext(triggerscroll);

  function handleDelete(id) {
    const URL = `${process.env.REACT_APP_API_URL}/api/v1/${url}?id=${id}`;
    axios
      .delete(URL, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        toast.success("Record Deleted Successfully", {
          position: "bottom-center",
        });
        setReload(!reload);
        let shouldbreak = false;
        for (let i = 0; i < tabledata.length; i++) {
          for (let j = 0; j < tabledata[i].length; j++) {
            if (tabledata[i][j] === "Tap here to See More Details") {
              axios
                .delete(
                  `${process.env.REACT_APP_API_URL}/api/v1/Addresses/DeleteAddressByCustomerId/${id}`,
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
              axios
                .delete(
                  `${process.env.REACT_APP_API_URL}/api/v1/CustomerBoilers/DeleteCustomerBoilersByCustomerId/${id}`,
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
              axios
                .delete(
                  `${process.env.REACT_APP_API_URL}/api/v1/ContactCentres/DeleteContactCentreByCustomerId/${id}`,
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
              shouldbreak = true;
              break;
            }
          }
          if (shouldbreak) {
            break;
          }
        }
      })
      .catch((err) => {
        toast.error("Failed to Delete", {
          position: "bottom-center",
        });
      });
  }
  return (
    <section className="table">
      {filterbutton && (
        <blockquote className="table-reset">
          <button>
            Filter{" "}
            <i
              className="fa-solid fa-xmark"
              onClick={() => {
                setfilterbutton(false);
                setReload(!reload);
                setshowsearchform(false);
                setactivatedfilters([]);
              }}
            ></i>
          </button>
          {activatedfilters.map((activatedfilter) => (
            <button
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid #004d4d",
              }}
            >
              {activatedfilter}
              <i
                className="fa-solid fa-xmark"
                onClick={() => {
                  if (activatedfilters.length === 1) {
                    setfilterbutton(false);
                    setReload(!reload);
                  }
                  console.log(activatedfilters.length);
                  setactivatedfilters((prev) => {
                    const arr = [...prev];
                    const filteredarr = arr.filter((x) => x != activatedfilter);
                    return filteredarr;
                  });
                }}
              ></i>
            </button>
          ))}
        </blockquote>
      )}
      <table>
        <thead>
          <tr>
            {tablehead.map((head, index) => (
              <th key={index}>{head}</th>
            ))}

            <th colSpan={2} align="center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {readPermission() ? (
            tabledata.map((data, index) => (
              <tr key={index}>
                {data.map((tdata, idx) => (
                  <td key={idx}>
                    {tdata === "Tap here to See More Details" ? (
                      <a
                        href="#"
                        onClick={() => {
                          setshowmorecustomerdata(true);
                          fetchdata(tabledata[index][0]);
                        }}
                      >
                        {tdata}
                      </a>
                    ) : (
                      <p>{tdata}</p>
                    )}
                  </td>
                ))}
                <td>
                  <i
                    className="fa-regular fa-pen-to-square"
                    style={{
                      pointerEvents: updatePermission() && "none",
                      color: updatePermission() && "gray",
                      cursor: updatePermission() && "not-allowed",
                    }}
                    onClick={() => {
                      setdatareload(datareload + 1);
                      setshowaddform(true);
                      settriggerupdate(true);
                      triggerscrollupwords();
                      fetchdata(tabledata[index][0]);
                    }}
                    title="Edit"
                  />
                </td>
                <td>
                  <i
                    className="fa-solid fa-trash"
                    title="Delete"
                    style={{
                      pointerEvents: deletePermission() && "none",
                      color: deletePermission() && "gray",
                      cursor: deletePermission() && "not-allowed",
                    }}
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleDelete(tabledata[index][0]);
                        }
                      });
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={tabledata.length + 2}>
                You do not have permission to read data
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {loading && (
        <blockquote
          style={{ width: "100%", textAlign: "center", margin: "2rem 0" }}
        >
          <i
            class="fa-solid fa-rotate-right fa-spin fa-3x"
            style={{ color: "#072b2b" }}
          ></i>
        </blockquote>
      )}
    </section>
  );
}

export default Table;
