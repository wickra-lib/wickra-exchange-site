import { defineConfig } from 'vitepress'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

// JSON-LD structured data (Organization + SoftwareApplication) so search
// engines and LLM crawlers can resolve the product's entity, ownership, and
// where it is published. Emitted once in the document <head> below.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://exchange.wickra.org/#organization',
      name: 'Wickra',
      url: 'https://exchange.wickra.org/',
      logo: 'https://exchange.wickra.org/wickra-mark.svg',
      sameAs: [
        'https://github.com/wickra-lib/wickra-exchange',
        'https://github.com/wickra-lib/wickra',
        'https://wickra.org/',
      ],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://exchange.wickra.org/#software',
      name: 'Wickra Exchange',
      url: 'https://exchange.wickra.org/',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Windows, macOS, Linux',
      programmingLanguage: ['Rust', 'Python', 'JavaScript', 'C', 'C++', 'C#', 'Go', 'Java', 'R'],
      description:
        'One typed API across ten crypto exchanges — market data and signed order execution, in ten languages, built on the Wickra core.',
      license: 'https://github.com/wickra-lib/wickra-exchange#license',
      publisher: { '@id': 'https://exchange.wickra.org/#organization' },
    },
  ],
}

export default defineConfig({
  title: 'Wickra Exchange',
  description:
    'One typed API across ten crypto exchanges — market data and signed order execution, in ten languages. Built on the Wickra core.',
  lang: 'en-US',
  cleanUrls: true,

  // Served at the domain root (exchange.wickra.org via Cloudflare Pages), so the
  // base is '/'. Do NOT reintroduce a '/<repo>/' sub-path.
  base: '/',

  // VitePress' built-in sitemap generator; CF Pages serves dist/sitemap.xml at
  // the domain root. robots.txt points discovery here.
  sitemap: { hostname: 'https://exchange.wickra.org' },

  // README.md is repo documentation, not a site page — keep it out of the build.
  srcExclude: ['README.md'],

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/wickra-mark.svg' }],
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#0ea5e9' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Wickra Exchange — one typed API, ten crypto exchanges' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Market data and signed order execution across ten crypto exchanges, in ten languages. Built on the Wickra core.',
      },
    ],
    ['meta', { property: 'og:image', content: 'https://exchange.wickra.org/og-banner.webp' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://exchange.wickra.org/og-banner.webp' }],
    ['script', { type: 'application/ld+json' }, JSON.stringify(structuredData)],
  ],

  // VitePress emits neither a canonical link nor a per-page og:url on its own;
  // derive both from each page's clean path.
  transformPageData(pageData) {
    const path = pageData.relativePath.replace(/(?:index)?\.md$/, '')
    const canonical = `https://exchange.wickra.org/${path}`
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { property: 'og:url', content: canonical }],
    )
  },

  themeConfig: {
    siteTitle: 'Wickra Exchange',
    logo: { src: '/wickra-mark.svg', alt: 'Wickra Exchange' },

    // The brand mark loops back to the ecosystem home (wickra.org), not this
    // site's own root — consistent with the docs site's logoLink.
    logoLink: 'https://wickra.org/',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Demo', link: '/demo' },
      { text: 'Live', link: 'https://live.wickra.org' },
      { text: 'Benchmarks', link: '/benchmarks' },
      {
        text: 'API',
        items: [
          { text: 'Rust', link: '/api/rust' },
          { text: 'Python', link: '/api/python' },
          { text: 'Node', link: '/api/node' },
          { text: 'C', link: '/api/c' },
          { text: 'C#', link: '/api/csharp' },
          { text: 'Go', link: '/api/go' },
          { text: 'Java', link: '/api/java' },
          { text: 'R', link: '/api/r' },
        ],
      },
      { text: 'GitHub', link: 'https://github.com/wickra-lib/wickra-exchange' },
      {
        text: 'Links',
        items: [
          { text: 'crates.io', link: 'https://crates.io/crates/wickra-exchange' },
          { text: 'PyPI', link: 'https://pypi.org/project/wickra-exchange/' },
          { text: 'npm', link: 'https://www.npmjs.com/package/wickra-exchange' },
          { text: 'NuGet', link: 'https://www.nuget.org/packages/WickraExchange' },
          { text: 'Maven Central', link: 'https://central.sonatype.com/artifact/org.wickra/wickra-exchange' },
          { text: 'Go module', link: 'https://pkg.go.dev/github.com/wickra-lib/wickra-exchange-go' },
          { text: 'r-universe', link: 'https://wickra-lib.r-universe.dev' },
        ],
      },
      {
        text: 'v0.1.0',
        items: [
          { text: 'Release notes', link: 'https://github.com/wickra-lib/wickra-exchange/releases' },
          { text: 'Changelog', link: 'https://github.com/wickra-lib/wickra-exchange/blob/main/CHANGELOG.md' },
          { text: 'docs.rs', link: 'https://docs.rs/wickra-exchange/latest/wickra_exchange/' },
        ],
      },
      {
        text: 'Ecosystem',
        items: [
          { text: 'Wickra (core)', link: 'https://wickra.org' },
          { text: 'Docs', link: 'https://docs.wickra.org' },
          { text: 'Exchange', link: 'https://exchange.wickra.org' },
          { text: 'Backtest', link: 'https://backtest.wickra.org' },
          { text: 'Terminal', link: 'https://terminal.wickra.org' },
          { text: 'Screener', link: 'https://screener.wickra.org' },
          { text: 'X-Ray', link: 'https://xray.wickra.org' },
          { text: 'Radar', link: 'https://radar.wickra.org' },
          { text: 'Copilot', link: 'https://copilot.wickra.org' },
          { text: 'Shazam', link: 'https://shazam.wickra.org' },
        ],
      },
    ],

    sidebar: {
      '/api/': [
        {
          text: 'Bindings',
          items: [
            { text: 'Rust', link: '/api/rust' },
            { text: 'Python', link: '/api/python' },
            { text: 'Node', link: '/api/node' },
            { text: 'C', link: '/api/c' },
            { text: 'C#', link: '/api/csharp' },
            { text: 'Go', link: '/api/go' },
            { text: 'Java', link: '/api/java' },
            { text: 'R', link: '/api/r' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/wickra-lib/wickra-exchange' }],

    // The footer is rendered by theme/SiteFooter.vue (layout-bottom slot) so it
    // can carry the badge row + the per-page "Updated" date.

    search: { provider: 'local' },

    outline: { level: [2, 3], label: 'On this page' },

    lastUpdated: { text: 'Updated', formatOptions: { dateStyle: 'medium' } },
  },

  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
    lineNumbers: false,
  },

  vite: {
    // wickra-wasm is a wasm-pack `--target bundler` build: its JS glue does
    // `import * as wasm from './wickra_wasm_bg.wasm'` and expects the bundler
    // to instantiate the module and expose its exports. vite-plugin-wasm does
    // exactly that, and vite-plugin-top-level-await handles the top-level await
    // the wasm init emits.
    plugins: [wasm(), topLevelAwait()],
    optimizeDeps: {
      // esbuild's dep pre-bundling can't follow the .wasm ESM import, so keep
      // wickra-wasm out of it and let vite-plugin-wasm handle it on demand.
      exclude: ['wickra-wasm'],
    },
    server: {
      fs: {
        allow: ['..'],
      },
    },
  },
})
