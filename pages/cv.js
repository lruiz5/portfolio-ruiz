import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetUser } from "@/actions/user";
import { Row, Col } from "reactstrap";
const CV = () => {
  const { data: user, loading } = useGetUser();
  return (
    <>
      <BaseLayout user={user} loading={loading}>
        <BasePage>
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <iframe
                style={{ width: "100%", height: "800px" }}
                src="/cvsamples.pdf"
              />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    </>
  );
};

export default CV;
