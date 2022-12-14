import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import withAuth from "@/hoc/withAuth";

const Secret = ({ user, loading }) => {
  return (
    <>
      <BaseLayout user={user} loading={loading}>
        <BasePage>
          <h1>Secret Page - Hello, {user.given_name}!</h1>
        </BasePage>
      </BaseLayout>
    </>
  );
};

export default withAuth(Secret)("admin");
