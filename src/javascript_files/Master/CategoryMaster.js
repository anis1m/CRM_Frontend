import React, { useContext, useEffect, useState } from "react";
import "../../css_files/Master/CategoryMaster.css";
import AddCategoryMaster from "./AddCategoryMaster";
import Table from "../Homepage/Table";
import SearchCategoryMaster from "./SearchCategoryMaster";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import getCookie from "../../api";
import { triggerscroll } from "../Homepage/Homepage";
import AddMaster from "./AddMaster";
import SearchMaster from "./SearchMaster";

function CategoryMaster() {
  const [showaddcategorymaster, setshowaddcategorymaster] = useState(false);
  const [showsearchform, setshowsearchform] = useState(false);
  const tablehead = ["Id", "Name", "Description"];
  const [tabledata, setTableData] = useState([]);
  const [reload, setReload] = useState(false);
  const [triggerupdate, settriggerupdate] = useState(false);
  const [categoryupdatedata, setcategoryupdatedata] = useState(null);
  const [datareload, setdatareload] = useState(0);
  const [loading, setloading] = useState(false);
  const { setExpiredSession } = useContext(triggerscroll);
  const [filterbutton, setfilterbutton] = useState(false);
  const [activatedfilters, setactivatedfilters] = useState([]);

  function setsearchedtabledata(tabledata) {
    setTableData([]);
    for (let i = 0; i < tabledata.length; i++) {
      const tablearr = [];
      tablearr.push(tabledata[i].id);
      tablearr.push(tabledata[i].name);
      tablearr.push(tabledata[i].description);
      setTableData((prev) => {
        const arr = [...prev];
        arr.push(tablearr);
        return arr;
      });
    }
  }

  function fetchcategorydata(categoryid) {
    setcategoryupdatedata(null);
    const url = `${process.env.REACT_APP_API_URL}/api/v1/Category/GetCategoryByIdOrName?id=${categoryid}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setcategoryupdatedata(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setTableData([]);
    setloading(true);
    const URL = `${process.env.REACT_APP_API_URL}/api/v1/Category`;
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

  return (
    <section className="category-master">
      <ToastContainer />
      <h1>Category Master</h1>
      <blockquote className="category-master-forms">
        <AddMaster
          text="Add Category Master"
          setshowaddform={setshowaddcategorymaster}
          settriggerupdate={settriggerupdate}
          setshowsearchform={setshowsearchform}
        />

        <SearchMaster
          text="Search Category Master"
          setshowsearchform={setshowsearchform}
          setshowaddform={setshowaddcategorymaster}
        />
      </blockquote>
      {showaddcategorymaster && (
        <AddCategoryMaster
          setshowaddform={setshowaddcategorymaster}
          reload={reload}
          setReload={setReload}
          triggerupdate={triggerupdate}
          categoryupdatedata={categoryupdatedata}
          key={`${categoryupdatedata?.id}-${triggerupdate}-${datareload}`}
        />
      )}
      {showsearchform && (
        <SearchCategoryMaster
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
        setshowaddform={setshowaddcategorymaster}
        settriggerupdate={settriggerupdate}
        fetchdata={fetchcategorydata}
        url="Category/DeleteCategory"
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

export default CategoryMaster;
