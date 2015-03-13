import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    authenticate: function(provider) {
      this.get('session').open(provider)
      .then(function() {
        this.set('currentProvider', provider);
        return this.transitionTo('settings');
      }.bind(this))
      .catch(function(err) {
        // Show an error of some sort
      });
    },

    logout: function() {
      this.get('session').close(this.get('currentProvider'))
      .then(function() {
        this.set('currentProvider', null);
      }.bind(this));
    }
  }
});
