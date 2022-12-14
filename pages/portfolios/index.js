import { useState } from "react";
import { useRouter } from "next/router";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetUser } from "@/actions/user";
import { useDeletePortfolio } from "@/actions/portfolios";
import PortfolioApi from "@/lib/api/portfolios";
import { Row, Col, Button } from "reactstrap";
import PortfolioCard from "@/components/PortfolioCard";
import { isAuthorized } from "@/utils/auth0";

const Portfolios = ({ portfolios: initialPortfolios }) => {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState(initialPortfolios);
  const [deletePortfolio, { data, error }] = useDeletePortfolio();
  const { data: user, loading } = useGetUser();

  const _deletePortfolio = async (e, portfolioId) => {
    e.stopPropagation();
    const isConfirm = confirm(
      "Are you sure you want to delete this portfolio?"
    );

    if (isConfirm) {
      await deletePortfolio(portfolioId);
      setPortfolios(
        portfolios.filter((portfolio) => portfolio._id !== portfolioId)
      );
    }
  };

  return (
    <>
      <BaseLayout user={user} loading={loading}>
        <BasePage
          header="Portfolios"
          className="portfolio-page"
          metaTitle="Published Works - Luis Ruiz"
        >
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
                      <Button
                        onClick={(e) => _deletePortfolio(e, portfolio._id)}
                        color="danger"
                      >
                        Delete
                      </Button>
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
    revalidate: 30,
  };
}

export default Portfolios;
