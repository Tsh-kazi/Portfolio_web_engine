import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^react$/,
        (resource: any) => {
          const context = resource.context || '';
          if (
            context.includes('node_modules/sanity') ||
            context.includes('node_modules/@sanity') ||
            context.includes('node_modules\\sanity') ||
            context.includes('node_modules\\@sanity')
          ) {
            resource.request = path.resolve(__dirname, 'react-shim.js');
          }
        }
      )
    );
    return config;
  }
};

export default nextConfig;
