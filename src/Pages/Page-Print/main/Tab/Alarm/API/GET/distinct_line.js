import axios from "axios";

export const distinct_line = async (params) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_IP_API}${
        import.meta.env.VITE_Table_smt_print_alarm_log
      }/distinct_line_machine_machine`,
      params
    );
    return response.data;
  } catch (error) {
    console.error("Error requesting API:", error);
    throw error;
  }
};
