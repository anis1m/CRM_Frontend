import React, { useEffect, useState } from "react";
import CloseForm from "./CloseForm";

function MoreCustomerMasterDetails({
  setshowmorecustomerdata,
  customerupdatedata,
  customeraddressupdatedata,
  customerboilerupdatedata,
  customercontactupdatedata,
  loading,
}) {
  const [greaterarray, setgreaterarray] = useState([]);

  useEffect(() => {
    const largestArray = [
      customerboilerupdatedata,
      customeraddressupdatedata,
      customercontactupdatedata,
    ].reduce((max, arr) => (arr.length > max.length ? arr : max), []);
    setgreaterarray(largestArray);
  }, [
    customerboilerupdatedata,
    customeraddressupdatedata,
    customercontactupdatedata,
  ]);

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
          More Customer Details
        </h1>
        <table>
          <thead>
            <tr>
              <th>Customer Id</th>
              <th>Customer Name</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Boiler</th>
            </tr>
          </thead>
          <tbody>
            {greaterarray.map((_, idx) => (
              <tr key={idx}>
                {idx === 0 && (
                  <>
                    <td rowSpan={greaterarray.length} align="center">
                      {customerupdatedata?.id}
                    </td>
                    <td rowSpan={greaterarray.length} align="center">
                      {customerupdatedata?.orgName}
                    </td>
                    <td rowSpan={greaterarray.length} align="center">
                      {"POC: " +
                        (customercontactupdatedata[0]?.poc || "N/A") +
                        ", PhoneNumbers: " +
                        (customercontactupdatedata[0]?.phoneNumbers || "N/A")}
                    </td>
                  </>
                )}
                <td>
                  {customeraddressupdatedata[idx]
                    ? `${customeraddressupdatedata[idx].area}, ${customeraddressupdatedata[idx].city}, ${customeraddressupdatedata[idx].pincode}, ${customeraddressupdatedata[idx].state}`
                    : "N/A"}
                </td>
                <td>
                  {customerboilerupdatedata[idx]
                    ? `Boiler Head: ${customerboilerupdatedata[idx].boilerHead}, Boiler Series: ${customerboilerupdatedata[idx].boilerSeries}`
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CloseForm close={setshowmorecustomerdata} />
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
    </section>
  );
}

export default MoreCustomerMasterDetails;
