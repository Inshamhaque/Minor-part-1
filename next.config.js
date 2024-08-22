module.exports = {
    async redirects() {
      return [
        // Basic redirect
        {
          source: '/',
          destination: '/auth/login',
          permanent: true,
        },
        // Wildcard path matching
        {
          source: '/blog/:slug',
          destination: '/news/:slug',
          permanent: true,
        },
      ]
    },
  }