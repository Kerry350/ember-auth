import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    login: function() {
      return this.get('session').authenticate('simple-auth-authenticator:oauth2-password-grant', {
        identification: this.get('email'),
        password: this.get('password')
      });
    }
  }
});
