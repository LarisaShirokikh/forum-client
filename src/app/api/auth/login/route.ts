import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        req.body
      );
      res.status(200).json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        res
          .status(error.response?.status || 500)
          .json({
            message: error.response?.data?.message || "Internal Server Error",
          });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
