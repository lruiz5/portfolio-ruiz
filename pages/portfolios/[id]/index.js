import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetUser } from "@/actions/user";
import PortfolioApi from "@/lib/api/portfolios";
import Link from "next/link";
import { formatDate } from "helpers/functions";

const PortfolioDetail = ({
  portfolio = {
    _id: "abc123",
    title: "Default Title",
    company: "Default Co.",
    companyWebsite: "https://www.google.com",
    location: "USA",
    jobTitle: "Default Job Title",
    description: "Default description",
    startDate: "2023-01-01T00:00:00.000Z",
    endDate: "2023-12-01T00:00:00.000Z",
    userId: "123abc",
    createdAt: "2023-01-07T09:23:11.862Z",
  },
}) => {
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
            <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
              <main role="main" className="inner page-cover">
                <h1 className="cover-heading">{portfolio.title}</h1>
                <p className="lead dates">{`${formatDate(
                  portfolio.startDate
                )} - ${formatDate(portfolio.endDate) || "Present"}`}</p>
                <p className="lead info mb-0">
                  {portfolio.jobTitle} | {portfolio.company} |{" "}
                  {portfolio.location}
                </p>
                <p className="lead">{portfolio.description}</p>
                <p className="lead">
                  <Link
                    href={portfolio.companyWebsite}
                    className="btn btn-lg btn-secondary"
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

  return { props: { portfolio }, revalidate: 60 };
}
export default PortfolioDetail;
