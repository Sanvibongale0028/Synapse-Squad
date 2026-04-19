import { apiFetch } from "./http";
import { getAuthHeader } from "../utils/helpers";

export const reportApi = {
  async getReport() {
    return apiFetch("/alphabet/report", {
      method: "GET",
      headers: {
        ...getAuthHeader(),
      },
    });
  },
};
