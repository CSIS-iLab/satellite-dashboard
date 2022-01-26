const path = require('path')
import Fiber from 'fibers'
import Sass from 'sass'
import axiosRetry from 'axios-retry'

const customSass = {
  implementation: Sass,
  // webpackImporter: false,
  sassOptions: {
    fiber: Fiber,
    includePaths: ['node_modules', 'node_modules/vue2-datepicker/scss/']
  },
  sourceMap: process.env.NODE_ENV === 'production'
}

export default {
  target: 'static',
  googleAnalytics: {
    id: 'UA-110820736-2'
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s | Satellite Dashboard',
    title: 'Satellite Dashboard',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      { hid: 'og:title', property: 'og:title', content: 'Satellite Dashboard' },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Satellite Dashboard'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content:
          'https://satdash.wpengine.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-26-at-9.29.17-AM.png'
      },
      {
        name: 'twitter:title',
        content: 'Satellite Dashboard'
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:description',
        content: process.env.npm_package_description || ''
      },
      {
        name: 'twitter:creator',
        content: '@satdashboard'
      },
      {
        name: 'twitter:image',
        content:
          'https://satdash.wpengine.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-26-at-9.29.17-AM.png'
      },
      { name: 'msapplication-TileColor', content: '#1c1c1c' },
      { name: 'theme-color', content: '#1c1c1c' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#e98328' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://use.typekit.net/gyv1vhd.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [{ src: '~/assets/css/main.scss', lang: 'scss' }],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '@/plugins/vue-cesium.client.js'
    },
    {
      src: '@/plugins/vue-datepicker.client.js'
    },
    {
      src: '@/plugins/vue-select.client.js'
    },
    {
      src: '@/plugins/vue-highcharts.client.js'
    },
    { src: '~/plugins/vue-good-table.client.js' },
    { src: '~/plugins/vue-tippy.client.js' },
    { src: '~/plugins/vue-pluralize' },
    { src: '~/plugins/pages.server.js' },
    { src: '~/plugins/posts.server.js' },
    { src: '~/plugins/tags.server.js' },
    { src: '~/plugins/categories.server.js' },
    { src: '~/plugins/countries.server.js' },
    { src: '~/plugins/users.server.js' },
    { src: '~/plugins/glossary.server.js' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module',
    // Doc: https://google-analytics.nuxtjs.org/setup
    '@nuxtjs/google-analytics'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa', '@nuxtjs/style-resources', '@nuxtjs/axios'],
  styleResources: {
    scss: [
      './assets/css/abstracts/index.scss'
      // './assets/css/abstracts/_variables.scss',
      // './assets/css/abstracts/_functions.scss',
      // './assets/css/abstracts/_mixins.scss',
      // './assets/css/abstracts/_placeholders.scss'
    ]
  },
  // Axios module configuration (https://axios.nuxtjs.org/options)
  axios: {
    // baseURL: 'http://satellite-dashboard.local',
    baseURL: 'https://satdash.wpengine.com',
    retry: {
      retries: 10,
      retryDelay: axiosRetry.exponentialDelay
    }
  },
  /*
   ** Build configuration
   */
  build: {
    loaders: {
      scss: customSass,
      vue: { cacheBusting: process.env.NODE_ENV === 'production' }
    },
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        /* More info at https://cssnano.co/ */
        cssnano: {
          preset: [
            'default',
            {
              autoprefixer: false
            },
            {
              discardComments: {
                removeAll: true
              }
            }
          ]
        }
      },
      // Change the postcss-preset-env settings
      preset: {
        autoprefixer: {
          grid: false
        }
      }
    },
    splitChunks: {
      layouts: true
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      // add frontmatter-markdown-loader
      config.module.rules.push({
        test: /\.md$/,
        include: path.resolve(__dirname, 'content/analysis'),
        loader: 'frontmatter-markdown-loader'
      })
    },
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ],
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              esmodules: true
            },
            loose: true,
            shippedProposals: true
          }
        ]
      ]
    }
  },
  generate: {
    // see https://composition-api.nuxtjs.org/getting-started/setup
    interval: 2000
    // routes: dynamicRoutes // No longer need to specify this.
  }
}
