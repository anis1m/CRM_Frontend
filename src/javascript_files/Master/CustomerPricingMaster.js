import React, { useState, useEffect, useContext } from "react";
import Table from "../Homepage/Table";
import "../../css_files/Master/CustomerPricingMaster.css";
import AddCustomerPricingMaster from "./AddCustomerPricing";
import SearchCustomerPricingMaster from "./SearchCustomerPricingMaster";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import getCookie from "../../api";
import { triggerscroll } from "../Homepage/Homepage";
import AddMaster from "./AddMaster";
import SearchMaster from "./SearchMaster";

function CustomerPricingMaster() {
  const [showaddform, setshowaddform] = useState(false);
  const [showsearchform, setshowsearchform] = useState(false);
  const tablehead = ["Id", "Code", "Percentage", "Description"];
  const [tabledata, setTableData] = useState([]);
  const [reload, setReload] = useState(false);
  const [triggerupdate, settriggerupdate] = useState(false);
  const [customerpricingupdatedata, setcustomerpricingupdatedata] =
    useState(null);
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
      tablearr.push(tabledata[i].code);
      tablearr.push(tabledata[i].percentage);
      tablearr.push(tabledata[i].description);
      setTableData((prev) => {
        const arr = [...prev];
        arr.push(tablearr);
        return arr;
      });
    }
  }

  function fetchcustomerpricingdata(customerpricingid) {
    setcustomerpricingupdatedata(null);
    const url = `${process.env.REACT_APP_API_URL}/api/v1/CustomerPricing/GetCustomerPricingByIdOrCodeOrPercentage?id=${customerpricingid}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setcustomerpricingupdatedata(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setTableData([]);
    setloading(true);
    const URL = `${process.env.REACT_APP_API_URL}/api/v1/CustomerPricing`;
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
          data.push(response.data[i].code);
          data.push(response.data[i].percentage);
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
        console.error("Error fetching customer pricing data:", error);
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
        x.subHead === "Customer Pricing" &&
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
        x.subHead === "Customer Pricing" &&
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
        x.subHead === "Customer Pricing" &&
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
        x.subHead === "Customer Pricing" &&
        x.isDelete === true
    );
    return !issatisfied;
  }

  return (
    <section className="customer-pricing-master">
      <ToastContainer />
      <h1>Customer Pricing Master</h1>
      <blockquote className="customer-pricing-master-forms">
        <AddMaster
          text="Add Customer Pricing Master"
          setshowaddform={setshowaddform}
          settriggerupdate={settriggerupdate}
          setshowsearchform={setshowsearchform}
          permit={writePermission}
        />

        <SearchMaster
          text="Search Customer Pricing Master"
          setshowsearchform={setshowsearchform}
          setshowaddform={setshowaddform}
        />
      </blockquote>
      {showaddform && (
        <AddCustomerPricingMaster
          setshowaddform={setshowaddform}
          reload={reload}
          setReload={setReload}
          triggerupdate={triggerupdate}
          customerpricingupdatedata={customerpricingupdatedata}
          key={`${customerpricingupdatedata?.id}-${triggerupdate}-${datareload}`}
        />
      )}
      {showsearchform && (
        <SearchCustomerPricingMaster
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
        fetchdata={fetchcustomerpricingdata}
        url="CustomerPricing/DeleteCustomerPricing"
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

export default CustomerPricingMaster;
