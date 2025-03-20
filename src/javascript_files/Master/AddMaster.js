import React from "react";
import "../../css_files/Master/AddMaster.css";

function AddMaster({
  text,
  setshowsearchform,
  settriggerupdate,
  setshowaddform,
}) {
  return (
    <button
      className="add-master"
      onClick={() => {
        setshowaddform(true);
        settriggerupdate(false);
        setshowsearchform(false);
      }}
    >
      {text}
    </button>
  );
}

export default AddMaster;
