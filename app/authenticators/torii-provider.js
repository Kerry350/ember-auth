import Ember from 'ember';
import OAuth2 from 'simple-auth-oauth2/authenticators/oauth2';

// Extend the oauth2 authenticator so that we can take advantage of token refreshing etc
// restore() and invalidate() stay the same, we just override authenticate().
// This authenticator wraps the Torii flow so that we can link 3rd Party details to
// a user in our system
export default OAuth2.extend({
  authenticate: function(options) {
    return this.authoriseWithProvider(options).then(this.exchangeCodeForAccessToken.bind(this));
  },

  authoriseWithProvider: function(options) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      options.torii.open(options.provider).then(function(authData) {
        resolve({
          grant_type: 'authorization_code',
          provider: authData.provider,
          code: authData.authorizationCode
        });
      }, function(error) {
        reject(error);
      });
    });
  },

  // Reference: https://github.com/simplabs/ember-simple-auth/blob/master/packages/ember-simple-auth-oauth2/lib/simple-auth-oauth2/authenticators/oauth2.js#L121
  exchangeCodeForAccessToken: function(authData) {
    var _this = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      _this.makeRequest(_this.serverTokenEndpoint, authData).then(function(response) {
        Ember.run(function() {
          var expiresAt = _this.absolutizeExpirationTime(response.expires_in);
          _this.scheduleAccessTokenRefresh(response.expires_in, expiresAt, response.refresh_token);
          resolve(Ember.$.extend(response, {expires_at: expiresAt}));
        });
      }, function(xhr) {
        Ember.run(function() {
          reject(xhr.responseJSON || xhr.responseText);
        });
      });
    });
  }
});
