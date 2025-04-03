import React, { useState, useEffect, useContext } from "react";
import "../../css_files/Master/TechnicianMaster.css";
import Table from "../Homepage/Table";
import AddTechnicianMaster from "./AddTechnicianMaster";
import SearchTechnicianMaster from "./SearchTechnicianMaster";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import getCookie from "../../api";
import { triggerscroll } from "../Homepage/Homepage";
import AddMaster from "./AddMaster";
import SearchMaster from "./SearchMaster";

function TechnicianMaster() {
  const [showaddform, setshowaddform] = useState(false);
  const [showsearchform, setshowsearchform] = useState(false);
  const [loading, setloading] = useState(false);
  const tablehead = [
    "Id",
    "Name",
    "Company Phone No.",
    "Age",
    "Qualification",
    "Experience",
    "Years With Ross",
    "CTC",
    "Posting Location",
    "Aadhar",
    "Pan",
    "Residential Address",
    "Personal Phone No.",
  ];
  const [tabledata, setTableData] = useState([]);
  const [reload, setReload] = useState(false);
  const [triggerupdate, settriggerupdate] = useState(false);
  const [technicianupdatedata, settechnicianupdatedata] = useState(null);
  const [datareload, setdatareload] = useState(0);
  const { setExpiredSession, permissionsdata, userData } =
    useContext(triggerscroll);
  const [filterbutton, setfilterbutton] = useState(false);
  const [activatedfilters, setactivatedfilters] = useState([]);

  function setsearchedtabledata(tabledata) {
    setTableData([]);
    for (let i = 0; i < tabledata.length; i++) {
      const tablearr = [];
      tablearr.push(tabledata[i].id);
      tablearr.push(tabledata[i].name);
      tablearr.push(tabledata[i].companyPhoneNumber);
      tablearr.push(tabledata[i].age);
      tablearr.push(tabledata[i].qualification);
      tablearr.push(tabledata[i].experience);
      tablearr.push(tabledata[i].yearsWithRoss);
      tablearr.push(tabledata[i].ctc);
      tablearr.push(tabledata[i].postingLocation);
      tablearr.push(tabledata[i].aadhar);
      tablearr.push(tabledata[i].pan);
      tablearr.push(tabledata[i].residentialAddress);
      tablearr.push(tabledata[i].personalPhoneNumber);
      setTableData((prev) => {
        const arr = [...prev];
        arr.push(tablearr);
        return arr;
      });
    }
  }

  function fetchtechniciandata(technicianid) {
    settechnicianupdatedata(null);
    const url = `${process.env.REACT_APP_API_URL}/api/v1/Technician/GetTechnicianByIdOrName?id=${technicianid}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        settechnicianupdatedata(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setTableData([]);
    setloading(true);
    const URL = `${process.env.REACT_APP_API_URL}/api/v1/Technician`;
    axios
      .get(URL, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          const data = [];
          data.push(response.data[i].id);
          data.push(response.data[i].name);
          data.push(response.data[i].companyPhoneNumber);
          data.push(response.data[i].age);
          data.push(response.data[i].qualification);
          data.push(response.data[i].experience);
          data.push(response.data[i].yearsWithRoss);
          data.push(response.data[i].ctc);
          data.push(response.data[i].postingLocation);
          data.push(response.data[i].aadhar);
          data.push(response.data[i].pan);
          data.push(response.data[i].residentialAddress);
          data.push(response.data[i].personalPhoneNumber);
          setTableData((prev) => {
            const arr = [...prev];
            arr.push(data);
            return arr;
          });
        }
        setloading(false);
      })
      .catch((error) => {
        console.error("Error fetching technician data:", error);
        setloading(false);
        if (error.status === 401) {
          setExpiredSession(true);
        }
      });
  }, [reload]);

  function readPermission() {
    if (userData.role === "Administrator") {
      return true;
    }
    const issatisfied = permissionsdata.some(
      (x) =>
        x.head === "Master" && x.subHead === "Technician" && x.isRead === true
    );
    return issatisfied;
  }

  function writePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) =>
        x.head === "Master" && x.subHead === "Technician" && x.isWrite === true
    );
    return !issatisfied;
  }

  function updatePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) =>
        x.head === "Master" && x.subHead === "Technician" && x.isUpdate === true
    );
    return !issatisfied;
  }

  function deletePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) =>
        x.head === "Master" && x.subHead === "Technician" && x.isDelete === true
    );
    return !issatisfied;
  }

  return (
    <>
      <section className="technician-master">
        <ToastContainer />
        <h1>Technician Master</h1>
        <blockquote className="technician-master-forms">
          <AddMaster
            text="Add Technician Master"
            setshowaddform={setshowaddform}
            settriggerupdate={settriggerupdate}
            setshowsearchform={setshowsearchform}
            permit={writePermission}
          />

          <SearchMaster
            text="Search Technician Master"
            setshowsearchform={setshowsearchform}
            setshowaddform={setshowaddform}
          />
        </blockquote>
        {showaddform && (
          <AddTechnicianMaster
            setshowaddform={setshowaddform}
            reload={reload}
            setReload={setReload}
            triggerupdate={triggerupdate}
            technicianupdatedata={technicianupdatedata}
            key={`${technicianupdatedata?.id}-${triggerupdate}-${datareload}`}
          />
        )}
        {showsearchform && (
          <SearchTechnicianMaster
            setshowsearchform={setshowsearchform}
            setsearchedtabledata={setsearchedtabledata}
            setfilterbutton={setfilterbutton}
            setactivatedfilters={setactivatedfilters}
            activatedfilters={activatedfilters}
          />
        )}
        <Table
          tablehead={tablehead}
          tabledata={tabledata}
          setshowaddform={setshowaddform}
          settriggerupdate={settriggerupdate}
          fetchdata={fetchtechniciandata}
          url="Technician/DeleteTechnician"
          reload={reload}
          setReload={setReload}
          setdatareload={setdatareload}
          datareload={datareload}
          loading={loading}
          filterbutton={filterbutton}
          setfilterbutton={setfilterbutton}
          activatedfilters={activatedfilters}
          setactivatedfilters={setactivatedfilters}
          setshowsearchform={setshowsearchform}
          readPermission={readPermission}
          updatePermission={updatePermission}
          deletePermission={deletePermission}
        />
      </section>
    </>
  );
}

export default TechnicianMaster;
