import axios from "axios";
import Link from "next/link";
import BaseLayout from "../../components/layouts/BaseLayout";
import BasePage from "../../components/BasePage";

const Portfolios = ({ posts }) => {
  const renderPosts = () => {
    return posts.map((post) => (
      <Link href={`portfolios/${post.id}`}>
        <li key={post.id}>{post.title}</li>
      </Link>
    ));
  };
  return (
    <>
      <BaseLayout>
        <BasePage>
          <h1>Portfolios Page</h1>
          <ul>{renderPosts()}</ul>
        </BasePage>
      </BaseLayout>
    </>
  );
};

Portfolios.getInitialProps = async () => {
  let posts = [];
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    posts = res.data;
  } catch (err) {
    console.error(err);
  }

  return { posts: posts.slice(0, 10) };
};

export default Portfolios;
