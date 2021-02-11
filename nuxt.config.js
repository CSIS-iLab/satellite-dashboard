const path = require('path')
import Fiber from 'fibers'
import Sass from 'sass'

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
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s | Satellite Dashboard',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
      src: '@/plugins/vue-cesium.js',
      ssr: false
    },
    {
      src: '@/plugins/vue-datepicker',
      ssr: false
    },
    {
      src: '@/plugins/vue-select',
      ssr: false
    },
    { src: '~/plugins/vue-good-table', ssr: false },
    { src: '~/plugins/vue-pluralize' },
    { src: '~/plugins/server/pages.js' },
    { src: '~/plugins/server/posts.js' },
    { src: '~/plugins/server/tags.js' },
    { src: '~/plugins/server/categories.js' },
    { src: '~/plugins/server/countries.js' },
    { src: '~/plugins/server/users.js' },
    { src: '~/plugins/server/glossary.js' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
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
    }
  },
  generate: {
    // routes: dynamicRoutes // No longer need to specify this.
  }
}
