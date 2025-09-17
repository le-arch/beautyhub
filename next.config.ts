
import type {NextConfig} from 'next';


const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  webpack: (config, {isServer}) => {
    // Add a rule to handle handlebars, excluding most of node_modules
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules\/(?!(handlebars)\/).*/, // Exclude all node_modules except handlebars
      use: {
        loader: 'babel-loader', // Or another suitable loader if needed
        options: {
          presets: ['next/babel'],
        },
      },
    });

    return config;
  },
};

export default nextConfig;

