import Ember from 'ember';

export default Ember.Controller.extend({
  attrs: {
    email: null,
    password: null
  },

  actions: {
    register: function() {
      var newUser = this.store.createRecord('user', this.attrs);

      return newUser
      .save()
      .then(function(user) {
        this.get('session').authenticate('simple-auth-authenticator:oauth2-password-grant', {
          identification: this.attrs.email,
          password: this.attrs.password
        });
      }.bind(this))
      .catch(function(err) {
        console.log("New user error", err);
      });
    }
  }
});
