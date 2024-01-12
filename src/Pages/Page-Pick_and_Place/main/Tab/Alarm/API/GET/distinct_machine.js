import axios from "axios";

export const distinct_machine = async (params) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_IP_API}${
        import.meta.env.VITE_Table_smt_mount_program_log_header
      }/distinct_machine`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Error requesting API:", error);
    throw error;
  }
};
