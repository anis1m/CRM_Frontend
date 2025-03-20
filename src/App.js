import { Route, Routes } from "react-router-dom";
import Homepage from "./javascript_files/Homepage/Homepage";
import CategoryMaster from "./javascript_files/Master/CategoryMaster";
import Overview from "./javascript_files/Homepage/Overview";
import SubCategoryMaster from "./javascript_files/Master/SubCategoryMaster";
import HSNMaster from "./javascript_files/Master/HSNMaster";
import CurrencyMaster from "./javascript_files/Master/CurrencyMaster";
import UnitMaster from "./javascript_files/Master/UnitMaster";
import PackingMaster from "./javascript_files/Master/PackingMaster";
import GSTMaster from "./javascript_files/Master/GSTMaster";
import PartsMaster from "./javascript_files/Master/PartsMaster";
import BoilerMaster from "./javascript_files/Master/BoilerMaster";
import BoilerSeriesMaster from "./javascript_files/Master/BoilerSeriesMaster";
import BoilerSeriesPartsMappingMaster from "./javascript_files/Master/BoilerSeriesPartsMappingMaster";
import CourierMaster from "./javascript_files/Master/CourierMaster";
import TechnicianMaster from "./javascript_files/Master/TechnicianMaster";
import CustomerMaster from "./javascript_files/Master/CustomerMaster";
import CustomerPricingMaster from "./javascript_files/Master/CustomerPricingMaster";
import QuotationMaster from "./javascript_files/Master/QuotationMaster.js";
import Signin from "./javascript_files/Signin/Signin";
import Login from "./javascript_files/Signin/Login";
import Register from "./javascript_files/Signin/Register";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/dashboard" element={<Homepage />}>
        <Route path="/dashboard" element={<Overview />} />
        <Route path="master/category-master" element={<CategoryMaster />} />
        <Route
          path="master/sub-category-master"
          element={<SubCategoryMaster />}
        />
        <Route path="master/hsn-master" element={<HSNMaster />} />
        <Route path="master/currency-master" element={<CurrencyMaster />} />
        <Route path="master/unit-master" element={<UnitMaster />} />
        <Route path="master/packing-master" element={<PackingMaster />} />
        <Route path="master/gst-master" element={<GSTMaster />} />
        <Route path="master/parts-master" element={<PartsMaster />} />
        <Route path="master/boiler-master" element={<BoilerMaster />} />
        <Route
          path="master/boiler-series-master"
          element={<BoilerSeriesMaster />}
        />
        <Route
          path="master/boiler-series-parts-mapping-master"
          element={<BoilerSeriesPartsMappingMaster />}
        />
        <Route path="master/courier-master" element={<CourierMaster />} />
        <Route path="master/technician-master" element={<TechnicianMaster />} />
        <Route path="master/customer-master" element={<CustomerMaster />} />
        <Route
          path="master/customer-pricing-master"
          element={<CustomerPricingMaster />}
        />
        <Route path="master/quotation-master" element={<QuotationMaster />} />
      </Route>
    </Routes>
  );
}

export default App;
