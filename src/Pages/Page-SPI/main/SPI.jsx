import { useState, useEffect } from "react";
import axios from "axios";

//!Components
import Table from "../components/Table";
import FilterSelect from "../components/FilterSelect";

function Spi() {
  const urlRealTime = `${import.meta.env.VITE_IP_API}/${
    import.meta.env.VITE_SPI_REAL_TIME
  }/get_real_time`;

  //!State
  //*Selection
  //?Selected
  const [selectedStation, setSelectedStation] = useState("");
  //?Options
  const [stationOptions, setStationOptions] = useState([]);

  //*Table
  const [rows, setRows] = useState([]);

  const renderDatetime = (params) => {
    return new Date(params.value).toLocaleString();
  };

  const columns = [
    // { field: "id", headerName: "ID", width: 100 },
    {
      field: "judgement",
      headerName: "Judgement",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div
            className={`w-full rounded-xl font-bold text-center ${
              params.value === "PASS"
                ? "bg-success text-white"
                : "bg-error text-white"
            }`}
          >
            {params.value}
          </div>
        );
      },
    },
    // {
    //   field: "create_at",
    //   headerName: "Created At",
    //   width: 150,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: renderDatetime,
    // },
    // {
    //   field: "site",
    //   headerName: "Site",
    //   width: 75,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "station_type",
    //   headerName: "Station Type",
    //   width: 100,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "product",
      headerName: "Product",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "test_result",
    //   headerName: "Test Result",
    //   width: 100,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "unit_serial_number",
      headerName: "Unit Serial Number",
      width: 210,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "uut_start",
    //   headerName: "UUT Start",
    //   width: 150,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: renderDatetime,
    // },
    {
      field: "uut_stop",
      headerName: "Update time",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: renderDatetime,
    },

    // {
    //   field: "limits_version",
    //   headerName: "Limits Version",
    //   width: 125,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "software_name",
    //   headerName: "Software Name",
    //   width: 125,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "software_version",
      headerName: "Software Version",
      width: 140,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "station_id",
      headerName: "Line",
      width: 210,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div
            className={`${selectedStation ? "font-bold text-blue-500" : ""}`}
          >
            {params.value}
          </div>
        );
      },
    },
    // {
    //   field: "fixture_id",
    //   headerName: "Fixture ID",
    //   width: 180,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "head_id",
    //   headerName: "Head ID",
    //   width: 75,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "test",
      headerName: "Test",
      width: 90,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "parameter_name",
      headerName: "Pin Type",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sub_test",
      headerName: "Pin No.",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sub_sub_test",
      headerName: "Comp name",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "upper_limit",
      headerName: "MC USL",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lower_limit",
      headerName: "MC LSL",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "value",
      headerName: "Value",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "units",
      headerName: "Units",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "usl",
      headerName: "USL",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lsl",
      headerName: "LSL",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
  ];

  //!Fetch data
  //*Options
  useEffect(() => {
    axios.get(urlRealTime).then((response) => {
      const data = response.data;
      const options = data.map((item) => item.station_id);
      const uniqueOptions = [...new Set(options)];
      setStationOptions(uniqueOptions);
    });
  }, []);

  //*Table data
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_IP_API}/${
          import.meta.env.VITE_SPI_REAL_TIME
        }/get_real_time?station_id=${selectedStation}`
      )
      .then((response) => {
        setRows(response.data);
      });
  }, [selectedStation]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-4 gap-4">
          <FilterSelect
            label="Station ID"
            options={stationOptions}
            value={selectedStation}
            setValue={setSelectedStation}
          />
          <button
            onClick={() => setSelectedStation("")}
            className="btn btn-warning my-auto w-fit"
          >
            Reset
          </button>
        </div>
        <div className="col-span-1 shadow-lg rounded-md">
          <Table rows={rows} columns={columns} />
        </div>
      </div>
    </>
  );
}

export default Spi;
