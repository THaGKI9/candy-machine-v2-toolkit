function getAssetPrefix() {
  if (process.env.GITHUB_ACTIONS === "true") {
    // const [, repo] = process.env.GITHUB_REPOSITORY.split("/");
    // return `/${repo.toLowerCase()}/`;

    return "./";
  }

  return "";
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: getAssetPrefix(),
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
