import React, { useState } from "react";
import "../../css_files/Admin/RoleManagement.css";
import AddRoles from "./AddRoles";
import RolesTable from "./RolesTable";
import DetailsRoleTable from "./DetailsRoleTable";
import { ToastContainer } from "react-toastify";

function RoleManagement() {
  const [showaddroleform, setshowaddroleform] = useState(false);
  const [showdetailsroletable, setshowdetailsroletable] = useState(false);
  const [role, setrole] = useState();
  const [refresh, setrefresh] = useState(false);

  return (
    <section className="roles">
      <ToastContainer />
      {showaddroleform && (
        <AddRoles
          setshowaddroleform={setshowaddroleform}
          setrefresh={setrefresh}
          refresh={refresh}
        />
      )}

      <RolesTable
        setshowaddroleform={setshowaddroleform}
        showaddroleform={showaddroleform}
        setshowdetailsroletable={setshowdetailsroletable}
        setrole={setrole}
        refresh={refresh}
      />
      {showdetailsroletable && (
        <DetailsRoleTable
          setshowdetailsroletable={setshowdetailsroletable}
          role={role}
          isAdmin={true}
        />
      )}
    </section>
  );
}

export default RoleManagement;
