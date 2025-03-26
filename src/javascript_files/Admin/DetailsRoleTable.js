import React from "react";
import CloseForm from "../Master/CloseForm";

function DetailsRoleTable({ setshowdetailsroletable }) {
  return (
    <section
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 11,
      }}
    >
      <section
        className="table"
        style={{
          width: "70%",
          margin: "15vh auto 0 auto",
          maxHeight: "80vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Details Role Table
        </h1>
        <table>
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Pages Assigned</th>
              <th>Actions Assigned</th>
              <th colSpan={2} align="center"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan={5} align="center" style={{ fontSize: "1.2rem" }}>
                Store Manager
              </td>
              <td>Category Master</td>
              <td>Read, Write, Delete, Update</td>
              <td>
                <i className="fa-solid fa-pen-to-square"></i>
              </td>
              <td>
                <i className="fa-solid fa-trash"></i>
              </td>
            </tr>
            <tr>
              <td>Boiler Master</td>
              <td>Read, Write, Delete, Update</td>
              <td>
                <i className="fa-solid fa-pen-to-square"></i>
              </td>
              <td>
                <i className="fa-solid fa-trash"></i>
              </td>
            </tr>
            <tr>
              <td>Sub-Category Master</td>
              <td>Read, Write, Delete, Update</td>
              <td>
                <i className="fa-solid fa-pen-to-square"></i>
              </td>
              <td>
                <i className="fa-solid fa-trash"></i>
              </td>
            </tr>
            <tr>
              <td>HSN Master</td>
              <td>Read, Write, Delete, Update</td>
              <td>
                <i className="fa-solid fa-pen-to-square"></i>
              </td>
              <td>
                <i className="fa-solid fa-trash"></i>
              </td>
            </tr>
            <tr>
              <td>Unit Master</td>
              <td>Read, Write, Delete, Update</td>
              <td>
                <i className="fa-solid fa-pen-to-square"></i>
              </td>
              <td>
                <i className="fa-solid fa-trash"></i>
              </td>
            </tr>
          </tbody>
        </table>
        <CloseForm close={setshowdetailsroletable} />
      </section>
    </section>
  );
}

export default DetailsRoleTable;
