import React from "react";
import "../../css_files/Master/CloseForm.css";

function CloseForm({ close }) {
  return (
    <button id="close-add-category-master-form" onClick={() => close(false)}>
      <i className="fa-solid fa-xmark" />
    </button>
  );
}

export default CloseForm;
