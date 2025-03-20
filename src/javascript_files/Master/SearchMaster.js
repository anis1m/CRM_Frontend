import React from "react";
import "../../css_files/Master/SearchMaster.css";

function SearchMaster({ text, setshowaddform, setshowsearchform }) {
  return (
    <button
      className="search-master"
      onClick={() => {
        setshowsearchform(true);
        setshowaddform(false);
      }}
    >
      {text}
    </button>
  );
}

export default SearchMaster;
