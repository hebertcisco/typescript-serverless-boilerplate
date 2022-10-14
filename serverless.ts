#!/usr/bin/env node
import "dotenv/config";
import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "typescript-serverless-boilerplate",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  functions: {
    cats: {
      timeout: 30,
      handler: "src/functions/cats.handler",
      events: [
        {
          http: {
            path: "/list",
            method: "get",
            cors: true,
          },
        },
        {
          http: {
            path: "/create",
            method: "post",
            cors: true,
          },
        },
      ],
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node16",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
