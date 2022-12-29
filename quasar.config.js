/* eslint-env node */
const path = require("path");
/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

const { configure } = require("quasar/wrappers");

module.exports = configure(function (/* ctx */) {
  return {
    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-vite/boot-files
    boot: [
      {
        server: false,
        path: "~src/services/boot/axios",
      },
      {
        server: false,
        path: "~src/services/boot/options",
      },
      {
        server: false,
        path: "~src/services/boot/lang",
      },
      {
        server: false,
        path: "~src/router/middlewares/main",
      },
    ],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: ["~src/assets/scss/app.scss", "~src/assets/scss/variables.scss"],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      "roboto-font", // optional, you are not bound to it
      "material-icons", // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
    build: {
      target: {
        browser: ["es2019", "edge88", "firefox78", "chrome87", "safari13.1"],
        node: "node16",
      },

      chainWebpack: (chain) => {
        chain.module
          .rule("i18n-resource")
          .test(/\.(json5?|ya?ml)$/)
          .include.add(path.resolve(__dirname, "./src/services/translate"))
          .end()
          .type("javascript/auto")
          .use("i18n-resource")
          .loader("@intlify/vue-i18n-loader");
        chain.module
          .rule("i18n")
          .resourceQuery(/blockType=i18n/)
          .type("javascript/auto")
          .use("i18n")
          .loader("@intlify/vue-i18n-loader");
      },

      vueRouterMode: "history", // available values: 'hash', 'history'
      // vueRouterBase,
      // vueDevtools,
      // vueOptionsAPI: false,

      // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

      // publicPath: "/",
      // analyze: true,
      // env: {},
      // rawDefine: {}
      // ignorePublicFolder: true,
      // minify: false,
      // polyfillModulePreload: true,
      // distDir

      // extendViteConf(viteConf, { isServer, isClient }) {}
      // viteVuePluginOptions: {},

      // vitePlugins: [
      //   [ 'package-name', { ..options.. } ]
      // ]

      alias: {
        "@middlewares": path.join(__dirname, "./src/router/middlewares"),
        "@translate": path.join(__dirname, "./src/services/translate"),
        "@components": path.join(__dirname, "./src/view/components"),
        "@composables": path.join(__dirname, "./src/composables"),
        "@interfaces": path.join(__dirname, "./src/interfaces"),
        "@layouts": path.join(__dirname, "./src/view/layouts"),
        "@boot": path.join(__dirname, "./src/services/boot"),
        "@http": path.join(__dirname, "./src/services/http"),
        "@services": path.join(__dirname, "./src/services"),
        "@helps": path.join(__dirname, "./src/tools/helps"),
        "@pages": path.join(__dirname, "./src/view/pages"),
        "@scss": path.join(__dirname, "./src/assets/scss"),
        "@router": path.join(__dirname, "./src/router"),
        "@stores": path.join(__dirname, "./src/stores"),
        "@config": path.join(__dirname, "./src/config"),
        "@assets": path.join(__dirname, "./src/assets"),
        "@tools": path.join(__dirname, "./src/tools"),
        "@view": path.join(__dirname, "./src/view"),
        "@public": path.join(__dirname, "./public"),
        "@src": path.join(__dirname, "./src"),
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
    devServer: {
      // https: true,
      open: false, // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
    framework: {
      config: {},

      // iconSet: 'material-icons', // Quasar icon set
      // lang: "es-VE", // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: ["Cookies", "LoadingBar", "SessionStorage", "Notify"],
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#sourcefiles
    sourceFiles: {
      rootComponent: "src/view/App.vue",
    },

    // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
    ssr: {
      // ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
      // will mess up SSR

      // extendSSRWebserverConf (esbuildConf) {},
      // extendPackageJson (json) {},

      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      middlewares: [
        "render", // keep this as last one
      ],
    },

    // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: "generateSW", // or 'injectManifest'
      injectPwaMetaTags: true,
      swFilename: "sw.js",
      manifestFilename: "manifest.json",
      useCredentialsForManifestTag: false,
      // useFilenameHashes: true,
      // extendGenerateSWOptions (cfg) {}
      // extendInjectManifestOptions (cfg) {},
      // extendManifestJson (json) {}
      // extendPWACustomSWConf (esbuildConf) {}
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
    electron: {
      // extendElectronMainConf (esbuildConf)
      // extendElectronPreloadConf (esbuildConf)

      inspectPort: 5858,

      bundler: "packager", // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: "test-2-quasar",
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
      contentScripts: ["my-content-script"],

      // extendBexScriptsConf (esbuildConf) {}
      // extendBexManifestJson (json) {}
    },
  };
});
