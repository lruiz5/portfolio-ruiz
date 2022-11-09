import axios from "axios";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetPostById } from "@/actions";
import { useRouter } from "next/router";
import { useGetUser } from "@/actions/user";

const PortfolioDetail = () => {
  const router = useRouter();
  const { data, error, loading: loadingData } = useGetPostById(router.query.id);
  const { data: user, loading } = useGetUser();

  return (
    <>
      <BaseLayout user={user} loading={loading}>
        <BasePage>
          {loadingData && <p>Loading Data...</p>}
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
