import { createReport } from '../services/reportService.js';

export function exportReportController() {
  return createReport();
}
