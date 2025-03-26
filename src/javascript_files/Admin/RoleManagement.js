import React, { useState } from "react";
import "../../css_files/Admin/RoleManagement.css";
import AddRoles from "./AddRoles";
import RolesTable from "./RolesTable";
import DetailsRoleTable from "./DetailsRoleTable";

function RoleManagement() {
  const [showaddroleform, setshowaddroleform] = useState(false);
  const [showdetailsroletable, setshowdetailsroletable] = useState(false);
  return (
    <section className="roles">
      {showaddroleform && <AddRoles setshowaddroleform={setshowaddroleform} />}

      <RolesTable
        setshowaddroleform={setshowaddroleform}
        showaddroleform={showaddroleform}
        setshowdetailsroletable={setshowdetailsroletable}
      />
      {showdetailsroletable && (
        <DetailsRoleTable setshowdetailsroletable={setshowdetailsroletable} />
      )}
    </section>
  );
}

export default RoleManagement;
