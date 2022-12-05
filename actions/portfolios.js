import axios from "axios";
import useSWR from "swr";
import { fetcher } from "@/actions";
import { useApiHandler } from "@/actions";

function createPortfolio(data) {
  return axios.post("/api/v1/portfolios", data);
}

export const useCreatePortfolio = () => useApiHandler(createPortfolio);

export const useGetPortfolio = (id) => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/v1/portfolios/${id}` : null,
    fetcher
  );

  return { data, error, loading: !data && !error, ...rest };
};
