import { useRouter } from "next/router";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetUser } from "@/actions/user";
import PortfolioApi from "@/lib/api/portfolios";
import { Row, Col, Button } from "reactstrap";
import PortfolioCard from "@/components/PortfolioCard";
import { isAuthorized } from "@/utils/auth0";

const Portfolios = ({ portfolios }) => {
  const router = useRouter();
  const { data: user, loading } = useGetUser();

  return (
    <>
      <BaseLayout user={user} loading={loading}>
        <BasePage header="Portfolios" className="portfolio-page">
          <Row>
            {portfolios.map((portfolio) => (
              <Col
                key={portfolio._id}
                onClick={() => {
                  router.push(
                    "/portfolios/[id]",
                    `/portfolios/${portfolio._id}`
                  );
                }}
                md="4"
              >
                <PortfolioCard portfolio={portfolio}>
                  {user && isAuthorized(user, "admin") && (
                    <>
                      <Button
                        className="mx-2"
                        color="warning"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            "/portfolios/[id]/edit",
                            `/portfolios/${portfolio._id}/edit`
                          );
                        }}
                      >
                        Edit
                      </Button>
                      <Button color="danger">Delete</Button>
                    </>
                  )}
                </PortfolioCard>
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
