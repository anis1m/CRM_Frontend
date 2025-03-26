import React from "react";

function RolesTable({
  setshowaddroleform,
  showaddroleform,
  setshowdetailsroletable,
}) {
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
          <tr>
            <td>1</td>
            <td>Service-Co-Ordinator</td>
            <td>
              <a
                href="#"
                onClick={() => {
                  setshowdetailsroletable(true);
                }}
              >
                Click to See More
              </a>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Store Manager</td>
            <td>
              <a href="#">Click to See More</a>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Purchase Manager</td>
            <td>
              <a href="#">Click to See More</a>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Technician</td>
            <td>
              <a href="#">Click to See More</a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default RolesTable;
