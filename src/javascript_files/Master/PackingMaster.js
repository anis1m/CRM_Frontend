import React, { useState, useEffect, useContext } from "react";
import "../../css_files/Master/PackingMaster.css";
import Table from "../Homepage/Table";
import AddPackingMaster from "./AddPackingMaster";
import SearchPackingMaster from "./SearchPackingMaster";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import getCookie from "../../api";
import { triggerscroll } from "../Homepage/Homepage";
import AddMaster from "./AddMaster";
import SearchMaster from "./SearchMaster";

function PackingMaster() {
  const [showaddform, setshowaddform] = useState(false);
  const [showsearchform, setshowsearchform] = useState(false);
  const tablehead = ["Packing Id", "Packing Name", "Used For", "Description"];
  const [tabledata, setTableData] = useState([]);
  const [reload, setReload] = useState(false);
  const [triggerupdate, settriggerupdate] = useState(false);
  const [packingupdatedata, setpackingupdatedata] = useState(null);
  const [datareload, setdatareload] = useState(0);
  const [loading, setloading] = useState(false);
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
      tablearr.push(tabledata[i].usedFor);
      tablearr.push(tabledata[i].description);
      setTableData((prev) => {
        const arr = [...prev];
        arr.push(tablearr);
        return arr;
      });
    }
  }

  function fetchpackingdata(packingid) {
    setpackingupdatedata(null);
    const url = `${process.env.REACT_APP_API_URL}/api/v1/Packing/GetPackingByIdAndName?id=${packingid}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setpackingupdatedata(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setTableData([]);
    setloading(true);
    const URL = `${process.env.REACT_APP_API_URL}/api/v1/packing`;
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
          data.push(response.data[i].usedFor);
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
      (x) => x.head === "Master" && x.subHead === "Packing" && x.isRead === true
    );
    return issatisfied;
  }

  function writePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) =>
        x.head === "Master" && x.subHead === "Packing" && x.isWrite === true
    );
    return !issatisfied;
  }

  function updatePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) =>
        x.head === "Master" && x.subHead === "Packing" && x.isUpdate === true
    );
    return !issatisfied;
  }

  function deletePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) =>
        x.head === "Master" && x.subHead === "Packing" && x.isDelete === true
    );
    return !issatisfied;
  }

  return (
    <>
      <section className="packing-master">
        <ToastContainer />
        <h1>Packing Master</h1>
        <blockquote className="packing-master-forms">
          <AddMaster
            text="Add Packing Master"
            setshowaddform={setshowaddform}
            settriggerupdate={settriggerupdate}
            setshowsearchform={setshowsearchform}
            permit={writePermission}
          />

          <SearchMaster
            text="Search Packing Master"
            setshowsearchform={setshowsearchform}
            setshowaddform={setshowaddform}
          />
        </blockquote>
        {showaddform && (
          <AddPackingMaster
            setshowaddform={setshowaddform}
            reload={reload}
            setReload={setReload}
            triggerupdate={triggerupdate}
            packingupdatedata={packingupdatedata}
            key={`${packingupdatedata?.id}-${triggerupdate}-${datareload}`}
          />
        )}
        {showsearchform && (
          <SearchPackingMaster
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
          fetchdata={fetchpackingdata}
          url="Packing/DeletePacking"
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

export default PackingMaster;
