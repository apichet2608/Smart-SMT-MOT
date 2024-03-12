import { useEffect, useState } from "react";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";

//!Components
import StackChart from "./components/StackChart";
import FilterSelect from "./components/FilterSelect";
import Table from "./components/Table";
import DialogAddNote from "./components/DialogAddNote";
import FilterDate from "./components/FilterDate";

//!Icons
import NoteAltTwoToneIcon from "@mui/icons-material/NoteAltTwoTone";

function PickupRate() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //!States
  //*Option for filters
  const [programNameOptions, setProgramNameOptions] = useState([]);
  const [machineCodeOptions, setMachineCodeOptions] = useState([]);
  const [lineOptions, setLineOptions] = useState([]);

  //*Selected option
  const [selectedProgramName, setSelectedProgramName] = useState("");
  const [selectedMachineCode, setSelectedMachineCode] = useState("");
  const [selectedLine, setSelectedLine] = useState("");

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate()); // Subtract 1 day
  const formattedCurrentDate = currentDate.toISOString().split("T")[0];

  const [selectedToDate, setSelectedToDate] = useState(formattedCurrentDate);

  const fromDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
  const formattedFromDate = fromDate.toISOString().split("T")[0];

  const [selectedFromDate, setSelectedFromDate] = useState(formattedFromDate);

  console.log("selectedFromDate", selectedFromDate);
  console.log("selectedToDate", selectedToDate);

  //*Dialog
  const [openAddNoteDialog, setOpenAddNoteDialog] = useState(false);

  //*Note
  const [putId, setPutId] = useState([]);
  const [note, setNote] = useState("");

  //!Get API
  //*Get Option
  //?Line
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_IP_API}/${
          import.meta.env.VITE_Pickup_Rate
        }/get_sum_error_table?startDate=${selectedFromDate}&endDate=${selectedToDate}`
      )
      .then((res) => {
        const data = res.data;
        const line = data.map((item) => item.line);
        const distinctLine = [...new Set(line)];
        setLineOptions(distinctLine);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedFromDate, selectedToDate]);

  //?Machine Code
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_IP_API}/${
          import.meta.env.VITE_Pickup_Rate
        }/get_sum_error_table?line=${selectedLine}&startDate=${selectedFromDate}&endDate=${selectedToDate}`
      )
      .then((res) => {
        const data = res.data;
        const machineCode = data.map((item) => item.mc_code);
        const distinctMachineCode = [...new Set(machineCode)];
        setMachineCodeOptions(distinctMachineCode);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedLine, selectedFromDate, selectedToDate]);

  //?Program Name
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_IP_API}/${
          import.meta.env.VITE_Pickup_Rate
        }/get_sum_error_table?startDate=${selectedFromDate}&endDate=${selectedToDate}&line=${selectedLine}&mc_code=${selectedMachineCode}`
      )
      .then((res) => {
        const data = res.data;
        const programName = data.map((item) => item.program_name);
        const distinctProgramName = [...new Set(programName)];
        setProgramNameOptions(distinctProgramName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedFromDate, selectedToDate, selectedLine, selectedMachineCode]);

  //*Get Data Chart&Table
  const [rows, setRows] = useState([]);
  const columns = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   headerAlign: "center",
    //   align: "center",
    //   width: 60,
    // },
    {
      field: "interval_start_time",
      headerName: "Interval Start Time",
      headerAlign: "center",
      width: 150,
      align: "center",
      renderCell: (params) => {
        return new Date(params.row.interval_start_time).toLocaleString();
      },
    },
    {
      field: "interval_stop_time",
      headerName: "Interval Stop Time",
      headerAlign: "center",
      width: 150,
      align: "center",
      renderCell: (params) => {
        return new Date(params.row.interval_stop_time).toLocaleString();
      },
    },
    {
      field: "line",
      headerName: "Line",
      headerAlign: "center",
      align: "center",
      width: 75,
    },
    {
      field: "mc_code",
      headerName: "MC Code",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
    {
      field: "program_name",
      headerName: "Program Name",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "count_pickup_error",
      headerName: "Pickup",
      headerAlign: "center",
      align: "center",
      width: 70,
    },
    {
      field: "count_recog_error",
      headerName: "Recog",
      headerAlign: "center",
      align: "center",
      width: 70,
    },
    {
      field: "count_error",
      headerName: "Err",
      headerAlign: "center",
      align: "center",
      width: 70,
    },
    {
      field: "input",
      headerName: "input",
      headerAlign: "center",
      align: "center",
      width: 70,
    },
    {
      field: "pickup_error_ppm",
      headerName: "Pickup Err",
      headerAlign: "center",
      align: "center",
      width: 100,
      renderCell: (params) => {
        return <>{params.row.pickup_error_ppm} PPM</>;
      },
    },
    {
      field: "recog_error_ppm",
      headerName: "Recog Err",
      headerAlign: "center",
      align: "center",
      width: 100,
      renderCell: (params) => {
        return <>{params.row.recog_error_ppm} PPM</>;
      },
    },
    {
      field: "sum_ppm",
      headerName: "Sum PPM",
      headerAlign: "center",
      align: "center",
      width: 100,
      renderCell: (params) => {
        return <>{params.row.sum_ppm} PPM</>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      width: 75,
      renderCell: (params) => {
        return (
          <>
            <div
              className={`font-bold ${
                params.value === "alarm"
                  ? "text-error"
                  : params.value === "warning"
                  ? "text-warning"
                  : ""
              }`}
            >
              {params.value}
            </div>
          </>
        );
      },
    },
    {
      field: "note",
      headerName: "Note",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "action_add_note",
      headerName: "Add Note",
      headerAlign: "center",
      align: "center",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="flex justify-center active:scale-90 duration-300">
            <button
              onClick={() => {
                setOpenAddNoteDialog(true);
                setPutId(params.row.id);
                setNote(params.row.note);
              }}
              className="text-info hover:text-warning duration-300 font-bold"
            >
              <NoteAltTwoToneIcon />
              Note
            </button>
          </div>
        );
      },
    },
  ];

  const [category, setCategory] = useState([]);
  const [pickupErrPpmSeries, setPickupErrPpmSeries] = useState([]);
  const [recogErrPpmSeries, setRecogErrPpmSeries] = useState([]);

  //!Handle
  //*Search
  const handleSearch = () => {
    axios
      .get(
        `${import.meta.env.VITE_IP_API}/${
          import.meta.env.VITE_Pickup_Rate
        }/get_sum_error_table?program_name=${selectedProgramName}&machine_code=${selectedMachineCode}&line=${selectedLine}&startDate=${selectedFromDate}&endDate=${selectedToDate}`
      )
      .then((res) => {
        // console.log("res", res.data);
        setRows(res.data);
        axios
          .get(
            `${import.meta.env.VITE_IP_API}/${
              import.meta.env.VITE_Pickup_Rate
            }/get_sum_error_chart?program_name=${selectedProgramName}&machine_code=${selectedMachineCode}&line=${selectedLine}&startDate=${selectedFromDate}&endDate=${selectedToDate}`
          )
          .then((res) => {
            // console.log("res", res.data);
            setCategory(res.data.map((item) => item.interval_stop_time));
            setPickupErrPpmSeries(
              res.data.map((item) => item.pickup_error_ppm)
            );
            setRecogErrPpmSeries(res.data.map((item) => item.recog_error_ppm));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //*Reset
  const handleReset = () => {
    setSelectedProgramName("");
    setSelectedMachineCode("");
    setSelectedLine("");
    setSelectedFromDate(formattedFromDate);
    setSelectedToDate(formattedCurrentDate);

    axios
      .get(
        `${import.meta.env.VITE_IP_API}/${
          import.meta.env.VITE_Pickup_Rate
        }/get_sum_error_table?program_name=""&machine_code=""&line=""`
      )
      .then((res) => {
        console.log("res", res.data);
        setRows(res.data);
        setCategory(res.data.map((item) => item.interval_stop_time));
        setPickupErrPpmSeries(res.data.map((item) => item.pickup_error_ppm));
        setRecogErrPpmSeries(res.data.map((item) => item.recog_error_ppm));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("putId", putId);

  //*Add Note
  const handleAddNote = () => {
    const putNoteUrl = `${import.meta.env.VITE_IP_API}/${
      import.meta.env.VITE_Pickup_Rate
    }/put_note`;
    const puTNoteBody = {
      id: putId,
      note: note,
    };
    console.log("puTNoteBody", puTNoteBody);
    axios
      .put(putNoteUrl, puTNoteBody)
      .then((res) => {
        console.log("res", res);
        handleSearch();
        enqueueSnackbar("Update Note Success", { variant: "success" });
        setOpenAddNoteDialog(false);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Update Note Failed", { variant: "error" });
      });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-2">
        <div className="flex gap-2">
          <FilterDate
            idLabel="From Date"
            value={selectedFromDate}
            setValue={setSelectedFromDate}
            formattedDate={formattedFromDate}
          />
          <div className="my-auto">-</div>
          <FilterDate
            idLabel="To Date"
            value={selectedToDate}
            setValue={setSelectedToDate}
            formattedDate={formattedCurrentDate}
          />
        </div>
        <div className="grid grid-cols-5 gap-2">
          <FilterSelect
            options={lineOptions}
            value={selectedLine}
            setValue={setSelectedLine}
            dependentValue={[setSelectedMachineCode, setSelectedProgramName]}
            label={"Line"}
          />
          <FilterSelect
            options={machineCodeOptions}
            value={selectedMachineCode}
            setValue={setSelectedMachineCode}
            dependentValue={[setSelectedProgramName]}
            label={"Machine Code"}
          />
          <FilterSelect
            options={programNameOptions}
            value={selectedProgramName}
            setValue={setSelectedProgramName}
            dependentValue={[]}
            label={"Program Name"}
          />

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleSearch}
              className={`btn btn-info my-auto text-white ${
                selectedProgramName && selectedMachineCode && selectedLine
                  ? "block"
                  : "hidden"
              }`}
            >
              Search
            </button>
            <button
              onClick={handleReset}
              className="btn btn-warning my-auto text-white"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <StackChart
            category={category}
            pickupErrPpmSeries={pickupErrPpmSeries}
            recogErrPpmSeries={recogErrPpmSeries}
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Table rows={rows} columns={columns} />
        </div>
        <DialogAddNote
          open={openAddNoteDialog}
          setOpen={setOpenAddNoteDialog}
          note={note}
          setNote={setNote}
          handleAddNote={handleAddNote}
        />
      </div>
    </>
  );
}

export default PickupRate;
