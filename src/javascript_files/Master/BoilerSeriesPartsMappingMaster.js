import React, { useState, useEffect, useContext } from "react";
import "../../css_files/Master/BoilerSeriesPartsMappingMaster.css";
import Table from "../Homepage/Table";
import AddBoilerSeriesPartsMappingMaster from "./AddBoilerSeriesPartsMappingMaster";
import SearchBoilerSeriesPartsMappingMaster from "./SearchBoilerSeriesPartsMappingMaster";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import getCookie from "../../api";
import { triggerscroll } from "../Homepage/Homepage";
import AddMaster from "./AddMaster";
import SearchMaster from "./SearchMaster";

function BoilerSeriesPartsMappingMaster() {
  const [showaddform, setshowaddform] = useState(false);
  const [showsearchform, setshowsearchform] = useState(false);
  const tablehead = [
    "Id",
    "Head",
    "Series Code",
    "Description",
    "Display All Parts",
  ];
  const [tabledata, setTableData] = useState([]);
  const [reload, setReload] = useState(false);
  const [triggerupdate, settriggerupdate] = useState(false);
  const [boilerseriespartsupdatedata, setboilerseriespartsupdatedata] =
    useState(null);
  const [datareload, setdatareload] = useState(0);
  const [loading, setloading] = useState(false);
  const { setExpiredSession } = useContext(triggerscroll);
  const [filterbutton, setfilterbutton] = useState(false);
  const [activatedfilters, setactivatedfilters] = useState([]);

  function setsearchedtabledata(tabledata) {
    setTableData([]);
    const tablearr = [];
    for (let i = 0; i < tabledata.length; i++) {
      tablearr.push(tabledata[i].id);
      tablearr.push(tabledata[i].head);
      tablearr.push(tabledata[i].seriesCode);
      tablearr.push(tabledata[i].description);
      tablearr.push(tabledata[i].parts);
      setTableData((prev) => {
        const arr = [...prev];
        arr.push(tablearr);
        return arr;
      });
    }
  }

  function fetchboilerseriespartsdata(boilerseriespartsid) {
    setboilerseriespartsupdatedata(null);
    const url = `${process.env.REACT_APP_API_URL}/api/v1/BoilerPartsMapper/GetBoilerPartsMapperByIdOrSeriesCode?id=${boilerseriespartsid}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setboilerseriespartsupdatedata(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setTableData([]);
    setloading(true);
    const URL = `${process.env.REACT_APP_API_URL}/api/v1/BoilerPartsMapper`;
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
          data.push(response.data[i].parts);
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

  return (
    <section className="boiler-series-parts-mapping-master">
      <ToastContainer />
      <h1>Boiler-Series Parts Mapping Master</h1>
      <blockquote className="boiler-series-parts-mapping-master-forms">
        <AddMaster
          text="Add Boiler-Series Parts Mapping Master"
          setshowaddform={setshowaddform}
          settriggerupdate={settriggerupdate}
          setshowsearchform={setshowsearchform}
        />

        <SearchMaster
          text="Search Boiler-Series Parts Mapping Master"
          setshowsearchform={setshowsearchform}
          setshowaddform={setshowaddform}
        />
      </blockquote>
      {showaddform && (
        <AddBoilerSeriesPartsMappingMaster
          setshowaddform={setshowaddform}
          reload={reload}
          setReload={setReload}
          triggerupdate={triggerupdate}
          boilerseriespartsupdatedata={boilerseriespartsupdatedata}
          key={`${boilerseriespartsupdatedata?.id}-${triggerupdate}-${datareload}`}
        />
      )}
      {showsearchform && (
        <SearchBoilerSeriesPartsMappingMaster
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
        fetchdata={fetchboilerseriespartsdata}
        url="BoilerPartsMapper/DeleteBoilerPartsMapper"
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
      />
    </section>
  );
}

export default BoilerSeriesPartsMappingMaster;
