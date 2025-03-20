import React, { useState, useEffect, useContext } from "react";
import "../../css_files/Master/SubCategoryMaster.css";
import AddSubCategoryMaster from "./AddSubCategoryMaster";
import SearchSubCategoryMaster from "./SearchSubCategoryMaster";
import Table from "../Homepage/Table";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import getCookie from "../../api";
import { triggerscroll } from "../Homepage/Homepage";
import AddMaster from "./AddMaster";
import SearchMaster from "./SearchMaster";

function SubCategoryMaster() {
  const [showaddform, setshowaddform] = useState(false);
  const [showsearchform, setshowsearchform] = useState(false);
  const tablehead = ["Id", "Subcategory Name", "Description", "Category Name"];
  const [tabledata, setTableData] = useState([]);
  const [reload, setReload] = useState(false);
  const [triggerupdate, settriggerupdate] = useState(false);
  const [subcategoryupdatedata, setsubcategoryupdatedata] = useState(null);
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

  function fetchsubcategorydata(subcategoryid) {
    setsubcategoryupdatedata(null);
    const url = `${process.env.REACT_APP_API_URL}/api/v1/SubCategory/GetSubCategoryByIdOrName?id=${subcategoryid}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setsubcategoryupdatedata(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setTableData([]);
    setloading(true);
    const fetchSubCategories = async () => {
      const URL = `${process.env.REACT_APP_API_URL}/api/v1/SubCategory`;
      try {
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        });
        const subCategories = response.data;

        const tableDataArray = await Promise.all(
          subCategories.map(async (subCategory) => {
            const categoryName = await fetchCategory(subCategory.categoryId);
            return [
              subCategory.id,
              subCategory.name,
              subCategory.description,
              categoryName,
            ];
          })
        );

        setTableData(tableDataArray);
        setloading(false);
      } catch (error) {
        console.error("Error fetching subcategory data:", error);
        setloading(false);
        if (error.status === 401) {
          setExpiredSession(true);
        }
      }
    };

    fetchSubCategories();
  }, [reload]);

  function fetchCategory(CategoryId) {
    const URL = `${process.env.REACT_APP_API_URL}/api/v1/Category/GetCategoryByIdOrName?id=${CategoryId}`;
    return axios
      .get(URL, {
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

  return (
    <>
      <section className="sub-category-master">
        <ToastContainer />
        <h1>Sub Category Master</h1>
        <blockquote className="sub-category-master-forms">
          <AddMaster
            text="Add Sub-Category Master"
            setshowaddform={setshowaddform}
            settriggerupdate={settriggerupdate}
            setshowsearchform={setshowsearchform}
          />

          <SearchMaster
            text="Search Sub-Category Master"
            setshowsearchform={setshowsearchform}
            setshowaddform={setshowaddform}
          />
        </blockquote>
        {showaddform && (
          <AddSubCategoryMaster
            setshowaddform={setshowaddform}
            reload={reload}
            setReload={setReload}
            triggerupdate={triggerupdate}
            subcategorypdatedata={subcategoryupdatedata}
            key={`${subcategoryupdatedata?.id}-${triggerupdate}-${datareload}`}
          />
        )}
        {showsearchform && (
          <SearchSubCategoryMaster
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
          fetchdata={fetchsubcategorydata}
          url="SubCategory/DeleteSubCategory"
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
    </>
  );
}

export default SubCategoryMaster;
