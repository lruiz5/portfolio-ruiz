import { useState } from "react";
import axios from "axios";

export const fetcher = (url) =>
  fetch(url).then(async (res) => {
    const result = await res.json();

    if (res.status !== 200) {
      return Promise.reject(result);
    } else {
      return result;
    }
  });

function createPortfolio(data) {
  return axios.post("/api/v1/portfolios", data);
}

export function useApiHandler(apiCall) {
  const [reqState, setReqState] = useState({
    error: null,
    data: null,
    loading: false,
  });
  const handler = async (...data) => {
    setReqState({ error: null, data: null, loading: true });
    try {
      const json = await apiCall(...data);
      setReqState({ error: null, data: json.data, loading: false });
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        "Oops, something went wrong...";
      setReqState({ error: message, data: null, loading: false });
    }
  };

  return [handler, { ...reqState }];
}
