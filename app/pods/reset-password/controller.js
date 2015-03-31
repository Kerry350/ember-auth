import Ember from 'ember';
import request from 'ic-ajax';

export default Ember.Controller.extend({
  attrs: {
    password: null,
    passwordConfirmation: null,
    passwordResetToken: null,
    email: null,
    message: null
  },

  queryParams: ['token'],
  token: null,

  resetAttrs: function() {
    this.set('attrs.password', null);
    this.set('attrs.passwordConfirmation', null);
    this.set('attrs.passwordResetToken', null);
    this.set('attrs.email', null);
    this.set('attrs.message', null);
  },

  actions: {
    requestPasswordReset: function() {
      return request('/api/v1/users/password-reset', {
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                  email: this.get('attrs.email')
                })
            })
            .then(function(data) {
              this.resetAttrs();
              this.set('attrs.message', 'Please check your email for further instructions.');
            }.bind(this));
    },

    resetPassword: function() {
      return request('/api/v1/users/password-reset', {
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                  passwordResetToken: this.get('token'),
                  password: this.get('attrs.password'),
                  passwordConfirmation: this.get('attrs.passwordConfirmation')
                })
            })
            .then(function(data) {
              this.resetAttrs();
              this.set('attrs.message', 'Your password has been reset');
            }.bind(this));
    }
  }
});
