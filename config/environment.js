/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'auth-app',
    podModulePrefix: 'auth-app/pods',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    clientId: "550c072de4ac8a64132533af", // Can be obtained from the seeded client on the server

    "simple-auth": {
      store: 'simple-auth-session-store:local-storage',
      authorizer: 'simple-auth-authorizer:oauth2-bearer',
      crossOriginWhitelist: ['http://localhost:3200']
    },

    "simple-auth-oauth2": {
      serverTokenEndpoint: 'http://localhost:3200/api/v1/token'
    },

    torii: {
      providers: {
        'facebook-oauth2': {
          apiKey:      'KEY',
          redirectUri: 'http://localhost:4200/'
        }
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
