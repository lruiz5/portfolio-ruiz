import Link from "next/link";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetData } from "@/actions";

const Portfolios = () => {
  const { data, error, loading } = useGetData("/api/v1/posts");
  const renderPosts = (portfolios) => {
    return portfolios.map((portfolio) => (
      <li key={portfolio.id}>
        <Link href={`portfolios/${portfolio.id}`}>{portfolio.title}</Link>
      </li>
    ));
  };
  return (
    <>
      <BaseLayout>
        <BasePage>
          <h1>Portfolios Page</h1>
          {loading && <p>Loading Data...</p>}
          {data && <ul>{renderPosts(data)}</ul>}
          {error && <div className="alert alert-danger">{error.message}</div>}
        </BasePage>
      </BaseLayout>
    </>
  );
};

export default Portfolios;
