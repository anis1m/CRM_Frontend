import React, { useState, useEffect, useContext } from "react";
import "../../css_files/Master/BoilerSeriesMaster.css";
import Table from "../Homepage/Table";
import AddBoilerSeriesMaster from "./AddBoilerSeriesMaster";
import SearchBoilerSeriesMaster from "./SearchBoilerSeriesMaster";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import getCookie from "../../api";
import { triggerscroll } from "../Homepage/Homepage";
import AddMaster from "./AddMaster";
import SearchMaster from "./SearchMaster";

function BoilerSeriesMaster() {
  const [showaddform, setshowaddform] = useState(false);
  const [showsearchform, setshowsearchform] = useState(false);
  const tablehead = ["Id", "Head", "Series Code", "Description"];
  const [tabledata, setTableData] = useState([]);
  const [reload, setReload] = useState(false);
  const [triggerupdate, settriggerupdate] = useState(false);
  const [boilerseriesupdatedata, setboilerseriesupdatedata] = useState(null);
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
      tablearr.push(tabledata[i].head);
      tablearr.push(tabledata[i].seriesCode);
      tablearr.push(tabledata[i].description);
      setTableData((prev) => {
        const arr = [...prev];
        arr.push(tablearr);
        return arr;
      });
    }
  }

  function fetchboilerseriesdata(boilerseriesid) {
    setboilerseriesupdatedata(null);
    const url = `${process.env.REACT_APP_API_URL}/api/v1/BoilerSeries/GetBoilerSeriesByIdOrheadOrSeriesCode?id=${boilerseriesid}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setboilerseriesupdatedata(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setTableData([]);
    setloading(true);
    const URL = `${process.env.REACT_APP_API_URL}/api/v1/BoilerSeries`;
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
          data.push(response.data[i].seriesCode);
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
      (x) =>
        x.head === "Master" &&
        x.subHead === "Boiler Series" &&
        x.isRead === true
    );
    return issatisfied;
  }

  function writePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) =>
        x.head === "Master" &&
        x.subHead === "Boiler Series" &&
        x.isWrite === true
    );
    return !issatisfied;
  }

  function updatePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) =>
        x.head === "Master" &&
        x.subHead === "Boiler Series" &&
        x.isUpdate === true
    );
    return !issatisfied;
  }

  function deletePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) =>
        x.head === "Master" &&
        x.subHead === "Boiler Series" &&
        x.isDelete === true
    );
    return !issatisfied;
  }

  return (
    <section className="boiler-series-master">
      <ToastContainer />
      <h1>Boiler-Series Master</h1>
      <blockquote className="boiler-series-master-forms">
        <AddMaster
          text="Add Boiler-Series Master"
          setshowaddform={setshowaddform}
          settriggerupdate={settriggerupdate}
          setshowsearchform={setshowsearchform}
          permit={writePermission}
        />

        <SearchMaster
          text="Search Boiler-Series Master"
          setshowsearchform={setshowsearchform}
          setshowaddform={setshowaddform}
        />
      </blockquote>
      {showaddform && (
        <AddBoilerSeriesMaster
          setshowaddform={setshowaddform}
          reload={reload}
          setReload={setReload}
          triggerupdate={triggerupdate}
          boilerseriesupdatedata={boilerseriesupdatedata}
          key={`${boilerseriesupdatedata?.id}-${triggerupdate}-${datareload}`}
        />
      )}
      {showsearchform && (
        <SearchBoilerSeriesMaster
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
        fetchdata={fetchboilerseriesdata}
        url="BoilerSeries/DeleteBoilerSeries"
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

export default BoilerSeriesMaster;
