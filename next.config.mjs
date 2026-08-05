/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  compress: true,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'gsap',
      'zustand',
      '@gsap/react',
      'clsx',
      'tailwind-merge',
      '@base-ui/react',
    ],
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            // Firebase Auth (popup & redirect) needs:
            //   script-src:  apis.google.com, accounts.google.com
            //   frame-src:   accounts.google.com, *.firebaseapp.com (OAuth iframe)
            //   connect-src: *.googleapis.com, *.firebaseio.com, *.firestore.googleapis.com,
            //                identitytoolkit.googleapis.com, securetoken.googleapis.com
            value: [
              "default-src 'self'",
              // Scripts — added apis.google.com + accounts.google.com for Firebase Auth popup
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'" +
                " https://apis.google.com" +
                " https://accounts.google.com" +
                " https://pagead2.googlesyndication.com" +
                " https://adservice.google.com" +
                " https://www.googletagmanager.com" +
                " https://va.vercel-scripts.com" +
                " https://translate.google.com" +
                " https://translate.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://translate.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https:",
              // Network — added all Firebase backend hosts
              "connect-src 'self' https: wss:" +
                " https://*.googleapis.com" +
                " https://*.firebaseio.com" +
                " https://*.firestore.googleapis.com" +
                " https://identitytoolkit.googleapis.com" +
                " https://securetoken.googleapis.com",
              // Frames — added accounts.google.com + *.firebaseapp.com for OAuth popup iframe
              "frame-src 'self'" +
                " https://accounts.google.com" +
                " https://*.firebaseapp.com" +
                " https://googleads.g.doubleclick.net" +
                " https://tpc.googlesyndication.com" +
                " https://www.google.com" +
                " https://translate.google.com",
            ].join('; '),
          },
        ],
      },
      {
        source: '/ads.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
      {
        source: '/:path*.(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
