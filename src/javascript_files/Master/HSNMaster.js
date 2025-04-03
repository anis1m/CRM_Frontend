import React, { useState, useEffect, useContext } from "react";
import Table from "../Homepage/Table";
import "../../css_files/Master/HSNMaster.css";
import AddHSNMaster from "./AddHSNMaster";
import SearchHSNMaster from "./SearchHSNMaster";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import getCookie from "../../api";
import { triggerscroll } from "../Homepage/Homepage";
import AddMaster from "./AddMaster";
import SearchMaster from "./SearchMaster";

function HSNMaster() {
  const [showaddform, setshowaddform] = useState(false);
  const [showsearchform, setshowsearchform] = useState(false);
  const tablehead = ["Id", "HSN Code", "Description"];
  const [tabledata, setTableData] = useState([]);
  const [reload, setReload] = useState(false);
  const [triggerupdate, settriggerupdate] = useState(false);
  const [hsnupdatedata, sethsnupdatedata] = useState(null);
  const [datareload, setdatareload] = useState(0);
  const [loading, setloading] = useState(false);
  const { setExpiredSession, permissionsdata, userData } =
    useContext(triggerscroll);
  const [filterbutton, setfilterbutton] = useState(false);
  const [activatedfilters, setactivatedfilters] = useState([]);

  function setsearchedtabledata(tabledata) {
    setTableData([]);
    const tablearr = [];
    for (let i = 0; i < tabledata.length; i++) {
      tablearr.push(tabledata[i].id);
      tablearr.push(tabledata[i].hsnCode);
      tablearr.push(tabledata[i].description);
      setTableData((prev) => {
        const arr = [...prev];
        arr.push(tablearr);
        return arr;
      });
    }
  }

  function fetchhsndata(hsnid) {
    sethsnupdatedata(null);
    const url = `${process.env.REACT_APP_API_URL}/api/v1/HSN/GetHSNByIdOrCode?id=${hsnid}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        sethsnupdatedata(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setTableData([]);
    setloading(true);
    const URL = `${process.env.REACT_APP_API_URL}/api/v1/hsn`;
    axios
      .get(URL, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          const data = [];
          data.push(response.data[i].id);
          data.push(response.data[i].hsnCode);
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
        console.error("Error fetching packing data:", error);
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
      (x) => x.head === "Master" && x.subHead === "HSN" && x.isRead === true
    );
    return issatisfied;
  }

  function writePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) => x.head === "Master" && x.subHead === "HSN" && x.isWrite === true
    );
    return !issatisfied;
  }

  function updatePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) => x.head === "Master" && x.subHead === "HSN" && x.isUpdate === true
    );
    return !issatisfied;
  }

  function deletePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) => x.head === "Master" && x.subHead === "HSN" && x.isDelete === true
    );
    return !issatisfied;
  }

  return (
    <section className="hsn-master">
      <ToastContainer />
      <h1>HSN Master</h1>
      <blockquote className="hsn-master-forms">
        <AddMaster
          text="Add HSN Master"
          setshowaddform={setshowaddform}
          settriggerupdate={settriggerupdate}
          setshowsearchform={setshowsearchform}
          permit={writePermission}
        />

        <SearchMaster
          text="Search HSN Master"
          setshowsearchform={setshowsearchform}
          setshowaddform={setshowaddform}
        />
      </blockquote>
      {showaddform && (
        <AddHSNMaster
          setshowaddform={setshowaddform}
          reload={reload}
          setReload={setReload}
          triggerupdate={triggerupdate}
          hsnupdatedata={hsnupdatedata}
          key={`${hsnupdatedata?.id}-${triggerupdate}-${datareload}`}
        />
      )}
      {showsearchform && (
        <SearchHSNMaster
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
        fetchdata={fetchhsndata}
        url="HSN/DeleteHSN"
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
  );
}

export default HSNMaster;
