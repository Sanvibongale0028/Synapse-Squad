import { apiFetch } from "./http";
import { getAuthHeader } from "../utils/helpers";

export const finalTestApi = {
  async getFinalTest() {
    return apiFetch("/alphabet/final-test", {
      method: "GET",
      headers: {
        ...getAuthHeader(),
      },
    });
  },

  async submitFinalTest(answers) {
    return apiFetch("/alphabet/final-test/submit", {
      method: "POST",
      headers: {
        ...getAuthHeader(),
      },
      body: JSON.stringify(answers),
    });
  },
};
