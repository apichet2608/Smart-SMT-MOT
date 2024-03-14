import { useState, useEffect } from "react";
import axios from "axios";

//! Compoenents
import FilterSelect from "./components/FilterSelect";
import Table from "./components/Table";

function AlarmTamura() {
  //! State

  //* Loading
  const [isLoading, setIsLoading] = useState(false);

  //* Filter
  const [selectedLine, setSelectedLine] = useState("");
  const [selectedMachineCode, setSelectedMachineCode] = useState("");

  const [lineOptions, setLineOptions] = useState([]);
  const [machineCodeOptions, setMachineCodeOptions] = useState([]);

  //* Table
  const [rows, setRows] = useState([]);

  const renderDateTime = (params) => {
    return new Date(params.value).toLocaleString();
  };

  const columns = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   headerAlign: "center",
    //   align: "center",
    //   width: 100,
    // },
    {
      field: "line",
      headerName: "Line",
      headerAlign: "center",
      align: "center",
      width: 70,
    },
    {
      field: "machine_code",
      headerName: "Machine Code",
      headerAlign: "center",
      align: "center",
      width: 150,
    },

    {
      field: "alarm",
      headerName: "Alarm",
      headerAlign: "center",
      align: "center",
      width: 250,
    },
    {
      field: "operation",
      headerName: "Operation",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "product",
      headerName: "Product",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "start_alarm_datetime",
      headerName: "Start Alarm Datetime",
      headerAlign: "center",
      align: "center",
      width: 180,
      renderCell: renderDateTime,
    },
    {
      field: "stop_alarm_datetime",
      headerName: "Stop Alarm Datetime",
      headerAlign: "center",
      align: "center",
      width: 180,
      renderCell: renderDateTime,
    },
  ];

  //! Fetch Data
  //* Filter
  //? Line
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_IP_API}/${
          import.meta.env.VITE_ALARM_TAMURA
        }/get_alarm_table_tamura`
      )
      .then((res) => {
        const data = res.data;
        const lineOptions = data.map((item) => {
          return item.line;
        });

        const uniqueLineOptions = [...new Set(lineOptions)];
        setLineOptions(uniqueLineOptions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //? Machine Code
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_IP_API}/${
          import.meta.env.VITE_ALARM_TAMURA
        }/get_alarm_table_tamura?line=${selectedLine}`
      )
      .then((res) => {
        const data = res.data;
        const machineCodeOptions = data.map((item) => {
          return item.machine_code;
        });

        const uniqueMachineCodeOptions = [...new Set(machineCodeOptions)];
        setMachineCodeOptions(uniqueMachineCodeOptions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedLine]);

  //* Table
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_IP_API}/${
          import.meta.env.VITE_ALARM_TAMURA
        }/get_alarm_table_tamura?line=${selectedLine}&machine_code=${selectedMachineCode}`
      )
      .then((res) => {
        const data = res.data;
        setRows(data);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedLine, selectedMachineCode]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-4 gap-4">
          <FilterSelect
            label="Line"
            options={lineOptions}
            value={selectedLine}
            setValue={setSelectedLine}
            dependentValue={[setSelectedMachineCode]}
          />
          <FilterSelect
            label="Machine Code"
            options={machineCodeOptions}
            value={selectedMachineCode}
            setValue={setSelectedMachineCode}
            dependentValue={[]}
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 my-56 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <Table rows={rows} columns={columns} />
        )}
      </div>
    </>
  );
}

export default AlarmTamura;
