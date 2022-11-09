import { initAuth0 } from "@auth0/nextjs-auth0";

export default initAuth0({
  authorizationParams: {
    scope: "openid profile",
  },
});
