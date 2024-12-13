import { Duration } from "aws-cdk-lib";
import {
  BlockPublicAccess,
  Bucket,
  type BucketProps,
  type CorsRule,
  HttpMethods,
} from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import type { BucketSet } from "../types.js";

export function createBuckets(
  scope: Construct,
  allowedUploadOrigins: string[],
  envName: string,
): BucketSet {
  const corsRule: CorsRule = {
    allowedMethods: [HttpMethods.PUT, HttpMethods.POST],
    allowedOrigins: allowedUploadOrigins,
    allowedHeaders: ["*"],
    exposedHeaders: ["Access-Control-Allow-Origin"],
  };

  const moldPricesBucketProps: BucketProps = {
    bucketName: `mmss-${envName}-mold-prices`,
    cors: [corsRule],
    lifecycleRules: [{ expiration: Duration.days(7) }],
    blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
  };

  const filesBucketProps: BucketProps = {
    bucketName: `mmss-${envName}-files`,
    cors: [corsRule],
    blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
  };

  const reportsBucketProps: BucketProps = {
    bucketName: `mmss-${envName}-reports`,
    blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
  };

  const moldPricesBucket = new Bucket(
    scope,
    `mmss-${envName}-mold-prices`,
    moldPricesBucketProps,
  );
  const filesBucket = new Bucket(
    scope,
    `mmss-${envName}-files`,
    filesBucketProps,
  );
  const reportsBucket = new Bucket(
    scope,
    `mmss-${envName}-reports`,
    reportsBucketProps,
  );
  return { moldPricesBucket, filesBucket, reportsBucket };
}