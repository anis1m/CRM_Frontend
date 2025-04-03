import axios from "axios";
import React, { useEffect, useState } from "react";

function RolesTable({
  setshowaddroleform,
  showaddroleform,
  setshowdetailsroletable,
  setrole,
  refresh,
}) {
  const [allpermissions, setallpermissions] = useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/api/Permissions`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setallpermissions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const seenRoles = new Set();
  let i = 1;

  return (
    <section className="table" style={{ width: "70%", margin: "0 auto" }}>
      {showaddroleform === false && (
        <blockquote className="table-reset">
          <button
            onClick={() => setshowaddroleform(true)}
            style={{ padding: "0.7rem" }}
          >
            Create Role{" "}
          </button>
        </blockquote>
      )}
      <table>
        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>Role Name</th>
            <th>Pages</th>
          </tr>
        </thead>
        <tbody>
          {allpermissions.map((permission) => {
            if (seenRoles.has(permission.role)) {
              return null;
            }

            seenRoles.add(permission.role);

            return (
              <tr key={permission.id}>
                <td>{i++}</td>
                <td>{permission.role}</td>
                <td>
                  <a
                    href="#"
                    onClick={() => {
                      setshowdetailsroletable(true);
                      setrole(permission.role);
                    }}
                  >
                    Click to See More
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default RolesTable;
