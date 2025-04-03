import React, { useState, useEffect, useContext } from "react";
import "../../css_files/Master/CurrencyMaster.css";
import Table from "../Homepage/Table";
import AddCurrencyMaster from "./AddCurrencyMaster";
import SearchCurrencyMaster from "./SearchCurrencyMaster";
import { ToastContainer } from "react-toastify";
import getCookie from "../../api";
import axios from "axios";
import { triggerscroll } from "../Homepage/Homepage";
import AddMaster from "./AddMaster";
import SearchMaster from "./SearchMaster";

function CurrencyMaster() {
  const [showaddform, setshowaddform] = useState(false);
  const [showsearchform, setshowsearchform] = useState(false);
  const tablehead = [
    "Currency Id",
    "Currency Name",
    "Currency Code",
    "Rate",
    "Description",
  ];
  const [tabledata, setTableData] = useState([]);
  const [reload, setReload] = useState(false);
  const [triggerupdate, settriggerupdate] = useState(false);
  const [currencyupdatedata, setcurrencyupdatedata] = useState(null);
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
      tablearr.push(tabledata[i].currencyId);
      tablearr.push(tabledata[i].currencyName);
      tablearr.push(tabledata[i].code);
      tablearr.push(tabledata[i].rate);
      tablearr.push(tabledata[i].description);
      setTableData((prev) => {
        const arr = [...prev];
        arr.push(tablearr);
        return arr;
      });
    }
  }

  function fetchcurrencydata(currencyId) {
    setcurrencyupdatedata(null);
    const url = `${process.env.REACT_APP_API_URL}/api/v1/Currency/GetCurrencyByIdOrNameOrCode?id=${currencyId}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setcurrencyupdatedata(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setTableData([]);
    setloading(true);
    const URL = `${process.env.REACT_APP_API_URL}/api/v1/Currency`;
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
          data.push(response.data[i].currencyId);
          data.push(response.data[i].currencyName);
          data.push(response.data[i].code);
          data.push(response.data[i].rate);
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
      (x) =>
        x.head === "Master" && x.subHead === "Currency" && x.isRead === true
    );
    return issatisfied;
  }

  function writePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) =>
        x.head === "Master" && x.subHead === "Currency" && x.isWrite === true
    );
    return !issatisfied;
  }

  function updatePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) =>
        x.head === "Master" && x.subHead === "Currency" && x.isUpdate === true
    );
    return !issatisfied;
  }

  function deletePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) =>
        x.head === "Master" && x.subHead === "Currency" && x.isDelete === true
    );
    return !issatisfied;
  }

  return (
    <>
      <section className="currency-master">
        <ToastContainer />
        <h1>Currency Master</h1>
        <blockquote className="currency-master-forms">
          <AddMaster
            text="Add Currency Master"
            setshowaddform={setshowaddform}
            settriggerupdate={settriggerupdate}
            setshowsearchform={setshowsearchform}
            permit={writePermission}
          />

          <SearchMaster
            text="Search Currency Master"
            setshowsearchform={setshowsearchform}
            setshowaddform={setshowaddform}
          />
        </blockquote>
        {showaddform && (
          <AddCurrencyMaster
            setshowaddform={setshowaddform}
            reload={reload}
            setReload={setReload}
            triggerupdate={triggerupdate}
            currencyupdatedata={currencyupdatedata}
            key={`${currencyupdatedata?.currencyId}-${triggerupdate}-${datareload}`}
          />
        )}
        {showsearchform && (
          <SearchCurrencyMaster
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
          fetchdata={fetchcurrencydata}
          url="Currency/DeleteCurrency"
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

export default CurrencyMaster;
