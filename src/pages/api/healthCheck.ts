import type { NextApiRequest, NextApiResponse } from "next";

// Used by probes to check liveness and readiness of NextJS application
// Endpoint can be hit on /api/healthCheck
// Beware the route is case-sensitive!
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ status: "Healthy" });
}
