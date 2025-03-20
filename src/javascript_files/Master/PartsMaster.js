import React, { useState, useEffect, useContext } from "react";
import "../../css_files/Master/PartsMaster.css";
import Table from "../Homepage/Table";
import AddPartsMaster from "./AddPartsMaster";
import SearchPartsMaster from "./SearchPartsMaster";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import getCookie from "../../api";
import { triggerscroll } from "../Homepage/Homepage";
import AddMaster from "./AddMaster";
import SearchMaster from "./SearchMaster";

function PartsMaster() {
  const [showaddform, setshowaddform] = useState(false);
  const [showsearchform, setshowsearchform] = useState(false);
  const [loading, setloading] = useState(false);
  const tablehead = [
    "Part Id",
    "Part Number",
    "Part Name",
    "Part Description",
    "Units",
    "GST Rate (Percentage)",
    "HSN Code",
    "Types of Supply",
    "Selling Price",
    "Weight",
    "Dimensions",
    "Packing",
    "Material of Construction",
  ];
  const [tabledata, setTableData] = useState([]);
  const [reload, setReload] = useState(false);
  const [triggerupdate, settriggerupdate] = useState(false);
  const [partsupdatedata, setpartsupdatedata] = useState(null);
  const [datareload, setdatareload] = useState(0);
  const { setExpiredSession } = useContext(triggerscroll);
  const [filterbutton, setfilterbutton] = useState(false);
  const [activatedfilters, setactivatedfilters] = useState([]);

  async function setsearchedtabledata(tabledata) {
    setTableData([]);

    try {
      for (let i = 0; i < tabledata.length; i++) {
        const [unit, gst, hsn, packing] = await Promise.all([
          fetchunitdatabyid(tabledata[i].unitId),
          fetchgstdatabyid(tabledata[i].gstId),
          fetchhsndatabyid(tabledata[i].hsnDetailsId),
          fetchpackingdatabyid(tabledata[i].packingId),
        ]);

        const tablearr = [
          tabledata[i].id,
          tabledata[i].partNumber,
          tabledata[i].name,
          tabledata[i].description,
          unit,
          gst,
          hsn,
          tabledata[i].supplyType,
          tabledata[i].sellingPrice,
          tabledata[i].weight,
          tabledata[i].dimensions,
          packing,
          tabledata[i].materialOfConstruction,
        ];
        setTableData([tablearr]);
      }
    } catch (error) {
      console.error("Error fetching additional data:", error);
    }
  }

  useEffect(() => {
    setTableData([]);
    setloading(true);
    const fetchData = async () => {
      try {
        const URL = `${process.env.REACT_APP_API_URL}/api/v1/Parts`;
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        });
        console.log(response.data);

        const promises = response.data.map(async (part) => {
          const unit = await fetchunitdatabyid(part.unitId);
          const gst = await fetchgstdatabyid(part.gstId);
          const hsn = await fetchhsndatabyid(part.hsnDetailsId);
          const packing = await fetchpackingdatabyid(part.packingId);

          return [
            part.id,
            part.partNumber,
            part.name,
            part.description,
            unit,
            gst + "%",
            hsn,
            part.supplyType,
            part.sellingPrice,
            part.weight,
            part.dimensions,
            packing,
            part.materialOfConstruction,
          ];
        });

        const tableData = await Promise.all(promises);
        setTableData(tableData);
        setloading(false);
      } catch (error) {
        console.error("There was an error fetching parts data!", error);
        setloading(false);
        if (error.status === 401) {
          setExpiredSession(true);
        }
      }
    };

    fetchData();
  }, [reload]);

  function fetchunitdatabyid(unitid) {
    const url = `${process.env.REACT_APP_API_URL}/api/v1/Unit/GetUnitByIdOrNameOrCode?id=${unitid}`;
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        return res.data[0].name;
      })
      .catch((err) => {
        return "";
      });
  }

  function fetchgstdatabyid(gstid) {
    const url = `${process.env.REACT_APP_API_URL}/api/v1/GST/GetGSTById?id=${gstid}`;
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        return res.data.rate;
      })
      .catch((err) => {
        return "";
      });
  }

  function fetchhsndatabyid(hsnid) {
    const url = `${process.env.REACT_APP_API_URL}/api/v1/HSN/GetHSNByIdOrCode?id=${hsnid}`;
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        return res.data[0].hsnCode;
      })
      .catch((err) => {
        return "";
      });
  }

  function fetchpackingdatabyid(packingid) {
    const url = `${process.env.REACT_APP_API_URL}/api/v1/Packing/GetPackingByIdAndName?id=${packingid}`;
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        return res.data[0].name;
      })
      .catch((err) => {
        return "";
      });
  }

  function fetchpartsdata(partid) {
    setpartsupdatedata(null);
    const url = `${process.env.REACT_APP_API_URL}/api/v1/Parts/GetPartsByIdAndName?id=${partid}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setpartsupdatedata(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className="parts-master">
      <ToastContainer />
      <h1>Parts Master</h1>
      <blockquote className="parts-master-forms">
        <AddMaster
          text="Add Parts Master"
          setshowaddform={setshowaddform}
          settriggerupdate={settriggerupdate}
          setshowsearchform={setshowsearchform}
        />

        <SearchMaster
          text="Search Parts Master"
          setshowsearchform={setshowsearchform}
          setshowaddform={setshowaddform}
        />
      </blockquote>
      {showaddform && (
        <AddPartsMaster
          setshowaddform={setshowaddform}
          reload={reload}
          setReload={setReload}
          triggerupdate={triggerupdate}
          partsupdatedata={partsupdatedata}
          key={`${partsupdatedata?.id}-${triggerupdate}-${datareload}`}
        />
      )}
      {showsearchform && (
        <SearchPartsMaster
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
        fetchdata={fetchpartsdata}
        url="Parts/DeletePart"
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

export default PartsMaster;
