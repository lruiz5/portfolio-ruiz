import axios from "axios";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";

const PortfolioDetail = ({ portfolio }) => {
  return (
    <>
      <BaseLayout>
        <BasePage>
          <h1>portfolio details</h1>
          <h2>{portfolio.title}</h2>
          <p>{portfolio.body}</p>
        </BasePage>
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
