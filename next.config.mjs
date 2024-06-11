/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // assetPrefix: process.env.NODE_ENV === 'production' ? '/sssnake/' : '',
    compiler: {
        styledComponents: true,
    }
};

export default nextConfig;
