import PortfolioApi from "@/lib/api/portfolios";
import auth0 from "@/utils/auth0";

export default async function createPortfolio(req, res) {
  try {
    const { accessToken } = await auth0.getSession(req, res);
    const data = req.body;
    const json = await new PortfolioApi(accessToken).createPortfolio(data);
    return res.json(json.data);
  } catch (error) {
    return res
      .status(error.status || 422)
      .json(`${error.name}: ${error.message}`);
  }
}
