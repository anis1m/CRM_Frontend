import React, { useState, useEffect, useContext } from "react";
import "../../css_files/Master/CourierMaster.css";
import Table from "../Homepage/Table";
import AddCourierMaster from "./AddCourierMaster";
import SearchCourierMaster from "./SearchCourierMaster";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import getCookie from "../../api";
import { triggerscroll } from "../Homepage/Homepage";
import AddMaster from "./AddMaster";
import SearchMaster from "./SearchMaster";

function CourierMaster() {
  const [showaddform, setshowaddform] = useState(false);
  const [showsearchform, setshowsearchform] = useState(false);
  const tablehead = ["Id", "Name", "Phone Number", "Address"];
  const [tabledata, setTableData] = useState([]);
  const [reload, setReload] = useState(false);
  const [triggerupdate, settriggerupdate] = useState(false);
  const [courierupdatedata, setcourierupdatedata] = useState(null);
  const [datareload, setdatareload] = useState(0);
  const [loading, setloading] = useState(false);
  const { setExpiredSession, permissionsdata, userData } =
    useContext(triggerscroll);
  const [filterbutton, setfilterbutton] = useState(false);
  const [activatedfilters, setactivatedfilters] = useState([]);

  function setsearchedtabledata(tabledata) {
    setTableData([]);
    const tablearr = [];
    tablearr.push(tabledata.id);
    tablearr.push(tabledata.basicDetails);
    tablearr.push(tabledata.contacts);
    tablearr.push(tabledata.address);
    setTableData((prev) => {
      const arr = [...prev];
      arr.push(tablearr);
      return arr;
    });
    setshowsearchform(false);
  }

  function fetchcourierdata(courierid) {
    setcourierupdatedata(null);
    const url = `${process.env.REACT_APP_API_URL}/api/v1/Courier/GetCourierById?id=${courierid}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setcourierupdatedata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setTableData([]);
    setloading(true);
    const URL = `${process.env.REACT_APP_API_URL}/api/v1/Courier`;
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
          data.push(response.data[i].basicDetails);
          data.push(response.data[i].contacts);
          data.push(response.data[i].address);
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
      (x) => x.head === "Master" && x.subHead === "Courier" && x.isRead === true
    );
    return issatisfied;
  }

  function writePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) =>
        x.head === "Master" && x.subHead === "Courier" && x.isWrite === true
    );
    return !issatisfied;
  }

  function updatePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) =>
        x.head === "Master" && x.subHead === "Courier" && x.isUpdate === true
    );
    return !issatisfied;
  }

  function deletePermission() {
    if (userData.role === "Administrator") {
      return false;
    }
    const issatisfied = permissionsdata.some(
      (x) =>
        x.head === "Master" && x.subHead === "Courier" && x.isDelete === true
    );
    return !issatisfied;
  }

  return (
    <>
      <section className="courier-master">
        <ToastContainer />
        <h1>Courier Master</h1>
        <blockquote className="courier-master-forms">
          <AddMaster
            text="Add Courier Master"
            setshowaddform={setshowaddform}
            settriggerupdate={settriggerupdate}
            setshowsearchform={setshowsearchform}
            permit={writePermission}
          />

          <SearchMaster
            text="Search Courier Master"
            setshowsearchform={setshowsearchform}
            setshowaddform={setshowaddform}
          />
        </blockquote>
        {showaddform && (
          <AddCourierMaster
            setshowaddform={setshowaddform}
            reload={reload}
            setReload={setReload}
            triggerupdate={triggerupdate}
            courierupdatedata={courierupdatedata}
            key={`${courierupdatedata?.id}-${triggerupdate}-${datareload}`}
          />
        )}
        {showsearchform && (
          <SearchCourierMaster
            setshowsearchform={setshowsearchform}
            setsearchedtabledata={setsearchedtabledata}
            setfilterbutton={setfilterbutton}
          />
        )}
        <Table
          tablehead={tablehead}
          tabledata={tabledata}
          setshowaddform={setshowaddform}
          settriggerupdate={settriggerupdate}
          fetchdata={fetchcourierdata}
          url="Courier/DeleteCourier"
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

export default CourierMaster;
