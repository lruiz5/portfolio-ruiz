import Link from "next/link";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetPosts } from "@/actions";
import { useGetUser } from "@/actions/user";

const Portfolios = () => {
  const { data, error, loading: loadingData } = useGetPosts();
  const { data: user, loading } = useGetUser();

  const renderPosts = (portfolios) => {
    return portfolios.map((portfolio) => (
      <li key={portfolio.id}>
        <Link href={`portfolios/${portfolio.id}`}>{portfolio.title}</Link>
      </li>
    ));
  };
  return (
    <>
      <BaseLayout user={user} loading={loading}>
        <BasePage>
          <h1>Portfolios Page</h1>
          {loadingData && <p>Loading Data...</p>}
          {data && <ul>{renderPosts(data)}</ul>}
          {error && <div className="alert alert-danger">{error.message}</div>}
        </BasePage>
      </BaseLayout>
    </>
  );
};

export default Portfolios;
