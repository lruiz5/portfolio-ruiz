import { Button, Container } from "reactstrap";
import BaseLayout from "../components/layouts/BaseLayout";

const Home = () => {
  return (
    <BaseLayout>
      <Container>
        <Button color="danger">Danger</Button>
      </Container>
    </BaseLayout>
  );
};
export default Home;
