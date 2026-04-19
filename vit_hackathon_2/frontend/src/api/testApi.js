import { apiFetch } from "./http";
import { getAuthHeader } from "../utils/helpers";

export const testApi = {
  async submitTypingTest(data) {
    return apiFetch("/alphabet/test/typing", {
      method: "POST",
      headers: {
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
  },
};
