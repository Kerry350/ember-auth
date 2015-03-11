import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    if (this.authentication.isLoggedIn) {
      this.transitionTo('pets');
    }
  }
});
