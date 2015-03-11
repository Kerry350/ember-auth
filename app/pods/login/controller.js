import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    login: function() {
      this.get('session').authenticate('simple-auth-authenticator:oauth2-password-grant', {
        identification: this.get('email'),
        password: this.get('password')
      })
      .then(function(res) {

      })
      .catch(function(err) {

      });
    }
  }
});
