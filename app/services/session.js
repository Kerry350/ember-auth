import Ember from 'ember';
import config from 'auth-app/config/environment';

export default Ember.Object.extend({
  client: new Firebase(config.firebase),
  isAuthenticated: Ember.computed.notEmpty('authenticationData'),
  authenticationData: null,

  setupEvents: function() {
    this.get('client').onAuth(this.handleAuth.bind(this));
  }.on('init'),

  handleAuth: function(authenticationData) {
    this.set('authenticationData', authenticationData);
  },

  authenticate: function(credentials) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      this.get('client')
      .authWithPassword(credentials, function(error, user) {
        if (error) {
          reject();
        } else {
          resolve(user);
        }
      });
    }.bind(this));
  },

  clear: function() {
    this.get('client').unauth();
  }
});
