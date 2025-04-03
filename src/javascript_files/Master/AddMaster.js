import React from "react";
import "../../css_files/Master/AddMaster.css";

function AddMaster({
  text,
  setshowsearchform,
  settriggerupdate,
  setshowaddform,
  permit,
}) {
  return (
    <button
      className="add-master"
      onClick={() => {
        setshowaddform(true);
        settriggerupdate(false);
        setshowsearchform(false);
      }}
      disabled={permit()}
    >
      {text}
    </button>
  );
}

export default AddMaster;
