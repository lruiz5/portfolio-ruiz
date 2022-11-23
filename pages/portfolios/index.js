import Link from "next/link";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetUser } from "@/actions/user";
import PortfolioApi from "@/lib/api/portfolios";
import { Row, Col } from "reactstrap";
import PortfolioCard from "@/components/PortfolioCard";

const Portfolios = ({ portfolios }) => {
  const { data: user, loading } = useGetUser();

  return (
    <>
      <BaseLayout user={user} loading={loading}>
        <BasePage header="Portfolios" className="portfolio-page">
          <Row>
            {portfolios.map((portfolio) => (
              <Col key={portfolio._id} md="4">
                <PortfolioCard portfolio={portfolio} />
              </Col>
            ))}
          </Row>
        </BasePage>
      </BaseLayout>
    </>
  );
};

//function called during buildtime
//creates a static page with dynamic data
export async function getStaticProps() {
  const json = await new PortfolioApi().getAll();

  const portfolios = json.data;
  return {
    props: {
      portfolios,
    },
  };
}

export default Portfolios;
