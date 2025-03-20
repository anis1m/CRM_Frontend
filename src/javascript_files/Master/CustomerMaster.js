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

function CustomerMaster() {
  const [showaddform, setshowaddform] = useState(false);
  const [showsearchform, setshowsearchform] = useState(false);
  const tablehead = [
    "Id",
    "Name",
    "Description",
    "Addresses",
    "Contact Centres",
    "Customer Boilers",
  ];
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

  async function setsearchedtabledata(tabledata) {
    setTableData([]);
    const tablearr = [];
    tablearr.push(tabledata.id);
    tablearr.push(tabledata.orgName);
    tablearr.push(tabledata.description);
    try {
      const addr = await fetchaddressesbycustomerid(tabledata.id);
      const contacts = await fetchcontactdatabycustomerid(tabledata.id);
      const customerboiler = await fetchcustomerboilerdatabycustomerid(
        tabledata.id
      );

      tablearr.push(addr, contacts, customerboiler);
    } catch (err) {
      tablearr.push("", "", "");
    }
    setTableData((prev) => {
      const arr = [...prev];
      arr.push(tablearr);
      return arr;
    });
    setshowsearchform(false);
  }

  async function fetchcustomerdata(customerid) {
    setcustomerupdatedata(null);
    setcustomeraddressupdatedata([]);
    setcustomerboilerupdatedata([]);
    setcustomercontactupdatedata([]);

    const baseURL = process.env.REACT_APP_API_URL;
    const token = `Bearer ${getCookie("token")}`;

    try {
      const responses = await Promise.allSettled([
        axios.get(
          `${baseURL}/api/v1/Customer/GetCustomerById?id=${customerid}`,
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
        responses[0].status === "fulfilled" ? responses[0].value.data : null
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
    } catch (error) {
      console.error("Unexpected error fetching customer data:", error);
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
      .then(async (response) => {
        const customers = response.data;
        const customerPromises = customers.map(async (customer) => {
          const data = [];
          data.push(customer.id);
          data.push(customer.orgName);
          data.push(customer.description);
          try {
            const addr = await fetchaddressesbycustomerid(customer.id);
            const contacts = await fetchcontactdatabycustomerid(customer.id);
            const customerboiler = await fetchcustomerboilerdatabycustomerid(
              customer.id
            );
            data.push(addr);
            data.push(contacts);
            data.push(customerboiler);
          } catch (err) {
            data.push("", "", "");
          }

          return data;
        });

        const tableData = await Promise.all(customerPromises);
        setTableData(tableData);
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

  function fetchaddressesbycustomerid(customerid) {
    const url = `${process.env.REACT_APP_API_URL}/api/v1/Addresses/GetAdressByCustomerId?CustomerId=${customerid}`;
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        const addressString = res.data.map(
          (item) =>
            `{ Area: ${item.area}, City: ${item.city}, Pincode: ${item.pincode}, State: ${item.state} } `
        );

        return addressString;
      })
      .catch((err) => {
        return "";
      });
  }

  function fetchcontactdatabycustomerid(customerid) {
    const url = `${process.env.REACT_APP_API_URL}/api/v1/ContactCentres/GetContactCenterByCustomerId?CustomerId=${customerid}`;
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        const contactString = `POC: ${res.data[0].poc}, PhoneNumbers: ${res.data[0].phoneNumbers}`;
        return contactString;
      })
      .catch((err) => {
        return "";
      });
  }

  function fetchcustomerboilerdatabycustomerid(customerid) {
    const url = `${process.env.REACT_APP_API_URL}/api/v1/CustomerBoilers/GetCustomerBoilerByCustomerId?CustomerId=${customerid}`;
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        const customerBoilerString = res.data.map(
          (item) =>
            `{ BoilerHead: ${item.boilerHead}, SeriesCode: ${item.boilerSeries} } `
        );

        return customerBoilerString;
      })
      .catch((err) => {
        return "";
      });
  }

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
      />
    </section>
  );
}

export default CustomerMaster;
