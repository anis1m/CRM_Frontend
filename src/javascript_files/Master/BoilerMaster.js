import React, { useState, useEffect, useContext } from "react";
import "../../css_files/Master/BoilerMaster.css";
import Table from "../Homepage/Table";
import AddBoilerMaster from "./AddBoilerMaster";
import SearchBoilerMaster from "./SearchBoilerMaster";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import getCookie from "../../api";
import { triggerscroll } from "../Homepage/Homepage";
import AddMaster from "./AddMaster";
import SearchMaster from "./SearchMaster";

function BoilerMaster() {
  const [showaddform, setshowaddform] = useState(false);
  const [showsearchform, setshowsearchform] = useState(false);
  const tablehead = ["Id", "Head", "Description"];
  const [tabledata, setTableData] = useState([]);
  const [reload, setReload] = useState(false);
  const [triggerupdate, settriggerupdate] = useState(false);
  const [loading, setloading] = useState(false);
  const [boilerupdatedata, setboilerupdatedata] = useState(null);
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
      tablearr.push(tabledata[i].head);
      tablearr.push(tabledata[i].description);
      setTableData((prev) => {
        const arr = [...prev];
        arr.push(tablearr);
        return arr;
      });
    }
  }

  function fetchboilerdata(boilerid) {
    setboilerupdatedata(null);
    const url = `${process.env.REACT_APP_API_URL}/api/v1/Boiler/GetBoilerByIdOrName?id=${boilerid}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setboilerupdatedata(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setTableData([]);
    setloading(true);
    const URL = `${process.env.REACT_APP_API_URL}/api/v1/Boiler`;
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
          data.push(response.data[i].head);
          data.push(response.data[i].description);
          setTableData((prev) => {
            const arr = [...prev];
            arr.push(data);
            return arr;
          });
        }
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
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
      (x) => x.head === "Master" && x.subHead === "Boiler" && x.isRead === true
    );
    return issatisfied;
  }

  function writePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) => x.head === "Master" && x.subHead === "Boiler" && x.isWrite === true
    );
    return !issatisfied;
  }

  function updatePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) =>
        x.head === "Master" && x.subHead === "Boiler" && x.isUpdate === true
    );
    return !issatisfied;
  }

  function deletePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) =>
        x.head === "Master" && x.subHead === "Boiler" && x.isDelete === true
    );
    return !issatisfied;
  }

  return (
    <>
      <section className="boiler-master">
        <ToastContainer />
        <h1>Boiler Master</h1>
        <blockquote className="boiler-master-forms">
          <AddMaster
            text="Add Boiler Master"
            setshowaddform={setshowaddform}
            settriggerupdate={settriggerupdate}
            setshowsearchform={setshowsearchform}
            permit={writePermission}
          />

          <SearchMaster
            text="Search Boiler Master"
            setshowsearchform={setshowsearchform}
            setshowaddform={setshowaddform}
          />
        </blockquote>
        {showaddform && (
          <AddBoilerMaster
            setshowaddform={setshowaddform}
            reload={reload}
            setReload={setReload}
            triggerupdate={triggerupdate}
            boilerupdatedata={boilerupdatedata}
            key={`${boilerupdatedata?.id}-${triggerupdate}-${datareload}`}
          />
        )}
        {showsearchform && (
          <SearchBoilerMaster
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
          url="Boiler/DeleteBoiler"
          settriggerupdate={settriggerupdate}
          fetchdata={fetchboilerdata}
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

export default BoilerMaster;
