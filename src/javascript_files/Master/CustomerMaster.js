import React, { useState, useEffect, useContext } from "react";
import Table from "../Homepage/Table";
import "../../css_files/Master/CustomerMaster.css";
import AddCustomerMaster from "./AddCustomerMaster";
import SearchCustomerMaster from "./SearchCustomerMaster";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import getCookie from "../../api";
import { triggerscroll } from "../Homepage/Homepage";
import AddMaster from "./AddMaster";
import SearchMaster from "./SearchMaster";
import MoreCustomerMasterDetails from "./MoreCustomerMasterDetails";

function CustomerMaster() {
  const [showaddform, setshowaddform] = useState(false);
  const [showsearchform, setshowsearchform] = useState(false);
  const tablehead = ["Id", "Name", "Description", ""];
  const [tabledata, setTableData] = useState([]);
  const [reload, setReload] = useState(false);
  const [triggerupdate, settriggerupdate] = useState(false);
  const [customerupdatedata, setcustomerupdatedata] = useState(null);
  const [customeraddressupdatedata, setcustomeraddressupdatedata] = useState(
    []
  );
  const [customercontactupdatedata, setcustomercontactupdatedata] = useState(
    []
  );
  const [customerboilerupdatedata, setcustomerboilerupdatedata] = useState([]);
  const [datareload, setdatareload] = useState(0);
  const [loading, setloading] = useState(false);
  const { setExpiredSession } = useContext(triggerscroll);
  const [filterbutton, setfilterbutton] = useState(false);
  const [activatedfilters, setactivatedfilters] = useState([]);
  const [showmorecustomerdata, setshowmorecustomerdata] = useState(false);
  const [moredetailsloading, setmoredetailsloading] = useState(false);

  async function setsearchedtabledata(tabledata) {
    setTableData([]);
    for (let i = 0; i < tabledata.length; i++) {
      const tablearr = [];
      tablearr.push(tabledata[i].id);
      tablearr.push(tabledata[i].orgName);
      tablearr.push(tabledata[i].description);
      tablearr.push("Tap here to See More Details");

      setTableData((prev) => {
        const arr = [...prev];
        arr.push(tablearr);
        return arr;
      });
    }
  }

  async function fetchcustomerdata(customerid) {
    setmoredetailsloading(true);
    setcustomerupdatedata(null);
    setcustomeraddressupdatedata([]);
    setcustomerboilerupdatedata([]);
    setcustomercontactupdatedata([]);

    const baseURL = process.env.REACT_APP_API_URL;
    const token = `Bearer ${getCookie("token")}`;

    try {
      const responses = await Promise.allSettled([
        axios.get(
          `${baseURL}/api/v1/Customer/GetCustomerByIdOrName?id=${customerid}`,
          { headers: { Authorization: token } }
        ),
        axios.get(
          `${baseURL}/api/v1/Addresses/GetAdressByCustomerId?CustomerId=${customerid}`,
          { headers: { Authorization: token } }
        ),
        axios.get(
          `${baseURL}/api/v1/ContactCentres/GetContactCenterByCustomerId?CustomerId=${customerid}`,
          { headers: { Authorization: token } }
        ),
        axios.get(
          `${baseURL}/api/v1/CustomerBoilers/GetCustomerBoilerByCustomerId?CustomerId=${customerid}`,
          { headers: { Authorization: token } }
        ),
      ]);

      setcustomerupdatedata(
        responses[0].status === "fulfilled" ? responses[0].value.data[0] : null
      );
      setcustomeraddressupdatedata(
        responses[1].status === "fulfilled" ? responses[1].value.data : []
      );
      setcustomercontactupdatedata(
        responses[2].status === "fulfilled" ? responses[2].value.data : []
      );
      setcustomerboilerupdatedata(
        responses[3].status === "fulfilled" ? responses[3].value.data : []
      );

      responses.forEach((res, index) => {
        if (res.status === "rejected") {
          console.error(`API ${index + 1} failed:`, res.reason);
        }
      });
      setmoredetailsloading(false);
    } catch (error) {
      console.error("Unexpected error fetching customer data:", error);
      setmoredetailsloading(false);
    }
  }

  useEffect(() => {
    setTableData([]);
    setloading(true);
    const URL = `${process.env.REACT_APP_API_URL}/api/v1/Customer`;
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
          data.push(response.data[i].orgName);
          data.push(response.data[i].description);
          data.push("Tap here to See More Details");
          setTableData((prev) => {
            const arr = [...prev];
            arr.push(data);
            return arr;
          });
        }
        setloading(false);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
        setloading(false);
        if (error.status === 401) {
          setExpiredSession(true);
        }
      });
  }, [reload]);

  return (
    <section className="customer-master">
      <ToastContainer />
      <h1>Customer Master</h1>
      <blockquote className="customer-master-forms">
        <AddMaster
          text="Add Customer Master"
          setshowaddform={setshowaddform}
          settriggerupdate={settriggerupdate}
          setshowsearchform={setshowsearchform}
        />

        <SearchMaster
          text="Search Customer Master"
          setshowsearchform={setshowsearchform}
          setshowaddform={setshowaddform}
        />
      </blockquote>
      {showaddform && (
        <AddCustomerMaster
          setshowaddform={setshowaddform}
          reload={reload}
          setReload={setReload}
          triggerupdate={triggerupdate}
          customerupdatedata={customerupdatedata}
          customeraddressupdatedata={customeraddressupdatedata}
          customerboilerupdatedata={customerboilerupdatedata}
          customercontactupdatedata={customercontactupdatedata}
          key={`${customerupdatedata?.id}-${triggerupdate}-${datareload}`}
        />
      )}
      {showsearchform && (
        <SearchCustomerMaster
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
        fetchdata={fetchcustomerdata}
        url="Customer/DeleteCustomer"
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
        setshowmorecustomerdata={setshowmorecustomerdata}
      />
      {showmorecustomerdata && (
        <MoreCustomerMasterDetails
          setshowmorecustomerdata={setshowmorecustomerdata}
          customerupdatedata={customerupdatedata}
          customeraddressupdatedata={customeraddressupdatedata}
          customerboilerupdatedata={customerboilerupdatedata}
          customercontactupdatedata={customercontactupdatedata}
          loading={moredetailsloading}
        />
      )}
    </section>
  );
}

export default CustomerMaster;
