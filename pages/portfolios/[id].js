import axios from "axios";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetData } from "@/actions";
import { useRouter } from "next/router";

const PortfolioDetail = () => {
  const router = useRouter();
  const { data, error, loading } = useGetData(
    router.query.id ? `/api/v1/posts/${router.query.id}` : null
  );
  return (
    <>
      <BaseLayout>
        <BasePage>
          {loading && <p>Loading Data...</p>}
          {error && <div className="alert alert-danger">{error.message}</div>}
          {data && (
            <div>
              <h1>portfolio details</h1>
              <h2>{data.title}</h2>
              <p>{data.body}</p>
            </div>
          )}
        </BasePage>
      </BaseLayout>
    </>
  );
};

export default PortfolioDetail;
