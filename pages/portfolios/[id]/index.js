import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useRouter } from "next/router";
import { useGetUser } from "@/actions/user";
import PortfolioApi from "@/lib/api/portfolios";
import Link from "next/link";
import { formatDate } from "helpers/functions";

const PortfolioDetail = ({ portfolio }) => {
  const router = useRouter();
  const { data: user, loading } = useGetUser();

  return (
    <>
      <BaseLayout navClass="transparent" user={user} loading={loading}>
        <BasePage
          indexPage
          noWrapper
          metaTitle={`${portfolio.title} - Luis Ruiz`}
          metaDescription={portfolio.description}
        >
          <div className="portfolio-detail">
            <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
              <main role="main" class="inner page-cover">
                <h1 class="cover-heading">{portfolio.title}</h1>
                <p class="lead dates">{`${formatDate(portfolio.startDate)} - ${
                  formatDate(portfolio.endDate) || "Present"
                }`}</p>
                <p class="lead info mb-0">
                  {portfolio.jobTitle} | {portfolio.company} |{" "}
                  {portfolio.location}
                </p>
                <p class="lead">{portfolio.description}</p>
                <p class="lead">
                  <Link
                    href={portfolio.companyWebsite}
                    class="btn btn-lg btn-secondary"
                    target={"_blank"}
                  >
                    Visit Company
                  </Link>
                </p>
              </main>
            </div>
          </div>
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
