import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetUser } from "@/actions/user";

const About = () => {
  const { data: user, loading } = useGetUser();

  return (
    <>
      <BaseLayout user={user} loading={loading}>
        <BasePage>
          <h1>About Page</h1>
        </BasePage>
      </BaseLayout>
    </>
  );
};

export default About;
