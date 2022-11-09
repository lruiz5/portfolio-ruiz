// High Order Component -HOC
// Simple function that takes
// a component and returns new
// component with some extended functionality
import { useGetUser } from "@/actions/user";
import Redirect from "@/components/shared/Redirect";

const withAuth = (Component) => {
  return (props) => {
    const { data: user, loading } = useGetUser();
    if (loading) {
      return <p>Loading User...</p>;
    }
    //if user is not authenticated
    if (!user) {
      return <Redirect ssr to="/api/v1/login" />;
    } else {
      return <Component user={user} loading={loading} {...props} />;
    }
  };
};

export default withAuth;
