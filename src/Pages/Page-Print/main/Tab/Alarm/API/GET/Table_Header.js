import axios from "axios";

export const Table_Header = async (params) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_IP_API}${
        import.meta.env.VITE_Table_smt_print_alarm_log
      }/Table_Header`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Error requesting API:", error);
    throw error;
  }
};
