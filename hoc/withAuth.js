// High Order Component -HOC
// Simple function that takes
// a component and returns new
// component with some extended functionality
import { useGetUser } from "@/actions/user";
import Redirect from "@/components/shared/Redirect";
import { isAuthorized } from "@/utils/auth0";

const withAuth = (Component) => (role) => {
  return (props) => {
    const { data: user, loading } = useGetUser();
    if (loading) {
      return <p>Loading User...</p>;
    }
    //if user is not logged in
    if (!user) {
      return <Redirect ssr to="/api/v1/login" />;
    } else {
      if (role && !isAuthorized(user, role)) {
        return <Redirect ssr to="/api/v1/login" />;
      }
      return <Component user={user} loading={loading} {...props} />;
    }
  };
};

export default withAuth;
