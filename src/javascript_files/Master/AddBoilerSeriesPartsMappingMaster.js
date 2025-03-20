import React, { useEffect } from "react";
import { useState } from "react";
import "../../css_files/Master/AddBoilerSeriesPartsMappingMaster.css";
import CloseForm from "./CloseForm";
import axios from "axios";
import { toast } from "react-toastify";
import getCookie from "../../api";
import Swal from "sweetalert2";

function AddBoilerSeriesPartsMappingMaster({
  setshowaddform,
  reload,
  setReload,
  triggerupdate,
  boilerseriespartsupdatedata,
}) {
  const [boilerSeriesPartsMappingData, setBoilerSeriesPartsMappingData] =
    useState({
      Head: triggerupdate ? boilerseriespartsupdatedata?.head : "",
      SeriesCode: triggerupdate ? boilerseriespartsupdatedata?.seriesCode : "",
      Description: triggerupdate
        ? boilerseriespartsupdatedata?.description
        : "",
    });

  const [boilerData, setBoilerData] = useState([]);
  const [boilerSeriesData, setBoilerSeriesData] = useState([]);
  const [partsData, setPartsData] = useState([]);
  const [partsSelected, setPartsSelected] = useState(
    triggerupdate ? boilerseriespartsupdatedata?.parts?.split(",") || [] : []
  );
  const [showclonepopup, setshowclonepopup] = useState(false);
  const [boilersFromMapper, setBoilersFromMapper] = useState([]);
  const [boilerSeriesFromMapper, setBoilerSeriesFromMapper] = useState([]);
  const [boilerPartsMapperCloneData, setBoilerPartsMapperCloneData] = useState({
    BoilerHead: "",
    SeriesCode: "",
  });

  useEffect(() => {
    if (triggerupdate) {
      fetchboilerserieshead(boilerSeriesPartsMappingData.Head);
    }
  }, [triggerupdate]);

  function handleSubmit(e) {
    e.preventDefault();

    if (triggerupdate) {
      const URL = `${process.env.REACT_APP_API_URL}/api/v1/BoilerPartsMapper/UpdateBoilerPartsMapper`;
      axios
        .put(
          URL,
          {
            id: boilerseriespartsupdatedata.id,
            Head: boilerSeriesPartsMappingData.Head,
            SeriesCode: boilerSeriesPartsMappingData.SeriesCode,
            Description: boilerSeriesPartsMappingData.Description,
            Parts: partsSelected.map((item) => item).join(","),
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message, {
            position: "bottom-center",
          });
          setshowaddform(false);
          setReload(!reload);
        })
        .catch((error) => {
          console.log(error);
          if (error.status === 500) {
            Swal.fire({
              title: "Errors Occured",
              text: error.response.data.error,
              icon: "error",
            });
          } else {
            toast.error("Failed to Update Record", {
              position: "bottom-center",
            });
          }
        });
    } else {
      const URL = `${process.env.REACT_APP_API_URL}/api/v1/BoilerPartsMapper`;
      axios
        .post(
          URL,
          {
            Head: boilerSeriesPartsMappingData.Head,
            SeriesCode: boilerSeriesPartsMappingData.SeriesCode,
            Description: boilerSeriesPartsMappingData.Description,
            Parts: partsSelected.map((item) => item).join(","),
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);

          toast.success("Record Added Successfully", {
            position: "bottom-center",
          });
          setshowaddform(false);
          setReload(!reload);
        })
        .catch((error) => {
          console.log(error);
          if (error.status === 500) {
            Swal.fire({
              title: "Errors Occured",
              text: error.response.data.error,
              icon: "error",
            });
          } else {
            toast.error("Failed to Add Record", {
              position: "bottom-center",
            });
          }
        });
    }
  }

  useEffect(() => {
    console.log(boilerseriespartsupdatedata);
    console.log(partsSelected);
  }, []);

  useEffect(() => {
    const URL = `${process.env.REACT_APP_API_URL}/api/v1/Boiler`;
    axios
      .get(URL, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setBoilerData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching boiler data:", error);
      });
  }, []);

  function fetchboilerserieshead(boilerhead) {
    const url = `${process.env.REACT_APP_API_URL}/api/v1/BoilerSeries/GetBoilerSeriesByIdOrheadOrSeriesCode?Head=${boilerhead}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setBoilerSeriesData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const URL = `${process.env.REACT_APP_API_URL}/api/v1/Parts`;
    axios
      .get(URL, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPartsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/api/v1/BoilerPartsMapper/GetAllBoilersFromBoilerPartsMapper`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setBoilersFromMapper(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const seriesurl = `${process.env.REACT_APP_API_URL}/api/v1/BoilerPartsMapper/GetAllSeriesFromBoilerPartsMapper`;
    axios
      .get(seriesurl, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setBoilerSeriesFromMapper(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [showclonepopup]);
  return (
    <form
      className="add-boiler-series-parts-mapping-master"
      onSubmit={handleSubmit}
    >
      <blockquote>
        <label>Boiler Head</label>
        <select
          onChange={(e) => {
            setBoilerSeriesPartsMappingData({
              ...boilerSeriesPartsMappingData,
              Head: e.target.value,
            });
            fetchboilerserieshead(e.target.value);
          }}
          required
        >
          <option value="">Select Boiler Head</option>
          {boilerData.map((boiler, index) => (
            <option
              key={index}
              value={boiler.head}
              selected={boilerSeriesPartsMappingData.Head === boiler.head}
            >
              {boiler.head}
            </option>
          ))}
        </select>
      </blockquote>
      <blockquote>
        <label>Series Id</label>
        <select
          onChange={(e) => {
            setBoilerSeriesPartsMappingData({
              ...boilerSeriesPartsMappingData,
              SeriesCode: e.target.value,
            });
          }}
          required
        >
          <option value="">Select Boiler Series</option>
          {boilerSeriesData.map((boilerseries, index) => (
            <option
              key={index}
              value={boilerseries.seriesCode}
              selected={
                boilerSeriesPartsMappingData.SeriesCode ===
                boilerseries.seriesCode
              }
            >
              {`${boilerseries.head} (${boilerseries.seriesCode})`}
            </option>
          ))}
        </select>
      </blockquote>

      <blockquote>
        <label>Description</label>
        <textarea
          rows={5}
          required
          placeholder="Enter Description (Maximum 200 Characters)"
          onChange={(e) =>
            setBoilerSeriesPartsMappingData({
              ...boilerSeriesPartsMappingData,
              Description: e.target.value,
            })
          }
          onInput={(e) => (e.target.value = e.target.value.slice(0, 200))}
          value={boilerSeriesPartsMappingData.Description}
        ></textarea>
      </blockquote>
      <blockquote>
        <label>Display All Parts</label>
        <blockquote
          id="partsCheckboxesinBoilerSeriesPartsMapping"
          style={{ overflowY: "scroll", maxHeight: "200px" }}
        >
          {partsData.map((part) => (
            <mark>
              {part.name}
              <input
                type="checkbox"
                value={part.name}
                onChange={(e) => {
                  setPartsSelected((prev) => {
                    const arr = [...prev];
                    if (e.target.checked) {
                      arr.push(e.target.value);
                    } else {
                      return arr.filter((x) => x !== e.target.value);
                    }
                    return arr;
                  });
                }}
                checked={partsSelected.includes(part.name)}
              />
            </mark>
          ))}
        </blockquote>
      </blockquote>
      <blockquote style={{ flexDirection: "row" }}>
        <button type="submit">{triggerupdate ? "Update" : "Add"} </button>
        <button type="button" onClick={() => setshowclonepopup(true)}>
          Clone
        </button>
      </blockquote>
      <CloseForm close={setshowaddform} />
      {showclonepopup && (
        <div className="clone-boiler-series-part-mapping">
          <blockquote>
            <label>Boiler Head</label>
            <select
              onChange={(e) =>
                setBoilerPartsMapperCloneData({
                  ...boilerPartsMapperCloneData,
                  BoilerHead: e.target.value,
                })
              }
            >
              <option value="">Select Boiler Head</option>
              {boilersFromMapper.map((boilerfrommapper, index) => (
                <option key={index} value={boilerfrommapper}>
                  {boilerfrommapper}
                </option>
              ))}
            </select>
          </blockquote>
          <blockquote>
            <label>Boiler Series</label>
            <select
              onChange={(e) =>
                setBoilerPartsMapperCloneData({
                  ...boilerPartsMapperCloneData,
                  SeriesCode: e.target.value,
                })
              }
            >
              <option value="">Select Boiler Series</option>
              {boilerSeriesFromMapper.map((seriesfromMapper, index) => (
                <option key={index} value={seriesfromMapper}>
                  {seriesfromMapper}
                </option>
              ))}
            </select>
          </blockquote>
          <blockquote style={{ flexDirection: "row" }}>
            <button
              type="button"
              onClick={() => {
                const url = `${process.env.REACT_APP_API_URL}/api/v1/BoilerPartsMapper/GetAllPartsByBoilersAndSeries?boiler=${boilerPartsMapperCloneData.BoilerHead}&series=${boilerPartsMapperCloneData.SeriesCode}`;
                axios
                  .get(url, {
                    headers: {
                      Authorization: `Bearer ${getCookie("token")}`,
                    },
                  })
                  .then((res) => {
                    console.log(res.data);
                    setPartsSelected((prev) => {
                      const arr = [...prev];
                      if (Array.isArray(res.data)) {
                        res.data[0].split(",").forEach((part) => {
                          if (!arr.includes(part)) {
                            arr.push(part);
                          }
                        });
                      }
                      return arr;
                    });
                    setshowclonepopup(false);
                  })
                  .catch((err) => {
                    toast.error(err.response.data, {
                      position: "bottom-center",
                    });
                    console.log(err);
                  });
              }}
            >
              Submit
            </button>
            <button type="button" onClick={() => setshowclonepopup(false)}>
              Close
            </button>
          </blockquote>
        </div>
      )}
    </form>
  );
}

export default AddBoilerSeriesPartsMappingMaster;
