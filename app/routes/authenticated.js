import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(transition) {
    this._super(transition);

    if (!this.session.get('isAuthenticated')) {
      return this.handleUnauthenticatedState(transition);
    }
  },

  handleUnauthenticatedState: function(transition) {
    return this.session.attemptTokenRefresh()
    .then(function() {
      transition.retry();
    }.bind(this))
    .catch(function() {
      transition.abort();
      this.redirectToLoginRoute(transition);
    }.bind(this));
  },

  redirectToLoginRoute: function(currentTransition) {
    this.session.set('previouslyAbortedTransition', currentTransition);
    this.transitionTo('login');
  },

  actions: {
    error: function(reason, transition) {
      if (reason.status === 401) {
        return this.handleUnauthenticatedState(transition);
      }
    }
  }
});
