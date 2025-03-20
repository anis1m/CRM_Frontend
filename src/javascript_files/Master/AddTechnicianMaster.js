import React from "react";
import { useState } from "react";
import "../../css_files/Master/AddTechnicianMaster.css";
import CloseForm from "./CloseForm";
import axios from "axios";
import { toast } from "react-toastify";
import getCookie from "../../api";
import Swal from "sweetalert2";

function AddTechnicianMaster({
  setshowaddform,
  reload,
  setReload,
  triggerupdate,
  technicianupdatedata,
}) {
  const [technicianData, setTechnicianData] = useState({
    Name: triggerupdate ? technicianupdatedata?.name : "",
    CompanyPhoneNumber: triggerupdate
      ? technicianupdatedata?.companyPhoneNumber
      : "",
    Age: triggerupdate ? technicianupdatedata?.age : "",
    Qualification: triggerupdate ? technicianupdatedata?.qualification : "",
    Experience: triggerupdate ? technicianupdatedata?.experience : "",
    YearsWithRoss: triggerupdate ? technicianupdatedata?.yearsWithRoss : "",
    CTC: triggerupdate ? technicianupdatedata?.ctc : "",
    PostingLocation: triggerupdate ? technicianupdatedata?.postingLocation : "",
    Aadhar: triggerupdate ? technicianupdatedata?.aadhar : "",
    Pan: triggerupdate ? technicianupdatedata?.pan : "",
    ResidentialAddress: triggerupdate
      ? technicianupdatedata?.residentialAddress
      : "",
    PersonalPhoneNumber: triggerupdate
      ? technicianupdatedata?.personalPhoneNumber
      : "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (triggerupdate) {
      const url = `${process.env.REACT_APP_API_URL}/api/v1/Technician/UpdateTechnician`;
      axios
        .post(
          url,
          {
            technicianID: technicianupdatedata.id,
            name: technicianData.Name,
            companyPhoneNumber: technicianData.CompanyPhoneNumber,
            age: technicianData.Age,
            qualification: technicianData.Qualification,
            experience: technicianData.Experience,
            yearsWithRoss: technicianData.YearsWithRoss,
            ctc: technicianData.CTC,
            postingLocation: technicianData.PostingLocation,
            aadhar: technicianData.Aadhar,
            pan: technicianData.Pan,
            residentialAddress: technicianData.ResidentialAddress,
            personalPhoneNumber: technicianData.PersonalPhoneNumber,
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
      const URL = `${process.env.REACT_APP_API_URL}/api/v1/Technician`;
      axios
        .post(URL, technicianData, {
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
    <form className="add-technician-master" onSubmit={handleSubmit}>
      <blockquote>
        <label>Technician Name</label>
        <input
          type="text"
          placeholder="Enter Name of Technician"
          value={technicianData.Name}
          onChange={(e) =>
            setTechnicianData({ ...technicianData, Name: e.target.value })
          }
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
          }}
          required
        />
      </blockquote>
      <aside>
        <blockquote>
          <label>Company Phone Number</label>
          <input
            type="number"
            placeholder="Enter Company Phone Number"
            value={technicianData.CompanyPhoneNumber}
            onChange={(e) =>
              setTechnicianData({
                ...technicianData,
                CompanyPhoneNumber: e.target.value,
              })
            }
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 10);
            }}
            required
          />
        </blockquote>
        <blockquote>
          <label>Personal Phone Number</label>
          <input
            type="number"
            placeholder="Enter Personal Phone Number"
            value={technicianData.PersonalPhoneNumber}
            onChange={(e) =>
              setTechnicianData({
                ...technicianData,
                PersonalPhoneNumber: e.target.value,
              })
            }
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 10);
            }}
            required
          />
        </blockquote>
      </aside>
      <aside>
        <blockquote>
          <label>Qualification</label>
          <input
            type="text"
            placeholder="Enter Qualification"
            value={technicianData.Qualification}
            onChange={(e) =>
              setTechnicianData({
                ...technicianData,
                Qualification: e.target.value,
              })
            }
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
            }}
            required
          />
        </blockquote>
      </aside>
      <aside>
        <blockquote>
          <label>Experience</label>
          <input
            type="number"
            placeholder="Enter Experience in Years"
            value={technicianData.Experience}
            onChange={(e) =>
              setTechnicianData({
                ...technicianData,
                Experience: e.target.value,
              })
            }
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 2);
            }}
          />
        </blockquote>
        <blockquote>
          <label>Age</label>
          <input
            type="number"
            placeholder="Enter Age"
            value={technicianData.Age}
            onChange={(e) =>
              setTechnicianData({
                ...technicianData,
                Age: e.target.value,
              })
            }
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 2);
            }}
          />
        </blockquote>
      </aside>
      <aside>
        <blockquote>
          <label>Years with Ross</label>
          <input
            type="number"
            placeholder="Enter Number of Years with Ross"
            value={technicianData.YearsWithRoss}
            onChange={(e) =>
              setTechnicianData({
                ...technicianData,
                YearsWithRoss: e.target.value,
              })
            }
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 2);
            }}
          />
        </blockquote>
        <blockquote>
          <label>CTC</label>
          <input
            type="number"
            placeholder="Enter CTC (Upto 7 Digits)"
            value={technicianData.CTC}
            onChange={(e) =>
              setTechnicianData({
                ...technicianData,
                CTC: e.target.value,
              })
            }
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 7);
            }}
          />
        </blockquote>
      </aside>
      <blockquote>
        <label>Posting Location</label>
        <input
          type="text"
          placeholder="Enter Posting Location"
          value={technicianData.PostingLocation}
          onChange={(e) =>
            setTechnicianData({
              ...technicianData,
              PostingLocation: e.target.value,
            })
          }
          onInput={(e) => {
            e.target.value = e.target.value.slice(0, 100);
          }}
          required
        />
      </blockquote>
      <aside>
        <blockquote>
          <label>Aadhar Number</label>
          <input
            type="number"
            placeholder="Enter Aadhar Number"
            value={technicianData.Aadhar}
            onChange={(e) =>
              setTechnicianData({
                ...technicianData,
                Aadhar: e.target.value,
              })
            }
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 12);
            }}
            required
          />
        </blockquote>
        <blockquote>
          <label>PAN</label>
          <input
            type="text"
            placeholder="Enter Pan Card Number"
            value={technicianData.Pan}
            onChange={(e) =>
              setTechnicianData({
                ...technicianData,
                Pan: e.target.value,
              })
            }
            onInput={(e) => {
              let value = e.target.value.toUpperCase();
              value = value.replace(/[^A-Z0-9]/g, "");
              let formattedValue = "";

              formattedValue += value.slice(0, 5).replace(/[^A-Z]/g, "");

              formattedValue += value.slice(5, 9).replace(/[^0-9]/g, "");

              formattedValue += value.slice(9, 10).replace(/[^A-Z]/g, "");

              e.target.value = formattedValue;
            }}
            required
          />
        </blockquote>
      </aside>

      <blockquote>
        <label>Residential Address</label>
        <textarea
          rows={4}
          placeholder="Enter Residential Address (Maximum 200 Characters)"
          value={technicianData.ResidentialAddress}
          onChange={(e) =>
            setTechnicianData({
              ...technicianData,
              ResidentialAddress: e.target.value,
            })
          }
          onInput={(e) => {
            e.target.value = e.target.value.slice(0, 200);
          }}
          required
        />
      </blockquote>

      <button type="submit">{triggerupdate ? "Update" : "Add"} </button>
      <CloseForm close={setshowaddform} />
    </form>
  );
}

export default AddTechnicianMaster;
