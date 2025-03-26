import React from "react";
import "../../css_files/Master/CloseForm.css";

function CloseForm({ close }) {
  return (
    <button id="close-form-button" onClick={() => close(false)}>
      <i className="fa-solid fa-xmark" />
    </button>
  );
}

export default CloseForm;
