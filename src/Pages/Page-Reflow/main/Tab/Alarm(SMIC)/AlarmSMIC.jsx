import { useState, useEffect } from "react";
import axios from "axios";

//! Compoenents
import FilterSelect from "./components/FilterSelect";
import Table from "./components/Table";

function AlarmSMIC() {
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
    {
      field: "line",
      headerName: "Line",
      headerAlign: "center",
      align: "center",
      width: 70,
    },
    {
      field: "machine_code",
      headerName: "MC Code",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "alarm_state1",
      headerName: "Alarm State 1",
      headerAlign: "center",
      width: 250,
    },
    {
      field: "alarm_state2",
      headerName: "Alarm State 2",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "alarm_state3",
      headerName: "Alarm State 3",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "alarm_state4",
      headerName: "Alarm State 4",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "alarm_state5",
      headerName: "Alarm State 5",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "alarm_state6",
      headerName: "Alarm State 6",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "alarm_state7",
      headerName: "Alarm State 7",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "alarm_state8",
      headerName: "Alarm State 8",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "alarm_state9",
      headerName: "Alarm State 9",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "alarm_state10",
      headerName: "Alarm State 10",
      headerAlign: "center",
      width: 200,
    },
  ];

  //! Fetch Data
  //* Filter
  //? Line
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_IP_API}/${
          import.meta.env.VITE_ALARM_SMIC
        }/get_alarm_table_smic`
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
          import.meta.env.VITE_ALARM_SMIC
        }/get_alarm_table_smic?line=${selectedLine}`
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
          import.meta.env.VITE_ALARM_SMIC
        }/get_alarm_table_smic?line=${selectedLine}&machine_code=${selectedMachineCode}`
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

export default AlarmSMIC;
