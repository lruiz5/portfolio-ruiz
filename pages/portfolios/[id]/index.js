import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useRouter } from "next/router";
import { useGetUser } from "@/actions/user";
import PortfolioApi from "@/lib/api/portfolios";

const PortfolioDetail = ({ portfolio }) => {
  const router = useRouter();
  const { data: user, loading } = useGetUser();

  return (
    <>
      <BaseLayout user={user} loading={loading}>
        <BasePage header="Portfolio Details">
          {JSON.stringify(portfolio)}
        </BasePage>
      </BaseLayout>
    </>
  );
};

/* export async function getServerSideProps({ query }) {
  const json = await new PortfolioApi().getById(query.id);
  const portfolio = json.data;

  return { props: { portfolio } };
} */

//this function is executed at build time
export async function getStaticPaths() {
  const json = await new PortfolioApi().getAll();

  const portfolios = json.data;

  //get paths to prerender based on portfolio id
  const paths = portfolios.map((portfolio) => {
    return { params: { id: portfolio._id } };
  });

  //fallback: false means unresolved paths return 404 page.
  return {
    paths,
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  const json = await new PortfolioApi().getById(params.id);
  const portfolio = json.data;

  return { props: { portfolio }, revalidate: 5 };
}
export default PortfolioDetail;
