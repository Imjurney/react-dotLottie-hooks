import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // .lottie 파일을 asset/resource로 처리
    config.module.rules.push({
      test: /\.lottie$/,
      type: "asset/resource",
    });

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.lottie": {
          loaders: ["file-loader"],
          as: "*.json",
        },
      },
    },
  },
};

export default nextConfig;
