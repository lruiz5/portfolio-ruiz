import axios from "axios";
import PortfolioApi from "@/lib/api/portfolios";

export default async function createPortfolio(req, res) {
  try {
    const data = req.body;
    await new PortfolioApi().createPortfolio(data);
    return res.json({ message: "Portfolio Created" });
  } catch (error) {
    return res.status(error.status || 400).end(error.message);
  }
}
