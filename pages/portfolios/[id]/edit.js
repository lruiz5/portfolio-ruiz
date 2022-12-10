import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import withAuth from "@/hoc/withAuth";
import { Row, Col } from "reactstrap";
import { useRouter } from "next/router";
import { useGetPortfolio, useUpdatePortfolio } from "@/actions/portfolios";
import PortfolioForm from "@/components/PortfolioForm";
import { toast } from "react-toastify";

const PortfolioEdit = ({ user }) => {
  const router = useRouter();
  const [updatePortfolio, { error }] = useUpdatePortfolio();
  const { data: initialPortfolioData } = useGetPortfolio(router.query.id);

  const _updatePortfolio = async (data) => {
    try {
      await updatePortfolio(router.query.id, data);
      toast.success("Portfolio has been updated.", { autoClose: 2500 });
    } catch (error) {
      toast.error(error, { autoClose: false });
    }
  };
  return (
    <>
      <BaseLayout user={user} loading={false}>
        <BasePage header="Portfolio Edit">
          <Row>
            <Col md="8">
              {initialPortfolioData && (
                <PortfolioForm
                  onSubmit={_updatePortfolio}
                  initialData={initialPortfolioData}
                />
              )}
            </Col>
          </Row>
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

export default withAuth(PortfolioEdit)("admin");
