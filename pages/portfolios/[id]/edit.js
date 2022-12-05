import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import withAuth from "@/hoc/withAuth";
import { Row, Col } from "reactstrap";
import { useRouter } from "next/router";
import { useGetPortfolio } from "@/actions/portfolios";
import PortfolioForm from "@/components/PortfolioForm";

const PortfolioEdit = ({ user }) => {
  const router = useRouter();
  const { data } = useGetPortfolio(router.query.id);
  return (
    <>
      <BaseLayout user={user} loading={false}>
        <BasePage header="Portfolio Edit">
          <Row>
            <Col md="8">
              {data && (
                <PortfolioForm
                  onSubmit={(data) => alert(JSON.stringify(data))}
                  initialData={data}
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

export default withAuth(PortfolioEdit)("guest");
