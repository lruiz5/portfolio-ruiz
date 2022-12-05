import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import withAuth from "@/hoc/withAuth";
import { Row, Col } from "reactstrap";
import PortfolioForm from "@/components/PortfolioForm";
import { useCreatePortfolio } from "@/actions/portfolios";
import Redirect from "@/components/shared/Redirect";

const PortfolioCreate = ({ user, loading: userLoading }) => {
  const [
    createPortfolio,
    { data: portfolioData, loading: portfolioLoading, error: portfolioError },
  ] = useCreatePortfolio();

  if (portfolioData) {
    return <Redirect to="/portfolios" />;
  }

  return (
    <>
      <BaseLayout user={user} loading={userLoading}>
        <BasePage header="Create Portfolio">
          <Row>
            <Col md="8">
              <PortfolioForm onSubmit={createPortfolio} />
              {portfolioError && (
                <div className="alert alert-danger mt-2">{portfolioError}</div>
              )}
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    </>
  );
};

export default withAuth(PortfolioCreate)("guest");
