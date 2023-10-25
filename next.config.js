/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'upload.wikimedia.org',
            'img.clerk.com'
        ]
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
