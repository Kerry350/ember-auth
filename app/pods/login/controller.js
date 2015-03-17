import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    login: function() {
      var credentials = this.getProperties('email', 'password');

      this.get('session')
      .authenticate(credentials)
      .then(function() {
        this.transitionToRoute('settings');
      }.bind(this))
      .catch(function(error) {
        // Show an error
      }.bind(this));
    }
  }
});
