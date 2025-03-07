import { z } from 'zod';

export const ScamReportSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.string(),
  description: z.string(),
  evidence: z.array(z.string()).optional(),
  status: z.enum(['pending', 'investigating', 'resolved']),
  severity: z.enum(['low', 'medium', 'high']),
  timestamp: z.date(),
  updatedAt: z.date(),
});

export type ScamReport = z.infer<typeof ScamReportSchema>;

export class ScamReportModel {
  private reports: ScamReport[] = [];

  async create(reportData: Omit<ScamReport, 'id' | 'timestamp' | 'updatedAt'>): Promise<ScamReport> {
    const newReport: ScamReport = {
      id: crypto.randomUUID(),
      ...reportData,
      timestamp: new Date(),
      updatedAt: new Date(),
    };

    this.reports.push(newReport);
    return newReport;
  }

  async findById(id: string): Promise<ScamReport | null> {
    return this.reports.find(report => report.id === id) || null;
  }

  async findByUserId(userId: string): Promise<ScamReport[]> {
    return this.reports.filter(report => report.userId === userId);
  }

  async update(id: string, reportData: Partial<ScamReport>): Promise<ScamReport | null> {
    const index = this.reports.findIndex(report => report.id === id);
    if (index === -1) return null;

    this.reports[index] = {
      ...this.reports[index],
      ...reportData,
      updatedAt: new Date(),
    };

    return this.reports[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.reports.findIndex(report => report.id === id);
    if (index === -1) return false;

    this.reports.splice(index, 1);
    return true;
  }
}