import BaseLayout from "../../components/layouts/BaseLayout";
import axios from "axios";

const PortfolioDetail = ({ portfolio }) => {
  return (
    <>
      <BaseLayout>
        <h1>portfolio details</h1>
        <h2>{portfolio.title}</h2>
        <p>{portfolio.body}</p>
      </BaseLayout>
    </>
  );
};

PortfolioDetail.getInitialProps = async ({ query }) => {
  let portfolio = {};
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${query.id}`
    );
    portfolio = res.data;
  } catch (err) {
    console.error(err);
  }

  return { portfolio };
};

export default PortfolioDetail;
