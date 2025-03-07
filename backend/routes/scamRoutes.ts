import { Router,Request,Response } from "express";
import { ScamReport } from "../models/ScamReport";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validation } from "../utils/validation";

const router = Router();

// Submit a scam report
router.post("/report", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { userId, type, description, evidence } = req.body;

    if (!userId || !type || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Sanitize input
    const sanitizedDescription = validation.sanitizeInput(description);

    const report = new ScamReport({
      userId,
      type,
      description: sanitizedDescription,
      evidence,
    });

    await report.save();
    res.status(201).json({ message: "Scam report submitted successfully!" });
  } catch (error) {
    console.error("Scam report submission failed:", error);
    res.status(500).json({ error: "Report submission failed" });
  }
});

// Get all scam reports
router.get("/reports/:userId", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const reports = await ScamReport.find({ userId });
    res.status(200).json(reports);
  } catch (error) {
    console.error("Fetching reports failed:", error);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

export default router;
