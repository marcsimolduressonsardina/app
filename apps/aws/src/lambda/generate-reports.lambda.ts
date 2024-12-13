import { pino } from "pino";
import "dotenv/config";

import { lambdaGenerateReports } from "@marcsimolduressonsardina/lambda/reports";

export async function handler(event: unknown): Promise<void> {
  const logger = pino();
  logger.info(event);
  try {
    await lambdaGenerateReports(
      process.env.STORE_ID,
      process.env.ORDER_AUDIT_TRAIL_TABLE,
      process.env.ORDER_TABLE,
      process.env.CUSTOMER_TABLE,
      process.env.REPORTS_BUCKET,
      process.env.CALCULATED_ITEM_TABLE
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(`Error generating reports: ${err.toString()}`);
    } else {
      logger.error(`Error generating reports: ${String(err)}`);
    }
  }
}