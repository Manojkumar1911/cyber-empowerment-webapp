import mongoose, { Document } from "mongoose";

// Define the interface for ScamReport document
export interface IScamReport extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  description: string;
  evidence?: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  severity: 'low' | 'medium' | 'high';
  reportedAt: Date;
}

// Create the Mongoose schema
const scamReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  evidence: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'investigating', 'resolved', 'dismissed'],
    default: 'pending'
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  },
  reportedAt: { type: Date, default: Date.now },
});

// Create and export the model
export const ScamReport = mongoose.model<IScamReport>("ScamReport", scamReportSchema);

// Create a class wrapper for model operations
export class ScamReportModel {
  async create(reportData: {
    userId: string;
    type: string;
    description: string;
    evidence?: string[];
    status?: 'pending' | 'investigating' | 'resolved' | 'dismissed';
    severity?: 'low' | 'medium' | 'high';
  }): Promise<IScamReport> {
    return await ScamReport.create(reportData);
  }

  async findByUserId(userId: string): Promise<IScamReport[]> {
    return await ScamReport.find({ userId }).exec();
  }
}