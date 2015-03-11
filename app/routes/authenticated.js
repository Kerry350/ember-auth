import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(transition) {
    this._super(transition);

    if (!this.authentication.get('isLoggedIn')) {
      return this.authentication.attemptTokenRefresh()
      .then(function() {
        transition.retry();
      }.bind(this))
      .catch(function() {
        transition.abort();
        this.redirectToLoginRoute(transition);
      }.bind(this));
    }
  },

  redirectToLoginRoute: function(currentTransition) {
    this.authentication.set('previouslyAbortedTransition', currentTransition);
    this.transitionTo('login');
  },

  actions: {
    error: function(reason, transition) {
      if (reason.status === 401) {
        this.authentication.attemptTokenRefresh()
        .then(function() {
          transition.retry();
        }.bind(this))
        .catch(function() {
          this.redirectToLoginRoute(transition);
        }.bind(this));
      }
    }
  }
});
