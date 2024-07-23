import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: "No authorization header" });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const response = await axios.get("http://localhost:4000/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      res.status(200).json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        res
          .status(error.response?.status || 401)
          .json({ message: "Not authenticated" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
