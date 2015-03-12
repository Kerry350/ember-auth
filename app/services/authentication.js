import request from 'ic-ajax';
import Ember from 'ember';

export default Ember.Object.extend({
    token: window.localStorage.getItem('accessToken'),
    refreshToken: null,
    isLoggedIn: Ember.computed.notEmpty('token'),
    previouslyAbortedTransition: null,

    authenticate: function(credentials) {
        return request('/api/auth/token', {
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(credentials)
            })
            .then(function(data) {
                return this.createSession(data.token, data.refreshToken);
            }.bind(this));
    },

    createSession: function(token, refreshToken) {
        this.set('token', token);

        if (refreshToken) {
            this.set('refreshToken', refreshToken);
        }

        return true;
    },

    destroySession: function() {
        this.setProperties({
            token: null,
            refreshToken: null
        });
    },

    useRefreshToken: function() {
      return request('/api/auth/token', {
              type: 'POST',
              contentType: 'application/json',
              data: JSON.stringify({
                refreshToken: this.get('refreshToken')
              })
          })
          .then(function(data) {
            this.createSession(data.token, data.refreshToken);
          }.bind(this));
    },

    attemptTokenRefresh: function() {
      return new Ember.RSVP.Promise(function(resolve, reject) {
        if (!this.get('refreshToken')) {
          reject();
        } else {
          this.useRefreshToken()
          .then(resolve)
          .catch(reject)
        }
      }.bind(this));
    },

    storeOrDeleteToken: function() {
        if (this.get('token')) {
          localStorage.setItem('accessToken', this.get('token'));
        } else {
          localStorage.removeItem('accessToken');
        }
    }.observes('token'),

    storeOrDeleteRefreshToken: function() {
        if (this.get('refreshToken')) {
          localStorage.setItem('refreshToken', this.get('refreshToken'));
        } else {
          localStorage.removeItem('refreshToken');
        }
    }.observes('refreshToken')
});
